// ============================================
// MEDICAL CODING DATA - UPDATEABLE MODULE
// Last Updated: January 2026
// Version: 2026.1 (Q1)
// ============================================

const CODING_UPDATES = {
    lastUpdated: '2026-01-04',
    version: '2026.1',
    changelog: [
        { date: '2026-01-04', version: '2026.1', changes: ['Initial 2026 guidelines added'] }
    ],
    upcomingChanges: [
        { effectiveDate: '2026-04-01', description: 'Q2 HCPCS updates', source: 'CMS' },
        { effectiveDate: '2026-10-01', description: 'FY2027 ICD-10 updates', source: 'CMS' }
    ]
};

const MEDICAL_CODING_CATEGORY = {
    id: "medical-coding",
    name: "Medical Coding",
    icon: "🏥",
    color: "#0ea5e9",
    description: "ICD-10, CPT, HCPCS, and PCS coding guidelines",
    updateInfo: CODING_UPDATES,
    books: [
        {
            id: "icd10-cm-2026",
            title: "ICD-10-CM 2026 Guidelines",
            author: "CMS/NCHS",
            description: "Complete guide to ICD-10-CM diagnosis coding for 2026",
            lessons: 12,
            duration: 161,
            progress: 0,
            category: "medical-coding",
            featured: true,
            version: "2026",
            effectiveDate: "2025-10-01",
            lessonList: [
                {
                    id: 1,
                    title: "Introduction to ICD-10-CM",
                    duration: 15,
                    completed: false,
                    cards: [
                        // CARD 1: VISUAL ANALOGY - Making it relatable
                        {
                            type: "intro",
                            title: "Think of ICD-10-CM Like a Universal Translator",
                            content: "Imagine every doctor in the world speaking a different language. One says 'the patient has a broken leg,' another writes it in medical Latin, another uses shorthand. How would hospitals, insurance companies, and researchers ever communicate?\n\nICD-10-CM is the universal translator. It converts every possible medical condition into a standardized code that everyone understands. When a doctor in Texas writes E11.9, a coder in New York, an insurance company in California, and a researcher in Florida all know exactly what it means: Type 2 diabetes without complications.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>

                                    <!-- Title -->
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">THE UNIVERSAL MEDICAL TRANSLATOR</text>

                                    <!-- Different inputs on left -->
                                    <rect x="55" y="157" width="275" height="110" rx="19" fill="rgba(239,68,68,0.2)" stroke="#ef4444"/>
                                    <text x="192" y="226" text-anchor="middle" fill="#fff" font-size="25">"Broken leg"</text>

                                    <rect x="55" y="298" width="275" height="110" rx="19" fill="rgba(245,158,11,0.2)" stroke="#f59e0b"/>
                                    <text x="192" y="367" text-anchor="middle" fill="#fff" font-size="25">"Fractura femoris"</text>

                                    <rect x="55" y="440" width="275" height="110" rx="19" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
                                    <text x="192" y="509" text-anchor="middle" fill="#fff" font-size="25">"Fx R femur"</text>

                                    <rect x="55" y="581" width="275" height="110" rx="19" fill="rgba(139,92,246,0.2)" stroke="#8b5cf6"/>
                                    <text x="192" y="650" text-anchor="middle" fill="#fff" font-size="25">"骨折" (Japanese)</text>

                                    <!-- Arrows to center -->
                                    <path d="M343 210 L440 408" stroke="#ef4444" stroke-width="7"/>
                                    <path d="M343 352 L440 408" stroke="#f59e0b" stroke-width="7"/>
                                    <path d="M343 493 L440 455" stroke="#10b981" stroke-width="7"/>
                                    <path d="M343 634 L440 502" stroke="#8b5cf6" stroke-width="7"/>

                                    <!-- Central ICD-10-CM box -->
                                    <rect x="440" y="314" width="220" height="251" rx="39" fill="rgba(14,165,233,0.3)" stroke="#0ea5e9" stroke-width="12"/>
                                    <text x="550" y="424" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">ICD-10-CM</text>
                                    <text x="550" y="487" text-anchor="middle" fill="#fff" font-size="25">TRANSLATOR</text>

                                    <!-- Arrow to output -->
                                    <path d="M673 440 L770 440" stroke="#0ea5e9" stroke-width="12" marker-end="url(#arrow)"/>
                                    <defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#0ea5e9"/></marker></defs>

                                    <!-- Universal output -->
                                    <rect x="770" y="330" width="275" height="220" rx="33" fill="rgba(14,165,233,0.4)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="907" y="408" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">S72.001A</text>
                                    <text x="907" y="471" text-anchor="middle" fill="#fff" font-size="25">Everyone</text>
                                    <text x="907" y="509" text-anchor="middle" fill="#fff" font-size="25">understands!</text>

                                    <!-- Bottom icons showing who uses it -->
                                    <rect x="110" y="770" width="880" height="141" rx="26" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="823" text-anchor="middle" fill="#888" font-size="25">WHO USES THESE CODES?</text>

                                    <text x="220" y="886" text-anchor="middle" fill="#fff" font-size="42"></text>
                                    <text x="385" y="886" text-anchor="middle" fill="#fff" font-size="42"></text>
                                    <text x="550" y="886" text-anchor="middle" fill="#fff" font-size="42"></text>
                                    <text x="715" y="886" text-anchor="middle" fill="#fff" font-size="42"></text>
                                    <text x="880" y="886" text-anchor="middle" fill="#fff" font-size="42"></text>
                                </svg>`,
                                caption: "ICD-10-CM turns any medical description into a universal code"
                            }
                        },

                        // CARD 2: INFOGRAPHIC - Key Statistics
                        {
                            type: "visual",
                            title: "ICD-10-CM By The Numbers",
                            content: "Before we dive deep, let's understand the scale of this coding system. These numbers show why ICD-10-CM is such a powerful tool for modern healthcare.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">ICD-10-CM BY THE NUMBERS</text>

                                    <!-- Big number 1 -->
                                    <rect x="68" y="157" width="453" height="251" rx="33" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="294" y="282" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">70,000+</text>
                                    <text x="294" y="361" text-anchor="middle" fill="#fff" font-size="25">Diagnosis Codes</text>

                                    <!-- Big number 2 -->
                                    <rect x="577" y="157" width="453" height="251" rx="33" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="803" y="282" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">21</text>
                                    <text x="803" y="361" text-anchor="middle" fill="#fff" font-size="25">Chapters</text>

                                    <!-- Big number 3 -->
                                    <rect x="68" y="455" width="453" height="251" rx="33" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="294" y="581" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">3-7</text>
                                    <text x="294" y="660" text-anchor="middle" fill="#fff" font-size="25">Characters Per Code</text>

                                    <!-- Big number 4 -->
                                    <rect x="577" y="455" width="453" height="251" rx="33" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="803" y="581" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">Oct 1</text>
                                    <text x="803" y="660" text-anchor="middle" fill="#fff" font-size="25">Annual Update Date</text>

                                    <!-- Timeline showing evolution -->
                                    <rect x="68" y="770" width="962" height="188" rx="26" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9"/>
                                    <text x="550" y="832" text-anchor="middle" fill="#0ea5e9" font-size="25">EVOLUTION OF DETAIL</text>

                                    <!-- Timeline dots -->
                                    <circle cx="220" cy="895" r="30" fill="rgba(107,114,128,0.3)" stroke="#888"/>
                                    <text x="220" y="908" text-anchor="middle" fill="#fff" font-size="25">13K</text>
                                    <text x="220" y="958" text-anchor="middle" fill="#888" font-size="25">ICD-9</text>

                                    <line x1="275" y1="895" x2="453" y2="895" stroke="#888" stroke-width="7" stroke-dasharray="4"/>

                                    <circle cx="550" cy="895" r="41" fill="rgba(14,165,233,0.3)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="908" text-anchor="middle" fill="#fff" font-size="25">70K</text>
                                    <text x="550" y="958" text-anchor="middle" fill="#0ea5e9" font-size="25">ICD-10</text>

                                    <line x1="618" y1="895" x2="770" y2="895" stroke="#888" stroke-width="7" stroke-dasharray="4"/>

                                    <circle cx="880" cy="895" r="30" fill="rgba(16,185,129,0.3)" stroke="#10b981"/>
                                    <text x="880" y="908" text-anchor="middle" fill="#fff" font-size="25">???</text>
                                    <text x="880" y="958" text-anchor="middle" fill="#888" font-size="25">ICD-11</text>
                                </svg>`,
                                caption: "The expansion from ICD-9 to ICD-10 increased codes by over 5x"
                            }
                        },

                        // CARD 3: COLOR-CODED BREAKDOWN - Code Structure
                        {
                            type: "visual",
                            title: "Decoding the Code: A Color-Coded Breakdown",
                            content: "Every ICD-10-CM code tells a story. Each character has a specific purpose. Let's break down a real code piece by piece so you can read any code like a pro.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">ANATOMY OF AN ICD-10-CM CODE</text>

                                    <!-- The code display -->
                                    <rect x="206" y="141" width="687" height="188" rx="33" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9"/>

                                    <!-- Individual characters with colors -->
                                    <rect x="247" y="172" width="96" height="125" rx="19" fill="#ef4444"/>
                                    <text x="294" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">S</text>

                                    <rect x="357" y="172" width="96" height="125" rx="19" fill="#f59e0b"/>
                                    <text x="404" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">7</text>

                                    <rect x="467" y="172" width="96" height="125" rx="19" fill="#f59e0b"/>
                                    <text x="514" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">2</text>

                                    <text x="591" y="260" text-anchor="middle" fill="#888" font-size="42">.</text>

                                    <rect x="618" y="172" width="68" height="125" rx="19" fill="#10b981"/>
                                    <text x="651" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">0</text>

                                    <rect x="701" y="172" width="68" height="125" rx="19" fill="#10b981"/>
                                    <text x="734" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">0</text>

                                    <rect x="783" y="172" width="68" height="125" rx="19" fill="#10b981"/>
                                    <text x="816" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">1</text>

                                    <rect x="866" y="172" width="68" height="125" rx="19" fill="#8b5cf6"/>
                                    <text x="899" y="260" text-anchor="middle" fill="#fff" font-weight="bold" font-size="42">A</text>

                                    <!-- Explanation boxes with connecting lines -->
                                    <!-- Character 1 -->
                                    <line x1="294" y1="314" x2="294" y2="392" stroke="#ef4444" stroke-width="7"/>
                                    <rect x="55" y="392" width="481" height="157" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="294" y="455" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">CHARACTER 1: CHAPTER</text>
                                    <text x="294" y="509" text-anchor="middle" fill="#fff" font-size="25">S = Injury, Poisoning</text>

                                    <!-- Characters 2-3 -->
                                    <line x1="459" y1="314" x2="770" y2="392" stroke="#f59e0b" stroke-width="7"/>
                                    <rect x="563" y="392" width="481" height="157" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="803" y="455" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">CHARACTERS 2-3: CATEGORY</text>
                                    <text x="803" y="509" text-anchor="middle" fill="#fff" font-size="25">72 = Fracture of Femur</text>

                                    <!-- Characters 4-6 -->
                                    <rect x="55" y="597" width="481" height="204" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="294" y="660" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">CHARACTERS 4-6: DETAILS</text>
                                    <text x="294" y="713" text-anchor="middle" fill="#fff" font-size="25">0 = Neck of femur</text>
                                    <text x="294" y="760" text-anchor="middle" fill="#fff" font-size="25">01 = Right side, unspecified</text>

                                    <!-- Character 7 -->
                                    <rect x="563" y="597" width="481" height="204" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="803" y="660" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">CHARACTER 7: ENCOUNTER</text>
                                    <text x="803" y="713" text-anchor="middle" fill="#fff" font-size="25">A = Initial encounter</text>
                                    <text x="803" y="760" text-anchor="middle" fill="#fff" font-size="25">D = Subsequent | S = Sequela</text>

                                    <!-- Full meaning at bottom -->
                                    <rect x="110" y="864" width="880" height="188" rx="33" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="933" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">FULL MEANING:</text>
                                    <text x="550" y="999" text-anchor="middle" fill="#fff" font-size="25">Fracture of unspecified part of neck of right femur,</text>
                                    <text x="550" y="1043" text-anchor="middle" fill="#fff" font-size="25">initial encounter for closed fracture</text>
                                </svg>`,
                                caption: "Each character adds more specificity to the diagnosis"
                            }
                        },

                        // CARD 4: MEMORY TRICK - Chapter Letters
                        {
                            type: "concept",
                            title: "Memory Trick: First Letter = Chapter",
                            content: "The first letter of any ICD-10-CM code instantly tells you what body system or type of condition you're dealing with. Here's an easy way to remember the most common ones.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">MEMORY TRICK: FIRST LETTERS</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">The first letter tells you the chapter instantly!</text>

                                    <!-- Grid of letters with meanings -->
                                    <!-- Row 1 -->
                                    <rect x="55" y="188" width="233" height="172" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="170" y="267" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">A-B</text>
                                    <text x="170" y="330" text-anchor="middle" fill="#fff" font-size="25"> Infections</text>

                                    <rect x="316" y="188" width="233" height="172" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="431" y="267" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">C-D</text>
                                    <text x="431" y="330" text-anchor="middle" fill="#fff" font-size="25"> Cancer/Blood</text>

                                    <rect x="577" y="188" width="233" height="172" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="693" y="267" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">E</text>
                                    <text x="693" y="330" text-anchor="middle" fill="#fff" font-size="25"> Diabetes/Endo</text>

                                    <rect x="838" y="188" width="233" height="172" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="954" y="267" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">F</text>
                                    <text x="954" y="330" text-anchor="middle" fill="#fff" font-size="25"> Mental Health</text>

                                    <!-- Row 2 -->
                                    <rect x="55" y="392" width="233" height="172" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="170" y="471" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">G</text>
                                    <text x="170" y="534" text-anchor="middle" fill="#fff" font-size="25">⚡ Nervous System</text>

                                    <rect x="316" y="392" width="233" height="172" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="431" y="471" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="42">I</text>
                                    <text x="431" y="534" text-anchor="middle" fill="#fff" font-size="25"> Heart/Circ</text>

                                    <rect x="577" y="392" width="233" height="172" rx="19" fill="rgba(20,184,166,0.15)" stroke="#10b981"/>
                                    <text x="693" y="471" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">J</text>
                                    <text x="693" y="534" text-anchor="middle" fill="#fff" font-size="25"> Respiratory</text>

                                    <rect x="838" y="392" width="233" height="172" rx="19" fill="rgba(251,146,60,0.15)" stroke="#f59e0b"/>
                                    <text x="954" y="471" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">K</text>
                                    <text x="954" y="534" text-anchor="middle" fill="#fff" font-size="25"> Digestive</text>

                                    <!-- Row 3 -->
                                    <rect x="55" y="597" width="233" height="172" rx="19" fill="rgba(168,85,247,0.15)" stroke="#a855f7"/>
                                    <text x="170" y="675" text-anchor="middle" fill="#a855f7" font-weight="bold" font-size="42">M</text>
                                    <text x="170" y="738" text-anchor="middle" fill="#fff" font-size="25"> Muscles/Bones</text>

                                    <rect x="316" y="597" width="233" height="172" rx="19" fill="rgba(34,197,94,0.15)" stroke="#22c55e"/>
                                    <text x="431" y="675" text-anchor="middle" fill="#22c55e" font-weight="bold" font-size="42">N</text>
                                    <text x="431" y="738" text-anchor="middle" fill="#fff" font-size="25"> Kidney/GU</text>

                                    <rect x="577" y="597" width="233" height="172" rx="19" fill="rgba(244,63,94,0.15)" stroke="#f43f5e"/>
                                    <text x="693" y="675" text-anchor="middle" fill="#f43f5e" font-weight="bold" font-size="42">O</text>
                                    <text x="693" y="738" text-anchor="middle" fill="#fff" font-size="25"> Pregnancy</text>

                                    <rect x="838" y="597" width="233" height="172" rx="19" fill="rgba(99,102,241,0.15)" stroke="#6366f1"/>
                                    <text x="954" y="675" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">S-T</text>
                                    <text x="954" y="738" text-anchor="middle" fill="#fff" font-size="25"> Injuries</text>

                                    <!-- Row 4 - Z codes highlighted -->
                                    <rect x="316" y="817" width="467" height="172" rx="19" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="911" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="42">Z</text>
                                    <text x="550" y="968" text-anchor="middle" fill="#fff" font-size="25"> Encounters, Screenings, History</text>

                                    <!-- Tip at bottom -->
                                    <rect x="110" y="1037" width="880" height="125" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="151" y="1115" fill="#f59e0b" font-size="31"></text>
                                    <text x="550" y="1115" text-anchor="middle" fill="#fff" font-size="25">See a code? Look at the first letter - you already know the body system!</text>
                                </svg>`,
                                caption: "Memorize these letters to quickly identify any diagnosis category"
                            }
                        },

                        // CARD 5: FLOWCHART - The Coding Process
                        {
                            type: "visual",
                            title: "The Coding Process: Step-by-Step Flowchart",
                            content: "Every time you code a diagnosis, you should follow this exact process. Skipping steps leads to errors, claim denials, and compliance issues. This flowchart will become second nature with practice.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="69" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">THE CODING PROCESS FLOWCHART</text>

                                    <!-- Step 1 -->
                                    <rect x="343" y="110" width="412" height="125" rx="66" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="7"/>
                                    <text x="550" y="182" text-anchor="middle" fill="#fff" font-size="25">1. Read Documentation</text>
                                    <text x="123" y="172" fill="#10b981" font-size="42"></text>

                                    <line x1="550" y1="235" x2="550" y2="282" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>
                                    <defs><marker id="arrowGray" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#888"/></marker></defs>

                                    <!-- Step 2 -->
                                    <rect x="343" y="282" width="412" height="125" rx="66" fill="rgba(59,130,246,0.3)" stroke="#6366f1" stroke-width="7"/>
                                    <text x="550" y="355" text-anchor="middle" fill="#fff" font-size="25">2. Find Main Term</text>
                                    <text x="123" y="345" fill="#6366f1" font-size="42"></text>

                                    <line x1="550" y1="408" x2="550" y2="455" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <!-- Step 3 -->
                                    <rect x="343" y="455" width="412" height="125" rx="66" fill="rgba(245,158,11,0.3)" stroke="#f59e0b" stroke-width="7"/>
                                    <text x="550" y="528" text-anchor="middle" fill="#fff" font-size="25">3. Look Up in Index</text>
                                    <text x="123" y="518" fill="#f59e0b" font-size="42"></text>

                                    <line x1="550" y1="581" x2="550" y2="628" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <!-- Step 4 - Critical -->
                                    <rect x="288" y="628" width="522" height="157" rx="19" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="12"/>
                                    <text x="550" y="697" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">4. VERIFY IN TABULAR LIST</text>
                                    <text x="550" y="748" text-anchor="middle" fill="#fff" font-size="25">Never skip this step!</text>
                                    <text x="123" y="707" fill="#ef4444" font-size="42">⚠</text>

                                    <line x1="550" y1="785" x2="550" y2="832" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <!-- Step 5 -->
                                    <rect x="343" y="832" width="412" height="125" rx="66" fill="rgba(139,92,246,0.3)" stroke="#8b5cf6" stroke-width="7"/>
                                    <text x="550" y="905" text-anchor="middle" fill="#fff" font-size="25">5. Read ALL Notes</text>
                                    <text x="123" y="895" fill="#8b5cf6" font-size="42"></text>

                                    <line x1="550" y1="958" x2="550" y2="1005" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <!-- Step 6 -->
                                    <rect x="343" y="1005" width="412" height="125" rx="66" fill="rgba(14,165,233,0.3)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="1078" text-anchor="middle" fill="#fff" font-size="25">6. Assign Most Specific</text>
                                    <text x="123" y="1068" fill="#0ea5e9" font-size="42"></text>

                                    <!-- Success indicator -->
                                    <circle cx="976" y="1068" r="41" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="7"/>
                                    <text x="976" y="1087" text-anchor="middle" fill="#10b981" font-size="42">✓</text>
                                    <line x1="770" y1="1068" x2="907" y2="1068" stroke="#10b981" stroke-width="7"/>

                                    <!-- Time indicator -->
                                    <rect x="825" y="1162" width="247" height="78" rx="13" fill="rgba(255,255,255,0.05)"/>
                                    <text x="948" y="1216" text-anchor="middle" fill="#888" font-size="25">~2-5 min/code</text>
                                </svg>`,
                                caption: "Follow this flowchart for every diagnosis you code"
                            }
                        },

                        // CARD 6: COMPARISON TABLE - Index vs Tabular
                        {
                            type: "visual",
                            title: "Index vs. Tabular List: Know the Difference",
                            content: "The two main parts of ICD-10-CM serve different purposes. Think of the Index as GPS directions and the Tabular as the actual destination. You need both to get there correctly.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">ALPHABETIC INDEX vs TABULAR LIST</text>

                                    <!-- Index Column -->
                                    <rect x="55" y="157" width="467" height="722" rx="33" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <rect x="55" y="157" width="467" height="125" rx="33" fill="rgba(245,158,11,0.2)"/>
                                    <text x="288" y="235" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="28"> ALPHABETIC INDEX</text>

                                    <text x="96" y="345" fill="#fff" font-size="25">✓ Alphabetical by condition</text>
                                    <text x="96" y="408" fill="#fff" font-size="25">✓ Quick lookup tool</text>
                                    <text x="96" y="471" fill="#fff" font-size="25">✓ Shows code suggestions</text>
                                    <text x="96" y="534" fill="#fff" font-size="25">✓ Cross-references</text>
                                    <text x="96" y="597" fill="#888" font-size="25">✗ No full descriptions</text>
                                    <text x="96" y="660" fill="#888" font-size="25">✗ No instructional notes</text>
                                    <text x="96" y="722" fill="#888" font-size="25">✗ May show truncated codes</text>

                                    <rect x="96" y="785" width="385" height="78" rx="13" fill="rgba(239,68,68,0.2)" stroke="#ef4444"/>
                                    <text x="288" y="839" text-anchor="middle" fill="#ef4444" font-size="25">START HERE ONLY</text>

                                    <!-- Tabular Column -->
                                    <rect x="577" y="157" width="467" height="722" rx="33" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <rect x="577" y="157" width="467" height="125" rx="33" fill="rgba(16,185,129,0.2)"/>
                                    <text x="811" y="235" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28"> TABULAR LIST</text>

                                    <text x="618" y="345" fill="#fff" font-size="25">✓ Numerical order by code</text>
                                    <text x="618" y="408" fill="#fff" font-size="25">✓ Full code descriptions</text>
                                    <text x="618" y="471" fill="#fff" font-size="25">✓ Includes/Excludes notes</text>
                                    <text x="618" y="534" fill="#fff" font-size="25">✓ Code First instructions</text>
                                    <text x="618" y="597" fill="#fff" font-size="25">✓ Required characters shown</text>
                                    <text x="618" y="660" fill="#fff" font-size="25">✓ Chapter guidelines</text>
                                    <text x="618" y="722" fill="#fff" font-size="25">✓ Complete, valid codes</text>

                                    <rect x="618" y="785" width="385" height="78" rx="13" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
                                    <text x="811" y="839" text-anchor="middle" fill="#10b981" font-size="25">ALWAYS VERIFY HERE</text>

                                    <!-- Bottom rule -->
                                    <rect x="110" y="927" width="880" height="110" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="550" y="999" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="28">⚠ NEVER code from the Index alone!</text>
                                </svg>`,
                                caption: "Always use both tools together - Index to find, Tabular to verify"
                            }
                        },

                        // CARD 7: REAL EXAMPLE WALKTHROUGH
                        {
                            type: "example",
                            title: "Let's Code Together: A Real Example",
                            content: "A patient comes in with documentation stating: 'Type 2 diabetes mellitus with diabetic chronic kidney disease, stage 3.' Let's walk through coding this step by step using everything we've learned.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="69" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">CODING WALKTHROUGH: DIABETES WITH CKD</text>

                                    <!-- Original documentation -->
                                    <rect x="68" y="110" width="962" height="141" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="110" y="172" fill="#f59e0b" font-size="25"> DOCUMENTATION:</text>
                                    <text x="110" y="226" fill="#fff" font-size="25">"Type 2 diabetes mellitus with diabetic CKD, stage 3"</text>

                                    <!-- Step 1 -->
                                    <rect x="68" y="282" width="453" height="220" rx="19" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="294" y="339" text-anchor="middle" fill="#6366f1" font-size="25">STEP 1: INDEX LOOKUP</text>
                                    <text x="110" y="392" fill="#fff" font-size="25">Look up: Diabetes</text>
                                    <text x="110" y="433" fill="#fff" font-size="25">→ type 2</text>
                                    <text x="110" y="474" fill="#fff" font-size="25">  → with kidney complication</text>

                                    <!-- Arrow -->
                                    <path d="M536 392 L577 392" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <!-- Step 2 -->
                                    <rect x="577" y="282" width="453" height="220" rx="19" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="803" y="339" text-anchor="middle" fill="#10b981" font-size="25">STEP 2: TABULAR VERIFY</text>
                                    <text x="618" y="392" fill="#fff" font-size="25">E11.22 confirmed:</text>
                                    <text x="618" y="440" fill="#888" font-size="25">"Type 2 diabetes mellitus</text>
                                    <text x="618" y="477" fill="#888" font-size="25">with diabetic CKD"</text>

                                    <!-- First code result -->
                                    <rect x="275" y="550" width="550" height="125" rx="26" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="612" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">E11.22</text>
                                    <text x="550" y="660" text-anchor="middle" fill="#fff" font-size="25">Primary Code ✓</text>

                                    <!-- Note about additional code -->
                                    <rect x="68" y="722" width="962" height="157" rx="19" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="110" y="785" fill="#8b5cf6" font-size="25"> TABULAR NOTE SAYS:</text>
                                    <text x="110" y="848" fill="#fff" font-size="25">"Use additional code to identify stage of CKD (N18.-)"</text>

                                    <!-- Second code lookup -->
                                    <rect x="68" y="927" width="453" height="157" rx="19" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="110" y="990" fill="#6366f1" font-size="25">Look up: CKD, stage 3</text>
                                    <text x="110" y="1043" fill="#fff" font-size="25">→ N18.3</text>

                                    <path d="M536 1005 L577 1005" stroke="#888" stroke-width="7" marker-end="url(#arrowGray)"/>

                                    <rect x="577" y="927" width="453" height="157" rx="19" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="618" y="990" fill="#10b981" font-size="25">N18.3 confirmed:</text>
                                    <text x="618" y="1043" fill="#888" font-size="25">"Chronic kidney disease, stage 3"</text>

                                    <!-- Final result -->
                                    <rect x="206" y="1115" width="687" height="110" rx="26" fill="rgba(16,185,129,0.25)" stroke="#10b981" stroke-width="7"/>
                                    <text x="550" y="1184" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">FINAL: E11.22 + N18.3 ✓</text>
                                </svg>`,
                                caption: "Both codes together tell the complete clinical story"
                            }
                        },

                        // CARD 8: MNEMONIC DEVICE
                        {
                            type: "concept",
                            title: "Remember This: The VERIFY Mnemonic",
                            content: "Use this mnemonic to remember the key steps every time you code. Say it to yourself: 'V-E-R-I-F-Y' - this keeps you from making the most common coding mistakes.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">THE VERIFY MNEMONIC</text>

                                    <!-- V -->
                                    <rect x="82" y="157" width="935" height="141" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="151" y="251" fill="#ef4444" font-weight="bold" font-size="42">V</text>
                                    <text x="261" y="235" fill="#fff" font-size="28">View the documentation completely</text>
                                    <text x="261" y="282" fill="#888" font-size="25">Read everything before you start coding</text>

                                    <!-- E -->
                                    <rect x="82" y="314" width="935" height="141" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="151" y="408" fill="#f59e0b" font-weight="bold" font-size="42">E</text>
                                    <text x="261" y="392" fill="#fff" font-size="28">Extract the main diagnosis term</text>
                                    <text x="261" y="440" fill="#888" font-size="25">Find the condition name, not anatomy</text>

                                    <!-- R -->
                                    <rect x="82" y="471" width="935" height="141" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="151" y="565" fill="#10b981" font-weight="bold" font-size="42">R</text>
                                    <text x="261" y="550" fill="#fff" font-size="28">Reference the Alphabetic Index</text>
                                    <text x="261" y="597" fill="#888" font-size="25">Look up the main term first</text>

                                    <!-- I -->
                                    <rect x="82" y="628" width="935" height="141" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="151" y="722" fill="#6366f1" font-weight="bold" font-size="42">I</text>
                                    <text x="261" y="707" fill="#fff" font-size="28">Investigate the Tabular List</text>
                                    <text x="261" y="754" fill="#888" font-size="25">ALWAYS check here - read all notes!</text>

                                    <!-- F -->
                                    <rect x="82" y="785" width="935" height="141" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="151" y="880" fill="#8b5cf6" font-weight="bold" font-size="42">F</text>
                                    <text x="261" y="864" fill="#fff" font-size="28">Follow all instructional notes</text>
                                    <text x="261" y="911" fill="#888" font-size="25">Excludes, Code First, Use Additional</text>

                                    <!-- Y -->
                                    <rect x="82" y="942" width="935" height="141" rx="19" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9"/>
                                    <text x="151" y="1037" fill="#0ea5e9" font-weight="bold" font-size="42">Y</text>
                                    <text x="261" y="1021" fill="#fff" font-size="28">Yield the most specific code</text>
                                    <text x="261" y="1068" fill="#888" font-size="25">Use all required characters</text>
                                </svg>`,
                                caption: "VERIFY - say it every time you code!"
                            }
                        },

                        // CARD 9: QUICK REFERENCE CARD
                        {
                            type: "visual",
                            title: "Quick Reference: Keep This Handy",
                            content: "Here's a visual summary of everything we've covered. Screenshot this or print it out to keep at your desk while you're learning.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <rect x="27" y="31" width="1045" height="360" rx="39" fill="rgba(14,165,233,0.05)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="110" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28"> ICD-10-CM QUICK REFERENCE</text>

                                    <!-- Code Structure -->
                                    <rect x="68" y="157" width="453" height="282" rx="19" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="294" y="220" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">CODE STRUCTURE</text>
                                    <text x="96" y="276" fill="#fff" font-size="25">• 3-7 characters</text>
                                    <text x="96" y="320" fill="#fff" font-size="25">• 1st = Letter (chapter)</text>
                                    <text x="96" y="364" fill="#fff" font-size="25">• 2nd-3rd = Numbers</text>
                                    <text x="96" y="408" fill="#fff" font-size="25">• 4th-7th = Specificity</text>

                                    <!-- Common Letters -->
                                    <rect x="577" y="157" width="453" height="282" rx="19" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="803" y="220" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">COMMON LETTERS</text>
                                    <text x="605" y="276" fill="#fff" font-size="25">E = Diabetes/Endocrine</text>
                                    <text x="605" y="320" fill="#fff" font-size="25">I = Heart/Circulatory</text>
                                    <text x="605" y="364" fill="#fff" font-size="25">J = Respiratory</text>
                                    <text x="605" y="408" fill="#fff" font-size="25">S-T = Injuries</text>

                                    <!-- Key Rules -->
                                    <rect x="68" y="471" width="962" height="220" rx="19" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="534" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">⚡ KEY RULES</text>
                                    <text x="110" y="597" fill="#fff" font-size="25">1. NEVER code from Index alone - always verify in Tabular</text>
                                    <text x="110" y="644" fill="#fff" font-size="25">2. Code to highest specificity - use all required characters</text>

                                    <!-- Conventions -->
                                    <rect x="68" y="722" width="453" height="251" rx="19" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="294" y="785" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">PUNCTUATION</text>
                                    <text x="96" y="848" fill="#fff" font-size="25">[ ] = Synonyms</text>
                                    <text x="96" y="895" fill="#fff" font-size="25">( ) = Optional words</text>
                                    <text x="96" y="942" fill="#fff" font-size="25"> :  = Required modifier</text>

                                    <!-- Abbreviations -->
                                    <rect x="577" y="722" width="453" height="251" rx="19" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="803" y="785" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">ABBREVIATIONS</text>
                                    <text x="605" y="848" fill="#fff" font-size="25">NEC = Other specified</text>
                                    <text x="605" y="895" fill="#888" font-size="25">(doc specific, no code)</text>
                                    <text x="605" y="942" fill="#fff" font-size="25">NOS = Unspecified</text>

                                    <!-- Excludes -->
                                    <rect x="68" y="1005" width="962" height="125" rx="19" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="110" y="1068" fill="#ef4444" font-size="25">Excludes1 = NEVER code together</text>
                                    <text x="110" y="1115" fill="#10b981" font-size="25">Excludes2 = CAN code both if present</text>
                                </svg>`,
                                caption: "Your go-to reference for ICD-10-CM coding essentials"
                            }
                        },

                        // CARD 10: QUIZ
                        {
                            type: "quiz",
                            question: "You find a code in the Alphabetic Index. What should you do next?",
                            options: [
                                { text: "Assign the code immediately - the Index is accurate", correct: false },
                                { text: "Verify the code in the Tabular List and read all notes", correct: true },
                                { text: "Check with a supervisor before using any code", correct: false },
                                { text: "Look it up online to confirm", correct: false }
                            ],
                            explanation: "Always verify codes in the Tabular List! The Index is just your starting point. The Tabular contains full descriptions, Excludes notes, 'Use Additional Code' instructions, and required character information that the Index doesn't show. Never code directly from the Index."
                        },

                        // CARD 11: QUIZ 2
                        {
                            type: "quiz",
                            question: "What does the first character of an ICD-10-CM code tell you?",
                            options: [
                                { text: "The severity of the condition", correct: false },
                                { text: "The chapter/body system category", correct: true },
                                { text: "Whether it's acute or chronic", correct: false },
                                { text: "The year the code was created", correct: false }
                            ],
                            explanation: "The first character (always a letter) identifies the chapter and general category. For example, E = Endocrine/Diabetes, I = Circulatory, J = Respiratory, S = Injuries. This helps you quickly understand what type of condition you're dealing with."
                        },

                        // CARD 12: LESSON SUMMARY
                        {
                            type: "visual",
                            title: "Lesson Complete! Key Takeaways",
                            content: "Congratulations on completing this lesson! Here's what you've learned and should remember going forward.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 1 COMPLETE!</text>

                                    <!-- Achievement unlocked style -->
                                    <rect x="137" y="157" width="825" height="880" rx="49" fill="rgba(16,185,129,0.1)" stroke="#10b981" stroke-width="7"/>

                                    <text x="550" y="267" text-anchor="middle" fill="#10b981" font-size="28">YOU NOW UNDERSTAND:</text>

                                    <!-- Checkmarks -->
                                    <text x="206" y="361" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="361" fill="#fff" font-size="25">What ICD-10-CM is and why it matters</text>

                                    <text x="206" y="455" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="455" fill="#fff" font-size="25">The 3-7 character code structure</text>

                                    <text x="206" y="550" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="550" fill="#fff" font-size="25">First letter = chapter/body system</text>

                                    <text x="206" y="644" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="644" fill="#fff" font-size="25">Index → Tabular List process</text>

                                    <text x="206" y="738" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="738" fill="#fff" font-size="25">The VERIFY mnemonic</text>

                                    <text x="206" y="832" fill="#10b981" font-size="31">✓</text>
                                    <text x="275" y="832" fill="#fff" font-size="25">Key punctuation and abbreviations</text>

                                    <!-- Next lesson teaser -->
                                    <rect x="206" y="911" width="687" height="94" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="974" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: Coding Conventions & Symbols →</text>
                                </svg>`,
                                caption: "Great progress! You're building a strong foundation in medical coding."
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 2: CODING CONVENTIONS & SYMBOLS
                // ========================================
                {
                    id: 2,
                    title: "Coding Conventions & Symbols",
                    duration: 12,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "The Secret Language of ICD-10-CM",
                            content: "Imagine you're reading a treasure map, but you don't know that X marks the spot or that dotted lines mean 'walk here.' You'd miss the treasure!\n\nICD-10-CM has its own symbols and conventions that tell you EXACTLY how to use each code. Miss these signals, and you'll code incorrectly every time. Master them, and you'll read the code book like a pro.\n\n**Why Conventions Matter:**\n• They tell you when to add more codes\n• They warn you when codes can't be used together\n• They show you the correct sequencing\n• They indicate required specificity",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="31">CONVENTIONS: YOUR CODING GPS</text>

                                    <rect x="82" y="141" width="935" height="220" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="220" text-anchor="middle" fill="#f59e0b" font-size="28">WITHOUT CONVENTIONS</text>
                                    <text x="550" y="298" text-anchor="middle" fill="#888" font-size="25">Like driving without road signs...</text>
                                    <text x="550" y="345" text-anchor="middle" fill="#ef4444" font-size="25"> Wrong turns, missed exits, accidents</text>

                                    <rect x="82" y="392" width="935" height="220" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="550" y="471" text-anchor="middle" fill="#10b981" font-size="28">WITH CONVENTIONS</text>
                                    <text x="550" y="550" text-anchor="middle" fill="#888" font-size="25">Clear directions at every step...</text>
                                    <text x="550" y="597" text-anchor="middle" fill="#10b981" font-size="25">✓ Accurate codes, proper sequencing, compliance</text>

                                    <rect x="82" y="660" width="440" height="251" rx="19" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="302" y="738" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">SYMBOLS</text>
                                    <text x="302" y="801" text-anchor="middle" fill="#fff" font-size="25">Visual markers that</text>
                                    <text x="302" y="848" text-anchor="middle" fill="#fff" font-size="25">guide your coding</text>

                                    <rect x="577" y="660" width="440" height="251" rx="19" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="797" y="738" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">NOTES</text>
                                    <text x="797" y="801" text-anchor="middle" fill="#fff" font-size="25">Instructions that</text>
                                    <text x="797" y="848" text-anchor="middle" fill="#fff" font-size="25">explain relationships</text>
                                </svg>`,
                                caption: "Conventions are your roadmap to accurate coding"
                            }
                        },
                        {
                            type: "concept",
                            title: "Includes & Excludes Notes: The Gatekeepers",
                            content: "**INCLUDES NOTES** tell you what conditions belong in a category. Think of them as the 'welcome mat' - these terms ARE included even if not specifically listed.\n\n**EXCLUDES1** = 'NOT CODED HERE - EVER!'\nThese conditions are MUTUALLY EXCLUSIVE. The patient CANNOT have both conditions at the same time. If you see Excludes1, you must choose ONE code, not both.\n\n**EXCLUDES2** = 'Not included here, but could coexist'\nThe excluded condition is different from the current code BUT the patient could have both. If documented, you CAN code both - just not with THIS code for THAT condition.\n\n**Memory Trick:**\n• Excludes**1** = **1** code only, pick one\n• Excludes**2** = **2** codes possible, both can exist",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">INCLUDES vs EXCLUDES NOTES</text>

                                    <!-- Includes -->
                                    <rect x="55" y="141" width="990" height="188" rx="26" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="110" y="213" fill="#10b981" font-weight="bold" font-size="28">INCLUDES</text>
                                    <text x="110" y="276" fill="#fff" font-size="25">✓ "Welcome mat" - these terms belong here</text>
                                    <text x="110" y="314" fill="#888" font-size="25">Example: J06 "Acute upper respiratory infection" includes "URI NOS"</text>

                                    <!-- Excludes1 - Red/Danger -->
                                    <rect x="55" y="361" width="990" height="267" rx="26" fill="rgba(239,68,68,0.15)" stroke="#ef4444" stroke-width="7"/>
                                    <text x="110" y="433" fill="#ef4444" font-weight="bold" font-size="28"> EXCLUDES1</text>
                                    <text x="110" y="496" fill="#fff" font-size="25">NEVER code together - mutually exclusive!</text>
                                    <text x="110" y="550" fill="#888" font-size="25">Patient cannot have both conditions simultaneously</text>
                                    <rect x="687" y="392" width="330" height="94" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="852" y="455" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">PICK ONE!</text>
                                    <text x="110" y="606" fill="#888" font-size="25">Example: Burn code excludes frostbite - can't have both same site</text>

                                    <!-- Excludes2 - Yellow/Caution -->
                                    <rect x="55" y="660" width="990" height="267" rx="26" fill="rgba(245,158,11,0.15)" stroke="#f59e0b" stroke-width="7"/>
                                    <text x="110" y="732" fill="#f59e0b" font-weight="bold" font-size="28">⚠ EXCLUDES2</text>
                                    <text x="110" y="795" fill="#fff" font-size="25">Not here, but CAN coexist - code both if documented</text>
                                    <text x="110" y="848" fill="#888" font-size="25">Patient could have both, just use different codes</text>
                                    <rect x="687" y="691" width="330" height="94" rx="13" fill="rgba(245,158,11,0.3)"/>
                                    <text x="852" y="754" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">BOTH OK!</text>
                                    <text x="110" y="905" fill="#888" font-size="25">Example: J44.1 COPD excludes asthma J45 - patient could have both</text>
                                </svg>`,
                                caption: "Excludes1 = Never together | Excludes2 = Can coexist separately"
                            }
                        },
                        {
                            type: "concept",
                            title: "Code First, Use Additional, Code Also",
                            content: "These three instructions tell you about SEQUENCING - which code goes first when multiple codes are needed.\n\n**CODE FIRST (Etiology)**\nThis code is for the MANIFESTATION (result). You MUST code the underlying cause FIRST.\nExample: G63 Polyneuropathy says 'Code first underlying disease' - if caused by diabetes, E11.42 goes FIRST.\n\n**USE ADDITIONAL CODE**\nThe current code needs a PARTNER. Add another code to complete the picture.\nExample: J96.0 Respiratory failure says 'Use additional code for associated condition'\n\n**CODE ALSO**\nSuggests an additional code MAY be appropriate but isn't mandatory. Use clinical judgment.\n\n**The CAUSE-EFFECT Rule:**\nCause (etiology) → Effect (manifestation)\nCause codes FIRST, effect codes SECOND",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">SEQUENCING INSTRUCTIONS</text>

                                    <!-- Code First -->
                                    <rect x="55" y="141" width="990" height="251" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="110" y="213" fill="#ef4444" font-weight="bold" font-size="28">CODE FIRST</text>
                                    <text x="110" y="276" fill="#fff" font-size="25">"I'm the result - put my CAUSE before me"</text>
                                    <rect x="687" y="172" width="165" height="78" rx="13" fill="#ef4444"/>
                                    <text x="770" y="226" text-anchor="middle" fill="#fff" font-size="25">CAUSE</text>
                                    <text x="866" y="226" fill="#888" font-size="25">→</text>
                                    <rect x="893" y="172" width="123" height="78" rx="13" fill="rgba(239,68,68,0.3)" stroke="#ef4444"/>
                                    <text x="954" y="226" text-anchor="middle" fill="#ef4444" font-size="25">This</text>
                                    <text x="110" y="361" fill="#888" font-size="25">Example: Diabetic neuropathy → E11.42 (diabetes) THEN G63 (neuropathy)</text>

                                    <!-- Use Additional -->
                                    <rect x="55" y="424" width="990" height="251" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="110" y="496" fill="#10b981" font-weight="bold" font-size="28">USE ADDITIONAL CODE</text>
                                    <text x="110" y="559" fill="#fff" font-size="25">"I need a partner code - add one after me"</text>
                                    <rect x="687" y="455" width="123" height="78" rx="13" fill="#10b981"/>
                                    <text x="748" y="509" text-anchor="middle" fill="#fff" font-size="25">This</text>
                                    <text x="825" y="509" fill="#888" font-size="25">→</text>
                                    <rect x="852" y="455" width="165" height="78" rx="13" fill="rgba(16,185,129,0.3)" stroke="#10b981"/>
                                    <text x="935" y="509" text-anchor="middle" fill="#10b981" font-size="25">+ADD</text>
                                    <text x="110" y="644" fill="#888" font-size="25">Example: Sepsis A41.9 → Use additional code for organ dysfunction</text>

                                    <!-- Code Also -->
                                    <rect x="55" y="707" width="990" height="251" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="110" y="779" fill="#f59e0b" font-weight="bold" font-size="28">CODE ALSO</text>
                                    <text x="110" y="842" fill="#fff" font-size="25">"Consider adding - use your judgment"</text>
                                    <rect x="687" y="738" width="123" height="78" rx="13" fill="#f59e0b"/>
                                    <text x="748" y="792" text-anchor="middle" fill="#fff" font-size="25">This</text>
                                    <text x="825" y="792" fill="#888" font-size="25">→</text>
                                    <rect x="852" y="738" width="165" height="78" rx="13" fill="rgba(245,158,11,0.3)" stroke="#f59e0b"/>
                                    <text x="935" y="792" text-anchor="middle" fill="#f59e0b" font-size="25">Maybe?</text>
                                    <text x="110" y="927" fill="#888" font-size="25">Not mandatory - code if clinically relevant and documented</text>
                                </svg>`,
                                caption: "Remember: Cause before Effect, Primary before Secondary"
                            }
                        },
                        {
                            type: "concept",
                            title: "Memory Tool: SCENE",
                            content: "Remember the 5 key conventions with SCENE:\n\n**S - SEQUENCING matters**\nCode First, Use Additional - order tells the story\n\n**C - CAN'T coexist (Excludes1)**\nMutually exclusive conditions - pick one\n\n**E - EITHER can exist (Excludes2)**\nBoth conditions possible - code separately if documented\n\n**N - NOTES are mandatory**\nIncludes notes, chapter notes - read them all\n\n**E - EXPAND to specificity**\nPlaceholder X, 7th character - use all required characters\n\n**Say it:** 'Set the SCENE for accurate coding - Sequencing, Can't coexist, Either exists, Notes, Expand!'",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">S C E N E</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">Your Conventions Memory Tool</text>

                                    <!-- S -->
                                    <rect x="55" y="188" width="192" height="282" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="151" y="267" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">S</text>
                                    <text x="151" y="330" text-anchor="middle" fill="#ef4444" font-size="25">SEQUENCING</text>
                                    <text x="151" y="377" text-anchor="middle" fill="#fff" font-size="25">Order</text>
                                    <text x="151" y="414" text-anchor="middle" fill="#fff" font-size="25">matters</text>
                                    <text x="151" y="452" text-anchor="middle" fill="#888" font-size="25">Code First</text>

                                    <!-- C -->
                                    <rect x="261" y="188" width="192" height="282" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="357" y="267" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">C</text>
                                    <text x="357" y="330" text-anchor="middle" fill="#f59e0b" font-size="25">CAN'T</text>
                                    <text x="357" y="377" text-anchor="middle" fill="#fff" font-size="25">Excludes1</text>
                                    <text x="357" y="414" text-anchor="middle" fill="#fff" font-size="25">Never</text>
                                    <text x="357" y="452" text-anchor="middle" fill="#888" font-size="25">together</text>

                                    <!-- E -->
                                    <rect x="467" y="188" width="192" height="282" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="563" y="267" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">E</text>
                                    <text x="563" y="330" text-anchor="middle" fill="#10b981" font-size="25">EITHER</text>
                                    <text x="563" y="377" text-anchor="middle" fill="#fff" font-size="25">Excludes2</text>
                                    <text x="563" y="414" text-anchor="middle" fill="#fff" font-size="25">Both</text>
                                    <text x="563" y="452" text-anchor="middle" fill="#888" font-size="25">can exist</text>

                                    <!-- N -->
                                    <rect x="673" y="188" width="192" height="282" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="770" y="267" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">N</text>
                                    <text x="770" y="330" text-anchor="middle" fill="#6366f1" font-size="25">NOTES</text>
                                    <text x="770" y="377" text-anchor="middle" fill="#fff" font-size="25">Read all</text>
                                    <text x="770" y="414" text-anchor="middle" fill="#fff" font-size="25">Includes</text>
                                    <text x="770" y="452" text-anchor="middle" fill="#888" font-size="25">Chapter</text>

                                    <!-- E -->
                                    <rect x="880" y="188" width="192" height="282" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="976" y="267" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">E</text>
                                    <text x="976" y="330" text-anchor="middle" fill="#8b5cf6" font-size="25">EXPAND</text>
                                    <text x="976" y="377" text-anchor="middle" fill="#fff" font-size="25">Specificity</text>
                                    <text x="976" y="414" text-anchor="middle" fill="#fff" font-size="25">7th char</text>
                                    <text x="976" y="452" text-anchor="middle" fill="#888" font-size="25">Placeholder</text>

                                    <!-- Phrase -->
                                    <rect x="82" y="518" width="935" height="157" rx="26" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9"/>
                                    <text x="550" y="590" text-anchor="middle" fill="#fff" font-size="25">"Set the SCENE for accurate coding!"</text>
                                    <text x="550" y="644" text-anchor="middle" fill="#0ea5e9" font-size="25">Sequencing • Can't • Either • Notes • Expand</text>

                                    <!-- Quick reference -->
                                    <rect x="82" y="707" width="935" height="204" rx="19" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="770" text-anchor="middle" fill="#888" font-size="25">QUICK REFERENCE</text>
                                    <text x="302" y="832" text-anchor="middle" fill="#ef4444" font-size="25">Excludes1 = NEVER</text>
                                    <text x="797" y="832" text-anchor="middle" fill="#10b981" font-size="25">Excludes2 = MAYBE</text>
                                    <text x="550" y="886" text-anchor="middle" fill="#fff" font-size="25">Code First = Cause → Effect</text>
                                </svg>`,
                                caption: "SCENE: Your guide to coding conventions"
                            }
                        },
                        {
                            type: "concept",
                            title: "Placeholder X and 7th Character Requirements",
                            content: "Some ICD-10-CM codes MUST have 7 characters. But what if the base code only has 3-5? Enter the placeholder 'X'!\n\n**PLACEHOLDER X:**\nUsed to fill empty positions so you can add required characters. The X has NO meaning itself - it's just a spaceholder.\n\nExample: T36.0X1A (Poisoning by penicillins)\n• T36.0 = Penicillins\n• X = Placeholder (no 5th character exists)\n• 1 = Accidental\n• A = Initial encounter\n\n**7TH CHARACTER REQUIREMENTS:**\nMany codes (especially injuries, pregnancy) require a 7th character:\n• A = Initial encounter\n• D = Subsequent encounter\n• S = Sequela (late effect)\n\n**If you see a code marked as needing 7 characters and you submit fewer, the claim will be REJECTED!**",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">PLACEHOLDER X &amp; 7TH CHARACTER</text>

                                    <!-- Visual code breakdown -->
                                    <rect x="137" y="141" width="825" height="220" rx="26" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9"/>
                                    <text x="550" y="204" text-anchor="middle" fill="#0ea5e9" font-size="25">EXAMPLE: T36.0X1A</text>

                                    <rect x="220" y="251" width="82" height="78" rx="13" fill="#ef4444"/>
                                    <text x="261" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">T</text>

                                    <rect x="316" y="251" width="82" height="78" rx="13" fill="#f59e0b"/>
                                    <text x="357" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">3</text>

                                    <rect x="412" y="251" width="82" height="78" rx="13" fill="#f59e0b"/>
                                    <text x="453" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">6</text>

                                    <text x="522" y="304" text-anchor="middle" fill="#888" font-size="31">.</text>

                                    <rect x="550" y="251" width="82" height="78" rx="13" fill="#10b981"/>
                                    <text x="591" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">0</text>

                                    <rect x="646" y="251" width="82" height="78" rx="13" fill="#8b5cf6" stroke="#fff" stroke-width="7"/>
                                    <text x="687" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">X</text>

                                    <rect x="742" y="251" width="82" height="78" rx="13" fill="#6366f1"/>
                                    <text x="783" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">1</text>

                                    <rect x="838" y="251" width="82" height="78" rx="13" fill="#ec4899"/>
                                    <text x="880" y="304" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">A</text>

                                    <!-- Labels -->
                                    <text x="687" y="392" text-anchor="middle" fill="#8b5cf6" font-size="25">PLACEHOLDER</text>
                                    <text x="880" y="392" text-anchor="middle" fill="#ec4899" font-size="25">7TH CHAR</text>

                                    <!-- 7th character options -->
                                    <rect x="55" y="455" width="990" height="314" rx="26" fill="rgba(236,72,153,0.1)" stroke="#ec4899"/>
                                    <text x="550" y="528" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="28">7TH CHARACTER OPTIONS (Injuries)</text>

                                    <rect x="110" y="565" width="275" height="157" rx="19" fill="rgba(16,185,129,0.2)"/>
                                    <text x="247" y="628" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">A</text>
                                    <text x="247" y="685" text-anchor="middle" fill="#fff" font-size="25">Initial</text>
                                    <text x="247" y="716" text-anchor="middle" fill="#888" font-size="25">First treatment</text>

                                    <rect x="412" y="565" width="275" height="157" rx="19" fill="rgba(245,158,11,0.2)"/>
                                    <text x="550" y="628" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="31">D</text>
                                    <text x="550" y="685" text-anchor="middle" fill="#fff" font-size="25">Subsequent</text>
                                    <text x="550" y="716" text-anchor="middle" fill="#888" font-size="25">Follow-up care</text>

                                    <rect x="715" y="565" width="275" height="157" rx="19" fill="rgba(139,92,246,0.2)"/>
                                    <text x="852" y="628" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="31">S</text>
                                    <text x="852" y="685" text-anchor="middle" fill="#fff" font-size="25">Sequela</text>
                                    <text x="852" y="716" text-anchor="middle" fill="#888" font-size="25">Late effect</text>

                                    <!-- Warning -->
                                    <rect x="110" y="817" width="880" height="141" rx="19" fill="rgba(239,68,68,0.2)" stroke="#ef4444"/>
                                    <text x="550" y="880" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">⚠ MISSING 7TH CHARACTER = CLAIM REJECTED!</text>
                                    <text x="550" y="927" text-anchor="middle" fill="#fff" font-size="25">Always check if code requires 7 characters</text>
                                </svg>`,
                                caption: "X is a placeholder, 7th character is mandatory for many codes"
                            }
                        },
                        {
                            type: "quiz",
                            question: "A code has an Excludes1 note listing another condition. What does this mean?",
                            options: [
                                { text: "You should code both conditions together", correct: false },
                                { text: "The conditions are mutually exclusive - NEVER code both", correct: true },
                                { text: "The second condition is included in the first code", correct: false },
                                { text: "You need supervisor approval to use the code", correct: false }
                            ],
                            explanation: "Excludes1 means the two conditions are MUTUALLY EXCLUSIVE - they cannot occur together in the same patient at the same time. You must choose ONE code. If you see 'burns excludes1 frostbite,' you can't code both for the same site because you can't have a burn AND frostbite simultaneously on the same area."
                        },
                        {
                            type: "quiz",
                            question: "What is the purpose of the placeholder 'X' in ICD-10-CM codes?",
                            options: [
                                { text: "It indicates an unknown diagnosis", correct: false },
                                { text: "It fills empty character positions to allow required 7th characters", correct: true },
                                { text: "It means the code is experimental", correct: false },
                                { text: "It indicates the code is for external causes only", correct: false }
                            ],
                            explanation: "The placeholder X has no meaning itself - it simply fills empty character positions (usually the 5th or 6th) when the code structure requires a 7th character. For example, T36.0X1A needs the X because there's no 5th character in the penicillin poisoning category, but a 6th (intent) and 7th (encounter) character are required."
                        },
                        {
                            type: "visual",
                            title: "Lesson 2 Summary: Conventions Mastered!",
                            content: "You now understand the critical conventions that guide accurate ICD-10-CM coding.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 2 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="785" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">YOU'VE MASTERED:</text>

                                    <text x="165" y="345" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">Includes notes - what belongs in a category</text>

                                    <text x="165" y="424" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">Excludes1 - NEVER code together</text>

                                    <text x="165" y="502" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">Excludes2 - CAN coexist separately</text>

                                    <text x="165" y="581" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Code First / Use Additional / Code Also</text>

                                    <text x="165" y="660" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="660" fill="#fff" font-size="25">Placeholder X and 7th character rules</text>

                                    <text x="165" y="738" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="738" fill="#fff" font-size="25">SCENE mnemonic for conventions</text>

                                    <rect x="165" y="817" width="770" height="94" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="880" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: General Coding Guidelines →</text>
                                </svg>`,
                                caption: "Conventions are the rules that make coding consistent"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 3: GENERAL CODING GUIDELINES
                // ========================================
                {
                    id: 3,
                    title: "General Coding Guidelines",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "The Universal Rules of Medical Coding",
                            content: "Before you dive into specific diseases, you need to understand the GENERAL rules that apply to ALL coding situations. These are the foundational principles that guide every code you assign.\n\n**The Official Guidelines:**\nCMS and NCHS publish the Official ICD-10-CM Guidelines annually. These aren't suggestions - they're REQUIREMENTS for accurate coding and proper reimbursement.\n\n**Three Main Sections:**\n• Section I: Conventions and General Guidelines\n• Section II: Selection of Principal Diagnosis (Inpatient)\n• Section III: Reporting Additional Diagnoses\n• Section IV: Outpatient Coding Guidelines\n\nMastering these rules prevents claim denials, audit findings, and compliance violations.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">OFFICIAL CODING GUIDELINES</text>

                                    <rect x="275" y="141" width="550" height="157" rx="82" fill="rgba(14,165,233,0.3)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="235" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">CMS/NCHS GUIDELINES</text>

                                    <!-- Arrows down -->
                                    <line x1="550" y1="298" x2="550" y2="361" stroke="#0ea5e9" stroke-width="7"/>
                                    <line x1="550" y1="361" x2="275" y2="424" stroke="#0ea5e9" stroke-width="7"/>
                                    <line x1="550" y1="361" x2="550" y2="424" stroke="#0ea5e9" stroke-width="7"/>
                                    <line x1="550" y1="361" x2="825" y2="424" stroke="#0ea5e9" stroke-width="7"/>

                                    <!-- Four sections -->
                                    <rect x="55" y="440" width="233" height="220" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="170" y="502" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">SECTION I</text>
                                    <text x="170" y="559" text-anchor="middle" fill="#fff" font-size="25">Conventions</text>
                                    <text x="170" y="603" text-anchor="middle" fill="#fff" font-size="25">&amp; General</text>
                                    <text x="170" y="647" text-anchor="middle" fill="#888" font-size="25">Rules</text>

                                    <rect x="316" y="440" width="233" height="220" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="431" y="502" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">SECTION II</text>
                                    <text x="431" y="559" text-anchor="middle" fill="#fff" font-size="25">Principal Dx</text>
                                    <text x="431" y="603" text-anchor="middle" fill="#fff" font-size="25">Selection</text>
                                    <text x="431" y="647" text-anchor="middle" fill="#888" font-size="25">Inpatient</text>

                                    <rect x="577" y="440" width="233" height="220" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="693" y="502" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">SECTION III</text>
                                    <text x="693" y="559" text-anchor="middle" fill="#fff" font-size="25">Additional</text>
                                    <text x="693" y="603" text-anchor="middle" fill="#fff" font-size="25">Diagnoses</text>
                                    <text x="693" y="647" text-anchor="middle" fill="#888" font-size="25">Secondary</text>

                                    <rect x="838" y="440" width="233" height="220" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="954" y="502" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">SECTION IV</text>
                                    <text x="954" y="559" text-anchor="middle" fill="#fff" font-size="25">Outpatient</text>
                                    <text x="954" y="603" text-anchor="middle" fill="#fff" font-size="25">Guidelines</text>
                                    <text x="954" y="647" text-anchor="middle" fill="#888" font-size="25">Office/ER</text>

                                    <!-- Bottom callout -->
                                    <rect x="110" y="707" width="880" height="188" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="550" y="779" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">⚠ NOT OPTIONAL!</text>
                                    <text x="550" y="842" text-anchor="middle" fill="#fff" font-size="25">These guidelines are required by HIPAA for all</text>
                                    <text x="550" y="886" text-anchor="middle" fill="#fff" font-size="25">healthcare settings - violation = compliance risk</text>
                                </svg>`,
                                caption: "Official Guidelines are mandatory, not optional"
                            }
                        },
                        {
                            type: "concept",
                            title: "Rule #1: Code to the Highest Level of Specificity",
                            content: "This is the GOLDEN RULE of medical coding. Always assign the most specific code that the documentation supports.\n\n**What This Means:**\n• If laterality is documented (right/left), code it\n• If the type is specified (acute/chronic), code it\n• If the cause is known, code it\n• Never use 'unspecified' when specifics are documented\n\n**Why It Matters:**\n• More specific codes = better data quality\n• Unspecified codes may trigger claim edits\n• Auditors look for inappropriate unspecified codes\n• Affects reimbursement and quality metrics\n\n**Example:**\n• BAD: M54.5 (Low back pain - unspecified)\n• GOOD: M54.51 (Vertebrogenic low back pain) - if documented\n\nUnspecified codes are only appropriate when the documentation truly lacks detail.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">THE GOLDEN RULE: SPECIFICITY</text>

                                    <!-- Pyramid showing specificity levels -->
                                    <polygon points="550,157 220,565 880,565" fill="none" stroke="#10b981" stroke-width="7"/>
                                    <line x1="330" y1="408" x2="770" y2="408" stroke="#10b981" stroke-width="3"/>
                                    <line x1="275" y1="487" x2="825" y2="487" stroke="#10b981" stroke-width="3"/>

                                    <text x="550" y="235" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">MOST SPECIFIC</text>
                                    <text x="550" y="282" text-anchor="middle" fill="#fff" font-size="25">Full 7 characters</text>

                                    <text x="550" y="377" text-anchor="middle" fill="#f59e0b" font-size="25">MORE DETAIL</text>
                                    <text x="550" y="424" text-anchor="middle" fill="#fff" font-size="25">Laterality, type</text>

                                    <text x="550" y="502" text-anchor="middle" fill="#ef4444" font-size="25">UNSPECIFIED</text>
                                    <text x="550" y="550" text-anchor="middle" fill="#888" font-size="25">Only when no detail</text>

                                    <!-- Good vs Bad example -->
                                    <rect x="55" y="628" width="467" height="172" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="288" y="691" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25"> TOO VAGUE</text>
                                    <text x="288" y="754" text-anchor="middle" fill="#fff" font-size="25">M54.5 Low back pain</text>
                                    <text x="288" y="792" text-anchor="middle" fill="#888" font-size="25">"Unspecified"</text>

                                    <rect x="577" y="628" width="467" height="172" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="811" y="691" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">✓ SPECIFIC</text>
                                    <text x="811" y="754" text-anchor="middle" fill="#fff" font-size="25">M54.51 Vertebrogenic</text>
                                    <text x="811" y="792" text-anchor="middle" fill="#888" font-size="25">When documented</text>

                                    <!-- Rule -->
                                    <rect x="110" y="832" width="880" height="141" rx="19" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
                                    <text x="550" y="895" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">RULE: Use unspecified ONLY when documentation lacks detail</text>
                                    <text x="550" y="942" text-anchor="middle" fill="#fff" font-size="25">Query the provider if you need more information</text>
                                </svg>`,
                                caption: "Always climb to the top of the specificity pyramid"
                            }
                        },
                        {
                            type: "concept",
                            title: "Rule #2: Acute vs. Chronic Conditions",
                            content: "When a patient has BOTH an acute and chronic form of the same condition, there are specific rules for coding:\n\n**THE RULE:**\nIf separate subentries exist for acute/subacute and chronic at the same indentation level in the Index, code BOTH - with the ACUTE code FIRST.\n\n**Example - Bronchitis:**\nPatient has acute exacerbation of chronic bronchitis:\n• J20.9 Acute bronchitis (FIRST)\n• J42 Chronic bronchitis (SECOND)\n\n**EXCEPTION:**\nIf a COMBINATION code exists that captures both, use that single code instead.\n• J44.1 COPD with acute exacerbation (one code captures both!)\n\n**Key Point:**\nAcute conditions are generally more resource-intensive and are sequenced first when both exist separately.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">ACUTE vs CHRONIC CODING</text>

                                    <!-- Scenario 1: Both separate -->
                                    <rect x="55" y="141" width="467" height="345" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="288" y="213" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">SEPARATE CODES EXIST</text>

                                    <rect x="96" y="251" width="165" height="94" rx="13" fill="#ef4444"/>
                                    <text x="178" y="314" text-anchor="middle" fill="#fff" font-size="25">ACUTE</text>
                                    <text x="288" y="314" fill="#fff" font-size="28">→</text>
                                    <text x="330" y="314" fill="#10b981" font-size="25">1st</text>

                                    <rect x="96" y="361" width="165" height="94" rx="13" fill="#6366f1"/>
                                    <text x="178" y="424" text-anchor="middle" fill="#fff" font-size="25">CHRONIC</text>
                                    <text x="288" y="424" fill="#fff" font-size="28">→</text>
                                    <text x="330" y="424" fill="#888" font-size="25">2nd</text>

                                    <!-- Scenario 2: Combination exists -->
                                    <rect x="577" y="141" width="467" height="345" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="811" y="213" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">COMBINATION EXISTS</text>

                                    <rect x="646" y="267" width="330" height="157" rx="19" fill="#10b981"/>
                                    <text x="811" y="339" text-anchor="middle" fill="#fff" font-size="25">ONE CODE</text>
                                    <text x="811" y="392" text-anchor="middle" fill="#fff" font-size="25">captures both!</text>

                                    <!-- Example -->
                                    <rect x="55" y="534" width="990" height="345" rx="26" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="550" y="606" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="28">EXAMPLE: COPD with Acute Exacerbation</text>

                                    <rect x="110" y="660" width="398" height="172" rx="19" fill="rgba(239,68,68,0.1)"/>
                                    <text x="308" y="716" text-anchor="middle" fill="#ef4444" font-size="25"> DON'T DO THIS:</text>
                                    <text x="308" y="770" text-anchor="middle" fill="#fff" font-size="25">J44.9 + J44.1</text>
                                    <text x="308" y="810" text-anchor="middle" fill="#888" font-size="25">Redundant codes</text>

                                    <rect x="591" y="660" width="398" height="172" rx="19" fill="rgba(16,185,129,0.1)"/>
                                    <text x="789" y="716" text-anchor="middle" fill="#10b981" font-size="25">✓ DO THIS:</text>
                                    <text x="789" y="770" text-anchor="middle" fill="#fff" font-size="25">J44.1 only</text>
                                    <text x="789" y="810" text-anchor="middle" fill="#888" font-size="25">Combo code!</text>
                                </svg>`,
                                caption: "Check for combination codes before using separate acute/chronic codes"
                            }
                        },
                        {
                            type: "concept",
                            title: "Rule #3: Combination Codes",
                            content: "A COMBINATION CODE is a single code that captures:\n• A diagnosis WITH a manifestation, OR\n• A diagnosis WITH a complication, OR\n• Two diagnoses, OR\n• A diagnosis WITH an associated secondary process\n\n**THE RULE:**\nAssign only the combination code when one fully describes ALL elements documented. Do NOT assign multiple codes when a combination code exists.\n\n**How to Identify:**\n• Look for 'with' in the code description\n• Look for 'in' subterms in the Index\n• Read Includes/Excludes notes\n\n**Examples:**\n• E11.65 Type 2 diabetes WITH hyperglycemia (one code!)\n• K50.114 Crohn's disease WITH abscess (one code!)\n• J44.1 COPD WITH acute exacerbation (one code!)\n\n**Warning:** Using separate codes when a combination exists is a common audit finding!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">COMBINATION CODES</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">One code captures multiple elements</text>

                                    <!-- What they capture -->
                                    <rect x="55" y="188" width="990" height="235" rx="26" fill="rgba(14,165,233,0.1)" stroke="#0ea5e9"/>
                                    <text x="550" y="251" text-anchor="middle" fill="#0ea5e9" font-size="25">COMBINATION CODES CAPTURE:</text>
                                    <text x="275" y="330" text-anchor="middle" fill="#fff" font-size="25">Diagnosis +</text>
                                    <text x="275" y="377" text-anchor="middle" fill="#fff" font-size="25">Manifestation</text>
                                    <text x="550" y="330" text-anchor="middle" fill="#fff" font-size="25">Diagnosis +</text>
                                    <text x="550" y="377" text-anchor="middle" fill="#fff" font-size="25">Complication</text>
                                    <text x="825" y="330" text-anchor="middle" fill="#fff" font-size="25">Two Related</text>
                                    <text x="825" y="377" text-anchor="middle" fill="#fff" font-size="25">Diagnoses</text>

                                    <!-- Example -->
                                    <rect x="55" y="455" width="467" height="251" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="288" y="518" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25"> WRONG (2 codes)</text>
                                    <text x="288" y="581" text-anchor="middle" fill="#fff" font-size="25">E11.9 Type 2 diabetes</text>
                                    <text x="288" y="628" text-anchor="middle" fill="#fff" font-size="25">R73.9 Hyperglycemia</text>
                                    <text x="288" y="685" text-anchor="middle" fill="#888" font-size="25">Redundant!</text>

                                    <rect x="577" y="455" width="467" height="251" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="811" y="518" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">✓ CORRECT (1 code)</text>
                                    <text x="811" y="597" text-anchor="middle" fill="#fff" font-size="25">E11.65</text>
                                    <text x="811" y="653" text-anchor="middle" fill="#fff" font-size="25">Type 2 DM with</text>
                                    <text x="811" y="691" text-anchor="middle" fill="#fff" font-size="25">hyperglycemia</text>

                                    <!-- How to find -->
                                    <rect x="55" y="738" width="990" height="220" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="801" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">HOW TO IDENTIFY COMBINATION CODES</text>
                                    <text x="275" y="880" text-anchor="middle" fill="#fff" font-size="25">"with" in title</text>
                                    <text x="550" y="880" text-anchor="middle" fill="#fff" font-size="25">"in" subterms</text>
                                    <text x="852" y="880" text-anchor="middle" fill="#fff" font-size="25">Includes notes</text>
                                    <text x="275" y="927" text-anchor="middle" fill="#888" font-size="25">E11.65</text>
                                    <text x="550" y="927" text-anchor="middle" fill="#888" font-size="25">Index lookup</text>
                                    <text x="852" y="927" text-anchor="middle" fill="#888" font-size="25">Tabular List</text>
                                </svg>`,
                                caption: "Look for 'with' and 'in' to find combination codes"
                            }
                        },
                        {
                            type: "concept",
                            title: "Memory Tool: SMART Coding",
                            content: "Remember the general guidelines with SMART:\n\n**S - SPECIFICITY First**\nAlways code to the highest level of detail documented\n\n**M - MANIFESTATIONS Follow**\nCode etiology first, then manifestation (Code First rules)\n\n**A - ACUTE Before Chronic**\nWhen both exist separately, acute comes first\n\n**R - REDUCE with Combinations**\nUse combination codes instead of multiple separate codes\n\n**T - TABULAR is Truth**\nAlways verify in the Tabular List - never trust Index alone\n\n**Say it:** 'Be SMART - Specificity, Manifestations follow, Acute first, Reduce with combos, Tabular is truth!'",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">S M A R T</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">General Guidelines Memory Tool</text>

                                    <!-- S -->
                                    <rect x="55" y="188" width="192" height="267" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="151" y="267" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">S</text>
                                    <text x="151" y="330" text-anchor="middle" fill="#10b981" font-size="25">SPECIFICITY</text>
                                    <text x="151" y="377" text-anchor="middle" fill="#fff" font-size="25">Highest</text>
                                    <text x="151" y="414" text-anchor="middle" fill="#fff" font-size="25">detail</text>

                                    <!-- M -->
                                    <rect x="261" y="188" width="192" height="267" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="357" y="267" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">M</text>
                                    <text x="357" y="330" text-anchor="middle" fill="#f59e0b" font-size="25">MANIFEST</text>
                                    <text x="357" y="377" text-anchor="middle" fill="#fff" font-size="25">Etiology</text>
                                    <text x="357" y="414" text-anchor="middle" fill="#fff" font-size="25">first</text>

                                    <!-- A -->
                                    <rect x="467" y="188" width="192" height="267" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="563" y="267" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">A</text>
                                    <text x="563" y="330" text-anchor="middle" fill="#ef4444" font-size="25">ACUTE</text>
                                    <text x="563" y="377" text-anchor="middle" fill="#fff" font-size="25">Before</text>
                                    <text x="563" y="414" text-anchor="middle" fill="#fff" font-size="25">chronic</text>

                                    <!-- R -->
                                    <rect x="673" y="188" width="192" height="267" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="770" y="267" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">R</text>
                                    <text x="770" y="330" text-anchor="middle" fill="#6366f1" font-size="25">REDUCE</text>
                                    <text x="770" y="377" text-anchor="middle" fill="#fff" font-size="25">Combo</text>
                                    <text x="770" y="414" text-anchor="middle" fill="#fff" font-size="25">codes</text>

                                    <!-- T -->
                                    <rect x="880" y="188" width="192" height="267" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="976" y="267" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">T</text>
                                    <text x="976" y="330" text-anchor="middle" fill="#8b5cf6" font-size="25">TABULAR</text>
                                    <text x="976" y="377" text-anchor="middle" fill="#fff" font-size="25">Always</text>
                                    <text x="976" y="414" text-anchor="middle" fill="#fff" font-size="25">verify</text>

                                    <!-- Phrase -->
                                    <rect x="82" y="502" width="935" height="141" rx="26" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9"/>
                                    <text x="550" y="572" text-anchor="middle" fill="#fff" font-size="25">"Be SMART when coding!"</text>
                                    <text x="550" y="622" text-anchor="middle" fill="#0ea5e9" font-size="25">Specificity • Manifestations • Acute • Reduce • Tabular</text>

                                    <!-- Quick tips -->
                                    <rect x="82" y="675" width="935" height="282" rx="19" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="738" text-anchor="middle" fill="#888" font-size="25">QUICK APPLICATION</text>
                                    <text x="550" y="801" text-anchor="middle" fill="#fff" font-size="25">1. Code most specific first</text>
                                    <text x="550" y="854" text-anchor="middle" fill="#fff" font-size="25">2. Check for "with" combo codes</text>
                                    <text x="550" y="908" text-anchor="middle" fill="#fff" font-size="25">3. Sequence acute → chronic → unspecified</text>
                                </svg>`,
                                caption: "SMART: Your guide to general coding guidelines"
                            }
                        },
                        {
                            type: "quiz",
                            question: "A patient has both acute bronchitis (J20.9) and chronic bronchitis (J42). How should you code this?",
                            options: [
                                { text: "J42 only - chronic is the underlying condition", correct: false },
                                { text: "J20.9 first, then J42 - acute before chronic", correct: true },
                                { text: "J20.9 only - acute is more important", correct: false },
                                { text: "Either order is acceptable", correct: false }
                            ],
                            explanation: "When a patient has both acute and chronic forms of a condition and separate codes exist for each, sequence the ACUTE code first, then the chronic code. Acute conditions generally require more immediate resources and attention. However, always check for a combination code first - if one exists (like J44.1 COPD with acute exacerbation), use that single code instead."
                        },
                        {
                            type: "quiz",
                            question: "Documentation states 'Type 2 diabetes with hyperglycemia.' How should you code this?",
                            options: [
                                { text: "E11.9 (Type 2 DM) + R73.9 (Hyperglycemia)", correct: false },
                                { text: "E11.65 (Type 2 DM with hyperglycemia) - one combination code", correct: true },
                                { text: "R73.9 only - the symptom is what's being treated", correct: false },
                                { text: "E11.9 only - hyperglycemia is assumed", correct: false }
                            ],
                            explanation: "E11.65 is a COMBINATION code that captures both the diabetes and the hyperglycemia in a single code. Using two separate codes (E11.9 + R73.9) would be incorrect and could trigger audit flags. Always look for combination codes when documentation shows 'with' relationships between conditions."
                        },
                        {
                            type: "visual",
                            title: "Lesson 3 Summary: Guidelines Mastered!",
                            content: "You now understand the foundational rules that govern ALL medical coding.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 3 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="785" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">YOU'VE MASTERED:</text>

                                    <text x="165" y="345" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">Code to highest specificity (Golden Rule)</text>

                                    <text x="165" y="424" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">Acute before chronic sequencing</text>

                                    <text x="165" y="502" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">Combination codes vs. multiple codes</text>

                                    <text x="165" y="581" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Official Guidelines structure (Sections I-IV)</text>

                                    <text x="165" y="660" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="660" fill="#fff" font-size="25">SMART mnemonic for guidelines</text>

                                    <text x="165" y="738" fill="#10b981" font-size="31">✓</text>
                                    <text x="233" y="738" fill="#fff" font-size="25">Why unspecified codes should be avoided</text>

                                    <rect x="165" y="817" width="770" height="94" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="880" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: Chapter-Specific Guidelines (1-5) →</text>
                                </svg>`,
                                caption: "These rules apply to EVERY code you assign!"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 4: CHAPTER GUIDELINES (1-5)
                // ========================================
                {
                    id: 4,
                    title: "Chapter Guidelines: Infections to Endocrine",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Chapters 1-5: The Foundation of Disease Coding",
                            content: "Now we dive into CHAPTER-SPECIFIC guidelines. Each chapter has unique rules you must know. Let's cover the first five:\n\n**Chapter 1 (A00-B99): Infectious Diseases**\nBacteria, viruses, parasites - the invaders\n\n**Chapter 2 (C00-D49): Neoplasms**\nCancer and tumors - the abnormal growths\n\n**Chapter 3 (D50-D89): Blood & Immune**\nAnemia, clotting disorders, immune dysfunction\n\n**Chapter 4 (E00-E89): Endocrine & Metabolic**\nDiabetes, thyroid, obesity, nutrition\n\n**Chapter 5 (F01-F99): Mental & Behavioral**\nPsychiatric conditions, substance abuse\n\nEach chapter has critical rules that differ from the general guidelines. Missing these chapter-specific rules is a top cause of coding errors!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">CHAPTERS 1-5 OVERVIEW</text>

                                    <!-- Chapter boxes -->
                                    <rect x="55" y="141" width="302" height="220" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="206" y="204" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">CH 1: A-B</text>
                                    <text x="206" y="257" text-anchor="middle" fill="#fff" font-size="25">Infectious</text>
                                    <text x="206" y="298" text-anchor="middle" fill="#fff" font-size="25">Diseases</text>
                                    <text x="206" y="339" text-anchor="middle" fill="#888" font-size="25"> Infections</text>

                                    <rect x="398" y="141" width="302" height="220" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="550" y="204" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">CH 2: C-D48</text>
                                    <text x="550" y="257" text-anchor="middle" fill="#fff" font-size="25">Neoplasms</text>
                                    <text x="550" y="298" text-anchor="middle" fill="#fff" font-size="25">(Tumors)</text>
                                    <text x="550" y="339" text-anchor="middle" fill="#888" font-size="25"> Cancer</text>

                                    <rect x="742" y="141" width="302" height="220" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="893" y="204" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">CH 3: D50-89</text>
                                    <text x="893" y="257" text-anchor="middle" fill="#fff" font-size="25">Blood &amp;</text>
                                    <text x="893" y="298" text-anchor="middle" fill="#fff" font-size="25">Immune</text>
                                    <text x="893" y="339" text-anchor="middle" fill="#888" font-size="25"> Anemia</text>

                                    <rect x="220" y="392" width="302" height="220" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="371" y="455" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">CH 4: E</text>
                                    <text x="371" y="509" text-anchor="middle" fill="#fff" font-size="25">Endocrine</text>
                                    <text x="371" y="550" text-anchor="middle" fill="#fff" font-size="25">&amp; Metabolic</text>
                                    <text x="371" y="590" text-anchor="middle" fill="#888" font-size="25"> Diabetes</text>

                                    <rect x="577" y="392" width="302" height="220" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="728" y="455" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">CH 5: F</text>
                                    <text x="728" y="509" text-anchor="middle" fill="#fff" font-size="25">Mental</text>
                                    <text x="728" y="550" text-anchor="middle" fill="#fff" font-size="25">&amp; Behavioral</text>
                                    <text x="728" y="590" text-anchor="middle" fill="#888" font-size="25"> Psychiatric</text>

                                    <!-- Why it matters -->
                                    <rect x="82" y="660" width="935" height="235" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="729" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">⚠ WHY CHAPTER GUIDELINES MATTER</text>
                                    <text x="550" y="792" text-anchor="middle" fill="#fff" font-size="25">Each chapter has UNIQUE rules that override general guidelines</text>
                                    <text x="550" y="848" text-anchor="middle" fill="#fff" font-size="25">Missing these = coding errors, claim denials, audit findings</text>
                                </svg>`,
                                caption: "Each chapter has rules you must know"
                            }
                        },
                        {
                            type: "concept",
                            title: "Chapter 1: Infectious Diseases (A00-B99)",
                            content: "**KEY RULES FOR INFECTIONS:**\n\n**1. Organism + Infection Site**\nOften need TWO codes: one for the organism (B95-B97), one for the infection site (J15, etc.)\nExample: Pneumonia due to Strep → J15.4 (includes organism)\nOR: J18.9 (pneumonia) + B95.1 (Strep) if no combo code exists\n\n**2. Sepsis Coding (A40-A41)**\nSepsis requires underlying infection code FIRST when applicable\n• Code systemic infection (A41.9)\n• Then code any acute organ dysfunction (R65.2x for severe sepsis)\n• Use additional codes for organ failures\n\n**3. HIV/AIDS (B20)**\n• Only code B20 if CONFIRMED by provider\n• Inconclusive HIV = R75\n• Asymptomatic HIV = Z21\n\n**4. COVID-19 (U07.1)**\n• Only when confirmed\n• Code associated respiratory or other manifestations additionally",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="28">CHAPTER 1: INFECTIOUS DISEASES</text>

                                    <!-- Sepsis box -->
                                    <rect x="55" y="141" width="481" height="377" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="294" y="204" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">SEPSIS CODING</text>
                                    <text x="82" y="267" fill="#fff" font-size="25">1. Underlying infection</text>
                                    <text x="82" y="314" fill="#fff" font-size="25">2. A41.x Sepsis code</text>
                                    <text x="82" y="361" fill="#fff" font-size="25">3. R65.2x if severe</text>
                                    <text x="82" y="408" fill="#fff" font-size="25">4. Organ failure codes</text>
                                    <rect x="82" y="440" width="426" height="62" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="294" y="487" text-anchor="middle" fill="#fff" font-size="25">SEQUENCE MATTERS!</text>

                                    <!-- HIV box -->
                                    <rect x="563" y="141" width="481" height="377" rx="26" fill="rgba(236,72,153,0.1)" stroke="#ec4899"/>
                                    <text x="803" y="204" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">HIV STATUS CODES</text>
                                    <text x="591" y="282" fill="#10b981" font-size="25">B20 = Confirmed HIV/AIDS</text>
                                    <text x="591" y="345" fill="#f59e0b" font-size="25">R75 = Inconclusive test</text>
                                    <text x="591" y="408" fill="#6366f1" font-size="25">Z21 = Asymptomatic HIV</text>
                                    <text x="591" y="487" fill="#888" font-size="25">Must be provider-confirmed!</text>

                                    <!-- Organism + Site -->
                                    <rect x="55" y="550" width="990" height="204" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="550" y="612" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">ORGANISM + SITE CODING</text>
                                    <text x="110" y="685" fill="#fff" font-size="25">Many infections need 2 codes:</text>
                                    <text x="550" y="685" fill="#10b981" font-size="25">SITE (J-codes)</text>
                                    <text x="783" y="685" fill="#fff" font-size="25">+</text>
                                    <text x="866" y="685" fill="#10b981" font-size="25">ORGANISM (B95-97)</text>
                                    <text x="550" y="732" text-anchor="middle" fill="#888" font-size="25">Unless a combination code exists!</text>

                                    <!-- COVID callout -->
                                    <rect x="55" y="785" width="990" height="172" rx="26" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="550" y="848" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">COVID-19: U07.1</text>
                                    <text x="550" y="911" text-anchor="middle" fill="#fff" font-size="25">Only when confirmed • Add manifestation codes separately</text>
                                </svg>`,
                                caption: "Infections often require multiple codes - check for combos first"
                            }
                        },
                        {
                            type: "concept",
                            title: "Chapter 2: Neoplasms (C00-D49)",
                            content: "**THE NEOPLASM TABLE IS YOUR BEST FRIEND!**\n\nLocate neoplasms using the Neoplasm Table in the Index. It has 6 columns:\n\n**MALIGNANT:**\n• Primary - Where cancer STARTED (most important)\n• Secondary - Where cancer SPREAD to (metastasis)\n• Ca in situ - Pre-invasive cancer (hasn't spread)\n\n**BENIGN:**\n• Non-cancerous tumors\n\n**UNCERTAIN BEHAVIOR:**\n• Pathologist can't determine if malignant/benign\n\n**UNSPECIFIED:**\n• Type not documented\n\n**KEY RULES:**\n1. Code PRIMARY site first, then secondary sites\n2. If primary unknown, use C80.1\n3. Treatment directed at secondary site? Still code primary first\n4. History of cancer = Z85.x (personal history)\n5. Active cancer vs history - crucial distinction!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="28">CHAPTER 2: NEOPLASMS</text>

                                    <!-- Neoplasm Table -->
                                    <rect x="41" y="141" width="1017" height="408" rx="26" fill="rgba(236,72,153,0.1)" stroke="#ec4899"/>
                                    <text x="550" y="204" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">THE NEOPLASM TABLE (6 COLUMNS)</text>

                                    <!-- Headers -->
                                    <rect x="68" y="235" width="151" height="125" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="143" y="289" text-anchor="middle" fill="#fff" font-size="25">PRIMARY</text>
                                    <text x="143" y="330" text-anchor="middle" fill="#888" font-size="25">Origin</text>

                                    <rect x="233" y="235" width="151" height="125" rx="13" fill="rgba(239,68,68,0.2)"/>
                                    <text x="308" y="289" text-anchor="middle" fill="#fff" font-size="25">SECOND</text>
                                    <text x="308" y="330" text-anchor="middle" fill="#888" font-size="25">Metastasis</text>

                                    <rect x="398" y="235" width="151" height="125" rx="13" fill="rgba(245,158,11,0.3)"/>
                                    <text x="473" y="289" text-anchor="middle" fill="#fff" font-size="25">IN SITU</text>
                                    <text x="473" y="330" text-anchor="middle" fill="#888" font-size="25">Pre-invasive</text>

                                    <rect x="563" y="235" width="151" height="125" rx="13" fill="rgba(16,185,129,0.3)"/>
                                    <text x="638" y="289" text-anchor="middle" fill="#fff" font-size="25">BENIGN</text>
                                    <text x="638" y="330" text-anchor="middle" fill="#888" font-size="25">Non-cancer</text>

                                    <rect x="728" y="235" width="151" height="125" rx="13" fill="rgba(139,92,246,0.3)"/>
                                    <text x="803" y="289" text-anchor="middle" fill="#fff" font-size="25">UNCERT</text>
                                    <text x="803" y="330" text-anchor="middle" fill="#888" font-size="25">Unknown</text>

                                    <rect x="893" y="235" width="151" height="125" rx="13" fill="rgba(107,114,128,0.3)"/>
                                    <text x="968" y="289" text-anchor="middle" fill="#fff" font-size="25">UNSPEC</text>
                                    <text x="968" y="330" text-anchor="middle" fill="#888" font-size="25">Not stated</text>

                                    <!-- Malignant label -->
                                    <text x="225" y="408" text-anchor="middle" fill="#ef4444" font-size="25">MALIGNANT →</text>

                                    <!-- Sequencing -->
                                    <rect x="41" y="392" width="495" height="141" rx="19" fill="rgba(239,68,68,0.2)"/>
                                    <text x="288" y="471" text-anchor="middle" fill="#fff" font-size="25">Primary → Secondary</text>
                                    <text x="288" y="518" text-anchor="middle" fill="#888" font-size="25">Always code primary first!</text>

                                    <!-- Key rules -->
                                    <rect x="41" y="581" width="1017" height="440" rx="26" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="644" text-anchor="middle" fill="#fff" font-weight="bold" font-size="25">KEY NEOPLASM RULES</text>

                                    <text x="82" y="722" fill="#10b981" font-size="31">✓</text>
                                    <text x="137" y="722" fill="#fff" font-size="25">Primary FIRST, then secondary (metastatic) sites</text>

                                    <text x="82" y="792" fill="#10b981" font-size="31">✓</text>
                                    <text x="137" y="792" fill="#fff" font-size="25">Unknown primary? Use C80.1</text>

                                    <text x="82" y="861" fill="#10b981" font-size="31">✓</text>
                                    <text x="137" y="861" fill="#fff" font-size="25">History of cancer (no longer present) = Z85.x</text>

                                    <text x="82" y="930" fill="#10b981" font-size="31">✓</text>
                                    <text x="137" y="930" fill="#fff" font-size="25">Current treatment for cancer = active codes (C/D)</text>
                                </svg>`,
                                caption: "Use the Neoplasm Table - always code primary site first"
                            }
                        },
                        {
                            type: "concept",
                            title: "Chapter 4: Endocrine - DIABETES (E08-E13)",
                            content: "**DIABETES IS THE #1 TESTED TOPIC!**\n\nDiabetes codes are organized by TYPE and COMPLICATION:\n\n**DIABETES TYPES:**\n• E08 - Due to underlying condition (code underlying first!)\n• E09 - Drug/chemical induced\n• E10 - Type 1 (juvenile, insulin-dependent)\n• E11 - Type 2 (adult onset, most common)\n• E13 - Other specified\n\n**4TH-6TH CHARACTERS = COMPLICATIONS:**\n• .2x - Kidney complications\n• .3x - Eye complications\n• .4x - Neurological complications\n• .5x - Circulatory complications\n• .6x - Other specified complications\n• .65 - With hyperglycemia\n• .69 - With other complication\n\n**GOLDEN RULES:**\n1. Use as MANY codes as needed to describe ALL complications\n2. 'With' = assumed relationship (no 'due to' needed)\n3. Type not documented? Default to E11 (Type 2)",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">DIABETES CODING (E08-E13)</text>
                                    <text x="550" y="132" text-anchor="middle" fill="#888" font-size="25">#1 Most Tested Topic!</text>

                                    <!-- Type selector -->
                                    <rect x="41" y="172" width="1017" height="282" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="550" y="235" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">STEP 1: IDENTIFY THE TYPE</text>

                                    <rect x="68" y="267" width="178" height="157" rx="13" fill="rgba(239,68,68,0.2)"/>
                                    <text x="156" y="320" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">E08</text>
                                    <text x="156" y="370" text-anchor="middle" fill="#fff" font-size="25">Underlying</text>
                                    <text x="156" y="402" text-anchor="middle" fill="#fff" font-size="25">condition</text>

                                    <rect x="261" y="267" width="178" height="157" rx="13" fill="rgba(245,158,11,0.2)"/>
                                    <text x="349" y="320" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">E09</text>
                                    <text x="349" y="370" text-anchor="middle" fill="#fff" font-size="25">Drug/</text>
                                    <text x="349" y="402" text-anchor="middle" fill="#fff" font-size="25">chemical</text>

                                    <rect x="453" y="267" width="178" height="157" rx="13" fill="rgba(59,130,246,0.2)"/>
                                    <text x="541" y="320" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">E10</text>
                                    <text x="541" y="370" text-anchor="middle" fill="#fff" font-size="25">Type 1</text>
                                    <text x="541" y="402" text-anchor="middle" fill="#fff" font-size="25">(juvenile)</text>

                                    <rect x="646" y="267" width="178" height="157" rx="13" fill="rgba(16,185,129,0.4)" stroke="#10b981" stroke-width="7"/>
                                    <text x="734" y="320" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">E11</text>
                                    <text x="734" y="370" text-anchor="middle" fill="#fff" font-size="25">Type 2</text>
                                    <text x="734" y="402" text-anchor="middle" fill="#10b981" font-size="25">DEFAULT!</text>

                                    <rect x="838" y="267" width="178" height="157" rx="13" fill="rgba(139,92,246,0.2)"/>
                                    <text x="926" y="320" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">E13</text>
                                    <text x="926" y="370" text-anchor="middle" fill="#fff" font-size="25">Other</text>
                                    <text x="926" y="402" text-anchor="middle" fill="#fff" font-size="25">specified</text>

                                    <!-- Complications -->
                                    <rect x="41" y="487" width="1017" height="314" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="550" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">STEP 2: ADD COMPLICATIONS (4th-6th characters)</text>

                                    <text x="206" y="628" text-anchor="middle" fill="#fff" font-size="25">.2x Kidney</text>
                                    <text x="426" y="628" text-anchor="middle" fill="#fff" font-size="25">.3x Eye</text>
                                    <text x="646" y="628" text-anchor="middle" fill="#fff" font-size="25">.4x Neuro</text>
                                    <text x="893" y="628" text-anchor="middle" fill="#fff" font-size="25">.5x Circ</text>

                                    <text x="316" y="707" text-anchor="middle" fill="#fff" font-size="25">.6x Other</text>
                                    <text x="550" y="707" text-anchor="middle" fill="#10b981" font-size="25">.65 Hyperglycemia</text>
                                    <text x="811" y="707" text-anchor="middle" fill="#fff" font-size="25">.69 Other complication</text>

                                    <text x="550" y="779" text-anchor="middle" fill="#888" font-size="25">Use MULTIPLE codes for multiple complications!</text>

                                    <!-- Golden rules -->
                                    <rect x="41" y="832" width="1017" height="188" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="550" y="895" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">⚡ "WITH" = ASSUMED CAUSAL RELATIONSHIP</text>
                                    <text x="550" y="952" text-anchor="middle" fill="#fff" font-size="25">If documentation says "diabetes with CKD" → E11.22</text>
                                    <text x="550" y="999" text-anchor="middle" fill="#888" font-size="25">No need for provider to write "due to" - it's assumed!</text>
                                </svg>`,
                                caption: "Type + Complications = Complete diabetes coding"
                            }
                        },
                        {
                            type: "concept",
                            title: "Memory Tool: INSIDE for Chapters 1-5",
                            content: "Remember key rules for Chapters 1-5 with INSIDE:\n\n**I - INFECTIONS need organism codes**\nB95-B97 for bacterial/viral identification\n\n**N - NEOPLASMS: Primary first**\nAlways sequence primary site before secondary\n\n**S - SEPSIS sequencing**\nUnderlying infection → Sepsis → Severity → Organ dysfunction\n\n**I - INSULIN doesn't determine type**\nType 1 vs Type 2 based on TYPE, not treatment\n\n**D - DIABETES 'with' = assumed**\nCausal relationship assumed, no 'due to' needed\n\n**E - E11 is default**\nType not specified? Default to Type 2 (E11)\n\n**Say it:** 'Look INSIDE for chapter-specific rules!'",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="31">I N S I D E</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">Chapters 1-5 Memory Tool</text>

                                    <!-- Letters -->
                                    <rect x="41" y="188" width="165" height="251" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="123" y="267" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">I</text>
                                    <text x="123" y="320" text-anchor="middle" fill="#ef4444" font-size="25">INFECTIONS</text>
                                    <text x="123" y="361" text-anchor="middle" fill="#fff" font-size="25">Need</text>
                                    <text x="123" y="392" text-anchor="middle" fill="#fff" font-size="25">organism</text>
                                    <text x="123" y="424" text-anchor="middle" fill="#888" font-size="25">B95-97</text>

                                    <rect x="220" y="188" width="165" height="251" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="302" y="267" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="42">N</text>
                                    <text x="302" y="320" text-anchor="middle" fill="#ec4899" font-size="25">NEOPLASM</text>
                                    <text x="302" y="361" text-anchor="middle" fill="#fff" font-size="25">Primary</text>
                                    <text x="302" y="392" text-anchor="middle" fill="#fff" font-size="25">site</text>
                                    <text x="302" y="424" text-anchor="middle" fill="#888" font-size="25">first</text>

                                    <rect x="398" y="188" width="165" height="251" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="481" y="267" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">S</text>
                                    <text x="481" y="320" text-anchor="middle" fill="#f59e0b" font-size="25">SEPSIS</text>
                                    <text x="481" y="361" text-anchor="middle" fill="#fff" font-size="25">Sequence</text>
                                    <text x="481" y="392" text-anchor="middle" fill="#fff" font-size="25">infection</text>
                                    <text x="481" y="424" text-anchor="middle" fill="#888" font-size="25">→sepsis→organ</text>

                                    <rect x="577" y="188" width="165" height="251" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="660" y="267" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">I</text>
                                    <text x="660" y="320" text-anchor="middle" fill="#6366f1" font-size="25">INSULIN</text>
                                    <text x="660" y="361" text-anchor="middle" fill="#fff" font-size="25">Doesn't</text>
                                    <text x="660" y="392" text-anchor="middle" fill="#fff" font-size="25">define</text>
                                    <text x="660" y="424" text-anchor="middle" fill="#888" font-size="25">type</text>

                                    <rect x="756" y="188" width="165" height="251" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="838" y="267" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">D</text>
                                    <text x="838" y="320" text-anchor="middle" fill="#10b981" font-size="25">DIABETES</text>
                                    <text x="838" y="361" text-anchor="middle" fill="#fff" font-size="25">"With"</text>
                                    <text x="838" y="392" text-anchor="middle" fill="#fff" font-size="25">=assumed</text>
                                    <text x="838" y="424" text-anchor="middle" fill="#888" font-size="25">causal</text>

                                    <rect x="935" y="188" width="137" height="251" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="1003" y="267" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">E</text>
                                    <text x="1003" y="320" text-anchor="middle" fill="#8b5cf6" font-size="25">E11</text>
                                    <text x="1003" y="361" text-anchor="middle" fill="#fff" font-size="25">Default</text>
                                    <text x="1003" y="392" text-anchor="middle" fill="#fff" font-size="25">Type 2</text>
                                    <text x="1003" y="424" text-anchor="middle" fill="#888" font-size="25">diabetes</text>

                                    <!-- Phrase -->
                                    <rect x="82" y="487" width="935" height="141" rx="26" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9"/>
                                    <text x="550" y="559" text-anchor="middle" fill="#fff" font-size="25">"Look INSIDE for chapter-specific rules!"</text>
                                    <text x="550" y="612" text-anchor="middle" fill="#0ea5e9" font-size="25">Infections • Neoplasms • Sepsis • Insulin • Diabetes • E11</text>

                                    <!-- Quick ref -->
                                    <rect x="82" y="660" width="935" height="298" rx="19" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="722" text-anchor="middle" fill="#888" font-size="25">QUICK REFERENCE</text>
                                    <text x="550" y="792" text-anchor="middle" fill="#ef4444" font-size="25">Sepsis: Infection → A41.x → R65.2x → Organ codes</text>
                                    <text x="550" y="854" text-anchor="middle" fill="#ec4899" font-size="25">Cancer: Primary C-code → Secondary C-codes → Z85 history</text>
                                    <text x="550" y="917" text-anchor="middle" fill="#10b981" font-size="25">Diabetes: E11 default + .xx for each complication</text>
                                </svg>`,
                                caption: "INSIDE: Your guide to Chapters 1-5"
                            }
                        },
                        {
                            type: "quiz",
                            question: "Documentation states 'Type 2 diabetes with diabetic nephropathy.' What code(s) should be assigned?",
                            options: [
                                { text: "E11.9 (Type 2 DM) + N18.9 (CKD unspecified)", correct: false },
                                { text: "E11.22 (Type 2 DM with diabetic CKD) - one combination code", correct: true },
                                { text: "N18.9 only - the kidney disease is the main problem", correct: false },
                                { text: "E11.9 only - nephropathy is assumed", correct: false }
                            ],
                            explanation: "E11.22 is the combination code for 'Type 2 diabetes mellitus with diabetic chronic kidney disease.' The guideline states that 'with' in the diabetes codes indicates an assumed causal relationship, so no additional documentation is needed to link the conditions. Always look for the combination code first!"
                        },
                        {
                            type: "quiz",
                            question: "A patient has lung cancer with metastasis to the brain. How should this be coded?",
                            options: [
                                { text: "C79.31 (brain metastasis) only - that's where treatment is directed", correct: false },
                                { text: "C34.90 (lung primary) first, then C79.31 (brain secondary)", correct: true },
                                { text: "C79.31 first, then C34.90 - brain is more serious", correct: false },
                                { text: "C80.1 (unknown primary) + C79.31", correct: false }
                            ],
                            explanation: "ALWAYS code the PRIMARY cancer site FIRST (C34.90 lung), then the SECONDARY/metastatic site(s) (C79.31 brain). This rule applies even if treatment is directed at the metastatic site. The primary site tells the story of where the cancer originated, which is crucial for treatment planning and statistics."
                        },
                        {
                            type: "visual",
                            title: "Lesson 4 Complete!",
                            content: "You've mastered the chapter-specific guidelines for Chapters 1-5!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 4 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="722" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">CHAPTERS 1-5 MASTERED:</text>

                                    <text x="165" y="345" fill="#ef4444" font-size="28">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">Ch1: Infections - Sepsis sequencing, HIV rules</text>

                                    <text x="165" y="424" fill="#ec4899" font-size="28">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">Ch2: Neoplasms - Primary before secondary</text>

                                    <text x="165" y="502" fill="#8b5cf6" font-size="28">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">Ch3: Blood/Immune basics</text>

                                    <text x="165" y="581" fill="#10b981" font-size="28">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Ch4: Diabetes types and complications</text>

                                    <text x="165" y="660" fill="#6366f1" font-size="28">✓</text>
                                    <text x="233" y="660" fill="#fff" font-size="25">Ch5: Mental/Behavioral overview</text>

                                    <text x="165" y="738" fill="#f59e0b" font-size="28">✓</text>
                                    <text x="233" y="738" fill="#fff" font-size="25">INSIDE mnemonic for quick recall</text>

                                    <rect x="165" y="785" width="770" height="78" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="839" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: Chapters 6-10 Guidelines →</text>
                                </svg>`,
                                caption: "Great progress through the chapter guidelines!"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 5: CHAPTER GUIDELINES (6-10)
                // ========================================
                {
                    id: 5,
                    title: "Chapter Guidelines: Nervous to Respiratory",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Chapters 6-10: The Body Systems",
                            content: "Now we tackle the major body system chapters - these are HIGH-VOLUME codes you'll use daily!\n\n**Chapter 6 (G00-G99): Nervous System**\nBrain, spinal cord, nerves - strokes, epilepsy, migraines\n\n**Chapter 7 (H00-H59): Eye & Adnexa**\nCataracts, glaucoma, retinal conditions\n\n**Chapter 8 (H60-H95): Ear & Mastoid**\nHearing loss, otitis, vertigo\n\n**Chapter 9 (I00-I99): Circulatory System**\nHeart disease, hypertension, strokes - #1 cause of death!\n\n**Chapter 10 (J00-J99): Respiratory System**\nPneumonia, COPD, asthma, COVID complications\n\nChapters 9 and 10 are among the MOST COMMONLY CODED - master these!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">CHAPTERS 6-10: BODY SYSTEMS</text>

                                    <rect x="55" y="141" width="302" height="204" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="206" y="204" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">CH 6: G</text>
                                    <text x="206" y="257" text-anchor="middle" fill="#fff" font-size="25">Nervous System</text>
                                    <text x="206" y="320" text-anchor="middle" fill="#888" font-size="25">⚡ Brain/Nerves</text>

                                    <rect x="398" y="141" width="302" height="204" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="550" y="204" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">CH 7: H00-59</text>
                                    <text x="550" y="257" text-anchor="middle" fill="#fff" font-size="25">Eye &amp; Adnexa</text>
                                    <text x="550" y="320" text-anchor="middle" fill="#888" font-size="25"> Vision</text>

                                    <rect x="742" y="141" width="302" height="204" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="893" y="204" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">CH 8: H60-95</text>
                                    <text x="893" y="257" text-anchor="middle" fill="#fff" font-size="25">Ear &amp; Mastoid</text>
                                    <text x="893" y="320" text-anchor="middle" fill="#888" font-size="25"> Hearing</text>

                                    <rect x="220" y="377" width="302" height="204" rx="19" fill="rgba(239,68,68,0.2)" stroke="#ef4444" stroke-width="7"/>
                                    <text x="371" y="440" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">CH 9: I</text>
                                    <text x="371" y="493" text-anchor="middle" fill="#fff" font-size="25">Circulatory</text>
                                    <text x="371" y="556" text-anchor="middle" fill="#ef4444" font-size="25"> #1 CODED!</text>

                                    <rect x="577" y="377" width="302" height="204" rx="19" fill="rgba(20,184,166,0.2)" stroke="#10b981" stroke-width="7"/>
                                    <text x="728" y="440" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">CH 10: J</text>
                                    <text x="728" y="493" text-anchor="middle" fill="#fff" font-size="25">Respiratory</text>
                                    <text x="728" y="556" text-anchor="middle" fill="#10b981" font-size="25"> HIGH VOLUME!</text>

                                    <rect x="82" y="628" width="935" height="267" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="550" y="697" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">⚡ HIGH-FREQUENCY CHAPTERS</text>
                                    <text x="550" y="770" text-anchor="middle" fill="#fff" font-size="25">Circulatory (I) = Heart attacks, HTN, heart failure, strokes</text>
                                    <text x="550" y="832" text-anchor="middle" fill="#fff" font-size="25">Respiratory (J) = Pneumonia, COPD, asthma, COVID</text>
                                    <text x="550" y="880" text-anchor="middle" fill="#888" font-size="25">Master these - you'll code them DAILY!</text>
                                </svg>`,
                                caption: "Chapters 9 and 10 are the highest-volume codes"
                            }
                        },
                        {
                            type: "concept",
                            title: "Chapter 9: Circulatory System (I00-I99)",
                            content: "**THE MOST IMPORTANT CHAPTER FOR INPATIENT CODING!**\n\n**HYPERTENSION (I10-I16):**\n• I10 = Essential (primary) hypertension - most common\n• Hypertensive heart disease: I11.x (use 'with' relationship)\n• Hypertensive CKD: I12.x (assumed relationship!)\n• Both heart + CKD: I13.x combination codes\n\n**HEART FAILURE (I50):**\n• Systolic, diastolic, or combined\n• Acute, chronic, or acute on chronic\n• Left, right, or biventricular\n\n**MYOCARDIAL INFARCTION:**\n• STEMI vs NSTEMI (Type 1 vs Type 2)\n• Initial (first 4 weeks) vs Subsequent\n• Current vs Old/healed MI\n\n**KEY RULE:** Hypertension with heart disease or CKD has an ASSUMED causal relationship - code as hypertensive disease unless documentation states otherwise!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="28">CHAPTER 9: CIRCULATORY SYSTEM</text>

                                    <!-- HTN Section -->
                                    <rect x="41" y="141" width="495" height="408" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="288" y="204" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">HYPERTENSION</text>
                                    <text x="68" y="267" fill="#fff" font-size="25">I10 = Essential HTN</text>
                                    <text x="68" y="320" fill="#fff" font-size="25">I11.x = HTN + Heart disease</text>
                                    <text x="68" y="374" fill="#fff" font-size="25">I12.x = HTN + CKD</text>
                                    <text x="68" y="427" fill="#fff" font-size="25">I13.x = HTN + Heart + CKD</text>
                                    <rect x="68" y="465" width="440" height="62" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="288" y="509" text-anchor="middle" fill="#fff" font-size="25">"WITH" = ASSUMED!</text>

                                    <!-- Heart Failure -->
                                    <rect x="563" y="141" width="495" height="408" rx="26" fill="rgba(236,72,153,0.1)" stroke="#ec4899"/>
                                    <text x="811" y="204" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">HEART FAILURE (I50)</text>
                                    <text x="591" y="276" fill="#fff" font-size="25">Type: Systolic/Diastolic/Both</text>
                                    <text x="591" y="339" fill="#fff" font-size="25">Timing: Acute/Chronic/AOC</text>
                                    <text x="591" y="402" fill="#fff" font-size="25">Side: Left/Right/Both</text>
                                    <text x="591" y="487" fill="#888" font-size="25">Multiple aspects = Multiple codes</text>
                                    <text x="591" y="528" fill="#888" font-size="25">if needed for specificity</text>

                                    <!-- MI Section -->
                                    <rect x="41" y="581" width="1017" height="251" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="550" y="644" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">MYOCARDIAL INFARCTION (MI)</text>

                                    <rect x="82" y="685" width="275" height="125" rx="13" fill="rgba(239,68,68,0.2)"/>
                                    <text x="220" y="738" text-anchor="middle" fill="#ef4444" font-size="25">STEMI</text>
                                    <text x="220" y="785" text-anchor="middle" fill="#fff" font-size="25">I21.0-I21.3</text>

                                    <rect x="398" y="685" width="275" height="125" rx="13" fill="rgba(245,158,11,0.2)"/>
                                    <text x="536" y="738" text-anchor="middle" fill="#f59e0b" font-size="25">NSTEMI</text>
                                    <text x="536" y="785" text-anchor="middle" fill="#fff" font-size="25">I21.4</text>

                                    <rect x="715" y="685" width="302" height="125" rx="13" fill="rgba(107,114,128,0.2)"/>
                                    <text x="866" y="738" text-anchor="middle" fill="#888" font-size="25">Old MI</text>
                                    <text x="866" y="785" text-anchor="middle" fill="#fff" font-size="25">I25.2 (healed)</text>

                                    <!-- Key rule -->
                                    <rect x="41" y="864" width="1017" height="157" rx="26" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
                                    <text x="550" y="927" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">KEY RULE: HTN + Heart/CKD = Assumed Causal Relationship</text>
                                    <text x="550" y="980" text-anchor="middle" fill="#fff" font-size="25">Code as hypertensive disease (I11, I12, I13) unless docs state otherwise</text>
                                </svg>`,
                                caption: "Hypertension relationships are ASSUMED - use combination codes"
                            }
                        },
                        {
                            type: "concept",
                            title: "Chapter 10: Respiratory System (J00-J99)",
                            content: "**HIGH-VOLUME CHAPTER - Especially Post-COVID!**\n\n**PNEUMONIA:**\n• Code the ORGANISM if known (J13-J16)\n• Unspecified organism = J18.9\n• Add organism code (B95-B97) if not in primary code\n\n**COPD (J44):**\n• J44.0 - with acute lower respiratory infection\n• J44.1 - with acute exacerbation\n• J44.9 - unspecified (avoid if possible!)\n• COPD + Asthma? Can code both if documented\n\n**ASTHMA (J45):**\n• By severity: mild, moderate, severe\n• By control: intermittent, persistent\n• With exacerbation or status asthmaticus\n\n**RESPIRATORY FAILURE (J96):**\n• Acute vs Chronic vs Acute-on-Chronic\n• Hypoxic (Type 1) vs Hypercapnic (Type 2)\n• Often a secondary diagnosis - check sequencing rules",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">CHAPTER 10: RESPIRATORY SYSTEM</text>

                                    <!-- Pneumonia -->
                                    <rect x="41" y="141" width="495" height="314" rx="26" fill="rgba(59,130,246,0.1)" stroke="#6366f1"/>
                                    <text x="288" y="204" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">PNEUMONIA</text>
                                    <text x="68" y="267" fill="#fff" font-size="25">Known organism → J13-J16</text>
                                    <text x="68" y="320" fill="#fff" font-size="25">Unknown → J18.9 + B95-B97</text>
                                    <text x="68" y="374" fill="#888" font-size="25">Always identify organism if possible!</text>
                                    <text x="68" y="424" fill="#888" font-size="25">Aspiration pneumonia = J69.x</text>

                                    <!-- COPD -->
                                    <rect x="563" y="141" width="495" height="314" rx="26" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="811" y="204" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">COPD (J44)</text>
                                    <text x="591" y="267" fill="#fff" font-size="25">.0 = with infection</text>
                                    <text x="591" y="314" fill="#fff" font-size="25">.1 = with exacerbation</text>
                                    <text x="591" y="361" fill="#fff" font-size="25">.9 = unspecified</text>
                                    <text x="591" y="424" fill="#10b981" font-size="25">COPD + Asthma = Both OK!</text>

                                    <!-- Asthma -->
                                    <rect x="41" y="487" width="495" height="282" rx="26" fill="rgba(245,158,11,0.1)" stroke="#f59e0b"/>
                                    <text x="288" y="550" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">ASTHMA (J45)</text>
                                    <text x="68" y="612" fill="#fff" font-size="25">Mild → Moderate → Severe</text>
                                    <text x="68" y="660" fill="#fff" font-size="25">Intermittent vs Persistent</text>
                                    <text x="68" y="707" fill="#fff" font-size="25">+ Exacerbation or Status</text>
                                    <text x="68" y="754" fill="#888" font-size="25">5th char = severity</text>

                                    <!-- Resp Failure -->
                                    <rect x="563" y="487" width="495" height="282" rx="26" fill="rgba(239,68,68,0.1)" stroke="#ef4444"/>
                                    <text x="811" y="550" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">RESP FAILURE (J96)</text>
                                    <text x="591" y="612" fill="#fff" font-size="25">Acute / Chronic / AOC</text>
                                    <text x="591" y="660" fill="#fff" font-size="25">Type 1 (hypoxic)</text>
                                    <text x="591" y="707" fill="#fff" font-size="25">Type 2 (hypercapnic)</text>
                                    <text x="591" y="754" fill="#888" font-size="25">Check sequencing rules!</text>

                                    <!-- COVID note -->
                                    <rect x="41" y="801" width="1017" height="220" rx="26" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="550" y="864" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">COVID-19 RESPIRATORY MANIFESTATIONS</text>
                                    <text x="550" y="927" text-anchor="middle" fill="#fff" font-size="25">U07.1 (COVID) + J respiratory codes for manifestations</text>
                                    <text x="550" y="980" text-anchor="middle" fill="#888" font-size="25">J12.82 = COVID pneumonia | J96.x = Respiratory failure</text>
                                </svg>`,
                                caption: "Respiratory codes require organism identification when possible"
                            }
                        },
                        {
                            type: "concept",
                            title: "Memory Tool: HEARTS for Chapters 6-10",
                            content: "Remember key rules for Chapters 6-10 with HEARTS:\n\n**H - HYPERTENSION assumes relationships**\nHTN + heart disease or CKD = combo codes (I11, I12, I13)\n\n**E - EYE laterality required**\nAlways code right, left, or bilateral (H00-H59)\n\n**A - ACUTE MI timing matters**\nInitial (≤4 weeks) vs subsequent vs old/healed\n\n**R - RESPIRATORY organism identification**\nCode the organism when known for pneumonia\n\n**T - TYPE of heart failure**\nSystolic, diastolic, combined - get specific!\n\n**S - SEVERITY for asthma**\nMild, moderate, severe + intermittent/persistent\n\n**Say it:** 'Code with your HEARTS - Hypertension, Eye laterality, Acute MI, Respiratory organisms, Type, Severity!'",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="31">H E A R T S</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">Chapters 6-10 Memory Tool</text>

                                    <!-- Letters -->
                                    <rect x="41" y="188" width="165" height="251" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="123" y="267" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="42">H</text>
                                    <text x="123" y="314" text-anchor="middle" fill="#ef4444" font-size="25">HTN</text>
                                    <text x="123" y="352" text-anchor="middle" fill="#fff" font-size="25">Assumed</text>
                                    <text x="123" y="383" text-anchor="middle" fill="#fff" font-size="25">relationship</text>
                                    <text x="123" y="421" text-anchor="middle" fill="#888" font-size="25">I11/I12/I13</text>

                                    <rect x="220" y="188" width="165" height="251" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="302" y="267" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="42">E</text>
                                    <text x="302" y="314" text-anchor="middle" fill="#6366f1" font-size="25">EYE</text>
                                    <text x="302" y="352" text-anchor="middle" fill="#fff" font-size="25">Laterality</text>
                                    <text x="302" y="383" text-anchor="middle" fill="#fff" font-size="25">required</text>
                                    <text x="302" y="421" text-anchor="middle" fill="#888" font-size="25">R/L/Bilateral</text>

                                    <rect x="398" y="188" width="165" height="251" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="481" y="267" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="42">A</text>
                                    <text x="481" y="314" text-anchor="middle" fill="#f59e0b" font-size="25">ACUTE MI</text>
                                    <text x="481" y="352" text-anchor="middle" fill="#fff" font-size="25">Timing</text>
                                    <text x="481" y="383" text-anchor="middle" fill="#fff" font-size="25">matters</text>
                                    <text x="481" y="421" text-anchor="middle" fill="#888" font-size="25">≤4 wks=initial</text>

                                    <rect x="577" y="188" width="165" height="251" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="660" y="267" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="42">R</text>
                                    <text x="660" y="314" text-anchor="middle" fill="#10b981" font-size="25">RESP</text>
                                    <text x="660" y="352" text-anchor="middle" fill="#fff" font-size="25">Organism</text>
                                    <text x="660" y="383" text-anchor="middle" fill="#fff" font-size="25">when known</text>
                                    <text x="660" y="421" text-anchor="middle" fill="#888" font-size="25">J13-J16</text>

                                    <rect x="756" y="188" width="165" height="251" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="838" y="267" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="42">T</text>
                                    <text x="838" y="314" text-anchor="middle" fill="#ec4899" font-size="25">TYPE</text>
                                    <text x="838" y="352" text-anchor="middle" fill="#fff" font-size="25">Heart</text>
                                    <text x="838" y="383" text-anchor="middle" fill="#fff" font-size="25">failure</text>
                                    <text x="838" y="421" text-anchor="middle" fill="#888" font-size="25">Sys/Dia/Both</text>

                                    <rect x="935" y="188" width="137" height="251" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="1003" y="267" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="42">S</text>
                                    <text x="1003" y="314" text-anchor="middle" fill="#8b5cf6" font-size="25">SEVERITY</text>
                                    <text x="1003" y="352" text-anchor="middle" fill="#fff" font-size="25">Asthma</text>
                                    <text x="1003" y="383" text-anchor="middle" fill="#fff" font-size="25">level</text>
                                    <text x="1003" y="421" text-anchor="middle" fill="#888" font-size="25">Mild/Mod/Sev</text>

                                    <!-- Phrase -->
                                    <rect x="82" y="487" width="935" height="141" rx="26" fill="rgba(239,68,68,0.2)" stroke="#ef4444"/>
                                    <text x="550" y="559" text-anchor="middle" fill="#fff" font-size="25">"Code with your HEARTS!"</text>
                                    <text x="550" y="612" text-anchor="middle" fill="#ef4444" font-size="25">HTN • Eye • Acute MI • Respiratory • Type • Severity</text>

                                    <!-- Quick ref -->
                                    <rect x="82" y="660" width="935" height="298" rx="19" fill="rgba(255,255,255,0.05)"/>
                                    <text x="550" y="722" text-anchor="middle" fill="#888" font-size="25">QUICK REFERENCE</text>
                                    <text x="550" y="792" text-anchor="middle" fill="#ef4444" font-size="25">HTN + Heart/CKD → I11, I12, or I13 (combo codes)</text>
                                    <text x="550" y="854" text-anchor="middle" fill="#10b981" font-size="25">Pneumonia → Identify organism! J13-J16 or J18+B95-97</text>
                                    <text x="550" y="917" text-anchor="middle" fill="#f59e0b" font-size="25">MI → STEMI (I21.0-3), NSTEMI (I21.4), Old (I25.2)</text>
                                </svg>`,
                                caption: "HEARTS: Your guide to Chapters 6-10"
                            }
                        },
                        {
                            type: "quiz",
                            question: "A patient has hypertension and heart failure. How should this be coded?",
                            options: [
                                { text: "I10 (HTN) + I50.9 (Heart failure) - two separate codes", correct: false },
                                { text: "I11.0 (Hypertensive heart disease with heart failure) - one combination code", correct: true },
                                { text: "I50.9 only - heart failure is more serious", correct: false },
                                { text: "I10 only - hypertension is the underlying cause", correct: false }
                            ],
                            explanation: "There is an ASSUMED causal relationship between hypertension and heart disease! When a patient has both HTN and heart failure, use I11.0 (Hypertensive heart disease with heart failure) as a combination code. This is different from diabetes where 'with' must be in the documentation - for HTN, the relationship is assumed unless documented otherwise."
                        },
                        {
                            type: "quiz",
                            question: "A patient has pneumonia due to Streptococcus. What code(s) should be assigned?",
                            options: [
                                { text: "J18.9 (Pneumonia, unspecified)", correct: false },
                                { text: "J15.4 (Pneumonia due to other streptococci)", correct: true },
                                { text: "J18.9 + B95.4 (two codes needed)", correct: false },
                                { text: "B95.4 only (organism code)", correct: false }
                            ],
                            explanation: "When the organism is known, use the specific pneumonia code that identifies the organism - J15.4 (Pneumonia due to other streptococci). This is a combination code that includes both the pneumonia and the organism. Only use separate codes (J18.9 + B95.x) when a combination code doesn't exist."
                        },
                        {
                            type: "visual",
                            title: "Lesson 5 Complete!",
                            content: "You've mastered the high-volume body system chapters!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 5 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="722" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">CHAPTERS 6-10 MASTERED:</text>

                                    <text x="165" y="345" fill="#8b5cf6" font-size="28">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">Ch6: Nervous system basics</text>

                                    <text x="165" y="424" fill="#6366f1" font-size="28">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">Ch7-8: Eye/Ear laterality requirements</text>

                                    <text x="165" y="502" fill="#ef4444" font-size="28">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">Ch9: HTN assumed relationships</text>

                                    <text x="165" y="581" fill="#10b981" font-size="28">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Ch10: Respiratory organism coding</text>

                                    <text x="165" y="660" fill="#f59e0b" font-size="28">✓</text>
                                    <text x="233" y="660" fill="#fff" font-size="25">MI timing and heart failure types</text>

                                    <text x="165" y="738" fill="#ec4899" font-size="28">✓</text>
                                    <text x="233" y="738" fill="#fff" font-size="25">HEARTS mnemonic for quick recall</text>

                                    <rect x="165" y="785" width="770" height="78" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="839" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: Injuries & External Causes →</text>
                                </svg>`,
                                caption: "Great work on the body system chapters!"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 6: INJURIES & EXTERNAL CAUSES
                // ========================================
                {
                    id: 6,
                    title: "Injuries & External Causes (S-T, V-Y Codes)",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Chapter 19 & 20: Injuries Tell a Complete Story",
                            content: "Injury coding is DIFFERENT from disease coding. Every injury requires you to answer THREE questions:\n\n**1. WHAT happened? (S/T codes)**\n• S codes = Specific body region injuries\n• T codes = Burns, poisonings, complications, multiple body regions\n\n**2. HOW did it happen? (V-Y codes)**\n• V = Transport accidents\n• W = Falls, exposures\n• X = Assaults, self-harm, undetermined\n• Y = Complications of care\n\n**3. WHERE did it happen? (Place of occurrence - Y93)**\n• Home, work, school, sports facility, etc.\n\n**4. WHAT was the patient doing? (Activity - Y93)**\n• Walking, running, sports, leisure, etc.\n\n**CRITICAL:** S/T codes require a 7th character extension!\n• A = Initial encounter\n• D = Subsequent encounter\n• S = Sequela",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="28">INJURY CODING: THE COMPLETE STORY</text>

                                    <!-- Four Questions -->
                                    <rect x="41" y="141" width="495" height="204" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="288" y="204" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">1. WHAT? (S/T)</text>
                                    <text x="68" y="267" fill="#fff" font-size="25">S = Body region injuries</text>
                                    <text x="68" y="314" fill="#fff" font-size="25">T = Burns, poisoning, multi</text>

                                    <rect x="563" y="141" width="495" height="204" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="811" y="204" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">2. HOW? (V-Y)</text>
                                    <text x="591" y="267" fill="#fff" font-size="25">V = Transport accidents</text>
                                    <text x="591" y="314" fill="#fff" font-size="25">W/X/Y = Falls, assaults, etc</text>

                                    <rect x="41" y="377" width="495" height="204" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="288" y="440" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">3. WHERE? (Y92)</text>
                                    <text x="68" y="502" fill="#fff" font-size="25">Place of occurrence</text>
                                    <text x="68" y="550" fill="#fff" font-size="25">Home, work, school, etc</text>

                                    <rect x="563" y="377" width="495" height="204" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="811" y="440" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">4. DOING WHAT? (Y93)</text>
                                    <text x="591" y="502" fill="#fff" font-size="25">Activity at time of injury</text>
                                    <text x="591" y="550" fill="#fff" font-size="25">Sports, work, leisure</text>

                                    <!-- 7th Character -->
                                    <rect x="41" y="612" width="1017" height="345" rx="26" fill="rgba(59,130,246,0.15)" stroke="#6366f1" stroke-width="7"/>
                                    <text x="550" y="685" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="28">⚠ 7TH CHARACTER REQUIRED!</text>

                                    <rect x="110" y="738" width="275" height="172" rx="19" fill="rgba(16,185,129,0.2)"/>
                                    <text x="247" y="810" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">A</text>
                                    <text x="247" y="873" text-anchor="middle" fill="#fff" font-size="25">Initial encounter</text>

                                    <rect x="412" y="738" width="275" height="172" rx="19" fill="rgba(245,158,11,0.2)"/>
                                    <text x="550" y="810" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="31">D</text>
                                    <text x="550" y="873" text-anchor="middle" fill="#fff" font-size="25">Subsequent</text>

                                    <rect x="715" y="738" width="275" height="172" rx="19" fill="rgba(139,92,246,0.2)"/>
                                    <text x="852" y="810" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="31">S</text>
                                    <text x="852" y="873" text-anchor="middle" fill="#fff" font-size="25">Sequela</text>
                                </svg>`,
                                caption: "Injuries need WHAT + HOW + WHERE + ACTIVITY + 7th character"
                            }
                        },
                        {
                            type: "concept",
                            title: "7th Character Extensions Explained",
                            content: "The 7th character is NOT about the visit number - it's about the PHASE OF TREATMENT!\n\n**A = Initial Encounter**\nPatient is receiving ACTIVE treatment for the injury\n• First ER visit for fracture? → A\n• Surgery to repair fracture? → A\n• Still in active treatment phase? → A\n\n**D = Subsequent Encounter**\nPatient is receiving ROUTINE care during healing\n• Cast check for fracture? → D\n• Wound care follow-up? → D\n• Physical therapy for injury? → D\n\n**S = Sequela**\nCare for a LATE EFFECT of the injury\n• Chronic pain from old fracture? → S\n• Scar revision from old burn? → S\n• Arthritis from old injury? → S\n\n**Common Mistake:** Using 'D' for the second visit. It's not about visit count - it's about treatment phase!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">7TH CHARACTER: PHASE OF TREATMENT</text>
                                    <text x="550" y="141" text-anchor="middle" fill="#888" font-size="25">NOT visit number - treatment PHASE!</text>

                                    <!-- A - Initial -->
                                    <rect x="41" y="188" width="1017" height="235" rx="26" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="137" y="267" fill="#10b981" font-weight="bold" font-size="42">A</text>
                                    <text x="247" y="267" fill="#10b981" font-weight="bold" font-size="28">INITIAL ENCOUNTER</text>
                                    <text x="247" y="320" fill="#fff" font-size="25">Patient receiving ACTIVE treatment for the injury</text>
                                    <text x="247" y="370" fill="#888" font-size="25">Examples: ER visit, surgery, initial casting, wound debridement</text>
                                    <text x="247" y="408" fill="#10b981" font-size="25">Multiple "A" visits are common during active treatment!</text>

                                    <!-- D - Subsequent -->
                                    <rect x="41" y="455" width="1017" height="235" rx="26" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="137" y="534" fill="#f59e0b" font-weight="bold" font-size="42">D</text>
                                    <text x="247" y="534" fill="#f59e0b" font-weight="bold" font-size="28">SUBSEQUENT ENCOUNTER</text>
                                    <text x="247" y="587" fill="#fff" font-size="25">Patient receiving ROUTINE care during healing</text>
                                    <text x="247" y="638" fill="#888" font-size="25">Examples: Cast removal, wound check, suture removal, PT</text>
                                    <text x="247" y="675" fill="#f59e0b" font-size="25">The injury is healing - not active treatment</text>

                                    <!-- S - Sequela -->
                                    <rect x="41" y="722" width="1017" height="235" rx="26" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="137" y="801" fill="#8b5cf6" font-weight="bold" font-size="42">S</text>
                                    <text x="247" y="801" fill="#8b5cf6" font-weight="bold" font-size="28">SEQUELA (Late Effect)</text>
                                    <text x="247" y="854" fill="#fff" font-size="25">Treatment for a COMPLICATION of a healed injury</text>
                                    <text x="247" y="905" fill="#888" font-size="25">Examples: Chronic pain, malunion, scar contracture</text>
                                    <text x="247" y="942" fill="#8b5cf6" font-size="25">The original injury has healed - treating the consequence</text>
                                </svg>`,
                                caption: "A = Active treatment, D = Routine healing, S = Late effect"
                            }
                        },
                        {
                            type: "concept",
                            title: "External Cause Coding (V-Y Codes)",
                            content: "External cause codes tell the story of HOW the injury happened. They're required for injury claims!\n\n**V00-V99: Transport Accidents**\n• Who was injured (driver, passenger, pedestrian)\n• What vehicle (car, motorcycle, bicycle)\n• What happened (collision, rollover, fall)\n\n**W00-W19: Falls**\n• Type of fall (from height, on same level)\n• What caused it (ice, stairs, furniture)\n\n**W20-W49: Exposure to Mechanical Forces**\n• Struck by, caught between objects\n\n**X00-X19: Fire/Heat/Burns**\n\n**X71-X83: Intentional Self-Harm**\n\n**X92-Y09: Assault**\n\n**Y10-Y34: Undetermined Intent**\n\n**Y62-Y84: Complications of Medical Care**\n\n**SEQUENCING:** Injury code (S/T) FIRST, then external cause (V-Y)",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="28">EXTERNAL CAUSE CODES (V-Y)</text>

                                    <!-- V codes -->
                                    <rect x="41" y="141" width="495" height="188" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="288" y="204" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">V00-V99</text>
                                    <text x="288" y="257" text-anchor="middle" fill="#fff" font-size="25">Transport Accidents</text>
                                    <text x="288" y="304" text-anchor="middle" fill="#888" font-size="25">MVA, motorcycle, bicycle, pedestrian</text>

                                    <!-- W codes -->
                                    <rect x="563" y="141" width="495" height="188" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="811" y="204" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="25">W00-W99</text>
                                    <text x="811" y="257" text-anchor="middle" fill="#fff" font-size="25">Falls &amp; Exposures</text>
                                    <text x="811" y="304" text-anchor="middle" fill="#888" font-size="25">Falls, struck by, drowning</text>

                                    <!-- X codes -->
                                    <rect x="41" y="361" width="495" height="188" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="288" y="424" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">X00-X83</text>
                                    <text x="288" y="477" text-anchor="middle" fill="#fff" font-size="25">Fire, Heat, Self-Harm</text>
                                    <text x="288" y="524" text-anchor="middle" fill="#888" font-size="25">Burns, intentional self-harm</text>

                                    <!-- Y codes -->
                                    <rect x="563" y="361" width="495" height="188" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="811" y="424" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">X92-Y84</text>
                                    <text x="811" y="477" text-anchor="middle" fill="#fff" font-size="25">Assault &amp; Complications</text>
                                    <text x="811" y="524" text-anchor="middle" fill="#888" font-size="25">Violence, medical complications</text>

                                    <!-- Place and Activity -->
                                    <rect x="41" y="581" width="495" height="172" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="288" y="644" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">Y92 - PLACE</text>
                                    <text x="288" y="707" text-anchor="middle" fill="#fff" font-size="25">Where it happened</text>
                                    <text x="288" y="744" text-anchor="middle" fill="#888" font-size="25">Home, work, school, street</text>

                                    <rect x="563" y="581" width="495" height="172" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="811" y="644" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">Y93 - ACTIVITY</text>
                                    <text x="811" y="707" text-anchor="middle" fill="#fff" font-size="25">What they were doing</text>
                                    <text x="811" y="744" text-anchor="middle" fill="#888" font-size="25">Sports, work, leisure</text>

                                    <!-- Sequencing rule -->
                                    <rect x="41" y="785" width="1017" height="235" rx="26" fill="rgba(14,165,233,0.15)" stroke="#0ea5e9" stroke-width="7"/>
                                    <text x="550" y="858" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="25">SEQUENCING ORDER</text>
                                    <rect x="110" y="895" width="220" height="94" rx="13" fill="#ef4444"/>
                                    <text x="220" y="958" text-anchor="middle" fill="#fff" font-size="25">S/T Code</text>
                                    <text x="357" y="958" fill="#888" font-size="28">→</text>
                                    <rect x="398" y="895" width="220" height="94" rx="13" fill="#f59e0b"/>
                                    <text x="508" y="958" text-anchor="middle" fill="#fff" font-size="25">V-Y Code</text>
                                    <text x="646" y="958" fill="#888" font-size="28">→</text>
                                    <rect x="687" y="895" width="137" height="94" rx="13" fill="#10b981"/>
                                    <text x="756" y="958" text-anchor="middle" fill="#fff" font-size="25">Y92</text>
                                    <text x="852" y="958" fill="#888" font-size="28">→</text>
                                    <rect x="893" y="895" width="137" height="94" rx="13" fill="#ec4899"/>
                                    <text x="962" y="958" text-anchor="middle" fill="#fff" font-size="25">Y93</text>
                                </svg>`,
                                caption: "Injury FIRST, then external cause, place, and activity"
                            }
                        },
                        {
                            type: "quiz",
                            question: "A patient returns for a cast check 2 weeks after fracture repair surgery. What 7th character should be used?",
                            options: [
                                { text: "A - Initial encounter (it's a follow-up to the initial treatment)", correct: false },
                                { text: "D - Subsequent encounter (routine care during healing)", correct: true },
                                { text: "S - Sequela (it's after the initial injury)", correct: false },
                                { text: "No 7th character needed for follow-ups", correct: false }
                            ],
                            explanation: "Use 'D' for subsequent encounter because the patient is receiving ROUTINE care during the healing phase. The surgery was the active treatment (A), but a cast check is routine healing care (D). Remember: A = active treatment, D = routine healing, S = late effect/complication after healing."
                        },
                        {
                            type: "quiz",
                            question: "A patient has chronic pain in their wrist from a fracture that healed 2 years ago. What 7th character?",
                            options: [
                                { text: "A - They're receiving treatment now", correct: false },
                                { text: "D - This is a follow-up for the original injury", correct: false },
                                { text: "S - This is a sequela (late effect) of the healed injury", correct: true },
                                { text: "The fracture is healed so no injury code is needed", correct: false }
                            ],
                            explanation: "Use 'S' for sequela because the chronic pain is a LATE EFFECT of the healed fracture. The original injury has healed, but the patient is now dealing with a consequence of that injury. You would code the chronic pain condition AND the original fracture code with 'S' to show the relationship."
                        },
                        {
                            type: "visual",
                            title: "Lesson 6 Complete!",
                            content: "You've mastered injury and external cause coding!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 6 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="660" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">INJURY CODING MASTERED:</text>

                                    <text x="165" y="345" fill="#ef4444" font-size="28">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">S/T codes for WHAT happened</text>

                                    <text x="165" y="424" fill="#f59e0b" font-size="28">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">V-Y codes for HOW it happened</text>

                                    <text x="165" y="502" fill="#10b981" font-size="28">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">7th character: A (active), D (routine), S (sequela)</text>

                                    <text x="165" y="581" fill="#6366f1" font-size="28">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Place (Y92) and Activity (Y93) codes</text>

                                    <text x="165" y="660" fill="#8b5cf6" font-size="28">✓</text>
                                    <text x="233" y="660" fill="#fff" font-size="25">Proper sequencing: Injury → Cause → Place → Activity</text>

                                    <rect x="165" y="722" width="770" height="78" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="776" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: Z Codes & Special Situations →</text>
                                </svg>`,
                                caption: "Excellent work on injury coding!"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 7: Z CODES
                // ========================================
                {
                    id: 7,
                    title: "Z Codes: Factors Influencing Health Status",
                    duration: 12,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Z Codes: When There's No Disease",
                            content: "What code do you use when a patient isn't sick? Z codes!\n\n**Z codes capture:**\n• Encounters when no disease is present\n• Reasons influencing health status\n• Contact with health services\n\n**Common Uses:**\n• Screening visits (Z11-Z13)\n• Vaccination encounters (Z23)\n• Follow-up after treatment (Z09)\n• Personal history of disease (Z85-Z87)\n• Family history (Z80-Z84)\n• Social determinants of health (Z55-Z65)\n\n**KEY RULES:**\n1. Z codes can be principal OR secondary diagnosis\n2. Some Z codes are ONLY principal (like Z23 vaccination)\n3. Some are ONLY secondary (like Z codes for status)\n4. History codes (Z85-Z87) indicate RESOLVED conditions\n5. Status codes indicate ongoing conditions/states",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">Z CODES: BEYOND DISEASE</text>

                                    <!-- What Z codes capture -->
                                    <rect x="275" y="141" width="550" height="125" rx="66" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="7"/>
                                    <text x="550" y="220" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">NO DISEASE PRESENT?</text>

                                    <text x="550" y="298" text-anchor="middle" fill="#fff" font-size="28">↓</text>

                                    <rect x="275" y="314" width="550" height="110" rx="26" fill="rgba(16,185,129,0.2)" stroke="#10b981"/>
                                    <text x="550" y="386" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31">USE Z CODES!</text>

                                    <!-- Categories -->
                                    <rect x="41" y="471" width="316" height="204" rx="19" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="198" y="534" text-anchor="middle" fill="#6366f1" font-weight="bold" font-size="25">SCREENINGS</text>
                                    <text x="198" y="590" text-anchor="middle" fill="#fff" font-size="25">Z11-Z13</text>
                                    <text x="198" y="644" text-anchor="middle" fill="#888" font-size="25">No symptoms, testing</text>

                                    <rect x="385" y="471" width="316" height="204" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="541" y="534" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">VACCINATIONS</text>
                                    <text x="541" y="590" text-anchor="middle" fill="#fff" font-size="25">Z23</text>
                                    <text x="541" y="644" text-anchor="middle" fill="#888" font-size="25">Immunization</text>

                                    <rect x="728" y="471" width="316" height="204" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="885" y="534" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="25">HISTORY</text>
                                    <text x="885" y="590" text-anchor="middle" fill="#fff" font-size="25">Z85-Z87</text>
                                    <text x="885" y="644" text-anchor="middle" fill="#888" font-size="25">Past conditions</text>

                                    <rect x="220" y="707" width="316" height="204" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="376" y="770" text-anchor="middle" fill="#ec4899" font-weight="bold" font-size="25">FOLLOW-UP</text>
                                    <text x="376" y="826" text-anchor="middle" fill="#fff" font-size="25">Z09</text>
                                    <text x="376" y="880" text-anchor="middle" fill="#888" font-size="25">After treatment</text>

                                    <rect x="563" y="707" width="316" height="204" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="720" y="770" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">SOCIAL</text>
                                    <text x="720" y="826" text-anchor="middle" fill="#fff" font-size="25">Z55-Z65</text>
                                    <text x="720" y="880" text-anchor="middle" fill="#888" font-size="25">SDOH factors</text>
                                </svg>`,
                                caption: "Z codes capture encounters without active disease"
                            }
                        },
                        {
                            type: "concept",
                            title: "History vs Status Codes",
                            content: "**HISTORY CODES (Z85-Z87):**\nIndicate a condition that NO LONGER EXISTS.\n\n• Z85.x = Personal history of malignant neoplasm\n  (Cancer is cured/in remission - NOT active!)\n• Z86.x = Personal history of other diseases\n• Z87.x = Personal history of other conditions\n\n**When to use:** Patient had cancer 5 years ago, now cured. Code Z85.x, NOT the active cancer code.\n\n**STATUS CODES (Z93-Z99):**\nIndicate an ONGOING state affecting health.\n\n• Z93.x = Artificial opening status (colostomy, etc.)\n• Z94.x = Transplant status\n• Z95.x = Cardiac device status (pacemaker)\n• Z96.x = Presence of implants\n• Z99.x = Dependence on machines/devices\n\n**When to use:** Patient has a pacemaker. Code Z95.0 on every relevant encounter - it's an ongoing state.",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">HISTORY vs STATUS CODES</text>

                                    <!-- History -->
                                    <rect x="41" y="141" width="495" height="565" rx="33" fill="rgba(139,92,246,0.1)" stroke="#8b5cf6"/>
                                    <text x="288" y="220" text-anchor="middle" fill="#8b5cf6" font-weight="bold" font-size="28">HISTORY (Z85-Z87)</text>
                                    <text x="288" y="289" text-anchor="middle" fill="#fff" font-size="25">Condition NO LONGER EXISTS</text>

                                    <rect x="68" y="330" width="440" height="110" rx="13" fill="rgba(139,92,246,0.2)"/>
                                    <text x="288" y="377" text-anchor="middle" fill="#fff" font-size="25">Z85.x = Past cancer (cured)</text>
                                    <text x="288" y="424" text-anchor="middle" fill="#888" font-size="25">NOT active disease!</text>

                                    <rect x="68" y="471" width="440" height="94" rx="13" fill="rgba(139,92,246,0.15)"/>
                                    <text x="288" y="534" text-anchor="middle" fill="#fff" font-size="25">Z86/Z87 = Past conditions</text>

                                    <text x="288" y="644" text-anchor="middle" fill="#8b5cf6" font-size="25">EXAMPLE:</text>
                                    <text x="288" y="691" text-anchor="middle" fill="#fff" font-size="25">"Breast cancer cured 5 yrs ago"</text>
                                    <text x="288" y="738" text-anchor="middle" fill="#10b981" font-size="25">→ Z85.3</text>

                                    <!-- Status -->
                                    <rect x="563" y="141" width="495" height="565" rx="33" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>
                                    <text x="811" y="220" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">STATUS (Z93-Z99)</text>
                                    <text x="811" y="289" text-anchor="middle" fill="#fff" font-size="25">ONGOING state affecting health</text>

                                    <rect x="591" y="330" width="440" height="110" rx="13" fill="rgba(16,185,129,0.2)"/>
                                    <text x="811" y="377" text-anchor="middle" fill="#fff" font-size="25">Z95.x = Cardiac devices</text>
                                    <text x="811" y="424" text-anchor="middle" fill="#888" font-size="25">Pacemaker, stent, etc.</text>

                                    <rect x="591" y="471" width="440" height="94" rx="13" fill="rgba(16,185,129,0.15)"/>
                                    <text x="811" y="534" text-anchor="middle" fill="#fff" font-size="25">Z94.x = Transplant status</text>

                                    <text x="811" y="644" text-anchor="middle" fill="#10b981" font-size="25">EXAMPLE:</text>
                                    <text x="811" y="691" text-anchor="middle" fill="#fff" font-size="25">"Patient has pacemaker"</text>
                                    <text x="811" y="738" text-anchor="middle" fill="#10b981" font-size="25">→ Z95.0 (every visit)</text>

                                    <!-- Key difference -->
                                    <rect x="110" y="738" width="880" height="157" rx="26" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="550" y="801" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">KEY DIFFERENCE</text>
                                    <text x="550" y="864" text-anchor="middle" fill="#fff" font-size="25">History = RESOLVED | Status = ONGOING</text>
                                </svg>`,
                                caption: "History codes = past conditions | Status codes = current states"
                            }
                        },
                        {
                            type: "quiz",
                            question: "A patient had colon cancer 3 years ago, now in remission, comes in for a routine colonoscopy. What codes are needed?",
                            options: [
                                { text: "C18.9 (Colon cancer) - they still have the history", correct: false },
                                { text: "Z12.11 (Screening colonoscopy) + Z85.038 (Personal history of colon cancer)", correct: true },
                                { text: "Z85.038 only - that's the main reason for the visit", correct: false },
                                { text: "Z12.11 only - history doesn't matter for screenings", correct: false }
                            ],
                            explanation: "The patient no longer has active cancer (in remission = resolved), so use Z85.038 (personal history) NOT the active cancer code. The screening colonoscopy (Z12.11) is the reason for the encounter. The history code explains WHY increased surveillance is needed. Both codes tell the complete story."
                        },
                        {
                            type: "visual",
                            title: "Lesson 7 Complete!",
                            content: "You've mastered Z codes!",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="94" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> LESSON 7 COMPLETE!</text>

                                    <rect x="110" y="157" width="880" height="597" rx="39" fill="rgba(16,185,129,0.1)" stroke="#10b981"/>

                                    <text x="550" y="251" text-anchor="middle" fill="#10b981" font-size="28">Z CODE MASTERY:</text>

                                    <text x="165" y="345" fill="#10b981" font-size="28">✓</text>
                                    <text x="233" y="345" fill="#fff" font-size="25">When to use Z codes (no active disease)</text>

                                    <text x="165" y="424" fill="#8b5cf6" font-size="28">✓</text>
                                    <text x="233" y="424" fill="#fff" font-size="25">History codes (Z85-Z87) = RESOLVED</text>

                                    <text x="165" y="502" fill="#10b981" font-size="28">✓</text>
                                    <text x="233" y="502" fill="#fff" font-size="25">Status codes (Z93-Z99) = ONGOING</text>

                                    <text x="165" y="581" fill="#f59e0b" font-size="28">✓</text>
                                    <text x="233" y="581" fill="#fff" font-size="25">Screenings, vaccines, follow-ups</text>

                                    <rect x="165" y="660" width="770" height="78" rx="19" fill="rgba(59,130,246,0.2)" stroke="#6366f1"/>
                                    <text x="550" y="713" text-anchor="middle" fill="#6366f1" font-size="25">NEXT: ICD-10-CM Review & Practice →</text>
                                </svg>`,
                                caption: "Z codes complete the coding picture!"
                            }
                        }
                    ]
                },

                // ========================================
                // LESSON 8-12: Remaining lessons (abbreviated)
                // ========================================
                {
                    id: 8,
                    title: "Outpatient vs Inpatient Guidelines",
                    duration: 10,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Different Settings, Different Rules",
                            content: "Outpatient and inpatient coding follow DIFFERENT guidelines!\n\n**INPATIENT (Section II):**\n• Use 'Principal Diagnosis' = condition AFTER STUDY\n• Can code 'rule out', 'probable', 'suspected' as if confirmed\n• Code all conditions that affect care\n\n**OUTPATIENT (Section IV):**\n• Use 'First-Listed Diagnosis' = reason for encounter\n• CANNOT code 'rule out' - use signs/symptoms instead\n• Code to highest certainty\n\n**KEY DIFFERENCE:**\nInpatient: 'Rule out pneumonia' → Code pneumonia\nOutpatient: 'Rule out pneumonia' → Code symptoms only (cough, fever)",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">INPATIENT vs OUTPATIENT CODING</text>

                                    <rect x="41" y="141" width="495" height="440" rx="26" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="288" y="220" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="28">INPATIENT (Section II)</text>
                                    <text x="68" y="298" fill="#fff" font-size="25">• Principal Dx = after study</text>
                                    <text x="68" y="361" fill="#fff" font-size="25">• CAN code "probable/rule out"</text>
                                    <text x="68" y="424" fill="#fff" font-size="25">• Code affects LOS/resources</text>
                                    <rect x="68" y="471" width="440" height="78" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="288" y="528" text-anchor="middle" fill="#fff" font-size="25">"Rule out" → Code it!</text>

                                    <rect x="563" y="141" width="495" height="440" rx="26" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="811" y="220" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">OUTPATIENT (Section IV)</text>
                                    <text x="591" y="298" fill="#fff" font-size="25">• First-Listed Dx = reason</text>
                                    <text x="591" y="361" fill="#fff" font-size="25">• CANNOT code uncertain dx</text>
                                    <text x="591" y="424" fill="#fff" font-size="25">• Code to highest certainty</text>
                                    <rect x="591" y="471" width="440" height="78" rx="13" fill="rgba(16,185,129,0.3)"/>
                                    <text x="811" y="528" text-anchor="middle" fill="#fff" font-size="25">"Rule out" → Symptoms only</text>

                                    <rect x="110" y="628" width="880" height="204" rx="26" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="550" y="697" text-anchor="middle" fill="#f59e0b" font-weight="bold" font-size="25">EXAMPLE: "Rule out Pneumonia"</text>
                                    <text x="550" y="760" text-anchor="middle" fill="#ef4444" font-size="25">Inpatient → J18.9 (pneumonia code)</text>
                                    <text x="550" y="810" text-anchor="middle" fill="#10b981" font-size="25">Outpatient → R05.9 (cough), R50.9 (fever)</text>
                                </svg>`,
                                caption: "Inpatient can code uncertain; Outpatient cannot"
                            }
                        },
                        {
                            type: "quiz",
                            question: "An outpatient comes in with cough and fever. Documentation says 'rule out pneumonia.' How do you code this?",
                            options: [
                                { text: "J18.9 (Pneumonia) - that's what's being ruled out", correct: false },
                                { text: "R05.9 (Cough) + R50.9 (Fever) - signs/symptoms only", correct: true },
                                { text: "Z03.89 (Observation for suspected condition)", correct: false },
                                { text: "No code needed - nothing was confirmed", correct: false }
                            ],
                            explanation: "In OUTPATIENT settings, you CANNOT code uncertain diagnoses like 'rule out,' 'probable,' or 'suspected.' Instead, code the signs and symptoms that are documented - cough (R05.9) and fever (R50.9). Only inpatient coding allows coding uncertain conditions as if confirmed."
                        }
                    ]
                },
                {
                    id: 9,
                    title: "Principal Diagnosis Selection",
                    duration: 10,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Choosing the Principal Diagnosis",
                            content: "The PRINCIPAL DIAGNOSIS drives reimbursement and must be selected correctly!\n\n**DEFINITION (Inpatient):**\nThe condition established AFTER STUDY to be chiefly responsible for occasioning the admission.\n\n**Selection Guidelines:**\n1. Symptoms followed by contrasting diagnoses → Code the confirmed diagnosis\n2. Two or more interrelated conditions → Either can be principal\n3. Two or more conditions equally meeting definition → Either can be principal\n4. Original treatment vs complications → Code original reason\n5. Symptom followed by diagnosis → Code the diagnosis\n\n**NEVER as Principal:**\n• External cause codes (V-Y)\n• Manifestation codes with 'Code First' notes\n• Codes marked 'Use Additional Code'",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">PRINCIPAL DIAGNOSIS SELECTION</text>

                                    <rect x="137" y="141" width="825" height="157" rx="26" fill="rgba(14,165,233,0.2)" stroke="#0ea5e9"/>
                                    <text x="550" y="220" text-anchor="middle" fill="#0ea5e9" font-size="25">Condition AFTER STUDY chiefly responsible</text>
                                    <text x="550" y="276" text-anchor="middle" fill="#fff" font-size="25">for occasioning the admission</text>

                                    <rect x="41" y="345" width="316" height="220" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="198" y="408" text-anchor="middle" fill="#10b981" font-size="25">Symptom + Dx</text>
                                    <text x="198" y="465" text-anchor="middle" fill="#fff" font-size="25">→ Code the</text>
                                    <text x="198" y="512" text-anchor="middle" fill="#fff" font-size="25">DIAGNOSIS</text>

                                    <rect x="385" y="345" width="316" height="220" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="541" y="408" text-anchor="middle" fill="#f59e0b" font-size="25">Two Conditions</text>
                                    <text x="541" y="465" text-anchor="middle" fill="#fff" font-size="25">→ Either can</text>
                                    <text x="541" y="512" text-anchor="middle" fill="#fff" font-size="25">be principal</text>

                                    <rect x="728" y="345" width="330" height="220" rx="19" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="893" y="408" text-anchor="middle" fill="#8b5cf6" font-size="25">Complication</text>
                                    <text x="893" y="465" text-anchor="middle" fill="#fff" font-size="25">→ Original</text>
                                    <text x="893" y="512" text-anchor="middle" fill="#fff" font-size="25">reason first</text>

                                    <rect x="82" y="612" width="935" height="220" rx="26" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="550" y="685" text-anchor="middle" fill="#ef4444" font-weight="bold" font-size="25">NEVER PRINCIPAL:</text>
                                    <text x="550" y="754" text-anchor="middle" fill="#fff" font-size="25">V-Y codes | Manifestation codes | "Use Additional" codes</text>
                                    <text x="550" y="801" text-anchor="middle" fill="#888" font-size="25">These are ALWAYS secondary diagnoses</text>
                                </svg>`,
                                caption: "Principal diagnosis = main reason for admission after study"
                            }
                        }
                    ]
                },
                {
                    id: 10,
                    title: "Common Coding Scenarios",
                    duration: 12,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Putting It All Together: Real Scenarios",
                            content: "Let's practice with common coding scenarios you'll encounter daily!\n\n**SCENARIO TYPES:**\n1. Diabetes with multiple complications\n2. Hypertension with heart disease and CKD\n3. Pneumonia with respiratory failure\n4. Cancer with metastasis\n5. Injuries with external causes\n6. Screenings and follow-ups\n\n**APPROACH:**\n1. Identify ALL conditions documented\n2. Determine relationships (with, due to)\n3. Check for combination codes\n4. Apply sequencing rules\n5. Verify in Tabular List\n6. Add required characters (7th, laterality)",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#0ea5e9" font-weight="bold" font-size="28">CODING SCENARIO APPROACH</text>

                                    <rect x="41" y="141" width="1017" height="110" rx="26" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="82" y="210" fill="#ef4444" font-weight="bold" font-size="28">1.</text>
                                    <text x="151" y="210" fill="#fff" font-size="25">Identify ALL conditions documented</text>

                                    <rect x="41" y="282" width="1017" height="110" rx="26" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="82" y="352" fill="#f59e0b" font-weight="bold" font-size="28">2.</text>
                                    <text x="151" y="352" fill="#fff" font-size="25">Determine relationships (with, due to, caused by)</text>

                                    <rect x="41" y="424" width="1017" height="110" rx="26" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="82" y="493" fill="#10b981" font-weight="bold" font-size="28">3.</text>
                                    <text x="151" y="493" fill="#fff" font-size="25">Check for combination codes FIRST</text>

                                    <rect x="41" y="565" width="1017" height="110" rx="26" fill="rgba(59,130,246,0.15)" stroke="#6366f1"/>
                                    <text x="82" y="634" fill="#6366f1" font-weight="bold" font-size="28">4.</text>
                                    <text x="151" y="634" fill="#fff" font-size="25">Apply sequencing rules (Code First, etc.)</text>

                                    <rect x="41" y="707" width="1017" height="110" rx="26" fill="rgba(139,92,246,0.15)" stroke="#8b5cf6"/>
                                    <text x="82" y="776" fill="#8b5cf6" font-weight="bold" font-size="28">5.</text>
                                    <text x="151" y="776" fill="#fff" font-size="25">Verify in Tabular + Add required characters</text>
                                </svg>`,
                                caption: "Follow this systematic approach for every scenario"
                            }
                        }
                    ]
                },
                {
                    id: 11,
                    title: "Practice Cases",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Practice Makes Perfect",
                            content: "Work through these practice cases to solidify your coding skills!\n\n**CASE 1:** Type 2 DM with diabetic nephropathy and neuropathy\n**ANSWER:** E11.22, E11.42 (two codes for two complications)\n\n**CASE 2:** HTN, heart failure, and CKD stage 3\n**ANSWER:** I13.0, N18.3 (combo code + CKD stage)\n\n**CASE 3:** Lung cancer with brain metastasis\n**ANSWER:** C34.90, C79.31 (primary first)\n\n**CASE 4:** Fall from ladder at home, initial encounter for closed femur fracture\n**ANSWER:** S72.001A, W11.XXXA, Y92.009, Y93.89\n\n**CASE 5:** Screening colonoscopy with personal history of colon polyps\n**ANSWER:** Z12.11, Z86.010",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <text x="550" y="78" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="28">PRACTICE CASE REVIEW</text>

                                    <rect x="41" y="141" width="1017" height="141" rx="19" fill="rgba(16,185,129,0.15)" stroke="#10b981"/>
                                    <text x="68" y="204" fill="#10b981" font-size="25">Case 1: DM + nephropathy + neuropathy</text>
                                    <text x="68" y="257" fill="#fff" font-size="25">→ E11.22, E11.42 (two complications = two codes)</text>

                                    <rect x="41" y="314" width="1017" height="141" rx="19" fill="rgba(239,68,68,0.15)" stroke="#ef4444"/>
                                    <text x="68" y="377" fill="#ef4444" font-size="25">Case 2: HTN + HF + CKD3</text>
                                    <text x="68" y="430" fill="#fff" font-size="25">→ I13.0 (combo), N18.3 (stage)</text>

                                    <rect x="41" y="487" width="1017" height="141" rx="19" fill="rgba(236,72,153,0.15)" stroke="#ec4899"/>
                                    <text x="68" y="550" fill="#ec4899" font-size="25">Case 3: Lung CA + brain mets</text>
                                    <text x="68" y="603" fill="#fff" font-size="25">→ C34.90 (primary), C79.31 (secondary)</text>

                                    <rect x="41" y="660" width="1017" height="172" rx="19" fill="rgba(245,158,11,0.15)" stroke="#f59e0b"/>
                                    <text x="68" y="722" fill="#f59e0b" font-size="25">Case 4: Ladder fall, femur fracture</text>
                                    <text x="68" y="776" fill="#fff" font-size="25">→ S72.001A + W11.XXXA + Y92.009 + Y93.89</text>
                                    <text x="68" y="817" fill="#888" font-size="25">(Injury + cause + place + activity)</text>
                                </svg>`,
                                caption: "Apply everything you've learned!"
                            }
                        }
                    ]
                },
                {
                    id: 12,
                    title: "ICD-10-CM Review & Certification Prep",
                    duration: 15,
                    completed: false,
                    cards: [
                        {
                            type: "intro",
                            title: "Final Review: You're Ready!",
                            content: "Congratulations! You've completed the ICD-10-CM course. Here's your final review:\n\n**KEY MNEMONICS:**\n• VERIFY - Basic coding process\n• SCENE - Conventions\n• SMART - General guidelines\n• INSIDE - Chapters 1-5\n• HEARTS - Chapters 6-10\n\n**TOP RULES:**\n1. Code to highest specificity\n2. Verify in Tabular List - ALWAYS\n3. Use combination codes when available\n4. Acute before chronic\n5. 7th character for injuries\n6. Assumed relationships (HTN, DM 'with')\n\n**CERTIFICATION TIPS:**\n• Know chapter-specific guidelines cold\n• Practice timing - 3-5 codes per minute\n• Read ALL answer choices\n• Use process of elimination",
                            visual: {
                                type: "diagram",
                                svg: `<svg viewBox="0 0 1100 1100" class="lesson-visual">
                                    <rect x="0" y="0" width="1100" height="1100" fill="#1a1a2e"/>
                                    <rect x="165" y="47" width="770" height="157" rx="33" fill="rgba(16,185,129,0.3)" stroke="#10b981" stroke-width="7"/>
                                    <text x="550" y="150" text-anchor="middle" fill="#10b981" font-weight="bold" font-size="31"> COURSE COMPLETE!</text>

                                    <text x="550" y="267" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">YOUR MNEMONICS TOOLKIT:</text>

                                    <rect x="55" y="314" width="192" height="110" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="151" y="386" text-anchor="middle" fill="#fff" font-size="25">VERIFY</text>

                                    <rect x="261" y="314" width="192" height="110" rx="13" fill="rgba(245,158,11,0.3)"/>
                                    <text x="357" y="386" text-anchor="middle" fill="#fff" font-size="25">SCENE</text>

                                    <rect x="467" y="314" width="192" height="110" rx="13" fill="rgba(16,185,129,0.3)"/>
                                    <text x="563" y="386" text-anchor="middle" fill="#fff" font-size="25">SMART</text>

                                    <rect x="673" y="314" width="192" height="110" rx="13" fill="rgba(59,130,246,0.3)"/>
                                    <text x="770" y="386" text-anchor="middle" fill="#fff" font-size="25">INSIDE</text>

                                    <rect x="880" y="314" width="192" height="110" rx="13" fill="rgba(239,68,68,0.3)"/>
                                    <text x="976" y="386" text-anchor="middle" fill="#fff" font-size="25">HEARTS</text>

                                    <text x="550" y="518" text-anchor="middle" fill="#fff" font-weight="bold" font-size="28">MASTERED SKILLS:</text>

                                    <text x="165" y="597" fill="#10b981" font-size="28">✓</text>
                                    <text x="220" y="597" fill="#fff" font-size="25">Code structure &amp; conventions</text>

                                    <text x="165" y="660" fill="#10b981" font-size="28">✓</text>
                                    <text x="220" y="660" fill="#fff" font-size="25">Chapter-specific guidelines</text>

                                    <text x="165" y="722" fill="#10b981" font-size="28">✓</text>
                                    <text x="220" y="722" fill="#fff" font-size="25">Injury &amp; external cause coding</text>

                                    <text x="165" y="785" fill="#10b981" font-size="28">✓</text>
                                    <text x="220" y="785" fill="#fff" font-size="25">Z codes &amp; special situations</text>

                                    <text x="165" y="848" fill="#10b981" font-size="28">✓</text>
                                    <text x="220" y="848" fill="#fff" font-size="25">Sequencing &amp; principal diagnosis</text>

                                    <rect x="137" y="880" width="825" height="47" rx="9" fill="rgba(16,185,129,0.2)"/>
                                    <rect x="137" y="880" width="825" height="47" rx="9" fill="#10b981"/>
                                    <text x="550" y="914" text-anchor="middle" fill="#fff" font-size="25">PROGRESS: 100% COMPLETE</text>
                                </svg>`,
                                caption: "You're ready for certification!"
                            }
                        },
                        {
                            type: "quiz",
                            question: "FINAL EXAM: What is the GOLDEN RULE of medical coding?",
                            options: [
                                { text: "Always code what the patient tells you", correct: false },
                                { text: "Code to the highest level of specificity supported by documentation", correct: true },
                                { text: "Use unspecified codes to be safe", correct: false },
                                { text: "Code from the Index only to save time", correct: false }
                            ],
                            explanation: "The GOLDEN RULE is to always code to the highest level of specificity that the documentation supports. This means using all available characters, including laterality, type, timing, and any other specifics documented. Unspecified codes should only be used when the documentation truly lacks detail. Always verify in the Tabular List!"
                        }
                    ]
                }
            ]
        }
    ]
};

// Function to check for coding updates
function checkCodingUpdates() {
    return CODING_UPDATES;
}

// Export for use in main app
if (typeof window !== 'undefined') {
    window.MEDICAL_CODING_CATEGORY = MEDICAL_CODING_CATEGORY;
    window.CODING_UPDATES = CODING_UPDATES;
    window.checkCodingUpdates = checkCodingUpdates;
}
