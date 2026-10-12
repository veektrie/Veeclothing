export type FAQCategory = 'all' | 'corporate' | 'bespoke' | 'fabrics' | 'locations';

export interface FAQItem {
  id: string;
  category: 'corporate' | 'bespoke' | 'fabrics' | 'locations';
  categoryLabel: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string[];
  keywords: string[];
  relatedLink?: {
    href: string;
    label: string;
  };
}

export const FAQ_CATEGORIES: { id: FAQCategory; label: string; count?: number }[] = [
  { id: 'all', label: 'All Questions' },
  { id: 'corporate', label: 'Corporate & B2B' },
  { id: 'bespoke', label: 'Bespoke Commissions' },
  { id: 'fabrics', label: 'Fabrics & Craft' },
  { id: 'locations', label: 'Locations & Logistics' },
];

export const FAQ_DATA: FAQItem[] = [
  // ═════════════════════════════════════════════════════════════════
  // ─── CATEGORY 1: CORPORATE & B2B (12 Questions) ─────────────────
  // ═════════════════════════════════════════════════════════════════
  {
    id: 'corporate-moq-capacity',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'What is the minimum order quantity (MOQ) and maximum production capacity for corporate uniforms?',
    shortAnswer: 'Vee Clothing Company accepts corporate uniform orders starting from 5 garments up to 500+ units. Every commission receives identical engineering standards, with volume-tiered pricing applying for orders exceeding 50 units.',
    detailedAnswer: [
      'Flexible Entry: Orders can begin at 5 garments for small teams, executive committees, or pilot department rollouts.',
      'Industrial Capacity: Our production rails scale seamlessly up to 500+ units for enterprise banking, energy, and hospitality workforces.',
      'Tiered Pricing: Preferential corporate procurement rates automatically unlock at 50, 100, and 250+ units without compromising fabric grade or construction.',
    ],
    keywords: ['corporate uniforms Lagos', 'minimum order uniform Nigeria', 'MOQ corporate shirts', 'bulk office uniforms Lagos'],
    relatedLink: {
      href: '/services/business',
      label: 'Explore The Corporate Atelier',
    },
  },
  {
    id: 'corporate-brand-color-matching',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'How does Vee Clothing Company ensure brand color consistency and logo precision across large orders?',
    shortAnswer: 'We run a strict Brand Alignment Protocol using Pantone-referenced textile dyeing and pre-production master prototypes. Every corporate emblem is rendered with high-density, precision-registered embroidery or discreet jacquard weaves.',
    detailedAnswer: [
      'Pantone Fabric Matching: We calibrate raw dye lots against your corporate brand guidelines, eliminating shade discrepancies across departments.',
      'High-Density Embroidery: Micro-stitch registration guarantees crisp text, sharp crest borders, and zero thread fraying after heavy industrial washing.',
      'Master Sample Sign-off: Production does not commence until your brand or HR committee physically inspects and approves the signed master prototype.',
    ],
    keywords: ['brand color matching uniforms', 'corporate embroidery Lagos', 'Pantone uniform fabrics Nigeria', 'branded workwear Lagos'],
    relatedLink: {
      href: '/services/business',
      label: 'View Identity Strategy',
    },
  },
  {
    id: 'corporate-onsite-fittings',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'Can your master tailors conduct on-site fitting sessions at our corporate office in Lagos or Abuja?',
    shortAnswer: 'Yes. For corporate orders of 20 or more staff, Vee Clothing Company deploys our mobile tailoring team directly to your headquarters in Lagos or Abuja, minimizing workday disruption and ensuring anatomical fit for each employee.',
    detailedAnswer: [
      'Concierge Deployment: We set up temporary executive fitting suites directly in your boardroom or office facility.',
      'Zero Workday Interruption: Staff members are measured in structured 10-minute intervals using our standardized measurement protocols.',
      'Cross-City Flexibility: We cover primary business districts including Victoria Island, Ikoyi, Marina, and Ikeja in Lagos, as well as Maitama, Wuse, and Asokoro in Abuja.',
    ],
    keywords: ['on site office fittings Lagos', 'corporate tailoring Abuja', 'office uniform measurements Lagos', 'corporate fittings Victoria Island'],
    relatedLink: {
      href: '/locations/lagos',
      label: 'Check Lagos Concierge Details',
    },
  },
  {
    id: 'corporate-turnaround-times',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'What is the turnaround time for corporate orders, and are rush delivery timelines available?',
    shortAnswer: 'Standard corporate commissions require 10 to 15 working days following sample approval and size sign-off. Expedited rush production can be arranged for time-sensitive corporate launches and AGMs subject to schedule availability.',
    detailedAnswer: [
      'Standard Timeline: 10 to 15 business days ensures rigorous quality inspection, hand-finishing, and steam press conditioning.',
      'Master Prototyping: Initial pre-production samples are completed within 3 to 5 business days for client approval.',
      'Rush Commissions: Expedited production schedules are available with priority procurement allocations for urgent board meetings or product launches.',
    ],
    keywords: ['corporate uniform lead time', 'fast uniform tailoring Lagos', 'turnaround corporate clothes Nigeria', 'urgent corporate wear'],
  },
  {
    id: 'corporate-gifting-executive-boxes',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'Do you offer bespoke corporate gifting, custom monogramming, and luxury packaging for clients and executives?',
    shortAnswer: 'Yes. We curate turnkey corporate gifting collections including monogrammed silk ties, hand-embroidered pocket squares, tailored dress shirts, and custom cufflinks, all presented in our signature navy rigid gift boxes with custom branding.',
    detailedAnswer: [
      'Silk Thread Monogramming: Garments and accessories are hand-monogrammed with recipient initials, board titles, or subtle company watermarks.',
      'Curated Relationship Tiers: Tiered gift arrangements tailored for end-of-year board appreciation, VIP client retainers, or executive retreats.',
      'Luxury Unboxing: Heavyweight rigid navy boxes, debossed foil branding, acid-free tissue paper, and personalized wax-sealed certificates of craftsmanship.',
    ],
    keywords: ['luxury corporate gifts Lagos', 'monogrammed ties Nigeria', 'executive corporate gifts Lagos', 'branded client gifts Nigeria'],
    relatedLink: {
      href: '/services/business',
      label: 'Learn About Business Gifting',
    },
  },
  {
    id: 'corporate-new-hire-procurement',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'How do you handle ongoing uniform orders for new hires after an initial company-wide rollout?',
    shortAnswer: 'We store your exact textile specifications, Pantone codes, and digital embroidery patterns on file. When new employees join, onboarding uniform orders can be placed on demand with guaranteed fabric and color continuity.',
    detailedAnswer: [
      'Digital Pattern Archiving: We archive every corporate template permanently, ensuring unit 501 matches unit 1 produced a year earlier.',
      'Low MOQ Re-orders: Ongoing corporate clients enjoy low re-order minimums for single or small-batch new hire onboarding packages.',
      'Fast-Track Fulfillment: New hire orders skip the prototyping phase, moving directly into cutting and assembly for rapid onboarding.',
    ],
    keywords: ['uniform reorders for new hires', 'corporate uniform continuity', 'repeat office uniforms Lagos', 'staff uniform procurement rails'],
  },
  {
    id: 'corporate-procurement-invoicing-compliance',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'What are your corporate procurement terms, payment schedules, and tax invoicing procedures?',
    shortAnswer: 'We operate under standard corporate procurement rails with verified corporate bank invoicing, VAT documentation, and formal Service Level Agreements (SLAs). Typically, orders require a 70% deposit with the balance due upon delivery inspection.',
    detailedAnswer: [
      'Formal Invoicing: We provide structured corporate proforma and tax invoices compliant with Nigerian corporate accounting standards.',
      'Payment Milestones: Standard terms are 70% mobilization deposit upon sample approval and 30% balance upon final batch delivery and sign-off.',
      'Enterprise SLA: For long-term styling retainers and annual uniform contracts, custom quarterly billing and milestone payment terms can be negotiated.',
    ],
    keywords: ['corporate uniform invoice Nigeria', 'procurement terms Vee Clothing', 'corporate tailoring VAT invoice', 'uniform supply contract Lagos'],
  },
  {
    id: 'corporate-frontline-vs-executive-fabrics',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'What fabric blends do you recommend for frontline operations staff versus executive leadership?',
    shortAnswer: 'For frontline operational staff, we engineer high-resilience poly-wool twills and moisture-wicking stretch blends built for frequent washing and active movement. For executive leadership and boardrooms, we use Super 130s–150s worsted wools and silk-infused cloths.',
    detailedAnswer: [
      'Frontline Endurance: 65/35 or 70/30 poly-wool performance twills offer wrinkle resistance, color retention, and breathability under daily 10-hour wear.',
      'Executive Prestige: Pure wool Super 130s and Super 150s from European mills offer silken drape, natural temperature regulation, and commanding presence.',
      'Hybrid Wardrobe Strategy: We design cohesive corporate visual hierarchies where executive blazers and frontline waistcoats share color harmony but utilize task-appropriate cloths.',
    ],
    keywords: ['poly wool uniform fabric Lagos', 'best fabric for staff uniforms', 'corporate clothing materials Nigeria', 'durable uniform fabrics'],
  },
  {
    id: 'corporate-industry-specific-uniforms',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'Do you design custom uniforms tailored to specific industries like banking, hospitality, energy, and tech?',
    shortAnswer: 'Yes. We engineer industry-tailored wardrobes specifically calibrated to organizational contexts—including sharp formal suiting for finance, elegant front-of-house attire for luxury hotels, robust professional wear for energy firms, and elevated smart-casual apparel for tech teams.',
    detailedAnswer: [
      'Banking & Finance: Conservative single and double-breasted navy and charcoal suits, tailored skirts, and wrinkle-resistant pinpoint oxford shirts.',
      'Luxury Hospitality: Concierge frock coats, front-desk tunics, and dining room waistcoats featuring spill-resistant, stain-guard cloth finishes.',
      'Energy & Engineering: Professional administrative blazers, boardroom safari suits, and durable executive field attire.',
      'Tech & Creative: Minimalist structured jackets, custom high-density embroidered overshirts, and modern tailored trousers that project forward-thinking confidence.',
    ],
    keywords: ['bank uniforms Nigeria', 'hotel uniforms Lagos', 'oil and gas corporate wear', 'tech staff clothing Lagos'],
  },
  {
    id: 'corporate-physical-prototypes-before-contract',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'Can you produce physical master prototypes for board approval before we sign a large procurement contract?',
    shortAnswer: 'Yes. Under our Phase 2 Master Prototyping protocol, we construct complete physical sample garments featuring your exact approved cloth, color matching, and embroidered branding for management and board evaluation prior to bulk production.',
    detailedAnswer: [
      'Real-World Wear Testing: Your team can trial the prototype across laundering cycles and daily movements before fleet rollout.',
      'Executive Sign-Off: Prototyping eliminates corporate guesswork, ensuring brand custodians, HR heads, and procurement directors are completely aligned.',
      'Fast Turnaround: Master prototypes are typically manufactured and dispatched within 3 to 5 working days of initial brief confirmation.',
    ],
    keywords: ['uniform prototype Lagos', 'sample uniform before order', 'corporate uniform sample Nigeria', 'uniform proofing process'],
  },
  {
    id: 'corporate-remote-multi-branch-sizing',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'How do you handle sizing and distribution for companies with staff across multiple states in Nigeria?',
    shortAnswer: 'For distributed teams across Nigeria, we deploy standardized digital sizing portals, anatomical measurement instruction kits, and size-run dispatch sets. Garments are individually tagged by employee name and branch for hassle-free nationwide distribution.',
    detailedAnswer: [
      'Size-Run Fitting Kits: We can ship pre-made size samples (sizes 36 to 52 / S to 4XL) to regional branches so employees can verify their best fit.',
      'Individual Employee Bagging: Every garment is individually bagged, labeled with the staff member’s full name, department, and branch code.',
      'Nationwide Logistics: We coordinate multi-destination shipping across Lagos, Abuja, Port Harcourt, Kano, Ibadan, and other corporate centers.',
    ],
    keywords: ['multi branch uniform delivery', 'nationwide corporate uniform distribution', 'staff sizing remote branches Nigeria'],
  },
  {
    id: 'corporate-replicate-existing-designs',
    category: 'corporate',
    categoryLabel: 'Corporate & B2B',
    question: 'Can you replicate or elevate our organization’s existing uniform design if we switch to Vee Clothing Company?',
    shortAnswer: 'Yes. If you already have established uniform aesthetics but need superior durability, better fabric feel, or reliable production timelines, we reverse-engineer your existing garments and elevate their seam architecture and textile quality.',
    detailedAnswer: [
      'Pattern Benchmarking: Send us a sample of your current uniform; our master cutters will evaluate seam strength, fabric composition, and fit shortcomings.',
      'Quality Upgrades: We preserve your visual identity while introducing hand-basted collars, reinforced crotch seams, and fade-resistant dyes.',
      'Seamless Transition: We match your current visual guidelines so the transition remains visually undetectable to your customers while vastly more comfortable for your staff.',
    ],
    keywords: ['switch uniform manufacturer Lagos', 'remake existing company uniform', 'upgrade corporate uniforms Nigeria', 'replicate uniform pattern'],
  },

  // ═════════════════════════════════════════════════════════════════
  // ─── CATEGORY 2: BESPOKE COMMISSIONS — B2C (12 Questions) ───────
  // ═════════════════════════════════════════════════════════════════
  {
    id: 'bespoke-commission-process',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'How does The Private Commission bespoke tailoring process work from start to finish?',
    shortAnswer: 'Our bespoke process follows four structured stages: Style Discovery Consultation, 30-Point Anatomical Measurement, Basted First Fitting, and Final Delivery. The entire journey takes a minimum of 10 working days.',
    detailedAnswer: [
      '1. Style Discovery: A one-on-one session discussing your aesthetic, wardrobe objectives, posture dynamics, and fabric drape preferences.',
      '2. 30-Point Measurement: Recording precise body dimensions, shoulder drop angles, posture lean, and arm curvature.',
      '3. Basted Fitting: An unfinished preliminary canvas garment is tried on to sculpt the silhouette to your skeleton before the final cloth is cut.',
      '4. Delivery & Pressing: The finished garment is delivered in our signature navy garment box, pressed with artisan steam shapers.',
    ],
    keywords: ['bespoke tailoring process Lagos', 'how custom suits are made Nigeria', 'bespoke suit steps', 'tailoring fittings Lagos'],
    relatedLink: {
      href: '/services/individual',
      label: 'Explore The Private Commission',
    },
  },
  {
    id: 'bespoke-turnaround-and-rush',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'How long does a bespoke suit, luxury kaftan, or agbada take to make, and can it be rushed?',
    shortAnswer: 'Every bespoke commission takes a minimum of 10 working days to allow hand-canvas shaping and proper garment resting. Rush commissions can be accommodated within 5 to 7 days depending on studio capacity for an express fee.',
    detailedAnswer: [
      'Standard Lead Time: 10 working days guarantees hand-stitched lapel rolling, horsehair canvas settling, and multi-stage pressing.',
      'Express Service: When schedules permit, our atelier offers an accelerated 5 to 7 working day emergency turnaround for weddings or executive international travel.',
      'No Compromise on Quality: Even during rush production, all structural canvas basting and fitting stages are strictly observed.',
    ],
    keywords: ['bespoke suit lead time Lagos', 'how long to make agbada Lagos', 'rush bespoke suit Nigeria', 'express tailoring Lagos'],
  },
  {
    id: 'bespoke-30-point-measurement-protocol',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What is Vee Clothing Company’s 30-point measurement protocol and why does it matter?',
    shortAnswer: 'Standard tailors only record 8 to 12 basic dimensions. Our 30-point system captures asymmetrical posture nuances, shoulder tilt, chest depth, back curvature, and sleeve rotation, ensuring a garment that drapes naturally without pulling.',
    detailedAnswer: [
      'Anatomical Precision: Humans are rarely symmetrical; we account for dropped right shoulders, forward neck tilts, and muscular imbalances.',
      'Effortless Movement: Armholes are cut high and sleeves pitched to match your resting arm angle, allowing full reach without lifting the jacket body.',
      'Permanent Digital Block: Your custom measurement block is filed digitally, allowing effortless future commissions without requiring repeat measuring.',
    ],
    keywords: ['30 point measurement tailoring', 'anatomical tailoring Lagos', 'bespoke suit posture adjustment', 'best fitting suit Nigeria'],
  },
  {
    id: 'bespoke-floating-canvas-vs-fused',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What is the difference between a hand-padded floating canvas suit and a fused mass-market suit?',
    shortAnswer: 'Fused suits glue synthetic stiffening to the outer fabric, which causes unsightly bubbling, stiffness, and heat traps in warm weather. Vee Clothing Company uses a floating horsehair canvas hand-stitched inside the chest piece, which molds to your body shape over time.',
    detailedAnswer: [
      'Zero Bubbling: Without chemical glues, our jackets can withstand humid weather, multiple dry-cleanings, and years of intense wear without delaminating.',
      'Living Three-Dimensional Shape: Natural horsehair and linen canvas breathes, adapts to your body heat, and drapes with natural roll rather than stiff rigidity.',
      'Generational Longevity: A floating canvas suit retains its architectural silhouette for a decade or more, making it an investment asset rather than a disposable item.',
    ],
    keywords: ['floating canvas vs fused suit', 'horsehair canvas suit Nigeria', 'why suits bubble', 'bespoke suit construction Lagos'],
    relatedLink: {
      href: '/services/individual',
      label: 'Read About Sartorial Engineering',
    },
  },
  {
    id: 'bespoke-garment-types-offered',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What specific garment types do you craft for individual clients?',
    shortAnswer: 'We craft bespoke 2-piece and 3-piece business suits, black-tie tuxedos, modern luxury kaftans, contemporary Agbada sets, tailored safari jackets, overcoats, and custom trousers and dress shirts.',
    detailedAnswer: [
      'Tailored Suits & Black Tie: Single and double-breasted business suits, dinner jackets, and peak/shawl lapel tuxedos for black-tie galas.',
      'African Native Menswear: Architectural Agbada, crisp Senator suits, and modern minimalist kaftans crafted with precision seam integrity.',
      'Separates & Smart Casual: Safari jackets, unlined summer blazers, pleated wool trousers, and monogrammed bespoke Egyptian cotton shirts.',
    ],
    keywords: ['custom suits Lagos', 'luxury kaftan Lagos', 'bespoke agbada Nigeria', 'senator style tailor Lagos', 'mens wedding tuxedo Lagos'],
    relatedLink: {
      href: '/shop',
      label: 'Browse Ready-To-Wear & Lookbook',
    },
  },
  {
    id: 'bespoke-wedding-groom-packages',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'Do you offer wedding packages for grooms and groomsmen?',
    shortAnswer: 'Yes. We engineer complete wedding wardrobe packages covering the groom’s white wedding tuxedo or suit, traditional wedding Agbada, and coordinated groomsmen attire with tiered scheduling for fittings and delivery.',
    detailedAnswer: [
      'Dual-Ceremony Wardrobe: We curate cohesive looks for both traditional ceremonies (heritage Agbada/Aso-Oke) and the formal reception.',
      'Groomsmen Coordination: Seamless measurement and delivery schedules for wedding parties of 3 to 15+ groomsmen, including those arriving from abroad.',
      'Dedicated Timeline Management: We recommend booking 4 to 8 weeks prior to the wedding date to allow multiple fittings and zero last-minute panic.',
    ],
    keywords: ['wedding suit tailor Lagos', 'groom tuxedo Nigeria', 'groomsmen suits Lagos', 'traditional wedding agbada groom'],
  },
  {
    id: 'bespoke-3-year-maintenance-programme',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What is included in Vee Clothing Company’s 3-year complimentary maintenance programme?',
    shortAnswer: 'Every bespoke private commission includes complimentary fit adjustments, seam re-enforcement, button replacements, and professional steam press servicing for the first three years of garment ownership.',
    detailedAnswer: [
      'Weight Fluctuation Adjustments: As your body evolves over time, we take in or let out trouser waists and jacket seams within structural inlay tolerances.',
      'Hardware & Seam Servicing: Complimentary re-attachment of horn buttons, pocket bar-tacking, and lining touch-ups.',
      'Artisan Steam Re-shaping: Complimentary re-pressing that preserves the natural roll of the floating lapels without flattening the chest architecture.',
    ],
    keywords: ['suit alterations Lagos', 'suit maintenance Nigeria', 'lifetime suit repair Lagos', 'free suit adjustments'],
  },
  {
    id: 'bespoke-number-of-fittings',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'How many fittings will I need before my custom suit, kaftan, or agbada is ready?',
    shortAnswer: 'A first-time commission typically requires two dedicated fittings: the Basted First Fitting (where the unfinished skeleton is adjusted to your posture) and the Final Inspection Fitting. Returning clients whose digital pattern blocks are already validated frequently require only one fitting.',
    detailedAnswer: [
      'First Fitting (Basted Stage): Raw cloth basted together with loose white cotton thread. Pocket flaps and lapels can still be altered by centimeters.',
      'Forward / Second Fitting: Full internal canvas anchored, buttons positioned, and trouser break calibrated to your specific shoe heel height.',
      'Streamlined Repeat Orders: Once your anatomical profile is locked in our studio database, subsequent suits can be ordered remotely with a single final inspection.',
    ],
    keywords: ['how many fittings for custom suit', 'basted fitting Lagos', 'tailor fitting stages Nigeria', 'first suit fitting process'],
  },
  {
    id: 'bespoke-vs-mtm-vs-off-the-rack',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What is the real difference between bespoke tailoring, made-to-measure (MTM), and off-the-rack suits?',
    shortAnswer: 'Off-the-rack garments use generic factory sizes. Made-to-measure (MTM) modifies a pre-existing standard pattern. True Bespoke at Vee Clothing Company drafts a 100% original, hand-cut paper pattern specifically for your unique skeleton, incorporating floating hand-stitched canvas.',
    detailedAnswer: [
      'Off-the-Rack: Standardized block sizes (e.g., 40R, 42L). Designed to fit average demographics, often requiring extensive, costly alterations.',
      'Made-to-Measure: Machine-altered standard template. Does not account for severe shoulder drops or unusual posture angles.',
      'True Bespoke: An individual paper pattern drawn from zero. 50+ hours of hand labor, fully floating canvas, and lifetime adaptability.',
    ],
    keywords: ['bespoke vs made to measure Nigeria', 'bespoke vs off the rack suits', 'what is true bespoke Lagos', 'custom suit differences'],
  },
  {
    id: 'bespoke-bring-own-fabric-policy',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'Can I bring my own fabric (BYOF) for a private commission, or must fabrics be selected from your atelier?',
    shortAnswer: 'While we encourage clients to choose from our curated mill library (which guarantees drape, shrinkage resistance, and authenticity), we accept client-provided high-grade textiles like heritage Aso-Oke, luxury lace, or imported wools, subject to tailor inspection.',
    detailedAnswer: [
      'Textile Quality Audit: Our master cutter inspects client-supplied fabric for grain alignment, weave density, and suitability for the intended garment silhouette.',
      'Yardage Requirements: We provide exact yardage calculations based on your measurements and pattern matching needs (checks, stripes, or florals).',
      'Atelier Guarantee: Our 3-year complimentary maintenance covers all construction craftsmanship, regardless of fabric source.',
    ],
    keywords: ['bring own fabric tailor Lagos', 'custom tailoring with client cloth Nigeria', 'sew my own material Lagos', 'tailor for bought fabric'],
  },
  {
    id: 'bespoke-weight-fluctuation-management',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'What happens if my body weight or physique changes between the initial fitting and final delivery?',
    shortAnswer: 'All Vee Clothing garments are engineered with generous internal cloth inlays—typically 1.5 to 2 inches inside the side seams, center back, and trouser waistband—allowing effortless adjustments if your weight shifts during or after construction.',
    detailedAnswer: [
      'Structural Inlays: Unlike fast-fashion garments cut with zero margin, bespoke tailoring incorporates built-in fabric allowances for future adjustments.',
      'Active Fitting Adjustments: If you lose or gain muscle/weight before final delivery, we reshape the waist and drape at the basted stage with zero structural penalty.',
      'Complimentary Future Tailoring: Our 3-Year Maintenance Programme covers post-delivery waistline and seam alterations as your body evolves.',
    ],
    keywords: ['suit adjustments weight gain loss', 'alter custom suit weight change Lagos', 'suit seam inlays Nigeria', 'expand bespoke suit waist'],
  },
  {
    id: 'bespoke-shirts-trousers-separates',
    category: 'bespoke',
    categoryLabel: 'Bespoke Commissions',
    question: 'Do you craft individual custom dress shirts, tailored trousers, and smart-casual safari jackets?',
    shortAnswer: 'Yes. Beyond complete 2-piece and 3-piece suits, we craft custom Egyptian cotton dress shirts, Gurkha and side-tab wool trousers, unstructured summer blazers, and luxury linen safari jackets.',
    detailedAnswer: [
      'Bespoke Dress Shirts: 100% two-ply Egyptian and Sea Island cotton, custom collar spreads, mother-of-pearl buttons, and personalized monograms.',
      'Tailored Trousers: High-waisted, single or double forward pleats, side-adjusters (no belt loops needed), and tailored cuffs calibrated to your footwear.',
      'Safari & Over-Shirts: Architectural 4-pocket safari jackets cut in Irish linen, tropical wool, or structured cotton twill for modern executive casual wear.',
    ],
    keywords: ['custom dress shirts Lagos', 'bespoke trousers Nigeria', 'safari jacket tailor Lagos', 'mens side adjuster trousers Nigeria'],
  },

  // ═════════════════════════════════════════════════════════════════
  // ─── CATEGORY 3: FABRICS, CRAFT & SARTORIAL ENGINEERING (11 Qs) ─
  // ═════════════════════════════════════════════════════════════════
  {
    id: 'fabrics-mills-sourced',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'Which textile mills and fabric houses does Vee Clothing Company source from?',
    shortAnswer: 'We partner directly with world-renowned mills including Scabal, Loro Piana, Holland & Sherry, and Dormeuil for wools and silks, alongside artisan West African weavers for authentic local heritage cloths.',
    detailedAnswer: [
      'Super 130s to Super 180s Wools: Sourced from legendary mills in Yorkshire (UK) and Biella (Italy) offering remarkable drape, recovery, and silken touch.',
      'Tropical Weaves & Linens: High-twist fresco wools, pure Irish and Italian linens, and breathable silk-cotton blends engineered for warm climates.',
      'Heritage Textiles: Authentic hand-woven Aso-Oke, luxury Adire, and structured African cottons woven by generational master weavers.',
    ],
    keywords: ['Scabal suits Lagos', 'Loro Piana tailor Nigeria', 'Holland and Sherry fabric Lagos', 'luxury suiting wools Nigeria'],
  },
  {
    id: 'fabrics-heritage-modern-integration',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'How do you integrate authentic Nigerian heritage textiles into contemporary silhouettes?',
    shortAnswer: 'We respect tradition while modernizing structure. We integrate authentic Nigerian fabrics like hand-woven Aso-Oke, Adire, and Ankara into sharp, modern tailoring as focal garments, subtle contrast lapels, pocket linings, or bespoke accents.',
    detailedAnswer: [
      'Modern Ergonomics: We pre-wash and stabilize hand-dyed Adire and artisanal cloths to prevent shrinkage and color bleed.',
      'Structural Fusion: Incorporating hand-woven heritage textiles into structured jackets, safari shirts, or contemporary Agbada tunics with crisp European seams.',
      'Bespoke Accent Linings: For conservative executives, we line luxury navy or charcoal wool suits with striking Adire silk linings for a discreet statement.',
    ],
    keywords: ['Adire corporate shirt', 'Aso Oke suit jacket', 'modern Nigerian menswear', 'African heritage bespoke tailor Lagos'],
    relatedLink: {
      href: '/about',
      label: 'Read The Vee Clothing Story',
    },
  },
  {
    id: 'fabrics-tropical-climate-performance',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'How do your fabrics and jacket constructions perform in Nigeria’s tropical heat and humidity?',
    shortAnswer: 'We specifically engineer garments for West African weather using open-weave high-twist fresco wools, unlined or half-lined jacket architectures, and naturally breathable horsehair chest canvases that allow air circulation.',
    detailedAnswer: [
      'High-Twist Fresco Wool: Open porous weaves allow tropical breezes to pass through while resisting humidity-induced wrinkles.',
      'Half-Lined Construction: By eliminating heavy synthetic back linings, our tropical blazers remain lightweight and breathable all day.',
      'Moisture Management: Natural wool, linen, and silk fibers wick perspiration away from the body far better than synthetic polyesters.',
    ],
    keywords: ['breathable suits Nigeria', 'tropical weight wool suit Lagos', 'summer linen suit Nigeria', 'suits for hot humid weather Lagos'],
  },
  {
    id: 'fabrics-swatches-inspection',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'Can I inspect physical fabric swatches and feel the cloth before placing my order?',
    shortAnswer: 'Yes. During our in-person consultation or VIP concierge appointment, you have full access to our fabric bunch books, allowing you to feel weight, drape, sheen, and texture firsthand before committing.',
    detailedAnswer: [
      'Comprehensive Bunch Books: Browse hundreds of fabric swatches categorized by mill, fiber weight (grams per meter), and color weave.',
      'Natural Light Inspection: We assess swatches under both natural daylight and indoor lighting to ensure accurate color perception.',
      'Concierge Swatch Kit: For VIP clients in Abuja or Asaba, our traveling tailor brings curated fabric bundles directly to your home or office.',
    ],
    keywords: ['fabric swatches tailor Lagos', 'inspect suit cloth Nigeria', 'fabric sample books Lagos', 'custom suit fabric selection'],
  },
  {
    id: 'fabrics-external-alterations-policy',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'Do you alter or repair suits and garments purchased from other brands or external tailors?',
    shortAnswer: 'No. To maintain our stringent quality standards and guarantee structural integrity, we do not alter garments made by third-party tailors. We focus our craft exclusively on commissioning and servicing original Vee Clothing garments.',
    detailedAnswer: [
      'Quality Integrity: Third-party garments often feature inferior fused glue interlinings that delaminate or react unpredictably under tailoring steam.',
      'Client Focus: Directing 100% of our master tailors’ capacity toward our original bespoke and corporate patrons ensures faster turnarounds.',
      'New Client Consultations: If you have poorly fitting garments from elsewhere, we invite you to experience a private commission built properly from the foundation.',
    ],
    keywords: ['suit alterations policy Lagos', 'do you fix other tailors clothes', 'Vee Clothing alteration policy'],
  },
  {
    id: 'fabrics-care-and-cleaning-instructions',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'How should I care for, store, and clean my bespoke suits and luxury traditional garments?',
    shortAnswer: 'Bespoke wool garments should never be over-dry-cleaned. We recommend dry-cleaning no more than twice a year, resting jackets 48 hours between wears on contoured wooden hangers, and using gentle horsehair brushings and light steaming.',
    detailedAnswer: [
      'Brushing over Dry-Cleaning: Use a natural horsehair garment brush after wear to remove surface dust without stripping wool’s natural lanolin oils.',
      'Contoured Wooden Hangers: Always hang suits on wide-shouldered wooden hangers to preserve the hand-padded shoulder roll.',
      'Steaming over Ironing: Never apply a direct hot iron to high-twist wool; use vertical steam or bring your piece to our atelier for complimentary artisan pressing.',
    ],
    keywords: ['how to care for bespoke suit', 'dry clean custom suit Lagos', 'suit maintenance tips Nigeria', 'care for luxury kaftan'],
  },
  {
    id: 'fabrics-super-numbers-explained',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'What do "Super 120s", "Super 150s", and "Super 180s" mean in suiting wool, and which is best for everyday wear?',
    shortAnswer: 'The "Super" number measures the microscopic fineness of wool fibers (in microns). Higher numbers mean softer, more luxurious cloth with silkier drape. For heavy weekly business rotations, Super 120s–130s offers the best balance of luxury and durability; Super 150s+ is ideal for executive occasions.',
    detailedAnswer: [
      'Super 110s to 130s: Workhorse luxury. High wrinkle recovery and strength, ideal for lawyers, bankers, and executives traveling weekly.',
      'Super 150s: The executive gold standard. Noticeable natural luster, buttery hand feel, and exceptional drape for high-stakes negotiations.',
      'Super 180s+: Ultra-luxurious ceremonial cloth. Extremely delicate and lightweight, best suited for red carpet galas, state banquets, and milestone weddings.',
    ],
    keywords: ['super 150s wool suit Nigeria', 'what is super 120s suit', 'wool micron ratings explained', 'best suit fabric for everyday wear'],
  },
  {
    id: 'fabrics-buttons-and-hardware',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'What types of buttons, linings, and internal trimmings do you use on your suits and blazers?',
    shortAnswer: 'We exclusively use natural luxury hardware: genuine water buffalo horn buttons, iridescent mother-of-pearl (MOP) for shirts, natural corozo nut, and breathable Bemberg cupro linings that do not trap static electricity.',
    detailedAnswer: [
      'Genuine Horn & Corozo: Never plastic or faux resin. Our buttons feature natural grain variations and withstand heavy dry-cleaning heat without cracking.',
      'Bemberg Cupro Linings: Derived from natural cotton linter, cupro breathes like silk, glides over dress shirts, and prevents static cling in dry air-conditioned offices.',
      'German Gutermann Silk Threads: All structural buttonholes and lapel pick-stitch details are hand-sewn using high-tensile silk thread.',
    ],
    keywords: ['horn buttons bespoke suit Lagos', 'bemberg lining Nigeria', 'mother of pearl shirt buttons', 'suit hardware materials'],
  },
  {
    id: 'fabrics-lapel-pick-stitching-details',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'What is pick stitching (AMF stitching) on suit lapels and why is it a hallmark of bespoke quality?',
    shortAnswer: 'Pick stitching is a subtle, hand-guided decorative stitch sewn along the outer edge of lapels, pocket flaps, and collars. It keeps the internal floating canvas securely in place and prevents lapel edges from rolling or puckering over years of wear.',
    detailedAnswer: [
      'Structural Stability: Pick stitching holds the face fabric, canvas, and inner facing in absolute alignment along the edge.',
      'Discreet Luxury: It provides a tactile, artisan signature that distinguishes authentic tailoring from mass-produced flat-ironed factory suits.',
      'Custom Thread Contrasts: Clients can select tone-on-tone stitching for conservative elegance or subtle contrasting silk thread for bespoke personality.',
    ],
    keywords: ['pick stitching suit lapel Lagos', 'AMF stitching suit Nigeria', 'hand stitched suit lapel', 'signs of high quality suit'],
  },
  {
    id: 'fabrics-preventing-shrinkage-native-cloth',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'How do you prevent shrinkage and color bleeding in authentic African heritage textiles like Adire and Ankara?',
    shortAnswer: 'Before cutting any garment, all artisanal African fabrics undergo our proprietary Textile Stabilization Protocol: gentle pre-washing, organic color-fast bath soaking, and steam relaxation, eliminating unexpected post-tailoring shrinkage.',
    detailedAnswer: [
      'Cold-Water Organic Fixation: Artisanal indigo and wax dyes are set using specialized fixing agents to prevent transfer onto dress shirts.',
      'Dimensional Pre-Shrinking: We pre-shrink raw cottons by up to 8% before laying down pattern scissors, ensuring your custom fit remains exact.',
      'Reinforced Interlinings: Traditional fabrics are reinforced with featherweight German fusible supports to prevent fraying and seam pull.',
    ],
    keywords: ['prevent adire color bleed', 'how to stop ankara shrinking', 'pre wash native fabrics tailor Lagos', 'stabilize traditional cloth Nigeria'],
  },
  {
    id: 'fabrics-custom-sourcing-rare-patterns',
    category: 'fabrics',
    categoryLabel: 'Fabrics & Craft',
    question: 'Can you source rare cloth patterns, houndstooth, windowpane checks, or custom family tartans from European mills?',
    shortAnswer: 'Yes. Through our direct accounts with mills in Huddersfield (England) and Biella (Italy), we can special-order individual cloth cuts for rare heritage checks, double-face cashmeres, Donegal tweeds, and bespoke family tartans.',
    detailedAnswer: [
      'Direct Mill Indents: If a specific pattern is not present in our active studio bunch books, we order the cut directly from the mill’s European warehouse.',
      'Express Textile Air-Freight: Special-order cloth typically arrives at our Lagos cutting tables within 4 to 6 business days via DHL Express.',
      'Exclusive Cut Registration: We can guarantee that a chosen rare pattern will not be offered to other clients within your immediate circle for 12 months.',
    ],
    keywords: ['special order suit fabric Nigeria', 'source rare cloth Lagos', 'houndstooth wool suit Nigeria', 'windowpane check suit Lagos'],
  },

  // ═════════════════════════════════════════════════════════════════
  // ─── CATEGORY 4: LOCATIONS, CONCIERGE & LOGISTICS (11 Qs) ───────
  // ═════════════════════════════════════════════════════════════════
  {
    id: 'locations-areas-served-nigeria',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Which cities and regions do you service across Nigeria?',
    shortAnswer: 'Our primary atelier and production facility is based in Lagos, with dedicated concierge fitting services and client coverage across Abuja (FCT), Asaba (Delta State), and nationwide insured shipping.',
    detailedAnswer: [
      'Lagos State: Primary coverage across Victoria Island, Ikoyi, Lekki Phase 1, Banana Island, Ikeja GRA, and surrounding business districts.',
      'Abuja (FCT): Regular executive concierge fitting tours servicing clients in Maitama, Asokoro, Wuse II, and Guzape.',
      'Asaba & Delta Region: VIP private concierge appointments servicing executives and dignitaries across Asaba GRA and neighboring hubs.',
    ],
    keywords: ['bespoke tailor Lagos', 'custom tailor Abuja', 'luxury tailor Asaba', 'tailor Victoria Island Ikoyi', 'tailoring services Nigeria'],
    relatedLink: {
      href: '/locations/lagos',
      label: 'View City Locations',
    },
  },
  {
    id: 'locations-concierge-abuja-asaba',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'How does the VIP Concierge fitting service work for clients in Abuja or Asaba?',
    shortAnswer: 'For senior executives, public figures, and private clients outside Lagos, our master tailors travel directly to your residence, private estate, or executive suite with fabric books, taking measurements and conducting basted fittings in total privacy.',
    detailedAnswer: [
      'Discreet & Private: Conduct your consultations in the absolute comfort of your private residence or executive office.',
      'Full Mobile Atelier: Our concierge brings premium fabric bunches, sample collar silhouettes, buttons, and measuring instruments.',
      'Seamless Scheduling: Concierge visits are coordinated via our VIP WhatsApp concierge rail around your travel and executive schedule.',
    ],
    keywords: ['concierge tailor Abuja', 'private tailor Asaba GRA', 'VIP home suit fitting Nigeria', 'mobile executive tailor Lagos Abuja'],
    relatedLink: {
      href: '/locations/abuja',
      label: 'Abuja Concierge Page',
    },
  },
  {
    id: 'locations-diaspora-international-orders',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Can Nigerian diaspora clients in the UK, US, Canada, or Europe order bespoke garments remotely?',
    shortAnswer: 'Yes. A significant portion of our private commissions are crafted for diaspora clients. We conduct guided virtual measurement consultations via video call, use your existing best-fitting garment dimensions, or measure you during Lagos holiday visits.',
    detailedAnswer: [
      'Guided Virtual Fitting: A 30-minute high-definition video session where our master cutter guides you through self-measurement.',
      'Event Coordination: Order months ahead of your December or summer visit to Nigeria, with your completed garments pressed and waiting at your hotel or residence.',
      'International Express Courier: We ship securely via DHL Express / FedEx worldwide with full tracking to the UK, US, Canada, and Europe.',
    ],
    keywords: ['diaspora tailor Nigeria', 'order bespoke suit from UK Nigeria', 'remote tailor Lagos', 'custom agbada shipped to US Canada'],
  },
  {
    id: 'locations-packaging-and-garment-transit',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'How are garments packaged and delivered to ensure they arrive in pristine, uncreased condition?',
    shortAnswer: 'Every completed piece is packed inside breathable, water-resistant heavy canvas garment bags with contoured wooden hangers, or boxed in our signature rigid navy presentation boxes wrapped in acid-free tissue paper.',
    detailedAnswer: [
      'Signature Navy Gift Boxes: Rigid construction designed to protect garment lapels and collar architecture during local or international transit.',
      'Garment Travel Bags: Full-length heavy canvas zip bags for easy airport carry-on and wardrobe storage.',
      'White-Glove Courier: Local Lagos deliveries are fulfilled via direct private courier ensuring parcels remain flat and uncompressed.',
    ],
    keywords: ['bespoke suit packaging', 'luxury garment box Nigeria', 'delivery of custom clothes Lagos', 'crease free suit delivery'],
  },
  {
    id: 'locations-pricing-currencies-payments',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'What currencies and payment methods do you accept for commissions?',
    shortAnswer: 'We accept Nigerian Naira (NGN), US Dollars (USD), British Pounds (GBP), and Euros (EUR). Payments can be completed via direct corporate bank transfer, secure card processing, or international wire.',
    detailedAnswer: [
      'Multi-Currency Support: Our digital platform and invoices provide real-time currency conversion for seamless international checkout.',
      'Secure Corporate Invoicing: Direct bank-to-bank transfers for verified corporate procurement departments in Nigeria.',
      'Milestone Transparency: Transparent deposit structure with no hidden shipping or hardware surcharges.',
    ],
    keywords: ['tailor payment methods Nigeria', 'pay for suit in USD GBP Lagos', 'bespoke suit prices Lagos', 'Vee Clothing payment options'],
  },
  {
    id: 'locations-appointment-booking-policy',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Do I need to book an appointment before visiting, or can I walk in for a consultation?',
    shortAnswer: 'To ensure every client receives undivided master-tailor attention and dedicated fabric library access, all consultations are conducted strictly by appointment. Bookings can be scheduled via our website or direct WhatsApp VIP concierge.',
    detailedAnswer: [
      'Dedicated Attention: Private appointments guarantee uninterrupted time with our senior cutters without waiting in crowded lounges.',
      'Same-Day Appointments: When calendar openings permit, same-day consultation requests can be coordinated via WhatsApp.',
      'Flexible Hours: Early morning and weekend VIP consultation slots are available for busy executives and traveling professionals.',
    ],
    keywords: ['book appointment tailor Lagos', 'tailor consultation Lagos', 'bespoke appointment Nigeria', 'Vee Clothing WhatsApp concierge'],
    relatedLink: {
      href: 'https://wa.me/2348103031020',
      label: 'Message WhatsApp Concierge',
    },
  },
  {
    id: 'locations-nationwide-shipping-nigeria',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Do you deliver to clients in other Nigerian states outside Lagos, Abuja, and Delta?',
    shortAnswer: 'Yes. We deliver fully insured bespoke orders and corporate batches to clients in Port Harcourt (Rivers), Ibadan (Oyo), Kano, Enugu, Calabar, Uyo, and all 36 states across Nigeria via dedicated priority express logistics.',
    detailedAnswer: [
      'Insured Transit: All high-value shipments are fully insured against transit loss or weather damage.',
      'Next-Day Inter-State Delivery: Following final inspection and steaming, shipments to major commercial hubs typically arrive within 24 to 48 hours.',
      'Live Tracking Updates: Clients receive automated SMS/WhatsApp dispatch notifications and live tracking codes upon handover to our courier partners.',
    ],
    keywords: ['tailor delivery Port Harcourt', 'bespoke suit shipping Nigeria', 'deliver custom clothes Kano Enugu', 'nationwide tailor shipping'],
  },
  {
    id: 'locations-advance-booking-timeframe',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'How far in advance should I schedule my first consultation before an important event or wedding?',
    shortAnswer: 'We recommend scheduling your consultation 3 to 4 weeks before your event for business suits and executive wear, and 6 to 8 weeks in advance for weddings and large groomsmen parties to ensure ample fitting time without pressure.',
    detailedAnswer: [
      'Peak Seasons (Q4 & December): November through January schedules fill up rapidly; we advise booking October/November commissions at least 6 weeks early.',
      'Fabric Sourcing Buffers: Choosing rare cloths imported from European mills requires a 5-day international transit window before cutting begins.',
      'Final Weight Settling: Booking ahead ensures we can conduct a final micro-adjustment fitting 7 days before your wedding day.',
    ],
    keywords: ['how early to order wedding suit Lagos', 'tailor booking timeline Nigeria', 'December tailoring deadline Lagos', 'wedding suit schedule'],
  },
  {
    id: 'locations-post-delivery-adjustments',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'What is your policy if my garment requires minor fit adjustments after I take it home?',
    shortAnswer: 'If any garment requires minor fine-tuning upon wearing it at home, you have a 14-day post-delivery adjustment window where our atelier will execute all necessary micro-adjustments completely free of charge.',
    detailedAnswer: [
      'Zero-Hassle Fine-Tuning: Simply notify your concierge, and we will schedule an adjustment appointment or pick up the piece via courier.',
      'Fast Turnaround on Adjustments: Post-delivery tweaks (such as trouser hem micro-shifts or sleeve buttons) are completed within 48 to 72 hours.',
      'Updated Digital Pattern: Any adjustment made is updated in your permanent digital file so all future commissions automatically reflect the refined fit.',
    ],
    keywords: ['suit adjustment policy Lagos', 'free alterations after delivery', 'tailor fit guarantee Nigeria', 'Vee Clothing satisfaction guarantee'],
  },
  {
    id: 'locations-gift-vouchers-executive-cards',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Can I purchase bespoke commission gift vouchers for colleagues, partners, or family members?',
    shortAnswer: 'Yes. We offer luxury physical and digital Private Commission Gift Certificates, presented in a debossed navy envelope with wax seal, allowing the recipient to experience a personalized consultation and suit or kaftan commission.',
    detailedAnswer: [
      'Flexible Value Tiers: Gift certificates can be purchased for full specific garments (e.g. 2-Piece Bespoke Suit, Luxury Agbada Set) or fixed financial amounts.',
      'Luxury Unboxing: We dispatch a physical wax-sealed presentation card directly to the recipient’s address or present a digital concierge redemption card.',
      '12-Month Validity: Gift vouchers remain valid for a full calendar year from the date of issuance.',
    ],
    keywords: ['bespoke suit gift voucher Lagos', 'gift bespoke tailoring Nigeria', 'executive gift card Lagos', 'custom suit gift certificate'],
  },
  {
    id: 'locations-hotel-concierge-diaspora',
    category: 'locations',
    categoryLabel: 'Locations & Logistics',
    question: 'Can international and diaspora visitors have their finished garments delivered directly to their hotel suite in Lagos?',
    shortAnswer: 'Yes. For visiting executives, diplomats, and diaspora clients staying at luxury hotels across Victoria Island, Ikoyi, or Ikeja, we deliver freshly steamed garments directly to your hotel concierge or presidential suite on the exact date agreed.',
    detailedAnswer: [
      'Direct Hotel Suite Drop-off: Hand-delivered on contoured wooden hangers in full-length canvas travel bags ready to wear.',
      'In-Room Final Fitting: If you desire a master tailor present to verify fit upon hotel check-in, we can arrange an in-suite inspection session.',
      'Coordinated Itinerary: We align delivery with your flight arrival times so your wedding or summit wardrobe is waiting in your room before you land.',
    ],
    keywords: ['hotel suit delivery Lagos', 'tailor delivery Eko Hotel Wheatbaker', 'diaspora visitor tailor Lagos', 'concierge garment drop off'],
  },
];
