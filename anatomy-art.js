// ============================================
// SYNTHESIS — ANATOMY ARCADE ARTWORK
// Replaces the hand-drawn boards in anatomy-game-boards.js with open-licensed
// medical illustrations (assets/anatomy/*.svg) and places transparent tap
// zones over each structure. Each entry: { src, w, h, credit, parts: { partId:
// { pin: [x, y], hit: [...shapes] } } } in the image's rendered pixel space
// (w × h). Shapes: ['c',cx,cy,r] circle · ['e',cx,cy,rx,ry,rot?] ellipse ·
// ['p','x,y x,y …'] polygon · ['ring',cx,cy,r,width] stroke-only ring.
// Boards without an entry here keep their hand-drawn SVG. Credits are shown
// under every board; see assets/anatomy/CREDITS.md for the full list.
// ============================================
window.ANATOMY_ART = {
    heart: { src: 'assets/anatomy/heart.svg', w: 600, h: 590,
        credit: { title: 'Diagram of the human heart', author: 'Wapcaplet', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Diagram_of_the_human_heart_(cropped).svg', note: 'labels removed' },
        parts: {
            svc: { pin: [165, 120], hit: [['e', 165, 125, 30, 70]] },
            ivc: { pin: [180, 500], hit: [['e', 180, 500, 33, 60]] },
            pulmveins: { pin: [450, 205], hit: [['e', 125, 215, 38, 34], ['e', 452, 205, 38, 45]] },
            ra: { pin: [195, 320], hit: [['e', 195, 320, 48, 82]] },
            la: { pin: [370, 235], hit: [['e', 372, 235, 52, 46]] },
            rv: { pin: [270, 450], hit: [['p', '200,375 300,352 345,425 332,505 262,545 200,485']] },
            lv: { pin: [420, 420], hit: [['p', '332,302 470,282 502,382 472,482 402,545 345,505 322,422']] },
            aorta: { pin: [300, 70], hit: [['p', '230,45 300,22 372,35 397,100 387,165 350,150 345,115 300,90 265,105 250,160 220,150 198,100'], ['e', 300, 545, 25, 32]] },
            pulmtrunk: { pin: [292, 250], hit: [['p', '258,335 268,300 268,240 282,185 335,172 472,135 477,177 345,195 330,230 322,300 300,347'], ['e', 130, 155, 38, 20]] }
        } },
    brain: { src: 'assets/anatomy/brain.svg', w: 600, h: 428,
        credit: { title: 'Lobes of the brain (Gray’s Anatomy plate, coloured)', author: 'Henry Vandyke Carter', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Lobes_of_the_brain_NL.svg' },
        parts: {
            frontal: { pin: [150, 150], hit: [['p', '20,70 70,30 150,22 300,40 290,75 262,205 190,258 60,302 28,235']] },
            parietal: { pin: [400, 110], hit: [['p', '302,40 420,58 522,140 542,176 482,205 352,202 270,198 292,72']] },
            temporal: { pin: [320, 290], hit: [['p', '182,268 272,212 345,207 472,217 472,282 402,347 282,382 192,332']] },
            occipital: { pin: [520, 245], hit: [['p', '490,160 560,200 588,255 562,292 482,312 452,292 472,222']] },
            brainstem: { pin: [365, 385], hit: [['e', 362, 385, 38, 42]] },
            cerebellum: { pin: [455, 335], hit: [['e', 450, 335, 85, 42]] }
        } },
    skeleton: { src: 'assets/anatomy/skeleton.svg', w: 600, h: 1159,
        credit: { title: 'Human skeleton, front (no labels)', author: 'LadyofHats (Mariana Ruiz Villarreal), Mikael Häggström', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Human_skeleton_front_-_no_labels.svg' },
        parts: {
            skull: { pin: [280, 80], hit: [['e', 280, 85, 58, 68]] },
            mandible: { pin: [280, 165], hit: [['e', 280, 162, 42, 26]] },
            spine: { pin: [280, 420], hit: [['e', 280, 370, 22, 175]] },
            clavicle: { pin: [225, 210], hit: [['e', 222, 210, 48, 11], ['e', 338, 210, 48, 11]] },
            sternum: { pin: [280, 290], hit: [['e', 280, 290, 16, 58]] },
            ribs: { pin: [225, 320], hit: [['e', 222, 312, 58, 82], ['e', 338, 312, 58, 82]] },
            humerus: { pin: [150, 320], hit: [['e', 150, 322, 24, 92], ['e', 414, 322, 24, 92]] },
            radius: { pin: [103, 490], hit: [['e', 104, 492, 13, 82], ['e', 458, 500, 13, 82]] },
            ulna: { pin: [132, 495], hit: [['e', 132, 495, 12, 82], ['e', 430, 498, 12, 82]] },
            hand: { pin: [110, 630], hit: [['e', 110, 632, 36, 58], ['e', 492, 618, 42, 58]] },
            pelvis: { pin: [212, 522], hit: [['e', 280, 512, 96, 66]] },
            femur: { pin: [235, 690], hit: [['e', 236, 690, 26, 122], ['e', 326, 690, 26, 122]] },
            patella: { pin: [240, 810], hit: [['e', 240, 810, 16, 19], ['e', 322, 810, 16, 19]] },
            tibia: { pin: [238, 960], hit: [['e', 238, 962, 17, 118], ['e', 326, 962, 17, 118]] },
            fibula: { pin: [212, 960], hit: [['e', 212, 962, 10, 112], ['e', 352, 962, 10, 112]] },
            foot: { pin: [225, 1105], hit: [['e', 226, 1107, 42, 42], ['e', 336, 1107, 42, 42]] }
        } },
    digestive: { src: 'assets/anatomy/digestive.svg', w: 600, h: 848,
        credit: { title: 'Digestive system diagram', author: 'Mariana Ruiz (LadyofHats), Jmarchn', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Digestive_system_diagram_en.svg', note: 'labels removed' },
        parts: {
            esophagus: { pin: [303, 330], hit: [['e', 303, 335, 15, 105]] },
            liver: { pin: [250, 480], hit: [['p', '195,437 290,420 362,432 392,452 332,522 252,562 200,542 185,492']] },
            gallbladder: { pin: [250, 505], hit: [['e', 250, 505, 26, 16]] },
            pancreas: { pin: [345, 548], hit: [['e', 342, 547, 66, 17]] },
            stomach: { pin: [365, 490], hit: [['e', 362, 490, 52, 47]] },
            smallint: { pin: [320, 665], hit: [['e', 320, 665, 82, 72]] },
            largeint: { pin: [212, 650], hit: [['e', 212, 652, 23, 78], ['e', 315, 588, 112, 19], ['e', 422, 640, 23, 102], ['e', 362, 752, 62, 21]] },
            appendix: { pin: [250, 745], hit: [['e', 250, 745, 15, 15]] },
            rectum: { pin: [305, 790], hit: [['e', 305, 790, 17, 36]] }
        } },
    eye: { src: 'assets/anatomy/eye.svg', w: 600, h: 611,
        credit: { title: 'Schematic diagram of the human eye', author: 'Rhcastilhos, Jmarchn', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Schematic_diagram_of_the_human_eye_en.svg', note: 'labels removed' },
        parts: {
            opticnerve: { pin: [165, 540], hit: [['p', '110,562 190,455 252,472 162,602']] },
            sclera: { pin: [62, 330], hit: [['ring', 300, 322, 238, 16]] },
            choroid: { pin: [497, 394], hit: [['ring', 300, 322, 210, 12]] },
            retina: { pin: [413, 480], hit: [['ring', 300, 322, 194, 12]] },
            vitreous: { pin: [300, 350], hit: [['c', 300, 340, 170]] },
            ciliary: { pin: [225, 140], hit: [['e', 225, 140, 32, 11], ['e', 377, 140, 32, 11]] },
            lens: { pin: [300, 160], hit: [['e', 300, 160, 66, 33]] },
            iris: { pin: [365, 118], hit: [['e', 232, 118, 42, 11], ['e', 368, 118, 42, 11]] },
            pupil: { pin: [300, 128], hit: [['e', 300, 128, 36, 9]] },
            cornea: { pin: [300, 92], hit: [['p', '200,122 232,86 300,70 370,86 400,122 350,112 300,106 250,112']] }
        } },
    respiratory: { src: 'assets/anatomy/respiratory.svg', w: 600, h: 639,
        credit: { title: 'Respiratory system (complete)', author: 'LadyofHats (Mariana Ruiz), Jmarchn', license: 'Public domain', url: 'https://commons.wikimedia.org/wiki/File:Respiratory_system_complete_en.svg', note: 'labels removed' },
        parts: {
            nasal: { pin: [240, 105], hit: [['e', 240, 107, 56, 32]] },
            pharynx: { pin: [292, 175], hit: [['e', 292, 177, 16, 47]] },
            larynx: { pin: [268, 228], hit: [['e', 268, 230, 19, 23]] },
            trachea: { pin: [290, 300], hit: [['e', 290, 302, 15, 46]] },
            rlung: { pin: [200, 420], hit: [['p', '170,332 232,282 277,302 287,422 277,502 192,492 160,432']] },
            llung: { pin: [400, 420], hit: [['p', '305,302 367,277 422,312 442,402 427,482 332,492 302,422']] },
            rbronchus: { pin: [255, 345], hit: [['e', 255, 347, 26, 13]] },
            lbronchus: { pin: [330, 350], hit: [['e', 332, 352, 26, 13]] },
            diaphragm: { pin: [300, 540], hit: [['p', '150,492 300,472 442,492 432,542 362,602 302,562 202,602 160,552']] },
            alveoli: { pin: [480, 130], hit: [['e', 482, 132, 76, 66]] }
        } },
    urinary: { src: 'assets/anatomy/urinary.svg', w: 600, h: 788,
        credit: { title: 'Urinary system', author: 'Jordi March i Nogué', license: 'CC BY-SA 3.0', url: 'https://commons.wikimedia.org/wiki/File:Urinary_system.svg', note: 'number labels removed' },
        parts: {
            aorta: { pin: [322, 400], hit: [['e', 322, 262, 21, 240], ['p', '300,500 345,500 420,620 400,640 322,540 245,640 225,620']] },
            ivc: { pin: [275, 400], hit: [['e', 275, 262, 22, 240]] },
            rkidney: { pin: [170, 240], hit: [['e', 172, 242, 56, 102]] },
            lkidney: { pin: [430, 225], hit: [['e', 432, 227, 66, 102]] },
            adrenal: { pin: [205, 118], hit: [['e', 205, 120, 42, 32], ['e', 400, 105, 36, 26]] },
            renalart: { pin: [250, 215], hit: [['e', 252, 215, 46, 11], ['e', 372, 207, 42, 11]] },
            renalvein: { pin: [250, 238], hit: [['e', 252, 238, 46, 11], ['e', 372, 190, 42, 11]] },
            ureter: { pin: [228, 450], hit: [['p', '210,252 234,252 242,652 224,662'], ['p', '366,252 386,252 372,652 352,652']] },
            bladder: { pin: [290, 695], hit: [['e', 292, 695, 56, 42]] },
            urethra: { pin: [292, 760], hit: [['e', 292, 760, 11, 26]] }
        } },
    cell: { src: 'assets/anatomy/cell.jpg', w: 600, h: 524,
        credit: { title: 'The animal cell (Figure 3.12)', author: 'OpenStax College, Anatomy & Physiology', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:0312_Animal_Cell_and_Components.jpg', note: 'labels removed, cropped' },
        parts: {
            membrane: { pin: [472, 200], hit: [['pl', '300,14 380,32 438,78 470,132 474,200 460,290 428,368 390,428 330,474 250,508 170,502 95,468 45,398 22,310 27,220 60,132 120,62 200,24 300,14', 18]] },
            cytoplasm: { pin: [425, 318], hit: [['p', '300,30 375,45 430,90 462,140 465,210 455,290 425,365 385,420 325,465 250,495 175,488 105,455 62,395 40,310 45,225 78,145 130,80 205,40']] },
            nucleus: { pin: [175, 310], hit: [['c', 148, 285, 75]] },
            nucleolus: { pin: [120, 265], hit: [['c', 120, 265, 21]] },
            rer: { pin: [225, 190], hit: [['ring', 150, 285, 108, 50]] },
            ser: { pin: [300, 290], hit: [['e', 300, 290, 33, 46]] },
            golgi: { pin: [95, 390], hit: [['e', 95, 390, 56, 46]] },
            mito: { pin: [250, 70], hit: [['e', 250, 70, 43, 29], ['e', 330, 105, 43, 29], ['e', 415, 265, 29, 43]] },
            lysosome: { pin: [378, 318], hit: [['c', 378, 318, 14], ['c', 410, 336, 14], ['c', 248, 453, 14]] },
            ribosomes: { pin: [395, 150], hit: [['e', 395, 150, 30, 24], ['e', 245, 118, 25, 18]] },
            centrioles: { pin: [328, 212], hit: [['e', 328, 212, 26, 23]] }
        } },
    muscles: { src: 'assets/anatomy/muscles.png', w: 600, h: 684,
        credit: { title: 'Muscles, anterior view (unlabeled)', author: 'OpenStax College, Anatomy & Physiology', license: 'CC BY 4.0', url: 'https://commons.wikimedia.org/wiki/File:Muscles;_anterior_view;_unlabeled.png', note: 'leader lines removed' },
        parts: {
            scm: { pin: [262, 112], hit: [['e', 262, 115, 13, 25], ['e', 303, 115, 13, 25]] },
            trapezius: { pin: [218, 128], hit: [['e', 218, 128, 32, 13], ['e', 352, 128, 32, 13]] },
            deltoid: { pin: [195, 162], hit: [['e', 195, 163, 29, 33], ['e', 378, 166, 29, 33]] },
            pecs: { pin: [240, 185], hit: [['e', 240, 186, 42, 29]] },
            biceps: { pin: [172, 225], hit: [['e', 172, 226, 19, 46], ['e', 398, 228, 19, 46]] },
            rectus: { pin: [285, 262], hit: [['e', 285, 262, 29, 56]] },
            oblique: { pin: [232, 275], hit: [['e', 232, 276, 19, 46], ['e', 340, 276, 19, 46]] },
            quads: { pin: [330, 432], hit: [['e', 245, 415, 31, 72], ['e', 322, 415, 31, 72]] },
            sartorius: { pin: [234, 385], hit: [['pl', '222,345 240,400 262,470', 13], ['pl', '345,345 325,400 303,470', 13]] },
            tibant: { pin: [250, 560], hit: [['e', 250, 560, 13, 56], ['e', 318, 560, 13, 56]] }
        } },
    skin: { src: 'assets/anatomy/skin.jpg', w: 600, h: 657,
        credit: { title: 'Structure of the skin (Figure 5.2)', author: 'OpenStax College, Anatomy & Physiology', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:501_Structure_of_the_skin.jpg', note: 'labels removed, cropped' },
        parts: {
            epidermis: { pin: [300, 262], hit: [['p', '20,235 150,170 580,150 580,255 330,285 20,300']] },
            dermis: { pin: [460, 420], hit: [['p', '20,300 330,285 580,255 580,470 520,500 330,540 20,545']] },
            hypodermis: { pin: [300, 600], hit: [['p', '20,545 330,540 580,470 580,600 460,650 300,655 120,655 20,610']] },
            vessels: { pin: [525, 545], hit: [['e', 525, 545, 48, 70], ['e', 262, 330, 72, 52], ['e', 85, 580, 55, 36], ['pl', '245,400 200,480 150,545', 16]] },
            nerve: { pin: [445, 345], hit: [['e', 445, 345, 22, 70], ['e', 65, 320, 28, 46], ['e', 200, 612, 40, 36]] },
            sweat: { pin: [398, 462], hit: [['e', 398, 462, 42, 40], ['pl', '395,270 388,330 392,405', 14]] },
            follicle: { pin: [120, 440], hit: [['e', 120, 440, 40, 100], ['e', 500, 400, 30, 95]] },
            hair: { pin: [245, 70], hit: [['pl', '135,330 175,190 245,70 325,22', 22], ['pl', '335,165 352,105 368,65', 20], ['pl', '388,225 405,150 440,100 456,88', 20], ['pl', '497,150 505,100 520,72', 20]] },
            sebaceous: { pin: [80, 385], hit: [['e', 80, 385, 30, 28], ['e', 165, 418, 25, 25], ['e', 540, 278, 25, 30]] },
            arrector: { pin: [222, 398], hit: [['pl', '195,430 255,360 320,300', 22]] }
        } },
    longbone: { src: 'assets/anatomy/longbone.jpg', w: 600, h: 1875,
        credit: { title: 'Anatomy of a long bone (Figure 6.7)', author: 'OpenStax College, Anatomy & Physiology', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:603_Anatomy_of_Long_Bone.jpg', note: 'labels removed, cropped' },
        parts: {
            epiphysis: { pin: [130, 1720], hit: [['e', 360, 175, 200, 155], ['e', 310, 1760, 248, 122]] },
            spongy: { pin: [300, 150], hit: [['e', 320, 200, 142, 132]] },
            cartilage: { pin: [490, 90], hit: [['e', 482, 100, 82, 86], ['e', 270, 1790, 122, 86]] },
            epiline: { pin: [300, 240], hit: [['e', 300, 240, 112, 20]] },
            metaphysis: { pin: [300, 380], hit: [['e', 300, 372, 112, 56], ['e', 300, 1560, 112, 72]] },
            periosteum: { pin: [230, 1060], hit: [['p', '185,1000 302,1005 276,1150 210,1082']] },
            diaphysis: { pin: [300, 1400], hit: [['e', 280, 950, 98, 530]] },
            medullary: { pin: [265, 930], hit: [['e', 275, 650, 46, 300], ['e', 265, 930, 44, 46]] },
            compact: { pin: [348, 700], hit: [['pl', '210,420 205,700 200,950 185,1300 170,1500', 26], ['pl', '345,420 350,700 350,950 335,1300 330,1500', 26]] }
        } },
    neuron: { src: 'assets/anatomy/neuron.jpg', w: 600, h: 401,
        credit: { title: 'The neuron (Figure 12.8)', author: 'OpenStax College, Anatomy & Physiology', license: 'CC BY 3.0', url: 'https://commons.wikimedia.org/wiki/File:1206_The_Neuron.jpg', note: 'labels removed' },
        parts: {
            dendrites: { pin: [190, 45], hit: [['e', 210, 60, 92, 56], ['e', 225, 185, 72, 46]] },
            soma: { pin: [270, 132], hit: [['e', 245, 110, 56, 43]] },
            nucleus: { pin: [234, 108], hit: [['c', 234, 108, 17]] },
            hillock: { pin: [303, 124], hit: [['e', 303, 124, 17, 13]] },
            axon: { pin: [340, 138], hit: [['pl', '300,124 360,144 420,150', 16], ['pl', '497,285 497,312', 14]] },
            myelin: { pin: [380, 146], hit: [['e', 380, 146, 28, 15], ['e', 432, 160, 26, 15], ['e', 508, 170, 22, 15], ['e', 520, 215, 16, 25], ['e', 514, 268, 16, 23]] },
            node: { pin: [408, 153], hit: [['c', 408, 153, 10], ['c', 463, 165, 10], ['c', 518, 242, 10]] },
            terminals: { pin: [500, 338], hit: [['e', 500, 335, 46, 32]] }
        } }
};

// Merge the artwork into the hand-drawn boards: swap the base art for the image
// and every part's shape for its tap zone, keeping names, colours and facts.
(function applyAnatomyArt() {
    const boards = window.ANATOMY_BOARDS || []; const art = window.ANATOMY_ART || {};
    const shape = s => {
        const t = s[0];
        if (t === 'c') return `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}" fill="C" stroke="C"/>`;
        if (t === 'e') return `<ellipse cx="${s[1]}" cy="${s[2]}" rx="${s[3]}" ry="${s[4]}" fill="C" stroke="C"${s[5] ? ` transform="rotate(${s[5]} ${s[1]} ${s[2]})"` : ''}/>`;
        if (t === 'p') return `<polygon points="${s[1]}" fill="C" stroke="C"/>`;
        if (t === 'r') return `<rect x="${s[1]}" y="${s[2]}" width="${s[3]}" height="${s[4]}" rx="6" fill="C" stroke="C"/>`;
        if (t === 'ring') return `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}" fill="none" stroke="C" style="stroke-width:${s[4]}px" pointer-events="stroke"/>`;
        if (t === 'pl') return `<polyline points="${s[1]}" fill="none" stroke="C" style="stroke-width:${s[2]}px" stroke-linejoin="round" stroke-linecap="round" pointer-events="stroke"/>`;
        return '';
    };
    boards.forEach(b => {
        const a = art[b.id]; if (!a) return;
        const parts = b.parts.filter(p => a.parts[p.id]);
        if (parts.length < 3) return;                      // art must cover the board
        b.img = a.src; b.credit = a.credit; b.viewBox = `0 0 ${a.w} ${a.h}`;
        b.base = `<image href="${a.src}" x="0" y="0" width="${a.w}" height="${a.h}" preserveAspectRatio="xMidYMid meet"/>`;
        b.over = '';
        const area = s => { const t = s[0]; if (t === 'c') return Math.PI * s[3] * s[3]; if (t === 'e') return Math.PI * s[3] * s[4]; if (t === 'ring') return 2 * Math.PI * s[3] * s[4]; if (t === 'r') return s[3] * s[4]; if (t === 'pl') return s[1].trim().split(/\s+/).length * 40 * s[2];
            if (t === 'p') { const pts = s[1].trim().split(/\s+/).map(q => q.split(',').map(Number)); let A = 0; for (let i = 0; i < pts.length; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length]; A += x1 * y2 - x2 * y1; } return Math.abs(A) / 2; } return 0; };
        b.parts = parts.map(p => { const ap = a.parts[p.id]; return { ...p, pin: ap.pin, shape: ap.hit.map(shape).join(''), _area: Math.max(...ap.hit.map(area)) }; });
        b.parts.sort((x, y) => y._area - x._area);          // big zones underneath, small zones on top
    });
})();
