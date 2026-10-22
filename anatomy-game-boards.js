// ============================================
// SYNTHESIS — ANATOMY ARCADE: BOARDS
// Hand-drawn, color-coded SVG anatomy boards for the Anatomy Arcade games
// (Label It, Lightning, Memory Match, Study). Each board is a viewBox plus a
// list of tappable PARTS. A part's `shape` is raw SVG markup; the literal
// color token "C" is replaced with the part's color when the board renders,
// so both filled regions (fill="C") and tube-like strokes (stroke="C") work.
// `base` is non-interactive art drawn under the parts, `over` is drawn above.
// `pin` is where the numbered badge / label sits (inside the part's own area).
// Facts are one-line textbook statements shown after a correct match.
//
// This file deliberately does NOT end in -data.js: it is a game module, not
// a book, so tools/gen-book-added-on.cjs ignores it.
// ============================================

window.ANATOMY_BOARDS = [

// ------------------------------------------------------------------
// 1. HEART (anterior view — patient's left is on the viewer's right)
// ------------------------------------------------------------------
{
    id: 'heart', title: 'The Heart', icon: '🫀', system: 'Cardiovascular', color: '#ef4444',
    viewBox: '0 0 400 420',
    base: `<ellipse cx="205" cy="240" rx="165" ry="150" fill="#ef4444" opacity="0.06"/>`,
    parts: [
        { id: 'svc', name: 'Superior vena cava', color: '#3b82f6', pin: [135, 72],
          shape: `<path d="M 135 38 L 135 140" fill="none" stroke="C" stroke-width="32" stroke-linecap="round"/>`,
          fact: 'Returns deoxygenated blood from the head, neck and upper limbs into the right atrium.' },
        { id: 'ivc', name: 'Inferior vena cava', color: '#2563eb', pin: [104, 322],
          shape: `<path d="M 118 228 L 100 335" fill="none" stroke="C" stroke-width="30" stroke-linecap="round"/>`,
          fact: 'Returns deoxygenated blood from the lower body into the right atrium.' },
        { id: 'pulmveins', name: 'Pulmonary veins', color: '#f87171', pin: [322, 166],
          shape: `<path d="M 300 172 L 336 160 M 300 198 L 336 206" fill="none" stroke="C" stroke-width="16" stroke-linecap="round"/>`,
          fact: 'Carry oxygenated blood from the lungs into the left atrium — in the adult, the only veins that carry oxygenated blood.' },
        { id: 'ra', name: 'Right atrium', color: '#60a5fa', pin: [140, 182],
          shape: `<path d="M 92 150 C 92 118, 130 112, 165 128 L 190 160 L 192 236 L 95 236 C 88 210, 88 180, 92 150 Z" fill="C"/>`,
          fact: 'Receives deoxygenated blood from the body through the superior and inferior venae cavae.' },
        { id: 'la', name: 'Left atrium', color: '#fb7185', pin: [268, 196],
          shape: `<path d="M 204 160 L 300 165 C 325 175, 334 200, 330 232 L 300 216 L 215 242 L 198 236 L 192 160 Z" fill="C"/>`,
          fact: 'Receives oxygenated blood from the lungs through the four pulmonary veins.' },
        { id: 'rv', name: 'Right ventricle', color: '#38bdf8', pin: [150, 290],
          shape: `<path d="M 95 236 L 198 236 L 206 252 L 248 378 L 255 386 C 175 366, 105 322, 95 236 Z" fill="C"/>`,
          fact: 'Pumps deoxygenated blood through the pulmonary valve into the pulmonary trunk, toward the lungs.' },
        { id: 'lv', name: 'Left ventricle', color: '#f43f5e', pin: [280, 300],
          shape: `<path d="M 206 252 L 248 378 L 255 386 C 302 362, 338 300, 330 232 L 300 216 L 215 242 Z" fill="C"/>`,
          fact: 'The thickest-walled chamber — pumps oxygenated blood into the aorta for the entire body.' },
        // The great vessels leave the heart in FRONT of the atria, so they are
        // drawn last. The descending aorta is routed clear of the heart's edge.
        { id: 'aorta', name: 'Aorta', color: '#ef4444', pin: [244, 110],
          shape: `<path d="M 270 92 L 270 48 M 294 80 L 296 40 M 318 86 L 324 48" fill="none" stroke="C" stroke-width="12" stroke-linecap="round"/>
                  <path d="M 236 190 C 236 120, 258 72, 310 72 C 362 72, 366 130, 358 405" fill="none" stroke="C" stroke-width="30" stroke-linecap="round"/>`,
          fact: 'The body’s largest artery — carries oxygenated blood from the left ventricle out to the whole systemic circulation.' },
        { id: 'pulmtrunk', name: 'Pulmonary trunk', color: '#6366f1', pin: [206, 190],
          shape: `<path d="M 160 136 L 232 136" fill="none" stroke="C" stroke-width="22" stroke-linecap="round"/>
                  <path d="M 232 148 L 300 150" fill="none" stroke="C" stroke-width="20" stroke-linecap="round"/>
                  <path d="M 172 242 C 175 200, 190 160, 232 140 L 256 152 C 232 172, 218 205, 214 248 Z" fill="C"/>`,
          fact: 'Carries deoxygenated blood from the right ventricle and splits into the right and left pulmonary arteries.' }
    ],
    over: `<path d="M 206 252 L 250 380" fill="none" stroke="#0f0f1a" stroke-width="3" opacity="0.6"/>`
},

// ------------------------------------------------------------------
// 2. BRAIN (left lateral view — front of the brain faces left)
// ------------------------------------------------------------------
{
    id: 'brain', title: 'The Brain', icon: '🧠', system: 'Nervous', color: '#8b5cf6',
    viewBox: '0 0 400 330',
    base: `<ellipse cx="210" cy="160" rx="170" ry="120" fill="#8b5cf6" opacity="0.07"/>`,
    parts: [
        { id: 'frontal', name: 'Frontal lobe', color: '#f472b6', pin: [125, 118],
          shape: `<path d="M 60 170 C 58 115, 105 62, 220 62 L 195 160 L 118 190 C 85 192, 65 185, 60 170 Z" fill="C"/>`,
          fact: 'Reasoning, planning and voluntary movement (primary motor cortex); Broca’s speech area is here, usually on the left.' },
        { id: 'parietal', name: 'Parietal lobe', color: '#38bdf8', pin: [255, 108],
          shape: `<path d="M 220 62 C 265 62, 300 70, 310 85 L 290 185 L 265 160 L 195 160 Z" fill="C"/>`,
          fact: 'Processes touch, temperature, pain and body position — home of the primary somatosensory cortex.' },
        { id: 'temporal', name: 'Temporal lobe', color: '#facc15', pin: [190, 200],
          shape: `<path d="M 118 190 L 195 160 L 265 160 L 272 200 C 240 228, 160 240, 120 225 C 108 215, 108 200, 118 190 Z" fill="C"/>`,
          fact: 'Hearing (primary auditory cortex), language comprehension (Wernicke’s area, usually left) and memory via the hippocampus.' },
        { id: 'occipital', name: 'Occipital lobe', color: '#34d399', pin: [322, 140],
          shape: `<path d="M 310 85 C 342 100, 358 135, 350 168 C 346 192, 334 208, 318 216 L 290 185 Z" fill="C"/>`,
          fact: 'Vision — contains the primary visual cortex, which receives input from the retinas.' },
        { id: 'brainstem', name: 'Brainstem', color: '#fb923c', pin: [231, 272],
          shape: `<path d="M 208 206 L 252 206 L 257 250 L 252 316 L 214 316 L 206 250 Z" fill="C"/>`,
          fact: 'Midbrain, pons and medulla oblongata — controls breathing, heart rate and blood pressure, and links the brain to the spinal cord.' },
        { id: 'cerebellum', name: 'Cerebellum', color: '#a78bfa', pin: [308, 250],
          shape: `<ellipse cx="305" cy="248" rx="58" ry="34" fill="C"/>`,
          fact: 'Coordinates movement, balance and posture — its name means “little brain” in Latin.' }
    ],
    over: `<path d="M 262 232 Q 305 220 348 232 M 258 248 Q 305 238 352 248 M 262 264 Q 305 256 348 264" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.45"/>
           <path d="M 220 62 L 195 160 M 118 190 L 265 160" fill="none" stroke="#0f0f1a" stroke-width="3" opacity="0.5"/>`
},

// ------------------------------------------------------------------
// 3. SKELETON (anterior view)
// ------------------------------------------------------------------
{
    id: 'skeleton', title: 'The Skeleton', icon: '🦴', system: 'Skeletal', color: '#e2e8f0',
    viewBox: '0 0 300 630',
    base: `<rect x="10" y="10" width="280" height="610" rx="40" fill="#e2e8f0" opacity="0.04"/>`,
    parts: [
        { id: 'skull', name: 'Skull (cranium)', color: '#f1f5f9', pin: [150, 52],
          shape: `<ellipse cx="150" cy="54" rx="40" ry="46" fill="C"/>`,
          fact: 'The cranium’s 8 bones protect the brain; with the 14 facial bones they form the 22-bone skull.' },
        { id: 'mandible', name: 'Mandible', color: '#fbbf24', pin: [150, 104],
          shape: `<path d="M 116 82 L 184 82 L 178 114 Q 150 132 122 114 Z" fill="C"/>`,
          fact: 'The lower jaw — the largest, strongest facial bone and the skull’s only freely movable bone.' },
        { id: 'spine', name: 'Vertebral column', color: '#a78bfa', pin: [150, 262],
          shape: `<rect x="141" y="114" width="18" height="226" rx="7" fill="C"/>`,
          fact: '7 cervical, 12 thoracic and 5 lumbar vertebrae, plus the fused sacrum and coccyx.' },
        { id: 'clavicle', name: 'Clavicle', color: '#f472b6', pin: [116, 123],
          shape: `<path d="M 146 130 L 94 118 M 154 130 L 206 118" fill="none" stroke="C" stroke-width="22" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 146 130 L 94 118 M 154 130 L 206 118" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'The collarbone — the only bony link between the upper limb and the axial skeleton; one of the most commonly fractured bones.' },
        { id: 'sternum', name: 'Sternum', color: '#38bdf8', pin: [150, 168],
          shape: `<rect x="140" y="134" width="20" height="74" rx="7" fill="C"/>`,
          fact: 'The breastbone — manubrium, body and xiphoid process; the true ribs attach to it through costal cartilage.' },
        { id: 'ribs', name: 'Ribs', color: '#67e8f9', pin: [209, 185],
          shape: `<path d="M 160 140 Q 236 150 212 252 L 160 252 Z M 140 140 Q 64 150 88 252 L 140 252 Z" fill="C" opacity="0.001"/>
                  <path d="M 160 142 Q 222 148 214 170 M 160 158 Q 226 164 218 188 M 160 174 Q 228 180 220 206 M 160 190 Q 226 196 216 222 M 160 206 Q 220 212 208 236 M 160 222 Q 212 228 200 248
                           M 140 142 Q 78 148 86 170 M 140 158 Q 74 164 82 188 M 140 174 Q 72 180 80 206 M 140 190 Q 74 196 84 222 M 140 206 Q 80 212 92 236 M 140 222 Q 88 228 100 248" fill="none" stroke="C" stroke-width="7" stroke-linecap="round"/>`,
          fact: '12 pairs — 7 true ribs, 3 false ribs and 2 floating ribs — protect the heart and lungs.' },
        { id: 'humerus', name: 'Humerus', color: '#fb923c', pin: [80, 196],
          shape: `<path d="M 88 140 L 72 252 M 212 140 L 228 252" fill="none" stroke="C" stroke-width="17" stroke-linecap="round"/>`,
          fact: 'The upper-arm bone — meets the scapula at the shoulder and the radius and ulna at the elbow.' },
        { id: 'radius', name: 'Radius', color: '#f87171', pin: [58, 306],
          shape: `<path d="M 66 260 L 50 352 M 234 260 L 250 352" fill="none" stroke="C" stroke-width="10" stroke-linecap="round"/>`,
          fact: 'The lateral (thumb-side) forearm bone; it rotates around the ulna during pronation and supination.' },
        { id: 'ulna', name: 'Ulna', color: '#facc15', pin: [76, 306],
          shape: `<path d="M 82 260 L 70 352 M 218 260 L 230 352" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'The medial forearm bone; its olecranon process forms the point of the elbow.' },
        { id: 'hand', name: 'Hand bones', color: '#a3e635', pin: [60, 388],
          shape: `<ellipse cx="60" cy="392" rx="22" ry="28" fill="C" opacity="0.001"/><ellipse cx="240" cy="392" rx="22" ry="28" fill="C" opacity="0.001"/>
                  <ellipse cx="60" cy="368" rx="14" ry="11" fill="C"/><path d="M 48 376 L 42 410 M 56 378 L 54 414 M 64 378 L 66 414 M 72 376 L 78 408" fill="none" stroke="C" stroke-width="5" stroke-linecap="round"/>
                  <ellipse cx="240" cy="368" rx="14" ry="11" fill="C"/><path d="M 252 376 L 258 410 M 244 378 L 246 414 M 236 378 L 234 414 M 228 376 L 222 408" fill="none" stroke="C" stroke-width="5" stroke-linecap="round"/>`,
          fact: '8 carpals, 5 metacarpals and 14 phalanges — 27 bones in each hand.' },
        { id: 'pelvis', name: 'Pelvis', color: '#2dd4bf', pin: [150, 372],
          shape: `<path d="M 150 332 C 108 332, 94 352, 95 374 C 96 398, 118 410, 138 402 L 150 388 L 162 402 C 182 410, 204 398, 205 374 C 206 352, 192 332, 150 332 Z" fill="C"/>`,
          fact: 'Each hip bone is the fused ilium, ischium and pubis; with the sacrum and coccyx they form the bony pelvis.' },
        { id: 'femur', name: 'Femur', color: '#ec4899', pin: [124, 450],
          shape: `<path d="M 128 402 L 122 500 M 172 402 L 178 500" fill="none" stroke="C" stroke-width="17" stroke-linecap="round"/>`,
          fact: 'The thigh bone — the longest and strongest bone in the body.' },
        { id: 'patella', name: 'Patella', color: '#fde047', pin: [120, 509],
          shape: `<circle cx="120" cy="509" r="9" fill="C"/><circle cx="180" cy="509" r="9" fill="C"/>`,
          fact: 'The kneecap — the largest sesamoid bone, embedded in the quadriceps tendon.' },
        { id: 'tibia', name: 'Tibia', color: '#60a5fa', pin: [130, 560],
          shape: `<path d="M 126 522 L 132 602 M 174 522 L 168 602" fill="none" stroke="C" stroke-width="12" stroke-linecap="round"/>`,
          fact: 'The shin bone — the medial, weight-bearing bone of the lower leg.' },
        { id: 'fibula', name: 'Fibula', color: '#c084fc', pin: [112, 560],
          shape: `<path d="M 111 522 L 115 602 M 189 522 L 185 602" fill="none" stroke="C" stroke-width="7" stroke-linecap="round"/>`,
          fact: 'The slender lateral bone of the lower leg; it bears little body weight but stabilizes the ankle.' },
        { id: 'foot', name: 'Foot bones', color: '#34d399', pin: [122, 614],
          shape: `<ellipse cx="124" cy="614" rx="24" ry="9" fill="C"/><ellipse cx="176" cy="614" rx="24" ry="9" fill="C"/>`,
          fact: '7 tarsals, 5 metatarsals and 14 phalanges — 26 bones in each foot.' }
    ],
    over: `<path d="M 141 132 L 159 132 M 141 150 L 159 150 M 141 168 L 159 168 M 141 186 L 159 186 M 141 204 L 159 204 M 141 222 L 159 222 M 141 240 L 159 240 M 141 258 L 159 258 M 141 276 L 159 276 M 141 294 L 159 294 M 141 312 L 159 312" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.5"/>`
},

// ------------------------------------------------------------------
// 4. DIGESTIVE SYSTEM (anterior view)
// ------------------------------------------------------------------
{
    id: 'digestive', title: 'Digestive System', icon: '🍎', system: 'Digestive', color: '#f97316',
    viewBox: '0 0 360 530',
    base: `<rect x="20" y="20" width="320" height="500" rx="80" fill="#f97316" opacity="0.05"/>`,
    parts: [
        { id: 'esophagus', name: 'Esophagus', color: '#f472b6', pin: [180, 70],
          shape: `<path d="M 180 22 L 180 122" fill="none" stroke="C" stroke-width="20" stroke-linecap="round"/>`,
          fact: 'A muscular tube about 25 cm long that moves food from the pharynx to the stomach by peristalsis.' },
        { id: 'liver', name: 'Liver', color: '#ea580c', pin: [120, 148],
          shape: `<path d="M 60 130 C 60 110, 90 100, 150 108 L 215 128 L 205 165 C 170 185, 110 200, 70 180 C 55 170, 55 150, 60 130 Z" fill="C"/>`,
          fact: 'The largest internal organ — makes bile, stores glycogen and detoxifies blood arriving from the digestive tract.' },
        { id: 'gallbladder', name: 'Gallbladder', color: '#84cc16', pin: [122, 193],
          shape: `<ellipse cx="122" cy="192" rx="18" ry="11" fill="C" transform="rotate(-15 122 192)"/>`,
          fact: 'Stores and concentrates bile from the liver, releasing it into the duodenum to emulsify fats.' },
        { id: 'pancreas', name: 'Pancreas', color: '#facc15', pin: [262, 250],
          shape: `<path d="M 150 236 C 190 226, 250 228, 304 242 C 294 260, 230 262, 150 254 Z" fill="C"/>`,
          fact: 'Secretes digestive enzymes and bicarbonate into the duodenum, and insulin and glucagon into the blood.' },
        { id: 'stomach', name: 'Stomach', color: '#ec4899', pin: [240, 180],
          shape: `<path d="M 186 112 C 252 100, 302 136, 292 196 C 284 242, 232 264, 190 250 C 166 242, 156 214, 174 198 C 190 184, 180 150, 186 112 Z" fill="C"/>`,
          fact: 'Churns food with acid and pepsin into chyme; its lining secretes hydrochloric acid and intrinsic factor.' },
        { id: 'smallint', name: 'Small intestine', color: '#fb923c', pin: [190, 360],
          shape: `<path d="M 110 282 C 160 264, 240 264, 275 288 C 300 322, 290 400, 255 432 C 210 454, 150 452, 110 422 C 85 392, 85 312, 110 282 Z" fill="C"/>`,
          fact: 'Duodenum, jejunum and ileum — about 6 m long and the site of most digestion and nutrient absorption.' },
        { id: 'largeint', name: 'Large intestine', color: '#a855f7', pin: [92, 360],
          shape: `<path d="M 92 452 L 92 290 C 92 270, 105 268, 120 270 L 255 270 C 272 270, 282 278, 282 295 L 282 440 C 282 458, 268 470, 252 470 L 230 470 C 206 470, 196 480, 188 494" fill="none" stroke="C" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`,
          fact: 'Cecum, colon and rectum — absorbs water and electrolytes and forms feces.' },
        { id: 'appendix', name: 'Appendix', color: '#22d3ee', pin: [118, 487],
          shape: `<path d="M 100 464 L 122 492" fill="none" stroke="C" stroke-width="24" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 100 464 L 122 492" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'A small blind pouch off the cecum in the right lower quadrant — its inflammation is appendicitis.' },
        { id: 'rectum', name: 'Rectum', color: '#c084fc', pin: [184, 514],
          shape: `<path d="M 187 496 L 184 524" fill="none" stroke="C" stroke-width="20" stroke-linecap="round"/>`,
          fact: 'The final straight segment of the large intestine; it stores feces before elimination through the anal canal.' }
    ],
    over: `<path d="M 120 300 C 150 290, 170 310, 150 330 C 130 350, 160 370, 190 350 C 220 330, 240 360, 215 385 C 190 410, 150 400, 130 415" fill="none" stroke="#0f0f1a" stroke-width="2.5" opacity="0.4"/>`
},

// ------------------------------------------------------------------
// 5. EYE (horizontal section — the cornea faces left)
// ------------------------------------------------------------------
{
    id: 'eye', title: 'The Eye', icon: '👁️', system: 'Sensory', color: '#38bdf8',
    viewBox: '0 0 400 320',
    base: `<circle cx="200" cy="160" r="135" fill="#38bdf8" opacity="0.05"/>`,
    parts: [
        { id: 'opticnerve', name: 'Optic nerve', color: '#facc15', pin: [352, 178],
          shape: `<path d="M 300 166 L 380 184" fill="none" stroke="C" stroke-width="28" stroke-linecap="round"/>`,
          fact: 'Cranial nerve II — carries signals from the retina to the brain; where it leaves the eye there are no photoreceptors (the blind spot).' },
        { id: 'sclera', name: 'Sclera', color: '#e5e7eb', pin: [280, 92],
          shape: `<path d="M 103 104 A 112 112 0 1 1 103 216 L 115 209 A 98 98 0 1 0 115 111 Z" fill="C"/>`,
          fact: 'The tough white outer coat that protects the eye and anchors the extraocular muscles.' },
        { id: 'choroid', name: 'Choroid', color: '#dc2626', pin: [293, 152],
          shape: `<path d="M 115 111 A 98 98 0 1 1 115 209 L 124 204 A 88 88 0 1 0 124 116 Z" fill="C"/>`,
          fact: 'The vascular middle layer that nourishes the retina; its dark pigment absorbs stray light.' },
        { id: 'retina', name: 'Retina', color: '#f59e0b', pin: [272, 201],
          shape: `<path d="M 133 103 A 88 88 0 1 1 133 217 L 140 210 A 78 78 0 1 0 140 110 Z" fill="C"/>`,
          fact: 'The light-sensitive inner layer — rods for dim light, cones for color — that turns light into nerve signals.' },
        { id: 'vitreous', name: 'Vitreous body', color: '#0ea5e9', pin: [215, 160],
          shape: `<circle cx="200" cy="160" r="77" fill="C" opacity="0.55"/>`,
          fact: 'Clear gel filling the large posterior cavity; it keeps the eyeball’s shape and holds the retina in place.' },
        { id: 'ciliary', name: 'Ciliary body', color: '#a855f7', pin: [132, 120],
          shape: `<path d="M 118 108 L 142 120 L 138 132 L 122 124 Z" fill="C"/><path d="M 118 212 L 142 200 L 138 188 L 122 196 Z" fill="C"/>`,
          fact: 'Contains the ciliary muscle that reshapes the lens for focusing, and it produces the aqueous humor.' },
        { id: 'lens', name: 'Lens', color: '#fde68a', pin: [134, 160],
          shape: `<ellipse cx="134" cy="160" rx="13" ry="30" fill="C"/>`,
          fact: 'Changes shape (accommodation) to focus light on the retina; it stiffens with age, causing presbyopia.' },
        { id: 'iris', name: 'Iris', color: '#3b82f6', pin: [112, 126],
          shape: `<path d="M 104 108 L 118 112 L 118 141 L 108 143 Z" fill="C"/><path d="M 104 212 L 118 208 L 118 179 L 108 177 Z" fill="C"/>`,
          fact: 'The colored ring of muscle that changes pupil size to control how much light enters the eye.' },
        // Drawn near-black (it IS an opening), but chips/badges use `ui` so they stay readable.
        { id: 'pupil', name: 'Pupil', color: '#0b0b14', ui: '#94a3b8', pin: [112, 160],
          shape: `<rect x="105" y="142" width="14" height="36" fill="C"/>`,
          fact: 'The opening in the center of the iris — it looks black because the inside of the eye absorbs light.' },
        { id: 'cornea', name: 'Cornea', color: '#a5f3fc', pin: [74, 160],
          shape: `<path d="M 103 100 C 56 125, 56 195, 103 220 C 72 195, 72 125, 103 100 Z" fill="C" opacity="0.9"/>`,
          fact: 'The transparent front window of the eye — it does most of the eye’s light-bending (refraction).' }
    ],
    over: `<path d="M 134 128 L 136 120 M 134 192 L 136 200" fill="none" stroke="#a855f7" stroke-width="2"/>`
},

// ------------------------------------------------------------------
// 6. RESPIRATORY SYSTEM (anterior view)
// ------------------------------------------------------------------
{
    id: 'respiratory', title: 'Respiratory System', icon: '🫁', system: 'Respiratory', color: '#38bdf8',
    viewBox: '0 0 360 470',
    base: `<circle cx="180" cy="56" r="46" fill="#38bdf8" opacity="0.08"/><rect x="40" y="200" width="280" height="250" rx="90" fill="#38bdf8" opacity="0.05"/>
           <path d="M 258 160 L 300 128" fill="none" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="4 4" opacity="0.7"/>`,
    parts: [
        { id: 'nasal', name: 'Nasal cavity', color: '#f472b6', pin: [180, 48],
          shape: `<path d="M 162 32 L 198 32 L 204 62 L 156 62 Z" fill="C"/>`,
          fact: 'Warms, moistens and filters incoming air, and houses the olfactory receptors for smell.' },
        { id: 'pharynx', name: 'Pharynx', color: '#fb7185', pin: [180, 84],
          shape: `<path d="M 180 62 L 180 104" fill="none" stroke="C" stroke-width="22" stroke-linecap="round"/>`,
          fact: 'The throat — a shared passage for air and food, divided into nasopharynx, oropharynx and laryngopharynx.' },
        { id: 'larynx', name: 'Larynx', color: '#a78bfa', pin: [180, 118],
          shape: `<path d="M 164 104 L 196 104 L 202 132 L 158 132 Z" fill="C"/>`,
          fact: 'The voice box — holds the vocal folds; the epiglottis folds over it during swallowing.' },
        { id: 'trachea', name: 'Trachea', color: '#38bdf8', pin: [180, 175],
          shape: `<path d="M 180 132 L 180 218" fill="none" stroke="C" stroke-width="22" stroke-linecap="round"/>`,
          fact: 'The windpipe — about 10–12 cm long, held open by C-shaped rings of cartilage.' },
        { id: 'rlung', name: 'Right lung', color: '#ef4444', pin: [108, 330],
          shape: `<path d="M 160 232 C 110 227, 70 272, 65 342 C 60 392, 90 417, 150 412 L 165 402 C 150 352, 150 292, 160 232 Z" fill="C"/>`,
          fact: 'Three lobes — superior, middle and inferior — separated by the horizontal and oblique fissures.' },
        { id: 'llung', name: 'Left lung', color: '#ec4899', pin: [252, 330],
          shape: `<path d="M 200 232 C 250 227, 290 272, 295 342 C 300 392, 270 417, 210 412 L 196 402 C 202 382, 188 362, 206 342 C 212 302, 206 262, 200 232 Z" fill="C"/>`,
          fact: 'Two lobes, plus a cardiac notch on its medial side that makes room for the heart.' },
        // Bronchi are drawn after the lungs so they are seen entering each hilum.
        { id: 'rbronchus', name: 'Right primary bronchus', color: '#60a5fa', pin: [161, 242],
          shape: `<path d="M 180 218 L 142 266" fill="none" stroke="C" stroke-width="17" stroke-linecap="round"/>`,
          fact: 'Wider, shorter and more vertical than the left — so inhaled objects more often lodge on this side.' },
        { id: 'lbronchus', name: 'Left primary bronchus', color: '#818cf8', pin: [206, 238],
          shape: `<path d="M 180 218 L 232 258" fill="none" stroke="C" stroke-width="14" stroke-linecap="round"/>`,
          fact: 'Narrower and more horizontal than the right, because the heart sits toward the left.' },
        { id: 'diaphragm', name: 'Diaphragm', color: '#10b981', pin: [180, 405],
          shape: `<path d="M 55 428 Q 180 372 305 428" fill="none" stroke="C" stroke-width="15" stroke-linecap="round"/>`,
          fact: 'The dome-shaped muscle of breathing — it contracts and flattens to draw air into the lungs.' },
        { id: 'alveoli', name: 'Alveoli', color: '#c4b5fd', pin: [318, 92],
          shape: `<circle cx="318" cy="118" r="30" fill="C" opacity="0.001"/><circle cx="306" cy="108" r="11" fill="C"/><circle cx="328" cy="104" r="10" fill="C"/><circle cx="334" cy="124" r="10" fill="C"/><circle cx="314" cy="130" r="11" fill="C"/><circle cx="300" cy="126" r="8" fill="C"/>`,
          fact: 'Tiny air sacs — hundreds of millions per pair of lungs — where oxygen and carbon dioxide are exchanged with capillaries.' }
    ],
    over: `<path d="M 78 318 L 150 300 M 92 372 L 160 332" fill="none" stroke="#0f0f1a" stroke-width="2.5" opacity="0.45"/>
           <path d="M 270 372 L 210 332" fill="none" stroke="#0f0f1a" stroke-width="2.5" opacity="0.45"/>
           <path d="M 169 148 L 191 148 M 169 162 L 191 162 M 169 176 L 191 176 M 169 190 L 191 190 M 169 204 L 191 204" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.45"/>`
},

// ------------------------------------------------------------------
// 7. URINARY SYSTEM (anterior view)
// ------------------------------------------------------------------
{
    id: 'urinary', title: 'Urinary System', icon: '🫘', system: 'Urinary', color: '#f97316',
    viewBox: '0 0 360 470',
    base: `<rect x="30" y="20" width="300" height="440" rx="80" fill="#f97316" opacity="0.05"/>`,
    parts: [
        { id: 'aorta', name: 'Abdominal aorta', color: '#ef4444', pin: [194, 70],
          shape: `<path d="M 194 30 L 194 300" fill="none" stroke="C" stroke-width="18" stroke-linecap="round"/>`,
          fact: 'Delivers roughly a fifth to a quarter of the heart’s output to the kidneys through the renal arteries.' },
        { id: 'ivc', name: 'Inferior vena cava', color: '#3b82f6', pin: [166, 70],
          shape: `<path d="M 166 30 L 166 300" fill="none" stroke="C" stroke-width="20" stroke-linecap="round"/>`,
          fact: 'Carries filtered blood from the renal veins back toward the heart.' },
        { id: 'rkidney', name: 'Right kidney', color: '#f97316', pin: [92, 196],
          shape: `<path d="M 110 130 C 70 130, 60 170, 65 215 C 70 255, 105 265, 128 245 C 118 225, 118 165, 130 148 C 125 135, 118 130, 110 130 Z" fill="C"/>`,
          fact: 'Sits slightly lower than the left kidney because the liver takes up room above it.' },
        { id: 'lkidney', name: 'Left kidney', color: '#f59e0b', pin: [268, 180],
          shape: `<path d="M 250 115 C 290 115, 300 155, 295 200 C 290 240, 255 250, 232 230 C 242 210, 242 150, 230 133 C 235 120, 242 115, 250 115 Z" fill="C"/>`,
          fact: 'Each kidney holds about a million nephrons that filter blood and form urine.' },
        { id: 'adrenal', name: 'Adrenal glands', color: '#facc15', pin: [256, 110],
          shape: `<path d="M 92 128 L 120 118 L 128 134 Z" fill="C"/><path d="M 236 112 L 262 100 L 272 116 Z" fill="C"/>`,
          fact: 'Sit on top of each kidney — the cortex makes cortisol and aldosterone, the medulla makes adrenaline.' },
        { id: 'renalart', name: 'Renal arteries', color: '#f87171', pin: [216, 180],
          shape: `<path d="M 194 178 L 236 182 M 194 190 L 124 196" fill="none" stroke="C" stroke-width="8" stroke-linecap="round"/>`,
          fact: 'Branch from the abdominal aorta to bring unfiltered blood into each kidney.' },
        { id: 'renalvein', name: 'Renal veins', color: '#60a5fa', pin: [146, 206],
          shape: `<path d="M 124 208 L 166 204 M 236 194 L 166 194" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'Return filtered blood from the kidneys to the inferior vena cava.' },
        { id: 'ureter', name: 'Ureters', color: '#a3e635', pin: [140, 317],
          shape: `<path d="M 122 236 C 130 300, 150 340, 160 382 M 236 222 C 230 300, 210 340, 200 382" fill="none" stroke="C" stroke-width="24" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 122 236 C 130 300, 150 340, 160 382 M 236 222 C 230 300, 210 340, 200 382" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'Muscular tubes about 25–30 cm long that move urine from the renal pelvis to the bladder by peristalsis.' },
        { id: 'bladder', name: 'Urinary bladder', color: '#38bdf8', pin: [180, 396],
          shape: `<ellipse cx="180" cy="396" rx="50" ry="33" fill="C"/>`,
          fact: 'A muscular storage sac lined with transitional epithelium, which stretches as it fills with urine.' },
        { id: 'urethra', name: 'Urethra', color: '#818cf8', pin: [180, 446],
          shape: `<path d="M 180 430 L 180 458" fill="none" stroke="C" stroke-width="28" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 180 428 L 180 458" fill="none" stroke="C" stroke-width="13" stroke-linecap="round"/>`,
          fact: 'Carries urine out of the body — about 4 cm long in females and about 20 cm in males.' }
    ],
    over: ''
},

// ------------------------------------------------------------------
// 8. SKIN (cross-section)
// ------------------------------------------------------------------
{
    id: 'skin', title: 'The Skin', icon: '🧴', system: 'Integumentary', color: '#f59e0b',
    viewBox: '0 0 400 300',
    base: ``,
    parts: [
        { id: 'hypodermis', name: 'Hypodermis', color: '#fde047', pin: [60, 262],
          shape: `<rect x="20" y="200" width="360" height="90" rx="6" fill="C"/>`,
          fact: 'The subcutaneous fat layer — insulates, cushions and anchors the skin to underlying tissue; not technically part of the skin.' },
        { id: 'dermis', name: 'Dermis', color: '#f472b6', pin: [60, 140],
          shape: `<rect x="20" y="74" width="360" height="128" fill="C"/>`,
          fact: 'Dense connective tissue rich in collagen and elastin; holds the blood vessels, nerves, glands and follicles.' },
        { id: 'epidermis', name: 'Epidermis', color: '#f59e0b', pin: [60, 58],
          shape: `<path d="M 20 44 L 380 44 L 380 70 Q 350 82 320 70 Q 290 58 260 70 Q 230 82 200 70 Q 170 58 140 70 Q 110 82 80 70 Q 50 58 20 70 Z" fill="C"/>`,
          fact: 'The outer layer of keratinized stratified squamous epithelium; it has no blood vessels and is fed by the dermis beneath it.' },
        { id: 'vessels', name: 'Blood vessels', color: '#ef4444', pin: [321, 238],
          shape: `<path d="M 318 288 C 328 220, 308 160, 328 96 M 346 288 C 356 220, 336 160, 354 96" fill="none" stroke="C" stroke-width="22" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 318 288 C 328 220, 308 160, 328 96" fill="none" stroke="C" stroke-width="7" stroke-linecap="round"/><path d="M 346 288 C 356 220, 336 160, 354 96" fill="none" stroke="#3b82f6" stroke-width="7" stroke-linecap="round"/>`,
          fact: 'Dermal arterioles and venules nourish the skin and help regulate body temperature by dilating or constricting.' },
        { id: 'nerve', name: 'Sensory nerve', color: '#fef08a', pin: [198, 247],
          shape: `<path d="M 200 290 C 190 240, 212 200, 198 150 C 194 120, 206 100, 200 84" fill="none" stroke="C" stroke-width="22" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 200 290 C 190 240, 212 200, 198 150 C 194 120, 206 100, 200 84" fill="none" stroke="C" stroke-width="5" stroke-linecap="round"/><ellipse cx="200" cy="82" rx="7" ry="10" fill="C"/>`,
          fact: 'Nerve endings and receptors in the skin detect touch, pressure, pain and temperature.' },
        { id: 'sweat', name: 'Sweat gland', color: '#22d3ee', pin: [254, 182],
          shape: `<path d="M 262 52 C 256 100, 272 130, 258 164" fill="none" stroke="C" stroke-width="20" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 262 52 C 256 100, 272 130, 258 164" fill="none" stroke="C" stroke-width="5" stroke-linecap="round"/><circle cx="254" cy="182" r="20" fill="C"/>`,
          fact: 'Eccrine glands release watery sweat onto the surface so evaporation can cool the body.' },
        { id: 'follicle', name: 'Hair follicle', color: '#c084fc', pin: [129, 150],
          shape: `<path d="M 108 74 L 102 186 C 100 204, 136 204, 134 186 L 128 74 Z" fill="C"/>`,
          fact: 'A tube of epidermal cells that reaches into the dermis; the bulb at its base grows the hair.' },
        { id: 'hair', name: 'Hair shaft', color: '#e2e8f0', pin: [113, 26],
          shape: `<path d="M 118 190 L 118 44 L 108 6" fill="none" stroke="C" stroke-width="12" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 118 190 L 118 44 L 108 6" fill="none" stroke="C" stroke-width="6" stroke-linecap="round"/>`,
          fact: 'The visible part of the hair — dead, keratinized cells pushed up out of the follicle.' },
        { id: 'sebaceous', name: 'Sebaceous gland', color: '#a3e635', pin: [146, 114],
          shape: `<circle cx="144" cy="112" r="12" fill="C"/><circle cx="154" cy="124" r="10" fill="C"/>`,
          fact: 'An oil gland attached to the follicle; its sebum lubricates hair and skin and slows bacterial growth.' },
        { id: 'arrector', name: 'Arrector pili muscle', color: '#ef4444', pin: [162, 127],
          shape: `<path d="M 134 170 L 190 84" fill="none" stroke="C" stroke-width="20" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 134 170 L 190 84" fill="none" stroke="C" stroke-width="6" stroke-linecap="round"/>`,
          fact: 'A tiny smooth muscle that pulls the hair upright — the cause of goosebumps when you are cold or scared.' }
    ],
    over: `<circle cx="60" cy="235" r="14" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.35"/><circle cx="92" cy="262" r="16" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.35"/><circle cx="150" cy="250" r="15" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.35"/><circle cx="290" cy="248" r="16" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.35"/><circle cx="380" cy="260" r="14" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.35"/>`
},

// ------------------------------------------------------------------
// 9. MUSCLES (anterior superficial)
// ------------------------------------------------------------------
{
    id: 'muscles', title: 'Major Muscles', icon: '💪', system: 'Muscular', color: '#ef4444',
    viewBox: '0 0 300 620',
    base: `<ellipse cx="150" cy="58" rx="36" ry="44" fill="#2d2d44"/><rect x="134" y="94" width="32" height="40" fill="#2d2d44"/>
           <path d="M 92 136 C 60 150, 60 200, 76 290 C 80 330, 72 360, 68 395 L 92 398 L 102 320 L 110 325 L 104 480 L 108 600 L 134 600 L 148 480 L 152 480 L 166 600 L 192 600 L 196 480 L 190 325 L 198 320 L 208 398 L 232 395 C 228 360, 220 330, 224 290 C 240 200, 240 150, 208 136 Z" fill="#2d2d44"/>`,
    parts: [
        { id: 'scm', name: 'Sternocleidomastoid', color: '#f472b6', pin: [130, 114],
          shape: `<path d="M 138 92 L 124 130 M 162 92 L 176 130" fill="none" stroke="C" stroke-width="20" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 138 92 L 124 130 M 162 92 L 176 130" fill="none" stroke="C" stroke-width="8" stroke-linecap="round"/>`,
          fact: 'Runs from the sternum and clavicle to the mastoid process; it turns the head and flexes the neck.' },
        { id: 'trapezius', name: 'Trapezius', color: '#c084fc', pin: [112, 126],
          shape: `<path d="M 148 108 L 92 136 L 100 146 L 150 122 Z" fill="C"/><path d="M 152 108 L 208 136 L 200 146 L 150 122 Z" fill="C"/>`,
          fact: 'The large upper-back muscle that elevates, retracts and rotates the scapula — the “shrug” muscle.' },
        { id: 'deltoid', name: 'Deltoid', color: '#fb923c', pin: [92, 170],
          shape: `<path d="M 104 140 C 80 146, 72 172, 80 204 L 100 194 C 108 168, 114 152, 120 142 Z" fill="C"/><path d="M 196 140 C 220 146, 228 172, 220 204 L 200 194 C 192 168, 186 152, 180 142 Z" fill="C"/>`,
          fact: 'The rounded shoulder cap; its middle fibers abduct the arm. A common intramuscular injection site.' },
        { id: 'pecs', name: 'Pectoralis major', color: '#ef4444', pin: [128, 172],
          shape: `<path d="M 150 140 L 120 142 C 106 160, 104 186, 120 200 C 136 206, 150 202, 150 196 Z" fill="C"/><path d="M 150 140 L 180 142 C 194 160, 196 186, 180 200 C 164 206, 150 202, 150 196 Z" fill="C"/>`,
          fact: 'The fan-shaped chest muscle that adducts, flexes and medially rotates the arm.' },
        { id: 'biceps', name: 'Biceps brachii', color: '#f59e0b', pin: [90, 238],
          shape: `<path d="M 86 208 C 78 232, 76 256, 84 276 L 100 274 C 104 252, 104 226, 98 204 Z" fill="C"/><path d="M 214 208 C 222 232, 224 256, 216 276 L 200 274 C 196 252, 196 226, 202 204 Z" fill="C"/>`,
          fact: 'The two-headed muscle of the front upper arm; it flexes the elbow and supinates the forearm.' },
        { id: 'rectus', name: 'Rectus abdominis', color: '#10b981', pin: [150, 262],
          shape: `<rect x="132" y="206" width="36" height="110" rx="8" fill="C"/>`,
          fact: 'The “six-pack” — flexes the trunk and compresses the abdomen; tendinous intersections create its segments.' },
        { id: 'oblique', name: 'External oblique', color: '#14b8a6', pin: [116, 262],
          shape: `<path d="M 118 206 L 130 206 L 130 316 L 112 302 C 104 272, 106 236, 118 206 Z" fill="C"/><path d="M 182 206 L 170 206 L 170 316 L 188 302 C 196 272, 194 236, 182 206 Z" fill="C"/>`,
          fact: 'The outermost side-abdominal muscle; its fibers run like hands in front pockets. Rotates and flexes the trunk.' },
        { id: 'quads', name: 'Quadriceps femoris', color: '#a855f7', pin: [112, 440],
          shape: `<path d="M 110 332 C 100 382, 100 442, 112 482 L 140 482 C 150 442, 150 382, 140 336 Z" fill="C"/><path d="M 190 332 C 200 382, 200 442, 188 482 L 160 482 C 150 442, 150 382, 160 336 Z" fill="C"/>`,
          fact: 'The four-headed front-thigh muscle that extends the knee; its rectus femoris head also flexes the hip.' },
        { id: 'sartorius', name: 'Sartorius', color: '#38bdf8', pin: [125, 398],
          shape: `<path d="M 108 326 C 118 380, 132 420, 142 472 M 192 326 C 182 380, 168 420, 158 472" fill="none" stroke="C" stroke-width="16" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 108 326 C 118 380, 132 420, 142 472 M 192 326 C 182 380, 168 420, 158 472" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>`,
          fact: 'The longest muscle in the body — the “tailor’s muscle” used when crossing the legs.' },
        { id: 'tibant', name: 'Tibialis anterior', color: '#84cc16', pin: [118, 550],
          shape: `<path d="M 112 500 C 106 530, 108 570, 118 600 L 132 598 C 130 560, 128 525, 126 500 Z" fill="C"/><path d="M 188 500 C 194 530, 192 570, 182 600 L 168 598 C 170 560, 172 525, 174 500 Z" fill="C"/>`,
          fact: 'Runs down the front of the shin; it dorsiflexes and inverts the foot — weakness causes foot drop.' }
    ],
    over: `<path d="M 132 234 L 168 234 M 132 262 L 168 262 M 132 290 L 168 290 M 150 206 L 150 316" fill="none" stroke="#0f0f1a" stroke-width="2.5" opacity="0.5"/>`
},

// ------------------------------------------------------------------
// 10. ANIMAL CELL
// ------------------------------------------------------------------
{
    id: 'cell', title: 'The Animal Cell', icon: '🔬', system: 'Cytology', color: '#38bdf8',
    viewBox: '0 0 400 360',
    base: ``,
    parts: [
        { id: 'membrane', name: 'Plasma membrane', color: '#38bdf8', pin: [200, 24],
          shape: `<path fill-rule="evenodd" d="M 15 180 a 185 160 0 1 0 370 0 a 185 160 0 1 0 -370 0 Z M 27 180 a 173 148 0 1 0 346 0 a 173 148 0 1 0 -346 0 Z" fill="C"/>`,
          fact: 'A phospholipid bilayer with embedded proteins; it selectively controls what enters and leaves the cell.' },
        { id: 'cytoplasm', name: 'Cytoplasm', color: '#0891b2', pin: [62, 180],
          shape: `<ellipse cx="200" cy="180" rx="173" ry="148" fill="C" opacity="0.35"/>`,
          fact: 'The gel-like cytosol plus the organelles suspended in it; glycolysis and most metabolic reactions happen here.' },
        { id: 'nucleus', name: 'Nucleus', color: '#8b5cf6', pin: [192, 200],
          shape: `<circle cx="170" cy="172" r="56" fill="C"/>`,
          fact: 'The control center holding the cell’s DNA, wrapped in a double-membrane nuclear envelope with pores.' },
        { id: 'nucleolus', name: 'Nucleolus', color: '#d946ef', pin: [158, 164],
          shape: `<circle cx="158" cy="164" r="17" fill="C"/>`,
          fact: 'The dense body inside the nucleus that assembles ribosomal subunits.' },
        { id: 'rer', name: 'Rough ER', color: '#ec4899', pin: [258, 176],
          shape: `<path d="M 234 118 C 266 128, 268 150, 240 158 C 268 166, 272 190, 242 198 C 270 208, 268 230, 240 240" fill="none" stroke="C" stroke-width="9" stroke-linecap="round"/>
                  <circle cx="246" cy="124" r="3.5" fill="C"/><circle cx="262" cy="140" r="3.5" fill="C"/><circle cx="256" cy="178" r="3.5" fill="C"/><circle cx="266" cy="200" r="3.5" fill="C"/><circle cx="256" cy="230" r="3.5" fill="C"/>`,
          fact: 'A membrane network studded with ribosomes; it makes and folds proteins destined for secretion or membranes.' },
        { id: 'ser', name: 'Smooth ER', color: '#fb7185', pin: [88, 175],
          shape: `<path d="M 104 150 C 82 160, 82 190, 104 200 C 86 206, 86 228, 106 236" fill="none" stroke="C" stroke-width="22" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 104 150 C 82 160, 82 190, 104 200 C 86 206, 86 228, 106 236" fill="none" stroke="C" stroke-width="8" stroke-linecap="round"/>`,
          fact: 'No ribosomes — synthesizes lipids and steroids, detoxifies drugs, and stores calcium in muscle cells.' },
        { id: 'golgi', name: 'Golgi apparatus', color: '#f59e0b', pin: [318, 108],
          shape: `<path d="M 290 106 Q 324 110 340 134" fill="none" stroke="C" stroke-width="54" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 282 86 Q 318 90 336 112 M 288 100 Q 322 104 340 126 M 294 114 Q 326 118 344 140 M 300 128 Q 330 132 346 154" fill="none" stroke="C" stroke-width="7" stroke-linecap="round"/>`,
          fact: 'Stacked flattened sacs that modify, sort and package proteins into vesicles — the cell’s post office.' },
        { id: 'mito', name: 'Mitochondria', color: '#f97316', pin: [120, 94],
          shape: `<ellipse cx="120" cy="92" rx="36" ry="17" fill="C" transform="rotate(-20 120 92)"/><ellipse cx="300" cy="258" rx="36" ry="17" fill="C" transform="rotate(25 300 258)"/>`,
          fact: 'The cell’s power plants — make most of its ATP by aerobic respiration, and carry their own DNA.' },
        { id: 'lysosome', name: 'Lysosomes', color: '#84cc16', pin: [70, 258],
          shape: `<circle cx="70" cy="258" r="10" fill="C"/><circle cx="238" cy="300" r="9" fill="C"/>`,
          fact: 'Enzyme-filled sacs that digest worn-out organelles, debris and invading pathogens.' },
        { id: 'ribosomes', name: 'Ribosomes', color: '#fde047', pin: [184, 296],
          shape: `<circle cx="184" cy="290" r="24" fill="C" opacity="0.001"/><circle cx="172" cy="280" r="3.5" fill="C"/><circle cx="186" cy="276" r="3.5" fill="C"/><circle cx="196" cy="290" r="3.5" fill="C"/><circle cx="178" cy="296" r="3.5" fill="C"/><circle cx="190" cy="304" r="3.5" fill="C"/><circle cx="166" cy="304" r="3.5" fill="C"/>`,
          fact: 'Protein factories built from rRNA and protein — free in the cytosol or attached to the rough ER.' },
        { id: 'centrioles', name: 'Centrioles', color: '#2dd4bf', pin: [114, 300],
          shape: `<circle cx="112" cy="300" r="20" fill="C" opacity="0.001"/><rect x="98" y="296" width="22" height="7" rx="2" fill="C"/><rect x="118" y="286" width="7" height="22" rx="2" fill="C"/>`,
          fact: 'A pair of microtubule cylinders near the nucleus that organize the spindle during cell division.' }
    ],
    over: `<circle cx="170" cy="172" r="56" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.5"/>
           <path d="M 100 92 Q 110 84 118 92 Q 126 100 134 92" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.5" transform="rotate(-20 120 92)"/>
           <path d="M 280 258 Q 290 250 298 258 Q 306 266 314 258" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.5" transform="rotate(25 300 258)"/>`
},

// ------------------------------------------------------------------
// 11. NEURON
// ------------------------------------------------------------------
{
    id: 'neuron', title: 'The Neuron', icon: '⚡', system: 'Nervous', color: '#a78bfa',
    viewBox: '0 0 440 260',
    base: ``,
    parts: [
        { id: 'dendrites', name: 'Dendrites', color: '#a78bfa', pin: [64, 92],
          shape: `<path d="M 78 112 L 50 72 M 50 72 L 28 56 M 50 72 L 46 44 M 84 150 L 46 186 M 46 186 L 20 182 M 46 186 L 42 212 M 70 128 L 24 126 M 24 126 L 10 112" fill="none" stroke="C" stroke-width="20" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 78 112 L 50 72 M 50 72 L 28 56 M 50 72 L 46 44 M 84 150 L 46 186 M 46 186 L 20 182 M 46 186 L 42 212 M 70 128 L 24 126 M 24 126 L 10 112" fill="none" stroke="C" stroke-width="6" stroke-linecap="round"/>`,
          fact: 'Branched extensions that receive signals from other neurons and carry them toward the cell body.' },
        { id: 'soma', name: 'Cell body (soma)', color: '#ec4899', pin: [96, 104],
          shape: `<circle cx="96" cy="130" r="37" fill="C"/>`,
          fact: 'Holds the nucleus and organelles, and integrates the incoming signals.' },
        { id: 'nucleus', name: 'Nucleus', color: '#fde047', pin: [96, 132],
          shape: `<circle cx="96" cy="130" r="14" fill="C"/>`,
          fact: 'Contains the neuron’s DNA and directs its protein synthesis.' },
        { id: 'hillock', name: 'Axon hillock', color: '#f97316', pin: [141, 130],
          shape: `<path d="M 128 116 L 154 124 L 154 136 L 128 144 Z" fill="C"/>`,
          fact: 'Where the axon leaves the cell body — the trigger zone where action potentials are generated.' },
        { id: 'axon', name: 'Axon', color: '#38bdf8', pin: [165, 130],
          shape: `<path d="M 160 130 L 372 130" fill="none" stroke="C" stroke-width="26" opacity="0.001" stroke-linecap="butt"/>
                  <path d="M 154 130 L 372 130" fill="none" stroke="C" stroke-width="8" stroke-linecap="round"/>`,
          fact: 'A single long fiber that conducts action potentials away from the cell body.' },
        { id: 'myelin', name: 'Myelin sheath', color: '#f59e0b', pin: [194, 130],
          shape: `<rect x="176" y="118" width="36" height="24" rx="12" fill="C"/><rect x="222" y="118" width="36" height="24" rx="12" fill="C"/><rect x="268" y="118" width="36" height="24" rx="12" fill="C"/><rect x="314" y="118" width="36" height="24" rx="12" fill="C"/>`,
          fact: 'Fatty insulation made by Schwann cells (PNS) or oligodendrocytes (CNS); it greatly speeds conduction.' },
        { id: 'node', name: 'Node of Ranvier', color: '#67e8f9', pin: [263, 130],
          shape: `<rect x="208" y="108" width="18" height="44" fill="C" opacity="0.001"/><rect x="254" y="108" width="18" height="44" fill="C" opacity="0.001"/><rect x="300" y="108" width="18" height="44" fill="C" opacity="0.001"/>
                  <path d="M 217 116 L 217 144 M 263 116 L 263 144 M 309 116 L 309 144" fill="none" stroke="C" stroke-width="3" stroke-linecap="round"/>`,
          fact: 'Gaps in the myelin where the impulse jumps from node to node — saltatory conduction.' },
        { id: 'terminals', name: 'Axon terminals', color: '#10b981', pin: [406, 168],
          shape: `<path d="M 372 130 L 402 96 M 372 130 L 410 130 M 372 130 L 402 164" fill="none" stroke="C" stroke-width="20" opacity="0.001" stroke-linecap="round"/>
                  <path d="M 372 130 L 402 96 M 372 130 L 410 130 M 372 130 L 402 164" fill="none" stroke="C" stroke-width="6" stroke-linecap="round"/><circle cx="406" cy="92" r="8" fill="C"/><circle cx="414" cy="130" r="8" fill="C"/><circle cx="406" cy="168" r="8" fill="C"/>`,
          fact: 'End branches that release neurotransmitters into the synapse to signal the next cell.' }
    ],
    over: ''
},

// ------------------------------------------------------------------
// 12. LONG BONE (longitudinal section)
// ------------------------------------------------------------------
{
    id: 'longbone', title: 'A Long Bone', icon: '🦴', system: 'Skeletal', color: '#f472b6',
    viewBox: '0 0 220 520',
    base: ``,
    parts: [
        { id: 'epiphysis', name: 'Epiphysis', color: '#f472b6', pin: [168, 86],
          shape: `<ellipse cx="110" cy="62" rx="70" ry="48" fill="C"/><ellipse cx="110" cy="458" rx="70" ry="48" fill="C"/>`,
          fact: 'The expanded end of a long bone, filled with spongy bone and red marrow.' },
        { id: 'spongy', name: 'Spongy bone', color: '#fda4af', pin: [110, 64],
          shape: `<ellipse cx="110" cy="64" rx="50" ry="32" fill="C"/><ellipse cx="110" cy="456" rx="50" ry="32" fill="C"/>`,
          fact: 'Cancellous bone — a light, strong lattice of trabeculae that houses red marrow.' },
        { id: 'cartilage', name: 'Articular cartilage', color: '#67e8f9', pin: [110, 26],
          shape: `<path d="M 50 54 Q 110 2 170 54" fill="none" stroke="C" stroke-width="11" stroke-linecap="round"/><path d="M 50 466 Q 110 518 170 466" fill="none" stroke="C" stroke-width="11" stroke-linecap="round"/>`,
          fact: 'Hyaline cartilage covering the joint surfaces; it reduces friction and absorbs shock.' },
        { id: 'epiline', name: 'Epiphyseal line', color: '#facc15', pin: [110, 110],
          shape: `<rect x="46" y="104" width="128" height="7" fill="C"/><rect x="46" y="409" width="128" height="7" fill="C"/>`,
          fact: 'The remnant of the growth plate, which closes when bone growth ends in late adolescence.' },
        { id: 'metaphysis', name: 'Metaphysis', color: '#fb923c', pin: [110, 130],
          shape: `<path d="M 50 111 L 170 111 L 140 152 L 80 152 Z" fill="C"/><path d="M 80 368 L 140 368 L 170 409 L 50 409 Z" fill="C"/>`,
          fact: 'The flared zone between epiphysis and diaphysis where a child’s bone grows in length.' },
        { id: 'periosteum', name: 'Periosteum', color: '#a3e635', pin: [71, 260],
          shape: `<rect x="66" y="152" width="10" height="216" fill="C"/>`,
          fact: 'The fibrous outer membrane with bone-forming cells, nerves and vessels; tendons and ligaments anchor to it.' },
        { id: 'diaphysis', name: 'Diaphysis', color: '#e5e7eb', pin: [94, 200],
          shape: `<rect x="76" y="152" width="34" height="216" fill="C"/>`,
          fact: 'The shaft — a tube of thick compact bone around the medullary cavity.' },
        { id: 'medullary', name: 'Medullary cavity', color: '#fde047', pin: [123, 300],
          shape: `<rect x="110" y="152" width="26" height="216" fill="C"/>`,
          fact: 'The hollow center of the shaft, filled with yellow (fatty) marrow in adults.' },
        { id: 'compact', name: 'Compact bone', color: '#f1f5f9', pin: [146, 240],
          shape: `<rect x="136" y="152" width="18" height="216" fill="C"/>`,
          fact: 'Dense cortical bone built from osteons (Haversian systems); it gives strength and resists bending.' }
    ],
    over: `<path d="M 70 50 L 90 78 M 90 50 L 110 80 M 110 46 L 130 78 M 130 50 L 150 76 M 80 70 L 100 90 M 120 70 L 140 90
                  M 70 444 L 90 472 M 90 444 L 110 474 M 110 440 L 130 472 M 130 444 L 150 470 M 80 464 L 100 484 M 120 464 L 140 484" fill="none" stroke="#0f0f1a" stroke-width="1.5" opacity="0.4"/>
           <path d="M 110 152 L 110 368" fill="none" stroke="#0f0f1a" stroke-width="2" opacity="0.5"/>`
}
];
