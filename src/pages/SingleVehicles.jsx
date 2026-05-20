import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft, Zap, Gauge, Fuel, ShoppingCart,
  CheckCircle2, Circle, Info, Settings2,
} from "lucide-react";
import { carsData } from "../utils/vehiclesData";

// ─── Category-specific mod trees ─────────────────────────────────────────────

const MOD_TREES = {
  Supercar: [
    {
      id: "sc_engine", label: "ENGINE", icon: "⚡",
      mods: [
        { id: "sc_turbo",   name: "Twin Turbo Upgrade",     tier: "S2", desc: "High-flow turbos with upgraded intercoolers for brutal power gains over stock.", cost: 9200,  fx: { hp: +220, torque: +260, topSpeed: +28, handling: +2,  comfort: -3  } },
        { id: "sc_ecu",     name: "Race ECU Full Remap",    tier: "S3", desc: "Unlocks hidden horsepower buried deep in the factory ECU — fuel, boost, ignition.", cost: 2800,  fx: { hp: +110, torque: +90,  topSpeed: +15, handling: 0,   comfort: -2  } },
        { id: "sc_exhaust", name: "Titanium Race Exhaust",  tier: "S2", desc: "Full titanium cat-back — drops 16 kg and amplifies the soundtrack considerably.", cost: 5200,  fx: { hp: +55,  torque: +48,  topSpeed: +10, handling: +1,  comfort: -4  } },
        { id: "sc_intake",  name: "Carbon Ram-Air Intake",  tier: "S1", desc: "Ram-air carbon airbox with heat shielding — cooler, denser charge air on entry.", cost: 1400,  fx: { hp: +35,  torque: +28,  topSpeed: +6,  handling: 0,   comfort: 0   } },
      ],
    },
    {
      id: "sc_aero", label: "AERODYNAMICS", icon: "🏎",
      mods: [
        { id: "sc_wing",     name: "Active GT Carbon Wing",    tier: "S3", desc: "Adjustable active rear wing delivering 220 kg downforce at 300 km/h.", cost: 6800, fx: { hp: 0, torque: 0, topSpeed: -10, handling: +14, comfort: -2 } },
        { id: "sc_splitter", name: "Full Carbon Splitter Kit", tier: "S2", desc: "Front splitter + dive planes + rear diffuser for balanced aero load.", cost: 3400, fx: { hp: 0, torque: 0, topSpeed: +5,  handling: +9,  comfort: -1 } },
        { id: "sc_hood",     name: "Vented Carbon Bonnet",     tier: "S1", desc: "Heat extraction vents drop underbonnet temps by 18°C and save 8 kg.", cost: 2100, fx: { hp: +18, torque: +12, topSpeed: +4, handling: +1, comfort: 0  } },
      ],
    },
    {
      id: "sc_chassis", label: "CHASSIS & BRAKES", icon: "🔧",
      mods: [
        { id: "sc_coil", name: "3-Way Adjustable Coilovers", tier: "S3", desc: "Motorsport dampers with rebound, compression, and ride height adjustment.", cost: 5500, fx: { hp: 0, torque: 0, topSpeed: +8, handling: +16, comfort: -9  } },
        { id: "sc_bbk",  name: "Carbon Ceramic 6-Pot BBK",   tier: "S3", desc: "380mm carbon-ceramic rotors with 6-piston Brembo calipers — fade free.", cost: 7200, fx: { hp: 0, torque: 0, topSpeed: +5, handling: +7,  comfort: 0   } },
        { id: "sc_sway", name: "Solid-Mount Sway Bars",      tier: "S1", desc: "Stiffer front and rear anti-roll bars eliminate body roll and understeer.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +8,  comfort: -5  } },
      ],
    },
    {
      id: "sc_cockpit", label: "COCKPIT", icon: "🎛",
      mods: [
        { id: "sc_cage",   name: "FIA Chromoly Roll Cage",       tier: "S3", desc: "Full FIA-spec cage stiffens the chassis by 40%. Mandatory for track days.", cost: 8500, fx: { hp: 0, torque: 0, topSpeed: +4, handling: +9,  comfort: -16 } },
        { id: "sc_bucket", name: "Carbon Bucket Seats",          tier: "S2", desc: "HANS-compatible carbon shell seats save 28 kg over the OEM chairs.", cost: 3200, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +4,  comfort: -10 } },
        { id: "sc_wheel",  name: "Motorsport Steering Wheel",    tier: "S1", desc: "Flat-bottom quick-release carbon wheel with integrated mode switches.", cost: 950,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +3,  comfort: -2  } },
      ],
    },
  ],

  Drift: [
    {
      id: "dr_engine", label: "ENGINE", icon: "⚡",
      mods: [
        { id: "dr_turbo",   name: "Single Large Turbo Kit",   tier: "S3", desc: "Massive single turbo swap with external wastegate — torque swell for sustained angle.", cost: 7800, fx: { hp: +250, torque: +320, topSpeed: +20, handling: +3,  comfort: -5  } },
        { id: "dr_ecu",     name: "Drift ECU Tune",           tier: "S2", desc: "Anti-lag, overboost, launch control, and throttle blip maps tuned for the pad.", cost: 1900, fx: { hp: +80,  torque: +95,  topSpeed: +8,  handling: +2,  comfort: -1  } },
        { id: "dr_exhaust", name: "Full Decat Straight Pipe", tier: "S2", desc: "All cats removed, straight-through open pipe — max crackle, full theatre.", cost: 2800, fx: { hp: +60,  torque: +50,  topSpeed: +10, handling: 0,   comfort: -8  } },
        { id: "dr_lsd",     name: "Mechanical 2-Way LSD",     tier: "S2", desc: "Replaces OEM limited-slip — essential for initiating and holding sideways angle.", cost: 3500, fx: { hp: 0,    torque: 0,    topSpeed: +2,  handling: +18, comfort: -3  } },
      ],
    },
    {
      id: "dr_suspension", label: "SUSPENSION & ANGLE", icon: "🌀",
      mods: [
        { id: "dr_coil",    name: "Drift Coilovers",             tier: "S2", desc: "Stiff front / soft rear tuning transfers weight rearward — oversteer on demand.", cost: 3800, fx: { hp: 0, torque: 0, topSpeed: +4,  handling: +14, comfort: -13 } },
        { id: "dr_knuckle", name: "High-Angle Steering Knuckles",tier: "S3", desc: "Extend to 60°+ steering angle — full lock without wheel-arch scrub.", cost: 4200, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +22, comfort: -6  } },
        { id: "dr_camber",  name: "Extreme Camber Kit",          tier: "S1", desc: "-5° to -8° front camber — aggressive stance, max tyre contact mid-rotation.", cost: 980,  fx: { hp: 0, torque: 0, topSpeed: -3,  handling: +10, comfort: -8  } },
      ],
    },
    {
      id: "dr_brakes", label: "BRAKES & HYDRAULICS", icon: "🛑",
      mods: [
        { id: "dr_handbrake", name: "Hydraulic Handbrake",    tier: "S1", desc: "Dedicated hydraulic e-brake circuit for precise, instant entry initiation.", cost: 850,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: +12, comfort: 0 } },
        { id: "dr_bias",      name: "Brake Bias Adjuster",    tier: "S2", desc: "In-cabin front/rear bias knob — tune balance on the fly between runs.", cost: 1400, fx: { hp: 0, torque: 0, topSpeed: 0, handling: +8,  comfort: 0 } },
        { id: "dr_pads",      name: "Motorsport Brake Pads",  tier: "S1", desc: "High-temp compound stays consistent through repeated heavy threshold stops.", cost: 750,  fx: { hp: 0, torque: 0, topSpeed: +1, handling: +4,  comfort: 0 } },
      ],
    },
    {
      id: "dr_exterior", label: "EXTERIOR & VISUAL", icon: "🎨",
      mods: [
        { id: "dr_widebody", name: "Widebody Fender Kit",      tier: "S3", desc: "+60 mm per side — accommodates stretched tyres and aggressive stance fitment.", cost: 5500, fx: { hp: 0, torque: 0, topSpeed: -5, handling: +6, comfort: 0  } },
        { id: "dr_livery",   name: "Custom Race Livery Wrap",  tier: "S1", desc: "3M 1080 premium vinyl full wrap — custom design process included.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +5 } },
        { id: "dr_splitter", name: "Aggressive Front Splitter",tier: "S2", desc: "Carbon splitter for visual aggression plus mild front aerodynamic load.", cost: 1600, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +4, comfort: 0  } },
      ],
    },
  ],

  Luxury: [
    {
      id: "lx_performance", label: "PERFORMANCE", icon: "⚡",
      mods: [
        { id: "lx_ecu",     name: "Bespoke ECU Tune",          tier: "S2", desc: "Conservative power mapped for smooth, imperceptible delivery in every gear.", cost: 2200, fx: { hp: +65, torque: +75, topSpeed: +15, handling: +2, comfort: +4  } },
        { id: "lx_exhaust", name: "Active Variable Exhaust",   tier: "S2", desc: "Active valves offer silence for the city or theatre on demand — your choice.", cost: 4800, fx: { hp: +30, torque: +25, topSpeed: +5,  handling: 0,  comfort: +8  } },
        { id: "lx_air",     name: "Sport Air Suspension Tune", tier: "S1", desc: "Recalibrated spring curves drop 25mm in Sport mode with no comfort sacrifice.", cost: 1800, fx: { hp: 0,   torque: 0,   topSpeed: +3,  handling: +6, comfort: +5  } },
      ],
    },
    {
      id: "lx_interior", label: "INTERIOR", icon: "💎",
      mods: [
        { id: "lx_leather",    name: "Full Bespoke Leather Restyle",tier: "S3", desc: "Hand-stitched Nappa leather — over 400 hours of craftwork on every surface.", cost: 12000, fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +20 } },
        { id: "lx_audio",      name: "Bespoke Reference Audio",     tier: "S2", desc: "Custom-tuned 26-speaker audiophile system with active noise cancellation.", cost: 8500,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +15 } },
        { id: "lx_massager",   name: "Heated Massage Seat Upgrade", tier: "S1", desc: "16-way massage front seats with lumbar heat and active ventilation cooling.", cost: 3200,  fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +12 } },
        { id: "lx_starlight",  name: "Starlight Headliner",         tier: "S2", desc: "1,340 fibre-optic LEDs hand-woven through alcantara — inspired by Rolls-Royce.", cost: 6500, fx: { hp: 0, torque: 0, topSpeed: 0, handling: 0, comfort: +10 } },
      ],
    },
    {
      id: "lx_exterior", label: "EXTERIOR", icon: "✨",
      mods: [
        { id: "lx_paint",  name: "Two-Tone Bespoke Paint",  tier: "S3", desc: "Hand-applied dual-tone scheme with 10-coat lacquer finish — a 3-week process.", cost: 15000, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +15 } },
        { id: "lx_wheels", name: "Forged Alloys 22\"",      tier: "S2", desc: "Bespoke 22-inch forged monoblock alloys — 12 kg lighter than OEM cast wheels.", cost: 7200,  fx: { hp: +8, torque: 0, topSpeed: +4, handling: +4, comfort: +5  } },
        { id: "lx_lights", name: "Crystal LED Light Pack",  tier: "S1", desc: "Matrix LED headlights with sequential crystal taillamps — night-time theatre.", cost: 3800,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +5  } },
      ],
    },
    {
      id: "lx_tech", label: "TECHNOLOGY", icon: "🖥",
      mods: [
        { id: "lx_hud",          name: "Augmented Reality HUD",     tier: "S2", desc: "Full-windscreen AR navigation, speed, and ADAS overlaid directly on the road.", cost: 5500,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +2,  comfort: +8  } },
        { id: "lx_ai_susp",      name: "AI Predictive Suspension",  tier: "S3", desc: "Camera reads road 60m ahead and pre-adjusts each corner independently.", cost: 9800,  fx: { hp: 0, torque: 0, topSpeed: +2, handling: +10, comfort: +18 } },
        { id: "lx_ambient",      name: "64-Zone Ambient Lighting",  tier: "S1", desc: "Programmable mood lighting across the full cabin — 16M colour options.", cost: 2200,  fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,   comfort: +6  } },
      ],
    },
  ],

  "Off-Road": [
    {
      id: "or_engine", label: "ENGINE & DRIVETRAIN", icon: "⚡",
      mods: [
        { id: "or_remap",   name: "Diesel/Petrol ECU Remap",         tier: "S2", desc: "Low-end torque optimised for rock crawling — massive pull from idle.", cost: 1800, fx: { hp: +45, torque: +80, topSpeed: +8,  handling: +2,  durability: +5  } },
        { id: "or_exhaust", name: "Heavy-Duty Off-Road Exhaust",     tier: "S1", desc: "Mandrel-bent stainless with high ground-clearance routing for trail use.", cost: 2200, fx: { hp: +25, torque: +35, topSpeed: +5,  handling: 0,   durability: +3  } },
        { id: "or_lockers", name: "Electronic Diff Lockers (F&R)",   tier: "S3", desc: "ARB air lockers front and rear — true mechanical diff lock on both axles.", cost: 5500, fx: { hp: 0,   torque: 0,   topSpeed: -5,  handling: +5,  durability: +10 } },
        { id: "or_gearing", name: "Low-Range Gearing Kit",           tier: "S2", desc: "Extends low-range crawl ratio to 5.0:1 — climbs almost any obstacle.", cost: 3800, fx: { hp: 0,   torque: +20, topSpeed: -8,  handling: +8,  durability: +8  } },
      ],
    },
    {
      id: "or_suspension", label: "SUSPENSION & LIFT", icon: "🏔",
      mods: [
        { id: "or_lift3",   name: "3-Inch Suspension Lift",         tier: "S1", desc: "Full 3\" lift with extended brake lines and corrected castor — 33\" tyre clearance.", cost: 2800, fx: { hp: 0, torque: 0, topSpeed: -5,  handling: +6,  durability: +5  } },
        { id: "or_lift6",   name: "6-Inch Long-Travel Lift",        tier: "S3", desc: "Long-travel arms with Bilstein 5100 coilovers. Built for desert running.", cost: 7200, fx: { hp: 0, torque: 0, topSpeed: -10, handling: +14, durability: +8  } },
        { id: "or_coil",    name: "Heavy-Duty Progressive Coils",   tier: "S2", desc: "Progressive-rate springs handle max load and articulation simultaneously.", cost: 1900, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +8,  durability: +12 } },
        { id: "or_cv",      name: "Heavy-Duty Chromoly CV Axles",   tier: "S2", desc: "Chromoly CV shafts — survive full-lock flex that destroys OEM parts.", cost: 2400, fx: { hp: 0, torque: 0, topSpeed: 0,   handling: +4,  durability: +15 } },
      ],
    },
    {
      id: "or_armour", label: "PROTECTION & ARMOUR", icon: "🛡",
      mods: [
        { id: "or_skid",     name: "Full Underbody Skid Plates",   tier: "S2", desc: "6mm steel plates protect engine, transfer case, and fuel tank from rocks.", cost: 3200, fx: { hp: 0,   torque: 0,   topSpeed: -2,  handling: 0,   durability: +20 } },
        { id: "or_bumper",   name: "Steel Winch Bumper + Warn",    tier: "S2", desc: "Winch-ready front bumper with 9,500 lb Warn winch fully included.", cost: 4500, fx: { hp: 0,   torque: -5,  topSpeed: -4,  handling: -2,  durability: +18 } },
        { id: "or_sliders",  name: "Rock Sliders & Side Steps",    tier: "S1", desc: "Heavy-duty sliders protect sills from boulder damage on technical trails.", cost: 1600, fx: { hp: 0,   torque: 0,   topSpeed: -1,  handling: 0,   durability: +10 } },
        { id: "or_snorkel",  name: "Safari Snorkel & Air Intake",  tier: "S1", desc: "Raises intake to roof level — fords 1m water without hydrolocking.", cost: 1100, fx: { hp: +8,  torque: +5,  topSpeed: 0,   handling: 0,   durability: +8  } },
      ],
    },
    {
      id: "or_tyres", label: "TYRES & WHEELS", icon: "🔄",
      mods: [
        { id: "or_mt",       name: "35\" Mud Terrain Tyres",         tier: "S2", desc: "Aggressive MT tread pattern — bites mud, rock, and loose sand equally.", cost: 3600, fx: { hp: 0, torque: 0, topSpeed: -8, handling: +10, durability: +8  } },
        { id: "or_beadlock", name: "Beadlock Wheels 17\"",           tier: "S2", desc: "Ring-lock wheels allow safe airing down to 8 PSI on rock sections.", cost: 4800, fx: { hp: 0, torque: 0, topSpeed: -3, handling: +12, durability: +6  } },
        { id: "or_ctis",     name: "Central Tyre Inflation System",  tier: "S3", desc: "Air up or down all four tyres from the cab — without stopping.", cost: 3900, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: +8,  durability: +5  } },
      ],
    },
  ],
};

// Fallback for Muscle, Classic, Hatchback, Sedan, etc.
const FALLBACK_MODS = [
  {
    id: "gen_engine", label: "ENGINE", icon: "⚡",
    mods: [
      { id: "gen_tune",    name: "Performance ECU Tune",   tier: "S1", desc: "Remapped fuel and ignition maps for extra power and improved throttle response.", cost: 1500, fx: { hp: +40, torque: +50, topSpeed: +8, handling: 0,   comfort: -1 } },
      { id: "gen_exhaust", name: "Performance Exhaust",    tier: "S2", desc: "Stainless cat-back with a deeper, more aggressive tone and minor power gains.", cost: 2800, fx: { hp: +35, torque: +30, topSpeed: +6, handling: 0,   comfort: -3 } },
      { id: "gen_intake",  name: "Cold Air Intake",        tier: "S1", desc: "Short-ram intake draws cooler, denser air for better combustion efficiency.", cost: 900,  fx: { hp: +20, torque: +18, topSpeed: +4, handling: 0,   comfort: 0  } },
      { id: "gen_pulley",  name: "Underdrive Pulley Set",  tier: "S1", desc: "Lightened crank and alt pulleys free up 8–12 hp by reducing parasitic drag.", cost: 750,  fx: { hp: +10, torque: +8,  topSpeed: +2, handling: 0,   comfort: 0  } },
    ],
  },
  {
    id: "gen_chassis", label: "CHASSIS & BRAKES", icon: "🔧",
    mods: [
      { id: "gen_coil",   name: "Performance Coilovers",  tier: "S2", desc: "Adjustable coilovers sharpen cornering while keeping the ride livable.", cost: 3200, fx: { hp: 0, torque: 0, topSpeed: +5, handling: +10, comfort: -5 } },
      { id: "gen_brakes", name: "Big Brake Upgrade",      tier: "S2", desc: "Larger rotors and multi-piston calipers for improved stopping confidence.", cost: 4200, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +5,  comfort: 0  } },
      { id: "gen_sway",   name: "Sway Bar Set",           tier: "S1", desc: "Stiffer bars reduce body roll for a flatter, more planted feel.", cost: 1100, fx: { hp: 0, torque: 0, topSpeed: +2, handling: +7,  comfort: -3 } },
    ],
  },
  {
    id: "gen_aero", label: "AERO & EXTERIOR", icon: "🎨",
    mods: [
      { id: "gen_splitter", name: "Front Splitter",        tier: "S1", desc: "Modest front splitter reduces front lift for a more planted motorway feel.", cost: 1400, fx: { hp: 0, torque: 0, topSpeed: +3, handling: +4, comfort: 0 } },
      { id: "gen_wrap",     name: "Full Colour Wrap",      tier: "S1", desc: "3M premium vinyl — full colour change with paint-protection benefits.", cost: 1800, fx: { hp: 0, torque: 0, topSpeed: 0,  handling: 0,  comfort: +3 } },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIER_META = {
  S1: { label: "STAGE 1", bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  S2: { label: "STAGE 2", bg: "bg-amber-500/10",   text: "text-amber-400",   border: "border-amber-500/30"   },
  S3: { label: "STAGE 3", bg: "bg-red-500/10",     text: "text-red-400",     border: "border-red-500/30"     },
};

const CAT_ACCENT = {
  Supercar:  "#f43f5e",
  Drift:     "#f97316",
  Luxury:    "#c4a35a",
  "Off-Road":"#22c55e",
  Muscle:    "#3b82f6",
  Classic:   "#a78bfa",
  Hatchback: "#06b6d4",
  Sedan:     "#8b5cf6",
};

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(2)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

const EFF_LABELS = { hp: "HP", torque: "TQ", topSpeed: "SPD", handling: "HDL", comfort: "CMF", durability: "DUR" };

// ─── VehicleDetails page ──────────────────────────────────────────────────────

const VehicleDetails = () => {
  const { id }   = useParams();
  const navigate = useNavigate();

  // find car
  const car = carsData.find((c) => String(c.id) === String(id));

  const [selectedMods,  setSelectedMods]  = useState(new Set());
  const [activeCatId,   setActiveCatId]   = useState(null);
  const [hoveredMod,    setHoveredMod]    = useState(null);

  if (!car) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-white/30 tracking-[0.35em] text-sm">VEHICLE NOT FOUND</p>
        <button onClick={() => navigate("/Vehicles")} className="text-xs tracking-widest text-white/50 hover:text-white transition">
          ← BACK TO FLEET
        </button>
      </div>
    );
  }

  const accent   = CAT_ACCENT[car.category] ?? "#ffffff";
  const modTree  = MOD_TREES[car.category]  ?? FALLBACK_MODS;
  const effectiveCat = activeCatId ?? modTree[0]?.id;
  const currentCatData = modTree.find((c) => c.id === effectiveCat);
  const allMods  = modTree.flatMap((c) => c.mods);
  const activeMods = allMods.filter((m) => selectedMods.has(m.id));

  // base numeric specs for stat panel
  const baseNums = {
    hp:       car.specs.hp,
    torque:   parseInt(car.specs.torque),
    topSpeed: parseInt(car.specs.topSpeed),
    handling: car.stats.handling,
    comfort:  car.stats.comfort,
  };

  const computeNums = (extra) => {
    const s = { ...baseNums };
    const applyMod = (mod) => {
      s.hp       += mod.fx.hp       ?? 0;
      s.torque   += mod.fx.torque   ?? 0;
      s.topSpeed += mod.fx.topSpeed ?? 0;
      s.handling  = Math.min(100, Math.max(0, s.handling + (mod.fx.handling  ?? 0)));
      s.comfort   = Math.min(100, Math.max(0, s.comfort  + (mod.fx.comfort   ?? 0)));
    };
    selectedMods.forEach((mid) => { const m = allMods.find((x) => x.id === mid); if (m) applyMod(m); });
    if (extra && !selectedMods.has(extra.id)) applyMod(extra);
    return s;
  };

  const currentNums = computeNums(null);
  const displayNums = hoveredMod ? computeNums(hoveredMod) : currentNums;
  const totalCost   = activeMods.reduce((s, m) => s + m.cost, 0);

  const toggleMod = (id) =>
    setSelectedMods((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const STAT_ROWS = [
    { key: "hp",       label: "POWER",     unit: " HP",   max: 1800 },
    { key: "torque",   label: "TORQUE",    unit: " NM",   max: 1700 },
    { key: "topSpeed", label: "TOP SPEED", unit: " KM/H", max: 500  },
    { key: "handling", label: "HANDLING",  unit: "",      max: 100  },
    { key: "comfort",  label: "COMFORT",   unit: "",      max: 100  },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">

      {/* ════ HERO ════ */}
      <div className="relative h-[54vh] overflow-hidden">
        <img src={car.image} alt={car.model} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/88 via-transparent to-transparent" />

        {/* top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5">
          <button
            onClick={() => navigate("/Vehicles")}
            className="flex items-center gap-2 text-xs tracking-[0.25em] text-white/50 hover:text-white transition"
          >
            <ArrowLeft size={14} /> FLEET
          </button>
          <span className="text-xs tracking-[0.4em] text-white/25">MODGARAGE</span>
          <div
            className="text-[9px] tracking-[0.3em] font-bold px-3 py-1.5 rounded-full border"
            style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }}
          >
            {car.category.toUpperCase()}
          </div>
        </div>

        {/* car info */}
        <div className="absolute bottom-14 left-8">
          <p className="text-[9px] tracking-[0.45em] text-white/30 mb-1.5">
            {car.brand.toUpperCase()} · {car.year}
          </p>
          <h1 className="text-[50px] font-black tracking-tight leading-none">{car.model}</h1>
          <div className="flex items-center gap-4 mt-3 flex-wrap">
            <span className="text-xs text-white/35">{car.specs.engine}</span>
            <span className="text-white/15">·</span>
            <span className="text-xs text-white/35">{car.specs.driveTrain}</span>
            <span className="text-white/15">·</span>
            <span className="text-sm font-bold" style={{ color: accent }}>{formatPrice(car.basePrice)}</span>
          </div>
        </div>

        {/* quick stat ribbon */}
        <div className="absolute bottom-0 right-0 flex">
          {[
            { label: "POWER",    val: `${displayNums.hp} HP`         },
            { label: "TOP SPEED",val: `${displayNums.topSpeed} KM/H` },
            { label: "TORQUE",   val: `${displayNums.torque} NM`     },
            { label: "MILEAGE",  val: car.specs.mileage              },
          ].map(({ label, val }) => (
            <div key={label} className="bg-black/65 backdrop-blur-xl border-l border-white/8 px-5 py-3.5">
              <p className="text-[8px] tracking-[0.3em] text-white/30 mb-1">{label}</p>
              <p className="text-sm font-bold">{val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ════ BODY ════ */}
      <div className="flex border-t border-white/6">

        {/* ══ LEFT: MOD BUILDER ══ */}
        <div className="flex-1 min-w-0 border-r border-white/6">

          {/* category tabs */}
          <div className="flex border-b border-white/6 overflow-x-auto scrollbar-none">
            {modTree.map((cat) => {
              const cnt = cat.mods.filter((m) => selectedMods.has(m.id)).length;
              const active = effectiveCat === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`relative shrink-0 px-6 py-4 text-[9px] tracking-[0.28em] transition-all whitespace-nowrap ${
                    active ? "bg-white/[0.04] text-white" : "text-white/28 hover:text-white/60"
                  }`}
                >
                  {cat.icon} {cat.label}
                  {cnt > 0 && (
                    <span
                      className="ml-2 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full text-[8px] font-black text-black"
                      style={{ background: accent }}
                    >
                      {cnt}
                    </span>
                  )}
                  {active && (
                    <motion.div
                      layoutId={`vtab-${car.id}`}
                      className="absolute bottom-0 left-0 right-0 h-[2px]"
                      style={{ background: accent }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* mod grid */}
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={effectiveCat}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid grid-cols-1 xl:grid-cols-2 gap-3"
              >
                {currentCatData?.mods.map((mod) => {
                  const sel = selectedMods.has(mod.id);
                  const t   = TIER_META[mod.tier];
                  const effs = Object.entries(mod.fx).filter(([, v]) => v !== 0);

                  return (
                    <motion.div
                      key={mod.id}
                      whileHover={{ x: 3 }}
                      onMouseEnter={() => setHoveredMod(mod)}
                      onMouseLeave={() => setHoveredMod(null)}
                      onClick={() => toggleMod(mod.id)}
                      className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-200 ${
                        sel
                          ? "border-white/22 bg-white/[0.05]"
                          : "border-white/7 bg-white/[0.017] hover:border-white/13"
                      }`}
                    >
                      {/* selected accent bar */}
                      {sel && (
                        <div className="absolute top-0 left-0 bottom-0 w-[3px] rounded-l-2xl" style={{ background: accent }} />
                      )}

                      <div className="flex items-start gap-3">
                        <div className="flex-1 min-w-0">
                          {/* tier badge */}
                          <span className={`inline-block text-[8px] tracking-[0.25em] font-bold px-2.5 py-0.5 rounded-full border mb-2 ${t.bg} ${t.text} ${t.border}`}>
                            {t.label}
                          </span>
                          <h3 className="text-sm font-black tracking-tight mb-1">{mod.name}</h3>
                          <p className="text-[10px] text-white/38 leading-relaxed">{mod.desc}</p>

                          {/* effect pills */}
                          {effs.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {effs.map(([k, v]) => {
                                const good = k === "comfort" ? v > 0 : k === "topSpeed" ? v > 0 : v > 0;
                                return (
                                  <span
                                    key={k}
                                    className={`text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wide ${
                                      good ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                    }`}
                                  >
                                    {v > 0 ? "+" : ""}{v} {EFF_LABELS[k] ?? k.toUpperCase()}
                                  </span>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* right col: check + cost */}
                        <div className="flex flex-col items-end gap-3 shrink-0">
                          <div style={sel ? { color: accent } : { color: "rgba(255,255,255,0.15)" }}>
                            {sel ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                          </div>
                          <div className="text-right">
                            <p className="text-[8px] tracking-widest text-white/22">COST</p>
                            <p className="text-sm font-bold">{formatPrice(mod.cost)}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ══ RIGHT: STATS + SUMMARY ══ */}
        <div className="w-[295px] shrink-0 sticky top-0 h-screen overflow-y-auto flex flex-col">

          {/* ── Performance profile ── */}
          <div className="p-6 border-b border-white/6">
            <p className="text-[9px] tracking-[0.35em] text-white/28 mb-5">PERFORMANCE PROFILE</p>

            <div className="space-y-4">
              {STAT_ROWS.map(({ key, label, unit, max }) => {
                const base = baseNums[key];
                const disp = displayNums[key];
                const diff = disp - base;
                const pct  = Math.min((disp / max) * 100, 100);

                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] tracking-[0.25em] text-white/30">{label}</span>
                      <div className="flex items-center gap-1.5">
                        {diff !== 0 && (
                          <span className={`text-[9px] font-bold ${diff > 0 ? "text-emerald-400" : "text-red-400"}`}>
                            {diff > 0 ? "+" : ""}{Math.round(diff)}{unit}
                          </span>
                        )}
                        <span className="text-xs font-bold">{Math.round(disp)}{unit}</span>
                      </div>
                    </div>
                    <div className="h-[5px] rounded-full bg-white/6 overflow-hidden relative">
                      <motion.div
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ background: accent }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* hover preview hint */}
            {hoveredMod && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3"
              >
                <Info size={11} className="text-white/25 mt-0.5 shrink-0" />
                <p className="text-[9px] text-white/32 leading-relaxed">
                  Previewing <span className="text-white/60">{hoveredMod.name}</span>
                </p>
              </motion.div>
            )}
          </div>

          {/* ── Base specs table ── */}
          <div className="p-6 border-b border-white/6">
            <p className="text-[9px] tracking-[0.35em] text-white/28 mb-4">BASE SPECS</p>
            <div className="space-y-2.5">
              {[
                ["Engine",       car.specs.engine],
                ["Transmission", car.specs.transmission],
                ["Drivetrain",   car.specs.driveTrain],
                ["Fuel",         car.specs.fuelType],
                ["Weight",       car.specs.weight],
                ["Mileage",      car.specs.mileage],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between items-start gap-2">
                  <span className="text-[9px] text-white/28 tracking-wide shrink-0">{label}</span>
                  <span className="text-[9px] text-white/60 font-semibold text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Selected mods list ── */}
          <div className="flex-1 p-6 border-b border-white/6">
            <p className="text-[9px] tracking-[0.35em] text-white/28 mb-3">SELECTED MODS</p>
            {activeMods.length === 0 ? (
              <p className="text-[10px] text-white/18 leading-relaxed">
                No modifications selected yet. Pick parts from the left panel to begin.
              </p>
            ) : (
              <div className="space-y-2">
                <AnimatePresence>
                  {activeMods.map((mod) => (
                    <motion.div
                      key={mod.id}
                      layout
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="flex items-center justify-between rounded-xl border border-white/7 bg-white/[0.02] px-3 py-2.5 gap-2"
                    >
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold leading-tight truncate">{mod.name}</p>
                        <p className="text-[8px] text-white/28 tracking-widest mt-0.5">{TIER_META[mod.tier].label}</p>
                      </div>
                      <p className="text-[10px] font-bold shrink-0">{formatPrice(mod.cost)}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* ── CTA ── */}
          <div className="p-6">
            <p className="text-[8px] tracking-[0.35em] text-white/28 mb-1">TOTAL MOD COST</p>
            <div className="flex items-baseline gap-2 mb-5">
              <p className="text-3xl font-black">{formatPrice(totalCost || 0)}</p>
              {activeMods.length > 0 && (
                <p className="text-[10px] text-white/28">
                  {activeMods.length} mod{activeMods.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <button
              disabled={activeMods.length === 0}
              className="w-full flex items-center justify-center gap-2.5 rounded-full py-3.5 text-[10px] font-bold tracking-[0.2em] transition-all"
              style={
                activeMods.length > 0
                  ? { background: accent, color: "#000" }
                  : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.22)", cursor: "not-allowed" }
              }
            >
              <ShoppingCart size={13} />
              {activeMods.length === 0 ? "SELECT MODS TO BUILD" : "REQUEST BUILD QUOTE"}
            </button>

            {activeMods.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedMods(new Set())}
                className="w-full mt-3 py-2 text-[9px] tracking-[0.3em] text-white/22 hover:text-white/50 transition"
              >
                CLEAR ALL MODS
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetails;