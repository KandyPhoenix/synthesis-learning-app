// ============================================
// FIREBASE SYNC — Google sign-in + cross-device progress sync
// ============================================
// On sign-in: pulls cloud data, merges with local (last-write-wins).
// On any save: pushes local to cloud (debounced 2s).
// Real-time listener: if another device updates the cloud, we pick it up.
// ============================================

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC3seeTszL76em8Oe8huQk_uxLRpoSmgoY",
  authDomain: "synthesis-app-55932.firebaseapp.com",
  projectId: "synthesis-app-55932",
  storageBucket: "synthesis-app-55932.firebasestorage.app",
  messagingSenderId: "728962974566",
  appId: "1:728962974566:web:eb74e85bbaa87cfa65fea7"
};

class FirebaseSync {
  constructor() {
    this.user = null;
    this.unsubscribeListener = null;
    this.pushTimer = null;
    this.lastPushedString = null;
    this.ready = false;
    this.statusEl = null;
    this.init();
  }

  init() {
    if (typeof firebase === 'undefined') {
      console.warn('[sync] Firebase SDK not loaded');
      return;
    }
    try {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      this.auth = firebase.auth();
      this.db = firebase.firestore();
      this.auth.onAuthStateChanged(u => this.onAuthChange(u));
      this.ready = true;
      this.installSaveHook();
      console.log('[sync] Firebase ready');
    } catch (err) {
      console.error('[sync] Init failed:', err);
    }
  }

  // Wrap saveProgress so every save also queues a cloud push
  installSaveHook() {
    if (typeof window.saveProgress !== 'function') {
      // Not loaded yet — retry shortly
      setTimeout(() => this.installSaveHook(), 200);
      return;
    }
    if (window.__saveProgressOriginal) return; // already hooked
    window.__saveProgressOriginal = window.saveProgress;
    const sync = this;
    window.saveProgress = function patchedSave() {
      window.__saveProgressOriginal.apply(this, arguments);
      sync.schedulePush();
    };
  }

  schedulePush(delayMs = 2000) {
    if (!this.user) return;
    if (this.pushTimer) clearTimeout(this.pushTimer);
    this.pushTimer = setTimeout(() => this.push(), delayMs);
  }

  async onAuthChange(user) {
    this.user = user || null;
    this.updateButton();
    if (user) {
      this.setStatus('Syncing…');
      console.log('[sync] Signed in as', user.email);
      await this.pullAndMerge();
      this.startRealtimeListener();
      this.setStatus('Synced');
    } else {
      console.log('[sync] Signed out');
      this.stopRealtimeListener();
      this.setStatus('Local only');
    }
  }

  async signIn() {
    if (!this.ready) {
      alert('Firebase is still loading. Try again in a moment.');
      return;
    }
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await this.auth.signInWithPopup(provider);
    } catch (err) {
      console.error('[sync] Sign-in failed:', err);
      // Popup blocked? Fall back to redirect.
      if (err && (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user')) {
        try {
          await this.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
        } catch (e2) {
          alert('Sign-in failed: ' + (e2.message || e2));
        }
      } else {
        alert('Sign-in failed: ' + (err.message || err));
      }
    }
  }

  async signOut() {
    if (!confirm('Sign out? Your local progress stays on this device. Sign back in on any device to re-sync.')) return;
    this.stopRealtimeListener();
    await this.auth.signOut();
  }

  docRef() {
    return this.db
      .collection('users').doc(this.user.uid)
      .collection('app').doc('progress');
  }

  // ----- Pull cloud, merge with local (last-write-wins by timestamp) -----
  async pullAndMerge() {
    if (!this.user) return;
    try {
      const snap = await this.docRef().get();
      const localStr = localStorage.getItem('synthesisProgress');
      const local = localStr ? JSON.parse(localStr) : null;

      if (!snap.exists) {
        // No cloud data — push local (if any) so other devices can pick it up
        if (local) this.push(true);
        return;
      }

      const cloud = snap.data();
      const cloudTs = cloud.updatedAt || 0;
      const localTs = local?._updatedAt || 0;

      if (cloudTs > localTs) {
        // Cloud is newer — apply it
        this.applyCloudData(cloud, cloudTs);
        console.log('[sync] Cloud → local (cloud newer)');
      } else if (localTs > cloudTs) {
        // Local is newer — push it
        this.push(true);
      }
    } catch (err) {
      console.error('[sync] Pull failed:', err);
      this.setStatus('Sync error');
    }
  }

  // Writes cloud data into localStorage, then re-runs the same rehydration
  // app.js does on a fresh page load so lesson-completed checkmarks and
  // book progress bars (derived, in-memory state — not re-derived by
  // loadProgress() alone) reflect the newly-synced data immediately.
  //
  // NOTE: `window.app` is NOT the SynthesisApp instance — index.html has a
  // <div id="app">, and browsers auto-bind elements with an `id` onto
  // `window` under that name, shadowing any same-named global variable.
  // The real instance is the bare `app` (declared `let app` in app.js,
  // sharing this page's global script scope), so we reference that instead.
  applyCloudData(cloud, cloudTs) {
    const merged = { ...(cloud.data || {}), _updatedAt: cloudTs };
    localStorage.setItem('synthesisProgress', JSON.stringify(merged));
    if (typeof loadProgress === 'function') loadProgress();
    const liveApp = (typeof app !== 'undefined') ? app : null;
    if (liveApp && typeof liveApp.rehydrateLessonCompletions === 'function') {
      liveApp.rehydrateLessonCompletions();
    }
    if (liveApp && typeof liveApp.render === 'function') liveApp.render();
  }

  // ----- Push current localStorage progress to Firestore -----
  async push(immediate = false) {
    if (!this.user) return;
    try {
      const localStr = localStorage.getItem('synthesisProgress');
      if (!localStr) return;
      if (!immediate && localStr === this.lastPushedString) return; // no change
      const local = JSON.parse(localStr);
      const ts = Date.now();
      local._updatedAt = ts;
      localStorage.setItem('synthesisProgress', JSON.stringify(local));
      await this.docRef().set({
        data: local,
        updatedAt: ts,
        _version: local._version || 4
      });
      this.lastPushedString = JSON.stringify(local);
      this.setStatus('Synced • ' + new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      console.error('[sync] Push failed:', err);
      this.setStatus('Sync error');
    }
  }

  // ----- Real-time listener so changes on Device B reach Device A live -----
  startRealtimeListener() {
    this.stopRealtimeListener();
    if (!this.user) return;
    this.unsubscribeListener = this.docRef().onSnapshot(snap => {
      if (!snap.exists || !snap.metadata) return;
      // Skip writes we just made (metadata.hasPendingWrites means it's our own pending write)
      if (snap.metadata.hasPendingWrites) return;
      const cloud = snap.data();
      const localStr = localStorage.getItem('synthesisProgress');
      const local = localStr ? JSON.parse(localStr) : null;
      const cloudTs = cloud.updatedAt || 0;
      const localTs = local?._updatedAt || 0;
      if (cloudTs > localTs) {
        this.applyCloudData(cloud, cloudTs);
        this.setStatus('Updated from another device');
        console.log('[sync] Live update from cloud');
      }
    }, err => console.error('[sync] Listener error:', err));
  }

  stopRealtimeListener() {
    if (this.unsubscribeListener) {
      this.unsubscribeListener();
      this.unsubscribeListener = null;
    }
  }

  // ----- UI: sign-in button + status indicator -----
  updateButton() {
    const btn = document.getElementById('cloud-sync-btn');
    if (!btn) return;
    if (this.user) {
      const name = this.user.displayName || this.user.email || 'Signed in';
      btn.innerHTML = `<span style="font-size:1rem;margin-right:0.35rem">☁️</span><span>${name.split(' ')[0]}</span>`;
      btn.title = (this.user.email || '') + ' — click to sign out';
      btn.onclick = () => this.signOut();
      // Remember the first name on this device and refresh the greeting.
      try { if (this.user.displayName) localStorage.setItem('ownerName', this.user.displayName.split(' ')[0]); } catch (e) {}
      if (typeof app !== 'undefined' && app && typeof app.updateGreeting === 'function') app.updateGreeting();
    } else {
      btn.innerHTML = `<span style="font-size:1rem;margin-right:0.35rem">☁️</span><span>Sign in</span>`;
      btn.title = 'Sign in with Google to sync your progress across devices';
      btn.onclick = () => this.signIn();
    }
  }

  setStatus(text) {
    if (!this.statusEl) this.statusEl = document.getElementById('cloud-sync-status');
    if (this.statusEl) this.statusEl.textContent = text;
  }
}

// Boot when DOM ready
window.firebaseSync = null;
function initFirebaseSync() {
  window.firebaseSync = new FirebaseSync();
  // Render button on every renderHome too
  document.addEventListener('click', () => {
    if (window.firebaseSync) window.firebaseSync.updateButton();
  }, { once: true });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebaseSync);
} else {
  initFirebaseSync();
}
