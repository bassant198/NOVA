export const CATEGORIES = [
  "All",
  "Audio & Acoustics",
  "Personal Wearables",
  "Desk & Workspace",
  "Optics & Ambient",
  "Minimal Carry"
];

export const PRODUCTS = [
  {
    id: "nova-01",
    title: "NOVA Aether Wireless Headphones",
    price: 349,
    originalPrice: 399,
    category: "Audio & Acoustics",
    rating: { rate: 4.9, count: 184 },
    badge: "Bestseller",
    description: "Engineered with 40mm beryllium drivers, active hybrid noise cancellation, and a lightweight aerospace aluminum frame. Delivers 42 hours of lossless wireless acoustics with ultra-low latency.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Hybrid Active Noise Cancellation (-38dB)",
      "40mm custom beryllium dynamic drivers",
      "42-hour continuous battery playback",
      "Memory foam ear cushions with vegan lambskin",
      "Multipoint Bluetooth 5.4 with LDAC support"
    ],
    specs: {
      "Battery Life": "42 Hours (ANC On)",
      "Connectivity": "Bluetooth 5.4, 3.5mm AUX, USB-C Audio",
      "Weight": "248 grams",
      "Charging": "15 min fast-charge gives 6 hours",
      "Frequency Response": "10Hz - 45,000Hz"
    },
    inStock: true
  },
  {
    id: "nova-02",
    title: "NOVA Pulse Studio Monitor Earbuds",
    price: 189,
    originalPrice: 220,
    category: "Audio & Acoustics",
    rating: { rate: 4.8, count: 96 },
    badge: "Featured",
    description: "Compact planar magnetic in-ear monitors providing transparent spatial depth, customizable digital sound curves, and an IPX5 water-resistant sculpted ceramic shell.",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Custom dual-driver balanced armature architecture",
      "Wireless Qi charging pebble case with matte finish",
      "Spatial audio head tracking",
      "Environmental noise reduction with 6 beamforming mics"
    ],
    specs: {
      "Battery Life": "8h earbuds + 28h charging case",
      "Water Resistance": "IPX5 water & sweat resistant",
      "Codecs": "AAC, SBC, aptX Adaptive",
      "Weight": "4.6g per bud"
    },
    inStock: true
  },
  {
    id: "nova-03",
    title: "NOVA Chrono Horizon Smartwatch",
    price: 420,
    originalPrice: null,
    category: "Personal Wearables",
    rating: { rate: 4.9, count: 142 },
    badge: "New Release",
    description: "A timeless unibody titanium timepiece featuring a 1.4-inch sapphire crystal AMOLED display, real-time physiological metrics, dual-frequency GPS, and 14-day battery reserve.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Grade 5 aerospace titanium housing",
      "Always-on Sapphire crystal glass AMOLED",
      "Bio-optical telemetry sensor array",
      "Dual-frequency L1+L5 satellite positioning",
      "5 ATM water immersion rating (up to 50m)"
    ],
    specs: {
      "Battery": "Up to 14 days standard, 38 hours continuous GPS",
      "Case Diameter": "42mm unibody",
      "Display": "1.4-inch AMOLED, 466x466 (326 PPI)",
      "Straps": "Fluoroelastomer + brushed titanium buckle included"
    },
    inStock: true
  },
  {
    id: "nova-04",
    title: "NOVA Helix Modular Mechanical Keyboard",
    price: 215,
    originalPrice: 245,
    category: "Desk & Workspace",
    rating: { rate: 4.7, count: 83 },
    badge: "Bestseller",
    description: "75% compact wireless mechanical keyboard machined from solid 6063 aluminum. Gasket mounted with sound-dampening silicone poron foam and hot-swappable tactile switches.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "CNC milled anodized aluminum chassis",
      "Hot-swappable 5-pin PCB socket design",
      "PBT double-shot minimalist keycaps",
      "Tri-mode: Bluetooth 5.2, 2.4GHz dongle, and USB-C"
    ],
    specs: {
      "Layout": "75% ANSI with rotary media knob",
      "Battery": "4000mAh rechargeable lithium-ion",
      "Plate": "Polycarbonate flex-cut plate",
      "Weight": "1,380 grams"
    },
    inStock: true
  },
  {
    id: "nova-05",
    title: "NOVA Beam Precision Monitor Light Bar",
    price: 119,
    originalPrice: 139,
    category: "Optics & Ambient",
    rating: { rate: 4.8, count: 110 },
    badge: "Popular",
    description: "Asymmetric optical monitor lamp that illuminates your desktop without screen glare. Features touch-sensitive wireless puck control, 2700K–6500K color tuning, and auto-dimming ambient sensors.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Patented zero-reflection asymmetric optical path",
      "High color rendering index (Ra ≥ 97)",
      "Wireless rotary desktop controller included",
      "Universal gravity hinge fits flat and curved displays"
    ],
    specs: {
      "Illuminance": "Up to 1000 Lux @ 45cm",
      "Power Input": "USB-C 5V / 2A",
      "Materials": "Sandblasted matte alloy",
      "Color Temp": "2700K - 6500K stepless"
    },
    inStock: true
  },
  {
    id: "nova-06",
    title: "NOVA Vanguard Technical Daypack 22L",
    price: 195,
    originalPrice: null,
    category: "Minimal Carry",
    rating: { rate: 4.9, count: 67 },
    badge: "Featured",
    description: "Weatherproof rolltop daypack constructed from recycled X-Pac laminated sailcloth with YKK Aquaguard zippers, magnetic Fidlock buckle closures, and dedicated 16-inch laptop cocoon.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "X-Pac VX21 waterproof laminate exterior",
      "Fidlock magnetic quick-release chest sternum strap",
      "Suspended shockproof 16-inch laptop compartment",
      "Ergonomic dual-density EVA back ventilation harness"
    ],
    specs: {
      "Capacity": "22 Liters",
      "Weight": "920 grams",
      "Dimensions": "48 x 30 x 16 cm",
      "Zippers": "YKK AquaGuard weather-shield"
    },
    inStock: true
  },
  {
    id: "nova-07",
    title: "NOVA Orbit MagSafe Wireless Dock",
    price: 89,
    originalPrice: 105,
    category: "Desk & Workspace",
    rating: { rate: 4.6, count: 53 },
    badge: null,
    description: "Solid CNC brass and silicone 3-in-1 charging station. Simultaneously delivers 15W Qi2 fast charging for smartphone, smartwatch, and wireless earbuds in a zero-cable footprint.",
    image: "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Official Qi2 15W certified magnetic induction",
      "Heavy weighted zinc alloy base prevents lifting slips",
      "Integrated micro-textured soft silicone contact pads",
      "Single 65W GaN adapter and braided cable included"
    ],
    specs: {
      "Max Output": "25W total (15W phone + 5W watch + 5W buds)",
      "Base Weight": "480 grams (solid base)",
      "Cable": "1.5m braided nylon USB-C to USB-C"
    },
    inStock: true
  },
  {
    id: "nova-08",
    title: "NOVA Kinetic Smart Health Ring",
    price: 299,
    originalPrice: 329,
    category: "Personal Wearables",
    rating: { rate: 4.8, count: 128 },
    badge: "Trending",
    description: "Sleek titanium smart ring measuring continuous heart-rate variability, sleep architecture, recovery scores, and skin temperature trends with zero monthly subscription fee.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Seamless Grade 5 titanium exterior with diamond carbon coating",
      "Medical-grade optical infrared PPG sensor system",
      "7-day continuous battery life per charge",
      "100-meter water resistance for swimming and diving"
    ],
    specs: {
      "Battery": "6 to 8 days per 40-minute fast charge",
      "Sensors": "Red & Infrared PPG, Skin Temp, 3D Accelerometer",
      "Waterproofing": "10 ATM / 100 meters",
      "Weight": "3.5 grams"
    },
    inStock: true
  },
  {
    id: "nova-09",
    title: "NOVA Prism Diffused Ambient Lamp",
    price: 145,
    originalPrice: null,
    category: "Optics & Ambient",
    rating: { rate: 4.7, count: 48 },
    badge: null,
    description: "Sculptural cordless ambient lantern machined from optical frosted acrylic and bead-blasted graphite alloy. Offers 360-degree circadian dimming and 18-hour wireless battery glow.",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Tactile touch-brass dimmer with candlelight mode",
      "Warm circadian spectrum (1800K to 3000K)",
      "Wireless magnetic inductive charge disc included",
      "Splashproof IP54 rating for patio and indoor use"
    ],
    specs: {
      "Battery": "5200mAh (up to 20 hours at low brightness)",
      "Lumens": "220 Lumens maximum output",
      "Dimensions": "22cm H x 11cm diameter"
    },
    inStock: true
  },
  {
    id: "nova-10",
    title: "NOVA Slimline Titanium Card Sleeve",
    price: 65,
    originalPrice: 75,
    category: "Minimal Carry",
    rating: { rate: 4.9, count: 215 },
    badge: "Bestseller",
    description: "Precision-milled aerospace titanium minimalist wallet with an elastic silicone cash band, RFID blocking shields, and smooth mechanical card ejector trigger.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Holds 1 to 12 credit cards securely without stretching",
      "Full perimeter RFID protection against wireless theft",
      "Integrated carbon fiber money clip / silicone cash strap",
      "Only 6mm thin in pocket"
    ],
    specs: {
      "Thickness": "6.2mm",
      "Weight": "48 grams",
      "Material": "Grade 2 Sandblasted Pure Titanium"
    },
    inStock: true
  },
  {
    id: "nova-11",
    title: "NOVA Soundbar Horizon Cinema",
    price: 480,
    originalPrice: 550,
    category: "Audio & Acoustics",
    rating: { rate: 4.8, count: 74 },
    badge: "Top Rated",
    description: "A compact 2.1 acoustic soundbar clad in acoustic Kvadrat fabric and brushed aluminum. Integrates dual wireless subwoofers, Dolby Atmos virtualization, and HDMI eARC.",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Dolby Atmos and DTS:X spatial sound decoding",
      "Integrated 160W high-efficiency Class-D amplification",
      "Wi-Fi streaming: AirPlay 2, Spotify Connect, Chromecast",
      "HDMI eARC with 4K HDR passthrough"
    ],
    specs: {
      "Output Power": "160 Watts RMS",
      "Length": "68 cm",
      "Finish": "Graphite Grey & Natural Wool Blend"
    },
    inStock: true
  },
  {
    id: "nova-12",
    title: "NOVA Ergoform Vertical Wireless Mouse",
    price: 98,
    originalPrice: 110,
    category: "Desk & Workspace",
    rating: { rate: 4.7, count: 64 },
    badge: null,
    description: "Sculpted 57-degree natural handshake angle mouse engineered to relieve wrist pressure. Features a 4000 DPI silent optical sensor and dual precision thumb scroll wheels.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Optimal 57-degree neutral wrist angle posture",
      "Whisper-quiet acoustic tactile micro-switches",
      "USB-C quick charge (3 months per charge)",
      "Multi-device pairing across 3 machines seamlessly"
    ],
    specs: {
      "Sensor": "Darkfield 4000 DPI high-precision tracking",
      "Connectivity": "Bluetooth LE + 2.4GHz USB receiver",
      "Weight": "118 grams"
    },
    inStock: true
  },
  {
    id: "nova-13",
    title: "NOVA Aero Titanium Sunglasses",
    price: 175,
    originalPrice: 195,
    category: "Optics & Ambient",
    rating: { rate: 4.9, count: 52 },
    badge: "New Release",
    description: "Ultra-featherweight aviator frame laser-cut from Japanese titanium sheet. Outfitted with polarized anti-reflective Zeiss nylon lenses with hydrophobic oleophobic coating.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "100% UVA/UVB Category 3 optical polarization",
      "Screwless spring hinges engineered for lifetime durability",
      "Medical hypoallergenic silicone nose pads",
      "Includes magnetic folding leather travel case"
    ],
    specs: {
      "Frame Weight": "16 grams only",
      "Lens": "Zeiss Pol-Filter Nylon Lens",
      "UV Rating": "UV400 100% Protection"
    },
    inStock: true
  },
  {
    id: "nova-14",
    title: "NOVA Nomad Tech Organizer Pouch",
    price: 58,
    originalPrice: 68,
    category: "Minimal Carry",
    rating: { rate: 4.8, count: 88 },
    badge: null,
    description: "Accordion-style gear organizer crafted from recycled Cordura ballistic nylon. Keeps cables, chargers, drives, and stylus pens cleanly compartmentalized in quick-access pockets.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Origami-style self-standing open fold architecture",
      "Elastic cable loops and zippered secure mesh pocket",
      "Water-repellent weather-proof coating",
      "External grab handle and luggage strap pass-through"
    ],
    specs: {
      "Dimensions": "24 x 14 x 10 cm",
      "Material": "840D Recycled Ballistic Nylon",
      "Weight": "210 grams"
    },
    inStock: true
  },
  {
    id: "nova-15",
    title: "NOVA Axis Felt Desk Mat & Cable Channel",
    price: 49,
    originalPrice: null,
    category: "Desk & Workspace",
    rating: { rate: 4.7, count: 104 },
    badge: null,
    description: "Premium merino wool felt and vegan saddlery leather desk pad with an integrated concealed magnetic cable management toolbar to keep your workspace pristine.",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Natural high-density anti-fray merino wool felt surface",
      "Non-slip natural cork under-layer cushions wrists",
      "Embedded magnetic anchor bar with 2 movable cable clasps",
      "Repels minor liquid spills and dust"
    ],
    specs: {
      "Dimensions": "90cm x 42cm x 4mm",
      "Materials": "Merino Wool Felt + Natural Renewable Cork"
    },
    inStock: true
  },
  {
    id: "nova-16",
    title: "NOVA Echo Portable Hi-Fi Bluetooth Speaker",
    price: 165,
    originalPrice: 190,
    category: "Audio & Acoustics",
    rating: { rate: 4.8, count: 140 },
    badge: "Popular",
    description: "Subtle cylinder Bluetooth speaker housing dual passive radiators and a 360-degree neodymium driver. Features an IP67 dust/waterproof enclosure and 24-hour battery stamina.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "True 360-degree room-filling acoustic radiation",
      "IP67 immersion-proof & buoyant (it floats)",
      "True Wireless Stereo pairing to couple two units",
      "Integrated braided tactile carry lanyard"
    ],
    specs: {
      "Battery": "24 Hours play duration @ 60% volume",
      "Output": "30W peak power output",
      "Charging": "USB-C fast charge in 2.5 hours"
    },
    inStock: true
  },
  {
    id: "nova-17",
    title: "NOVA Lumina Smart Glass Carafe & Warmer",
    price: 85,
    originalPrice: 95,
    category: "Desk & Workspace",
    rating: { rate: 4.6, count: 39 },
    badge: null,
    description: "Borosilicate double-wall insulated thermal carafe paired with an induction ceramic temperature plate. Keeps espresso, pour-over coffee, or herbal tea at your ideal degree.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Precise temperature maintenance (45°C - 65°C / 113°F - 149°F)",
      "Food-grade heat-resistant hand-blown borosilicate glass",
      "Auto-off safety sensor when carafe is lifted",
      "Spill-proof silicone rim spout with flow filter"
    ],
    specs: {
      "Capacity": "650 mL",
      "Power": "35W ceramic induction plate",
      "Materials": "Borosilicate Glass, Food-grade 304 Stainless, Ceramic"
    },
    inStock: true
  },
  {
    id: "nova-18",
    title: "NOVA Sling Stealth Crossbody 4L",
    price: 110,
    originalPrice: 125,
    category: "Minimal Carry",
    rating: { rate: 4.9, count: 91 },
    badge: "Bestseller",
    description: "Streamlined weatherproof EDC crossbody bag designed for city transit. Equipped with quick-adjust nylon webbing, padded tablet pocket, and hidden anti-theft passport slot.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Self-compressing gusset expands from flat profile to 4L",
      "Magnetic Fidlock V-buckle for rapid one-handed release",
      "Padded compartment fits up to 11-inch iPad Pro",
      "External waterproof zipper pocket with key tether"
    ],
    specs: {
      "Capacity": "4 Liters",
      "Dimensions": "32 x 18 x 9 cm",
      "Weight": "380 grams"
    },
    inStock: true
  },
  {
    id: "nova-19",
    title: "NOVA Strata Ceramic Coffee Tumbler 350ml",
    price: 38,
    originalPrice: null,
    category: "Minimal Carry",
    rating: { rate: 4.8, count: 165 },
    badge: null,
    description: "Triple-insulated stainless steel travel vessel lined with pure ceramic coating. Prevents metallic aftertaste while keeping beverages hot for 12 hours or ice-cold for 24 hours.",
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "TrueTaste interior ceramic glaze",
      "100% leak-proof 360-degree sip lid",
      "Tapered base fits all standard car cup holders",
      "Sweat-free powder-coated tactile exterior"
    ],
    specs: {
      "Capacity": "350 ml / 12 fl oz",
      "Thermal Retention": "12h hot / 24h cold",
      "BPA Free": "Yes, 100% food grade"
    },
    inStock: true
  },
  {
    id: "nova-20",
    title: "NOVA Halo Sunrise Wake-Up Light",
    price: 135,
    originalPrice: 150,
    category: "Optics & Ambient",
    rating: { rate: 4.7, count: 72 },
    badge: null,
    description: "Natural sleep and wake circadian simulation orb with soft amber sunset hues, morning spectrum gradation, ambient nature audio profiles, and intuitive capacitive touch control.",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Simulates 30-minute natural dawn progression",
      "Binaural sleep sounds and white noise library built-in",
      "FM tuner and Bluetooth audio streaming",
      "Soft tactile textile housing with concealed LED clock"
    ],
    specs: {
      "Light Levels": "20 gradations up to 350 Lux",
      "Power": "USB-C with CR2032 battery backup",
      "Weight": "510 grams"
    },
    inStock: true
  },
  {
    id: "nova-21",
    title: "NOVA Quantum Precision Stylus Pen",
    price: 92,
    originalPrice: 105,
    category: "Desk & Workspace",
    rating: { rate: 4.8, count: 58 },
    badge: "New Release",
    description: "Anodized titanium active digital stylus offering 8192 pressure sensitivity levels, zero tilt-lag latency, wireless magnetic pairing, and interchangeable tungsten nibs.",
    image: "https://images.unsplash.com/photo-1585336261026-c29015c7e148?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1585336261026-c29015c7e148?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Sub-millimeter tip accuracy with zero hover jitter",
      "Dual programmable haptic shortcut buttons",
      "Universal USI 2.0 and MPP 2.5 cross-platform support",
      "12-hour continuous battery on a 15-minute charge"
    ],
    specs: {
      "Pressure Levels": "8,192 pressure levels",
      "Weight": "14 grams",
      "Material": "Matte bead-blasted aluminum alloy"
    },
    inStock: true
  },
  {
    id: "nova-22",
    title: "NOVA Solis Pure Merino Travel Hoodie",
    price: 155,
    originalPrice: null,
    category: "Personal Wearables",
    rating: { rate: 4.9, count: 44 },
    badge: "Featured",
    description: "Thermoregulating minimalist travel hoodie knitted from 100% superfine 18.5-micron New Zealand Merino wool. Naturally odor-resistant, breathable, and wrinkle-defying.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Superfine 260gsm 100% Merino wool knit",
      "Concealed zippered passport security pocket in right side seam",
      "Thumb loops and fitted articulated scuba hood",
      "Natural UV radiation block rating UPF 40+"
    ],
    specs: {
      "Material": "100% Superfine Merino Wool (18.5 micron)",
      "Care": "Machine wash cold delicate, air dry flat",
      "Fit": "Tailored athletic cut"
    },
    inStock: true
  },
  {
    id: "nova-23",
    title: "NOVA Core Aluminum Laptop Stand",
    price: 72,
    originalPrice: 85,
    category: "Desk & Workspace",
    rating: { rate: 4.8, count: 119 },
    badge: null,
    description: "Sculpted solid unibody aluminum riser elevating your laptop 15cm to perfect ergonomic eye level, with cable pass-through channels and passive heat-dissipation venting.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Single-piece forged 4mm aircraft-grade aluminum",
      "Precision silicone buffers protect laptop finish",
      "Optimized airflow opening enhances passive thermal cooling",
      "Accommodates laptops from 11-inch to 17-inch"
    ],
    specs: {
      "Elevation": "15 cm (6 inches)",
      "Weight": "840 grams",
      "Finish": "Sandblasted Space Grey"
    },
    inStock: true
  },
  {
    id: "nova-24",
    title: "NOVA Horizon MagSpeed Power Bank 20000mAh",
    price: 115,
    originalPrice: 130,
    category: "Minimal Carry",
    rating: { rate: 4.9, count: 133 },
    badge: "Bestseller",
    description: "Compact 100W PD 3.0 bi-directional power bank featuring an OLED real-time power telemetry screen, dual high-output USB-C ports, and an aircraft-approved lithium cell pack.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "100W Power Delivery charges laptops at maximum speed",
      "Digital OLED readout displays voltage, wattage, and remaining time",
      "Recharges from 0 to 100% in only 65 minutes with 65W charger",
      "TSA airline carry-on compliant (74Wh capacity)"
    ],
    specs: {
      "Capacity": "20,000mAh / 74Wh",
      "Ports": "2x USB-C (100W Max), 1x USB-A (22.5W Max)",
      "Weight": "395 grams"
    },
    inStock: true
  }
];

export const CATEGORY_META = [
  {
    name: "Audio & Acoustics",
    tagline: "Lossless acoustic fidelity and noise suppression.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    count: 4
  },
  {
    name: "Personal Wearables",
    tagline: "Precision telemetry and grade-5 titanium chronos.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    count: 3
  },
  {
    name: "Desk & Workspace",
    tagline: "Ergonomic tools machined for effortless workflow.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    count: 6
  },
  {
    name: "Optics & Ambient",
    tagline: "Zero-glare lighting and circadian spectrums.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
    count: 4
  },
  {
    name: "Minimal Carry",
    tagline: "Weatherproof sailcloth and titanium essentials.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    count: 7
  }
];
