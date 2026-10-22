// ============================================
// SYNTHESIS — PATHO MAP: WHERE DISEASE LIVES
// Conditions mapped onto the Anatomy Arcade boards. `parts` lists every
// structure that counts as a correct tap; `why` is the one-line explanation.
// Keyed by board id (see anatomy-game-boards.js).
//
// Game module (not a book): this file deliberately does not end in -data.js.
// ============================================

window.PATHO_MAP = {
    heart: [
        { name: 'Left-sided heart failure', parts: ['lv'], why: 'The left ventricle cannot pump enough forward, so blood backs up into the lungs (pulmonary edema).' },
        { name: 'Left ventricular hypertrophy', parts: ['lv'], why: 'Years of pumping against high blood pressure thicken the left ventricular wall.' },
        { name: 'Right-sided heart failure (cor pulmonale)', parts: ['rv'], why: 'The right ventricle fails against lung disease; blood backs up into the body (edema, JVD).' },
        { name: 'Aortic aneurysm', parts: ['aorta'], why: 'A weakened aortic wall balloons outward and can rupture.' },
        { name: 'Aortic dissection', parts: ['aorta'], why: 'Blood tears between the layers of the aortic wall — sudden tearing chest pain.' },
        { name: 'Atrial fibrillation', parts: ['ra', 'la'], why: 'Chaotic electrical activity in the atria; clots can form in the left atrial appendage.' },
        { name: 'Pulmonary hypertension', parts: ['pulmtrunk'], why: 'High pressure in the pulmonary arteries strains the right ventricle.' },
        { name: 'Superior vena cava syndrome', parts: ['svc'], why: 'A tumor or clot compresses the SVC — facial and arm swelling.' },
        { name: 'Pulmonary embolism (origin of the clot’s path)', parts: ['ivc', 'rv', 'pulmtrunk'], why: 'A leg clot travels up the IVC, through the right heart, into the pulmonary arteries.' },
        { name: 'Mitral valve disease', parts: ['la', 'lv'], why: 'The mitral valve sits between the left atrium and left ventricle.' }
    ],
    brain: [
        { name: 'Broca’s (expressive) aphasia', parts: ['frontal'], why: 'Broca’s area in the left frontal lobe — the patient understands but struggles to produce speech.' },
        { name: 'Wernicke’s (receptive) aphasia', parts: ['temporal'], why: 'Wernicke’s area in the left temporal lobe — fluent but meaningless speech, poor comprehension.' },
        { name: 'Temporal lobe epilepsy', parts: ['temporal'], why: 'The most common focal epilepsy, often involving the hippocampus.' },
        { name: 'Cortical blindness', parts: ['occipital'], why: 'Damage to the primary visual cortex with normal eyes.' },
        { name: 'Hemispatial neglect', parts: ['parietal'], why: 'Usually right parietal damage; the patient ignores the left side of space.' },
        { name: 'Ataxia (uncoordinated movement)', parts: ['cerebellum'], why: 'The cerebellum coordinates movement and balance.' },
        { name: 'Locked-in syndrome', parts: ['brainstem'], why: 'A pontine (brainstem) stroke — aware but unable to move except the eyes.' },
        { name: 'Frontotemporal dementia (behavioral variant)', parts: ['frontal'], why: 'Degeneration of the frontal lobe changes personality and judgment first.' },
        { name: 'Central respiratory failure', parts: ['brainstem'], why: 'The medulla houses the respiratory centers.' },
        { name: 'Hemiplegia from a motor-cortex stroke', parts: ['frontal'], why: 'The primary motor cortex is the precentral gyrus of the frontal lobe.' }
    ],
    skeleton: [
        { name: 'Hip fracture (femoral neck)', parts: ['femur'], why: 'The classic osteoporotic fracture after a fall in older adults.' },
        { name: 'Colles’ fracture', parts: ['radius'], why: 'A distal radius fracture from falling on an outstretched hand.' },
        { name: 'Scoliosis', parts: ['spine'], why: 'A lateral curvature of the vertebral column.' },
        { name: 'Herniated disc', parts: ['spine'], why: 'The nucleus pulposus of an intervertebral disc bulges and presses on a nerve root.' },
        { name: 'Clavicle fracture', parts: ['clavicle'], why: 'One of the most commonly broken bones, usually at the middle third.' },
        { name: 'Flail chest', parts: ['ribs'], why: 'Several adjacent ribs broken in two places; the segment moves paradoxically.' },
        { name: 'Patellar dislocation', parts: ['patella'], why: 'The kneecap slips laterally out of its groove.' },
        { name: 'Boxer’s fracture', parts: ['hand'], why: 'Fracture of the 5th metacarpal neck from punching.' },
        { name: 'Medial tibial stress syndrome (shin splints)', parts: ['tibia'], why: 'Overuse pain along the inner edge of the tibia.' },
        { name: 'Pelvic fracture', parts: ['pelvis'], why: 'High-energy trauma; can cause life-threatening bleeding.' },
        { name: 'Skull fracture', parts: ['skull'], why: 'Head trauma; a basilar skull fracture shows raccoon eyes or Battle’s sign.' },
        { name: 'Mandibular fracture', parts: ['mandible'], why: 'The jaw is the most commonly fractured facial bone after the nose.' },
        { name: 'Proximal humerus fracture', parts: ['humerus'], why: 'Common in older adults after a fall onto the shoulder.' },
        { name: 'Olecranon fracture', parts: ['ulna'], why: 'The olecranon is the bony point of the elbow on the ulna.' },
        { name: 'Jones fracture', parts: ['foot'], why: 'Fracture at the base of the 5th metatarsal.' },
        { name: 'Ankle fracture (lateral malleolus)', parts: ['fibula'], why: 'The lateral malleolus is the lower end of the fibula.' },
        { name: 'Manubrial / sternal fracture', parts: ['sternum'], why: 'Usually from a steering wheel or seat-belt impact.' }
    ],
    digestive: [
        { name: 'Cirrhosis', parts: ['liver'], why: 'Scarring of the liver from chronic damage (alcohol, hepatitis, fatty liver).' },
        { name: 'Hepatitis', parts: ['liver'], why: 'Inflammation of the liver — viral, alcoholic or autoimmune.' },
        { name: 'Cholecystitis', parts: ['gallbladder'], why: 'Inflamed gallbladder, usually from a stone blocking the cystic duct.' },
        { name: 'Cholelithiasis (gallstones)', parts: ['gallbladder'], why: 'Stones form in the gallbladder from concentrated bile.' },
        { name: 'Peptic ulcer (gastric)', parts: ['stomach'], why: 'An erosion in the stomach lining; H. pylori and NSAIDs are the usual causes.' },
        { name: 'Gastritis', parts: ['stomach'], why: 'Inflammation of the stomach lining.' },
        { name: 'GERD', parts: ['esophagus'], why: 'Acid refluxes up through a weak lower esophageal sphincter.' },
        { name: 'Barrett’s esophagus', parts: ['esophagus'], why: 'Chronic reflux changes the esophageal lining — a precancerous change.' },
        { name: 'Pancreatitis', parts: ['pancreas'], why: 'The pancreas digests itself; gallstones and alcohol are the leading causes.' },
        { name: 'Type 1 diabetes (where the damage is)', parts: ['pancreas'], why: 'Autoimmune destruction of the pancreatic beta cells.' },
        { name: 'Celiac disease', parts: ['smallint'], why: 'Gluten triggers damage to the villi of the small intestine.' },
        { name: 'Crohn’s disease', parts: ['smallint', 'largeint'], why: 'Can affect anywhere from mouth to anus; the terminal ileum is the classic site.' },
        { name: 'Ulcerative colitis', parts: ['largeint', 'rectum'], why: 'Continuous inflammation of the colon, always starting at the rectum.' },
        { name: 'Diverticulitis', parts: ['largeint'], why: 'Infected pouches in the colon wall, most often the sigmoid.' },
        { name: 'Colorectal cancer', parts: ['largeint', 'rectum'], why: 'Usually arises from adenomatous polyps in the colon or rectum.' },
        { name: 'Appendicitis', parts: ['appendix'], why: 'Obstruction and infection of the appendix — pain migrates to the right lower quadrant.' },
        { name: 'Hemorrhoids', parts: ['rectum'], why: 'Swollen veins in the rectum and anal canal.' },
        { name: 'Esophageal varices', parts: ['esophagus'], why: 'Dilated veins from portal hypertension — can bleed massively.' }
    ],
    eye: [
        { name: 'Cataract', parts: ['lens'], why: 'The lens becomes cloudy with age.' },
        { name: 'Diabetic retinopathy', parts: ['retina'], why: 'High glucose damages the tiny retinal vessels.' },
        { name: 'Retinal detachment', parts: ['retina'], why: 'The retina peels away from the choroid — flashes, floaters, a curtain over vision.' },
        { name: 'Macular degeneration', parts: ['retina'], why: 'The macula (central retina) deteriorates; central vision is lost.' },
        { name: 'Glaucoma', parts: ['opticnerve'], why: 'Raised pressure damages the optic nerve; peripheral vision goes first.' },
        { name: 'Optic neuritis', parts: ['opticnerve'], why: 'Inflamed optic nerve, often the first sign of multiple sclerosis.' },
        { name: 'Corneal abrasion', parts: ['cornea'], why: 'A scratch on the clear front window — very painful.' },
        { name: 'Keratitis', parts: ['cornea'], why: 'Inflammation of the cornea, e.g. from contact-lens infection.' },
        { name: 'Iritis (anterior uveitis)', parts: ['iris'], why: 'Inflammation of the iris — pain, redness, light sensitivity.' },
        { name: 'Vitreous hemorrhage', parts: ['vitreous'], why: 'Bleeding into the gel of the eye clouds vision.' },
        { name: 'Scleritis', parts: ['sclera'], why: 'Painful inflammation of the white of the eye, often with autoimmune disease.' },
        { name: 'Presbyopia', parts: ['lens', 'ciliary'], why: 'The aging lens stiffens and the ciliary muscle can no longer reshape it for near focus.' }
    ],
    respiratory: [
        { name: 'Emphysema', parts: ['alveoli'], why: 'Alveolar walls are destroyed, leaving large useless air spaces.' },
        { name: 'Pneumonia', parts: ['alveoli', 'rlung', 'llung'], why: 'Infection fills the alveoli with fluid and pus.' },
        { name: 'ARDS', parts: ['alveoli'], why: 'Widespread alveolar damage floods the lungs with fluid.' },
        { name: 'Asthma', parts: ['rbronchus', 'lbronchus'], why: 'Reversible narrowing of the bronchi and bronchioles from inflammation and bronchospasm.' },
        { name: 'Chronic bronchitis', parts: ['rbronchus', 'lbronchus'], why: 'Chronic inflammation and mucus in the bronchi — the productive-cough form of COPD.' },
        { name: 'Pneumothorax', parts: ['rlung', 'llung'], why: 'Air in the pleural space collapses the lung.' },
        { name: 'Lung cancer', parts: ['rlung', 'llung'], why: 'Most arise from bronchial epithelium; smoking is the main cause.' },
        { name: 'Laryngitis', parts: ['larynx'], why: 'Inflamed vocal folds — hoarseness or loss of voice.' },
        { name: 'Croup', parts: ['larynx', 'trachea'], why: 'Viral swelling of the larynx and trachea in children — the barking cough.' },
        { name: 'Tracheitis', parts: ['trachea'], why: 'Bacterial infection of the windpipe.' },
        { name: 'Pharyngitis (sore throat)', parts: ['pharynx'], why: 'Inflammation of the throat, viral or streptococcal.' },
        { name: 'Allergic rhinitis', parts: ['nasal'], why: 'Allergens inflame the nasal lining — sneezing and congestion.' },
        { name: 'Hiatal hernia', parts: ['diaphragm'], why: 'The stomach slides up through the esophageal opening in the diaphragm.' },
        { name: 'Inhaled foreign body (most likely side)', parts: ['rbronchus'], why: 'The right main bronchus is wider and more vertical, so objects go there.' }
    ],
    urinary: [
        { name: 'Pyelonephritis', parts: ['rkidney', 'lkidney'], why: 'A kidney infection, usually climbing up from the bladder — flank pain and fever.' },
        { name: 'Chronic kidney disease', parts: ['rkidney', 'lkidney'], why: 'Progressive loss of nephrons, most often from diabetes and hypertension.' },
        { name: 'Glomerulonephritis', parts: ['rkidney', 'lkidney'], why: 'Inflammation of the glomeruli — blood and protein in the urine.' },
        { name: 'Polycystic kidney disease', parts: ['rkidney', 'lkidney'], why: 'Inherited cysts enlarge both kidneys.' },
        { name: 'Nephrolithiasis (kidney stone)', parts: ['rkidney', 'lkidney'], why: 'Crystals form in the renal pelvis.' },
        { name: 'Ureteral stone (renal colic)', parts: ['ureter'], why: 'A stone lodged in the ureter causes waves of severe flank-to-groin pain.' },
        { name: 'Cystitis', parts: ['bladder'], why: 'Bladder infection — burning, frequency, urgency.' },
        { name: 'Bladder cancer', parts: ['bladder'], why: 'Usually transitional cell carcinoma; painless hematuria; smoking is a major risk.' },
        { name: 'Urethritis', parts: ['urethra'], why: 'Inflamed urethra, often from gonorrhea or chlamydia.' },
        { name: 'Addison’s disease', parts: ['adrenal'], why: 'Adrenal cortex failure — low cortisol and aldosterone.' },
        { name: 'Cushing’s syndrome (adrenal cause)', parts: ['adrenal'], why: 'Excess cortisol from the adrenal cortex.' },
        { name: 'Pheochromocytoma', parts: ['adrenal'], why: 'A tumor of the adrenal medulla pours out adrenaline — episodic severe hypertension.' },
        { name: 'Abdominal aortic aneurysm', parts: ['aorta'], why: 'A dilated abdominal aorta, usually below the renal arteries.' },
        { name: 'Renal artery stenosis', parts: ['renalart'], why: 'A narrowed renal artery triggers renin release and secondary hypertension.' },
        { name: 'Renal vein thrombosis', parts: ['renalvein'], why: 'A clot in the renal vein, seen with nephrotic syndrome.' }
    ],
    skin: [
        { name: 'Psoriasis', parts: ['epidermis'], why: 'Rapid turnover of epidermal cells builds silvery plaques.' },
        { name: 'Basal cell carcinoma', parts: ['epidermis'], why: 'Arises from the basal layer of the epidermis — the most common skin cancer.' },
        { name: 'Melanoma', parts: ['epidermis'], why: 'Cancer of the melanocytes in the basal epidermis.' },
        { name: 'Cellulitis', parts: ['dermis', 'hypodermis'], why: 'Bacterial infection of the dermis and subcutaneous tissue.' },
        { name: 'Folliculitis', parts: ['follicle'], why: 'Infected hair follicles — small pustules around hairs.' },
        { name: 'Acne vulgaris', parts: ['sebaceous', 'follicle'], why: 'Blocked, inflamed pilosebaceous units.' },
        { name: 'Hyperhidrosis', parts: ['sweat'], why: 'Overactive sweat glands.' },
        { name: 'Alopecia', parts: ['follicle', 'hair'], why: 'Hair loss from damaged or shut-down follicles.' },
        { name: 'Lipoma', parts: ['hypodermis'], why: 'A benign tumor of subcutaneous fat.' },
        { name: 'Peripheral neuropathy (skin symptoms)', parts: ['nerve'], why: 'Damaged sensory nerves cause numbness, tingling or burning.' },
        { name: 'Hemangioma', parts: ['vessels'], why: 'A benign overgrowth of blood vessels.' },
        { name: 'Pressure ulcer (deep stage)', parts: ['dermis', 'hypodermis'], why: 'Prolonged pressure kills tissue down through the dermis into fat.' },
        { name: 'Sebaceous cyst', parts: ['sebaceous'], why: 'A blocked oil gland fills with keratin and sebum.' }
    ],
    muscles: [
        { name: 'Torticollis (wry neck)', parts: ['scm'], why: 'A tight or spasming sternocleidomastoid tilts and turns the head.' },
        { name: 'Tension-type neck/shoulder strain', parts: ['trapezius'], why: 'The upper trapezius carries stress and poor posture.' },
        { name: 'Biceps tendon rupture', parts: ['biceps'], why: 'The long head tears — a “Popeye” bulge appears.' },
        { name: 'Diastasis recti', parts: ['rectus'], why: 'The two halves of the rectus abdominis separate, often after pregnancy.' },
        { name: 'Quadriceps strain', parts: ['quads'], why: 'Overstretched front-thigh muscle in sprinting or kicking.' },
        { name: 'Foot drop', parts: ['tibant'], why: 'A weak tibialis anterior (common peroneal nerve injury) cannot lift the foot.' },
        { name: 'Pectoralis major tear', parts: ['pecs'], why: 'Usually during heavy bench pressing.' },
        { name: 'Deltoid injection-site soreness', parts: ['deltoid'], why: 'The deltoid is the standard site for IM vaccines.' },
        { name: 'Sartorius strain', parts: ['sartorius'], why: 'The long strap muscle across the thigh strains in dancers and sprinters.' },
        { name: 'Oblique (side) strain', parts: ['oblique'], why: 'Common in baseball and tennis from forceful trunk rotation.' }
    ],
    cell: [
        { name: 'Mitochondrial myopathy', parts: ['mito'], why: 'Defective mitochondria starve muscle of ATP.' },
        { name: 'Tay-Sachs disease (lysosomal storage)', parts: ['lysosome'], why: 'A missing lysosomal enzyme lets waste pile up in neurons.' },
        { name: 'Cystic fibrosis (CFTR channel defect)', parts: ['membrane'], why: 'A faulty chloride channel in the plasma membrane makes mucus thick.' },
        { name: 'Trisomy 21 (Down syndrome)', parts: ['nucleus'], why: 'An extra chromosome 21 in the nucleus of every cell.' },
        { name: 'Cancer (uncontrolled division)', parts: ['nucleus'], why: 'Mutations in nuclear DNA switch off the brakes on cell division.' },
        { name: 'Cyanide poisoning', parts: ['mito'], why: 'Cyanide blocks the mitochondrial electron transport chain.' },
        { name: 'Antibiotic target (bacterial protein synthesis)', parts: ['ribosomes'], why: 'Drugs like tetracyclines and macrolides jam bacterial ribosomes.' },
        { name: 'Secretory protein misfolding (ER stress)', parts: ['rer'], why: 'Proteins that cannot fold in the rough ER trigger the unfolded-protein response.' }
    ],
    neuron: [
        { name: 'Multiple sclerosis', parts: ['myelin'], why: 'Autoimmune destruction of CNS myelin slows or blocks conduction.' },
        { name: 'Guillain-Barré syndrome', parts: ['myelin'], why: 'Autoimmune attack on peripheral myelin — ascending weakness.' },
        { name: 'Botulism', parts: ['terminals'], why: 'The toxin blocks acetylcholine release from the axon terminals.' },
        { name: 'ALS (motor neuron disease)', parts: ['soma', 'axon'], why: 'Motor neurons themselves degenerate.' },
        { name: 'Peripheral neuropathy (axonal)', parts: ['axon'], why: 'Long axons die back from the ends — stocking-glove numbness.' },
        { name: 'Poliomyelitis', parts: ['soma'], why: 'The virus destroys motor neuron cell bodies in the spinal cord.' },
        { name: 'Local anesthetic action', parts: ['axon', 'node'], why: 'Lidocaine blocks the voltage-gated Na⁺ channels that fire the action potential.' }
    ],
    longbone: [
        { name: 'Growth plate (Salter-Harris) fracture', parts: ['epiline'], why: 'In children the epiphyseal plate is the weakest point of the bone.' },
        { name: 'Osteomyelitis', parts: ['medullary', 'metaphysis'], why: 'Bone infection seeds the marrow; in children it favors the metaphysis.' },
        { name: 'Leukemia (where it starts)', parts: ['medullary', 'spongy'], why: 'Cancer of the blood-forming cells in the bone marrow.' },
        { name: 'Osteoporosis', parts: ['spongy'], why: 'Trabecular (spongy) bone thins first, so vertebrae and hips fracture.' },
        { name: 'Osteosarcoma', parts: ['metaphysis'], why: 'The most common primary bone cancer, typically at the metaphysis near the knee.' },
        { name: 'Periostitis', parts: ['periosteum'], why: 'Inflammation of the periosteum — the pain of shin splints.' },
        { name: 'Osteoarthritis', parts: ['cartilage'], why: 'Articular cartilage wears away until bone grinds on bone.' },
        { name: 'Diaphyseal (shaft) fracture', parts: ['diaphysis'], why: 'A break through the shaft, often from direct trauma.' },
        { name: 'Osteopetrosis', parts: ['compact'], why: 'Failed osteoclasts leave bone dense but brittle.' }
    ]
};
