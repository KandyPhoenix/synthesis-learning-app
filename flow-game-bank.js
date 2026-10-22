// ============================================
// SYNTHESIS — FLOW: PHYSIOLOGY / PATHOLOGY / HIM SEQUENCES
// Each flow is an ordered chain of steps. `why` is the one-line reason the
// step comes where it does, shown after the chain is completed.
//
// Game module (not a book): this file deliberately does not end in -data.js.
// ============================================

window.FLOW_BANK = [
    {
        id: 'heart-blood', title: 'Blood through the heart', icon: '🫀', system: 'Cardiovascular', color: '#ef4444',
        intro: 'Follow one drop of blood from the body, through the lungs, and back out.',
        steps: [
            { t: 'Venae cavae', why: 'Deoxygenated blood from the body arrives through the superior and inferior venae cavae.' },
            { t: 'Right atrium', why: 'The venae cavae empty into the right atrium.' },
            { t: 'Tricuspid valve', why: 'The right atrioventricular valve opens into the right ventricle.' },
            { t: 'Right ventricle', why: 'Pumps blood toward the lungs.' },
            { t: 'Pulmonary valve', why: 'The semilunar valve guarding the pulmonary trunk.' },
            { t: 'Pulmonary arteries → lungs', why: 'The only arteries carrying deoxygenated blood; gas exchange happens in the alveoli.' },
            { t: 'Pulmonary veins', why: 'Oxygenated blood returns to the heart in the pulmonary veins.' },
            { t: 'Left atrium', why: 'The pulmonary veins empty into the left atrium.' },
            { t: 'Mitral (bicuspid) valve', why: 'The left atrioventricular valve opens into the left ventricle.' },
            { t: 'Left ventricle', why: 'The thick-walled chamber that pumps to the whole body.' },
            { t: 'Aortic valve → aorta', why: 'Blood leaves through the aortic semilunar valve into the aorta.' }
        ]
    },
    {
        id: 'conduction', title: 'Cardiac conduction', icon: '⚡', system: 'Cardiovascular', color: '#f97316',
        intro: 'The electrical path that makes the heart beat in order.',
        steps: [
            { t: 'SA node fires', why: 'The sinoatrial node is the natural pacemaker in the right atrial wall.' },
            { t: 'Atria depolarize and contract', why: 'The impulse spreads across both atria (the P wave).' },
            { t: 'AV node delays the signal', why: 'The pause lets the ventricles finish filling before they contract.' },
            { t: 'Bundle of His', why: 'The only electrical bridge from atria to ventricles.' },
            { t: 'Right and left bundle branches', why: 'Carry the impulse down the interventricular septum.' },
            { t: 'Purkinje fibers', why: 'Spread the impulse rapidly through the ventricular walls.' },
            { t: 'Ventricles contract', why: 'Ventricular depolarization is the QRS complex.' }
        ]
    },
    {
        id: 'ecg', title: 'Reading an ECG', icon: '📈', system: 'Cardiovascular', color: '#fb7185',
        intro: 'The waves of one heartbeat, in the order they appear on the strip.',
        steps: [
            { t: 'P wave', why: 'Atrial depolarization.' },
            { t: 'PR segment', why: 'The AV node delay — a flat line before the ventricles fire.' },
            { t: 'QRS complex', why: 'Ventricular depolarization (atrial repolarization is hidden inside it).' },
            { t: 'ST segment', why: 'The plateau phase of the ventricular action potential.' },
            { t: 'T wave', why: 'Ventricular repolarization.' }
        ]
    },
    {
        id: 'airway', title: 'Path of air', icon: '🫁', system: 'Respiratory', color: '#38bdf8',
        intro: 'From the nose to the air sacs where gas exchange happens.',
        steps: [
            { t: 'Nasal cavity', why: 'Air is warmed, moistened and filtered.' },
            { t: 'Pharynx', why: 'The throat — shared by air and food.' },
            { t: 'Larynx', why: 'The voice box; the epiglottis guards the opening.' },
            { t: 'Trachea', why: 'The windpipe, held open by C-shaped cartilage rings.' },
            { t: 'Primary bronchi', why: 'The trachea splits into one bronchus per lung.' },
            { t: 'Bronchioles', why: 'Smaller branches with smooth muscle walls (no cartilage).' },
            { t: 'Alveoli', why: 'The air sacs where O₂ and CO₂ cross into and out of the capillaries.' }
        ]
    },
    {
        id: 'oxygen', title: 'Journey of an oxygen molecule', icon: '🧪', system: 'Respiratory', color: '#22d3ee',
        intro: 'From an alveolus to a mitochondrion.',
        steps: [
            { t: 'Alveolus', why: 'Inhaled oxygen reaches the alveolar air.' },
            { t: 'Diffuses into a pulmonary capillary', why: 'Across the thin respiratory membrane, down its concentration gradient.' },
            { t: 'Binds hemoglobin in a red blood cell', why: 'Almost all oxygen travels bound to hemoglobin.' },
            { t: 'Pulmonary vein → left heart', why: 'Oxygen-rich blood returns to the left atrium and ventricle.' },
            { t: 'Systemic arteries', why: 'The left ventricle pumps it out through the aorta.' },
            { t: 'Tissue capillary', why: 'Oxygen unloads where tissue O₂ is low.' },
            { t: 'Cell mitochondria', why: 'Oxygen is the final electron acceptor in ATP production.' }
        ]
    },
    {
        id: 'digestion', title: 'Path of food', icon: '🍎', system: 'Digestive', color: '#f97316',
        intro: 'The alimentary canal from mouth to anus.',
        steps: [
            { t: 'Mouth', why: 'Chewing and salivary amylase begin digestion.' },
            { t: 'Pharynx', why: 'Swallowing moves the bolus into the esophagus.' },
            { t: 'Esophagus', why: 'Peristalsis carries food to the stomach.' },
            { t: 'Stomach', why: 'Acid and pepsin turn food into chyme.' },
            { t: 'Small intestine', why: 'Duodenum, jejunum, ileum — most digestion and absorption.' },
            { t: 'Large intestine', why: 'Water and electrolytes are absorbed; feces form.' },
            { t: 'Rectum', why: 'Stores feces until defecation.' },
            { t: 'Anus', why: 'The exit, controlled by internal and external sphincters.' }
        ]
    },
    {
        id: 'bile', title: 'Path of bile', icon: '🟢', system: 'Digestive', color: '#84cc16',
        intro: 'From the cells that make it to the gut that uses it.',
        steps: [
            { t: 'Liver cells make bile', why: 'Hepatocytes secrete bile continuously.' },
            { t: 'Hepatic ducts', why: 'Bile leaves the liver through the right and left hepatic ducts.' },
            { t: 'Cystic duct → gallbladder', why: 'Between meals, bile backs up into the gallbladder to be stored and concentrated.' },
            { t: 'Gallbladder contracts (CCK)', why: 'Fat in the duodenum triggers cholecystokinin, which squeezes the gallbladder.' },
            { t: 'Common bile duct', why: 'The cystic and common hepatic ducts join to form it.' },
            { t: 'Duodenum', why: 'Bile enters at the major duodenal papilla and emulsifies fats.' }
        ]
    },
    {
        id: 'urine', title: 'Making and passing urine', icon: '🫘', system: 'Urinary', color: '#facc15',
        intro: 'From the glomerulus to the outside world.',
        steps: [
            { t: 'Glomerular filtration', why: 'Blood pressure forces water and small solutes into Bowman’s capsule.' },
            { t: 'Tubular reabsorption', why: 'Useful substances (glucose, water, Na⁺) return to the blood along the tubule.' },
            { t: 'Tubular secretion', why: 'Wastes, drugs and H⁺ are added to the filtrate.' },
            { t: 'Collecting duct', why: 'ADH controls how much water is reclaimed here.' },
            { t: 'Renal pelvis', why: 'Urine collects in the kidney’s funnel.' },
            { t: 'Ureter', why: 'Peristalsis carries urine down to the bladder.' },
            { t: 'Bladder', why: 'Stores urine until voiding.' },
            { t: 'Urethra', why: 'Urine leaves the body.' }
        ]
    },
    {
        id: 'raas', title: 'Renin–angiotensin–aldosterone', icon: '🩸', system: 'Urinary', color: '#f87171',
        intro: 'How the kidney raises a falling blood pressure.',
        steps: [
            { t: 'Blood pressure or Na⁺ falls', why: 'The juxtaglomerular cells sense less stretch and less sodium.' },
            { t: 'Kidney releases renin', why: 'Renin is the enzyme that starts the cascade.' },
            { t: 'Angiotensinogen → angiotensin I', why: 'Renin clips the liver-made precursor.' },
            { t: 'ACE converts it to angiotensin II', why: 'Angiotensin-converting enzyme, mostly in the lungs.' },
            { t: 'Vasoconstriction + aldosterone release', why: 'Angiotensin II squeezes arterioles and tells the adrenal cortex to secrete aldosterone.' },
            { t: 'Na⁺ and water retained', why: 'Aldosterone makes the kidney keep sodium, and water follows.' },
            { t: 'Blood pressure rises', why: 'More volume and tighter vessels restore pressure.' }
        ]
    },
    {
        id: 'action-potential', title: 'Action potential', icon: '⚡', system: 'Nervous', color: '#a78bfa',
        intro: 'One nerve impulse, from rest back to rest.',
        steps: [
            { t: 'Resting potential (about −70 mV)', why: 'Inside negative, maintained by the Na⁺/K⁺ pump and leaky K⁺ channels.' },
            { t: 'Stimulus reaches threshold', why: 'Around −55 mV the voltage-gated channels respond.' },
            { t: 'Na⁺ channels open — depolarization', why: 'Sodium rushes in and the inside becomes positive.' },
            { t: 'Peak (about +30 mV)', why: 'Na⁺ channels inactivate.' },
            { t: 'K⁺ channels open — repolarization', why: 'Potassium leaves and the inside goes negative again.' },
            { t: 'Hyperpolarization', why: 'K⁺ channels close slowly, overshooting below rest (refractory period).' },
            { t: 'Na⁺/K⁺ pump restores rest', why: 'Three Na⁺ out, two K⁺ in, ready for the next impulse.' }
        ]
    },
    {
        id: 'reflex', title: 'Reflex arc', icon: '🦵', system: 'Nervous', color: '#c084fc',
        intro: 'Why your hand leaves the stove before you feel it.',
        steps: [
            { t: 'Receptor detects the stimulus', why: 'A sensory receptor in skin or muscle fires.' },
            { t: 'Sensory (afferent) neuron', why: 'Carries the signal toward the spinal cord.' },
            { t: 'Integration center in the spinal cord', why: 'A synapse (sometimes via an interneuron) — no brain needed.' },
            { t: 'Motor (efferent) neuron', why: 'Carries the command away from the cord.' },
            { t: 'Effector responds', why: 'The muscle contracts (or the gland secretes).' }
        ]
    },
    {
        id: 'vision', title: 'Path of light and vision', icon: '👁️', system: 'Sensory', color: '#38bdf8',
        intro: 'From the front of the eye to the back of the brain.',
        steps: [
            { t: 'Cornea', why: 'Does most of the light bending.' },
            { t: 'Aqueous humor and pupil', why: 'Light crosses the anterior chamber and passes through the pupil.' },
            { t: 'Lens', why: 'Fine-tunes the focus (accommodation).' },
            { t: 'Vitreous body', why: 'Light crosses the clear gel of the posterior cavity.' },
            { t: 'Retina (rods and cones)', why: 'Photoreceptors convert light into nerve signals.' },
            { t: 'Optic nerve', why: 'Cranial nerve II carries the signals out of the eye.' },
            { t: 'Optic chiasm', why: 'Fibers from the nasal halves of each retina cross over.' },
            { t: 'Visual cortex (occipital lobe)', why: 'Where seeing actually happens.' }
        ]
    },
    {
        id: 'hearing', title: 'Path of sound', icon: '👂', system: 'Sensory', color: '#f472b6',
        intro: 'From a sound wave to the temporal lobe.',
        steps: [
            { t: 'Pinna and ear canal', why: 'The outer ear funnels sound inward.' },
            { t: 'Tympanic membrane', why: 'The eardrum vibrates.' },
            { t: 'Ossicles: malleus, incus, stapes', why: 'Three tiny bones amplify the vibration.' },
            { t: 'Oval window', why: 'The stapes pushes on the membrane of the inner ear.' },
            { t: 'Cochlea (hair cells)', why: 'Fluid waves bend hair cells, which generate nerve signals.' },
            { t: 'Cochlear nerve (CN VIII)', why: 'The vestibulocochlear nerve carries the signal to the brainstem.' },
            { t: 'Auditory cortex (temporal lobe)', why: 'Where hearing is perceived.' }
        ]
    },
    {
        id: 'hpa', title: 'Stress response (HPA axis)', icon: '🧠', system: 'Endocrine', color: '#f59e0b',
        intro: 'Hypothalamus → pituitary → adrenal, and the feedback that switches it off.',
        steps: [
            { t: 'Stressor is perceived', why: 'Physical or psychological stress activates the hypothalamus.' },
            { t: 'Hypothalamus releases CRH', why: 'Corticotropin-releasing hormone travels to the anterior pituitary.' },
            { t: 'Anterior pituitary releases ACTH', why: 'Adrenocorticotropic hormone enters the bloodstream.' },
            { t: 'Adrenal cortex releases cortisol', why: 'ACTH stimulates the zona fasciculata.' },
            { t: 'Cortisol raises glucose, dampens inflammation', why: 'Fuel for “fight or flight” and a brake on the immune system.' },
            { t: 'Negative feedback shuts it down', why: 'High cortisol suppresses CRH and ACTH release.' }
        ]
    },
    {
        id: 'glucose-high', title: 'Blood sugar after a meal', icon: '🍬', system: 'Endocrine', color: '#fb923c',
        intro: 'How insulin brings a high glucose back down.',
        steps: [
            { t: 'Blood glucose rises', why: 'Carbohydrates are absorbed from the gut.' },
            { t: 'Pancreatic beta cells release insulin', why: 'Beta cells in the islets of Langerhans sense the rise.' },
            { t: 'Cells take up glucose', why: 'Insulin moves GLUT4 transporters to muscle and fat cell membranes.' },
            { t: 'Liver stores glucose as glycogen', why: 'Glycogenesis.' },
            { t: 'Blood glucose falls to normal', why: 'The signal that started the loop is removed.' },
            { t: 'Insulin secretion slows', why: 'Negative feedback.' }
        ]
    },
    {
        id: 'glucose-low', title: 'Blood sugar when fasting', icon: '🍬', system: 'Endocrine', color: '#fde047',
        intro: 'How glucagon rescues a falling glucose.',
        steps: [
            { t: 'Blood glucose falls', why: 'Hours since the last meal, or exercise.' },
            { t: 'Pancreatic alpha cells release glucagon', why: 'Alpha cells are the counter-weight to beta cells.' },
            { t: 'Liver breaks down glycogen', why: 'Glycogenolysis releases stored glucose.' },
            { t: 'Liver makes new glucose', why: 'Gluconeogenesis from amino acids and other precursors.' },
            { t: 'Glucose released into the blood', why: 'The liver is the body’s glucose reservoir.' },
            { t: 'Blood glucose rises to normal', why: 'Glucagon secretion then slows — negative feedback.' }
        ]
    },
    {
        id: 'inflammation', title: 'Acute inflammation', icon: '🔥', system: 'Immune', color: '#ef4444',
        intro: 'Redness, heat, swelling, pain — in order.',
        steps: [
            { t: 'Tissue injury or infection', why: 'Damaged cells and pathogens are detected.' },
            { t: 'Histamine and mediators released', why: 'Mast cells and damaged cells release chemical signals.' },
            { t: 'Vasodilation and leaky capillaries', why: 'More blood (redness, heat) and fluid (swelling, pain).' },
            { t: 'Leukocytes migrate to the site', why: 'Chemotaxis draws neutrophils and macrophages out of the vessels.' },
            { t: 'Phagocytosis', why: 'White cells engulf debris and microbes; pus may form.' },
            { t: 'Tissue repair', why: 'Fibroblasts and new vessels rebuild the area.' }
        ]
    },
    {
        id: 'humoral', title: 'Antibody (humoral) response', icon: '🛡️', system: 'Immune', color: '#10b981',
        intro: 'How the body learns to recognize a new invader.',
        steps: [
            { t: 'Pathogen enters the body', why: 'Carries antigens on its surface.' },
            { t: 'Antigen-presenting cell displays the antigen', why: 'A dendritic cell or macrophage shows it on MHC II.' },
            { t: 'Helper T cell is activated', why: 'CD4⁺ T cells recognize the presented antigen and release cytokines.' },
            { t: 'B cell is activated', why: 'With T-cell help, the matching B cell begins to divide.' },
            { t: 'Plasma cells secrete antibodies', why: 'Antibodies tag the pathogen for destruction.' },
            { t: 'Memory B cells remain', why: 'A faster, stronger response next time — the basis of vaccination.' }
        ]
    },
    {
        id: 'hemostasis', title: 'Stopping a bleed (hemostasis)', icon: '🩹', system: 'Cardiovascular', color: '#dc2626',
        intro: 'From a cut vessel to a dissolved clot.',
        steps: [
            { t: 'Vascular spasm', why: 'The injured vessel constricts to slow blood loss.' },
            { t: 'Platelet plug forms', why: 'Platelets stick to exposed collagen and to each other.' },
            { t: 'Coagulation cascade → fibrin mesh', why: 'Clotting factors convert fibrinogen to fibrin, which traps cells.' },
            { t: 'Clot retraction', why: 'Platelets contract, pulling the wound edges together.' },
            { t: 'Fibrinolysis', why: 'Plasmin dissolves the clot once the vessel has healed.' }
        ]
    },
    {
        id: 'bone-healing', title: 'How a fracture heals', icon: '🦴', system: 'Musculoskeletal', color: '#e2e8f0',
        intro: 'Four stages from break to remodeled bone.',
        steps: [
            { t: 'Fracture', why: 'Vessels in the bone and periosteum tear.' },
            { t: 'Hematoma forms', why: 'A blood clot fills the gap within hours.' },
            { t: 'Fibrocartilaginous (soft) callus', why: 'Fibroblasts and chondroblasts bridge the break over weeks.' },
            { t: 'Bony (hard) callus', why: 'Osteoblasts replace the soft callus with spongy bone.' },
            { t: 'Bone remodeling', why: 'Osteoclasts and osteoblasts reshape it toward the original form over months.' }
        ]
    },
    {
        id: 'contraction', title: 'Muscle contraction', icon: '💪', system: 'Musculoskeletal', color: '#a855f7',
        intro: 'From nerve impulse to sliding filaments.',
        steps: [
            { t: 'Impulse reaches the neuromuscular junction', why: 'A motor neuron action potential arrives at the axon terminal.' },
            { t: 'Acetylcholine is released', why: 'ACh crosses the synaptic cleft and binds receptors on the muscle fiber.' },
            { t: 'Muscle fiber depolarizes', why: 'The action potential travels along the sarcolemma and T-tubules.' },
            { t: 'Ca²⁺ released from the sarcoplasmic reticulum', why: 'Calcium floods the sarcoplasm.' },
            { t: 'Ca²⁺ binds troponin, exposing binding sites', why: 'Tropomyosin shifts off the actin.' },
            { t: 'Myosin heads bind actin (cross-bridges)', why: 'The sliding-filament cycle begins.' },
            { t: 'Power stroke pulls the filaments (ATP)', why: 'The sarcomere shortens.' },
            { t: 'Ca²⁺ pumped back; muscle relaxes', why: 'Binding sites are covered again.' }
        ]
    },
    {
        id: 'menstrual', title: 'Menstrual cycle', icon: '🌙', system: 'Reproductive', color: '#ec4899',
        intro: 'A simplified 28-day cycle, starting on day 1.',
        steps: [
            { t: 'Menstruation (day 1)', why: 'The endometrium sheds as hormone levels are low.' },
            { t: 'Follicular phase — FSH grows a follicle', why: 'Estrogen rises as the follicle matures and the lining rebuilds.' },
            { t: 'LH surge → ovulation (about day 14)', why: 'The mature follicle releases an egg.' },
            { t: 'Luteal phase — corpus luteum makes progesterone', why: 'Progesterone thickens and maintains the lining.' },
            { t: 'No fertilization: corpus luteum degenerates', why: 'Progesterone and estrogen fall.' },
            { t: 'Lining breaks down — menstruation begins again', why: 'The cycle restarts.' }
        ]
    },
    {
        id: 'sperm', title: 'Path of sperm', icon: '🧬', system: 'Reproductive', color: '#60a5fa',
        intro: 'From where sperm are made to where they leave the body.',
        steps: [
            { t: 'Seminiferous tubules (testis)', why: 'Sperm are produced here.' },
            { t: 'Epididymis', why: 'Sperm mature and are stored.' },
            { t: 'Vas (ductus) deferens', why: 'Carries sperm up into the pelvis.' },
            { t: 'Ejaculatory duct', why: 'Joins the seminal vesicle duct and passes through the prostate.' },
            { t: 'Urethra', why: 'The shared exit for semen and urine.' }
        ]
    },
    {
        id: 'atherosclerosis', title: 'From plaque to heart attack', icon: '🫀', system: 'Pathology', color: '#f43f5e',
        intro: 'How atherosclerosis becomes a myocardial infarction.',
        steps: [
            { t: 'Endothelial injury', why: 'Hypertension, smoking and high LDL damage the artery lining.' },
            { t: 'LDL accumulates in the intima', why: 'Cholesterol seeps under the damaged endothelium.' },
            { t: 'Macrophages become foam cells (fatty streak)', why: 'They engulf oxidized LDL.' },
            { t: 'Fibrous plaque grows', why: 'Smooth muscle and collagen cap the lipid core, narrowing the lumen.' },
            { t: 'Plaque ruptures', why: 'The cap tears and exposes the thrombogenic core.' },
            { t: 'Thrombus forms on the plaque', why: 'Platelets and fibrin pile onto the rupture.' },
            { t: 'Coronary artery is occluded', why: 'Blood flow to part of the myocardium stops.' },
            { t: 'Ischemia → necrosis: myocardial infarction', why: 'Heart muscle dies without oxygen.' }
        ]
    },
    {
        id: 't2dm', title: 'Type 2 diabetes progression', icon: '🍬', system: 'Pathology', color: '#fb923c',
        intro: 'From insulin resistance to complications.',
        steps: [
            { t: 'Insulin resistance', why: 'Muscle, fat and liver cells respond poorly to insulin.' },
            { t: 'Beta cells compensate with more insulin', why: 'Glucose stays normal for a while (hyperinsulinemia).' },
            { t: 'Beta cell exhaustion', why: 'Output can no longer keep up.' },
            { t: 'Hyperglycemia', why: 'Fasting and post-meal glucose rise; HbA1c climbs.' },
            { t: 'Chronic complications', why: 'Neuropathy, nephropathy, retinopathy and vascular disease develop over years.' }
        ]
    },
    {
        id: 'sepsis', title: 'Sepsis cascade', icon: '🦠', system: 'Pathology', color: '#84cc16',
        intro: 'How an infection can become organ failure.',
        steps: [
            { t: 'Infection', why: 'Bacteria (most often) enter the blood or a major organ.' },
            { t: 'Systemic inflammatory response', why: 'Cytokines flood the whole body, not just the site.' },
            { t: 'Vasodilation and capillary leak', why: 'Fluid leaves the vessels; blood pressure drops.' },
            { t: 'Hypotension — septic shock', why: 'Pressure stays low despite fluids.' },
            { t: 'Organ hypoperfusion', why: 'Kidneys, lungs and brain are starved of flow.' },
            { t: 'Multiple organ dysfunction', why: 'The end stage without rapid antibiotics and support.' }
        ]
    },
    {
        id: 'revenue-cycle', title: 'Revenue cycle', icon: '💵', system: 'HIM', color: '#10b981',
        intro: 'From the first phone call to the last dollar collected.',
        steps: [
            { t: 'Scheduling and registration', why: 'Demographics and insurance are captured up front.' },
            { t: 'Insurance verification and authorization', why: 'Confirms eligibility and prior auth before the visit.' },
            { t: 'Charge capture', why: 'Services provided are documented and recorded.' },
            { t: 'Coding', why: 'Diagnoses and procedures become ICD-10-CM, CPT and HCPCS codes.' },
            { t: 'Claim submission', why: 'The claim (837P/837I) goes to the payer, usually through a clearinghouse.' },
            { t: 'Payer adjudication', why: 'The payer accepts, denies or adjusts the claim.' },
            { t: 'Payment posting', why: 'Remittances (835/ERA) are applied to accounts.' },
            { t: 'Denial management and appeals', why: 'Rejected or underpaid claims are corrected and resubmitted.' },
            { t: 'Patient billing and collections', why: 'Remaining balances are billed to the patient.' }
        ]
    },
    {
        id: 'code-lookup', title: 'Looking up an ICD-10-CM code', icon: '📘', system: 'HIM', color: '#6366f1',
        intro: 'The official steps — never code from the Index alone.',
        steps: [
            { t: 'Identify the main term in the diagnosis', why: 'Usually the condition, not the anatomic site.' },
            { t: 'Find it in the Alphabetic Index', why: 'Check subterms and any cross-references (see, see also).' },
            { t: 'Verify the code in the Tabular List', why: 'The Index gives a lead; the Tabular confirms it.' },
            { t: 'Read the instructional notes', why: 'Includes, Excludes1/Excludes2, code first, use additional code.' },
            { t: 'Assign the code to its highest specificity', why: 'Add every required 4th–7th character.' }
        ]
    },
    {
        id: 'roi', title: 'Release of information', icon: '📂', system: 'HIM', color: '#38bdf8',
        intro: 'Handling a request for a patient’s records under HIPAA.',
        steps: [
            { t: 'Receive and log the request', why: 'Every request gets a date and tracking entry.' },
            { t: 'Validate the authorization', why: 'Check the required HIPAA elements: patient signature, date, expiration, what is being released and to whom.' },
            { t: 'Verify the requester’s identity', why: 'Only the patient or an authorized party may receive PHI.' },
            { t: 'Retrieve and review the record', why: 'Apply the minimum-necessary standard; pull only what was authorized.' },
            { t: 'Release and document the disclosure', why: 'Send it securely and record it for the accounting of disclosures.' }
        ]
    }
];
