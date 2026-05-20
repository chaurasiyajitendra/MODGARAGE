import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Zap, Gauge, Fuel, ChevronRight, CheckCircle2, Circle, ShoppingCart, Info, TrendingUp } from "lucide-react";

const vehicleData = {
  id: 1,
  name: "NISSAN GT-R",
  brand: "NISSAN",
  category: "SPORTS",
  year: 2023,
  image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
  baseSpecs: {
    hp: 565,
    torque: 632,
    topSpeed: 315,
    acceleration: 2.9,
    mileage: 7.2,
  },
  description:
    "The GT-R is a legend reborn — a twin-turbocharged AWD monster that rewrites what a production car can do. Every surface breathes performance.",
};

const modCategories = [
  {
    id: "engine",
    label: "ENGINE",
    icon: "⚡",
    mods: [
      {
        id: "turbo_upgrade",
        name: "Twin Turbo Upgrade",
        tier: "STAGE 2",
        description: "High-flow turbochargers with upgraded intercoolers for massive power gains.",
        cost: 8500,
        effects: { hp: +180, torque: +210, topSpeed: +22, acceleration: -0.4, mileage: -1.2 },
      },
      {
        id: "ecu_tune",
        name: "ECU Stage 3 Tune",
        tier: "STAGE 3",
        description: "Full engine remap — optimised fuel maps, boost curves, and ignition timing.",
        cost: 2200,
        effects: { hp: +85, torque: +95, topSpeed: +12, acceleration: -0.2, mileage: -0.8 },
      },
      {
        id: "intake",
        name: "Cold Air Intake",
        tier: "STAGE 1",
        description: "Draws cooler, denser air into the engine for improved combustion and throttle response.",
        cost: 950,
        effects: { hp: +28, torque: +22, topSpeed: +5, acceleration: -0.1, mileage: +0.3 },
      },
      {
        id: "exhaust",
        name: "Full Titanium Exhaust",
        tier: "STAGE 2",
        description: "Cat-back titanium system shedding 14kg while unleashing the true GT-R soundtrack.",
        cost: 4200,
        effects: { hp: +45, torque: +38, topSpeed: +8, acceleration: -0.15, mileage: -0.4 },
      },
    ],
  },
  {
    id: "suspension",
    label: "SUSPENSION",
    icon: "🔧",
    mods: [
      {
        id: "coilovers",
        name: "Racing Coilovers",
        tier: "STAGE 2",
        description: "Fully adjustable dampers and springs for circuit-level cornering precision.",
        cost: 3800,
        effects: { hp: 0, torque: 0, topSpeed: +6, acceleration: -0.12, mileage: 0 },
      },
      {
        id: "sway_bars",
        name: "Adjustable Sway Bars",
        tier: "STAGE 1",
        description: "Stiffer anti-roll bars reduce body roll through high-speed corners.",
        cost: 1200,
        effects: { hp: 0, torque: 0, topSpeed: +3, acceleration: -0.05, mileage: 0 },
      },
      {
        id: "camber_kit",
        name: "Camber & Alignment Kit",
        tier: "STAGE 1",
        description: "Aggressive camber settings maximise tyre contact patch during hard cornering.",
        cost: 680,
        effects: { hp: 0, torque: 0, topSpeed: +2, acceleration: -0.03, mileage: -0.3 },
      },
    ],
  },
  {
    id: "brakes",
    label: "BRAKES",
    icon: "🛑",
    mods: [
      {
        id: "big_brake",
        name: "Big Brake Kit 6-Pot",
        tier: "STAGE 3",
        description: "380mm slotted rotors with 6-piston monobloc calipers for fade-free stopping.",
        cost: 5600,
        effects: { hp: 0, torque: 0, topSpeed: +4, acceleration: -0.2, mileage: 0 },
      },
      {
        id: "brake_lines",
        name: "Braided Brake Lines",
        tier: "STAGE 1",
        description: "Stainless braided lines eliminate pedal sponge for consistent, firm bite.",
        cost: 380,
        effects: { hp: 0, torque: 0, topSpeed: +1, acceleration: -0.04, mileage: 0 },
      },
      {
        id: "race_pads",
        name: "Carbon Ceramic Pads",
        tier: "STAGE 2",
        description: "High-friction compound pads designed for extreme heat — track-ready stopping power.",
        cost: 980,
        effects: { hp: 0, torque: 0, topSpeed: +2, acceleration: -0.08, mileage: 0 },
      },
    ],
  },
  {
    id: "aero",
    label: "AERO",
    icon: "🏎",
    mods: [
      {
        id: "gt_wing",
        name: "GT Carbon Wing",
        tier: "STAGE 3",
        description: "Adjustable dual-plane carbon GT wing generates 180kg of downforce at 250km/h.",
        cost: 3200,
        effects: { hp: 0, torque: 0, topSpeed: -8, acceleration: -0.18, mileage: -0.5 },
      },
      {
        id: "front_splitter",
        name: "Carbon Front Splitter",
        tier: "STAGE 2",
        description: "Aggressive splitter redirects airflow under the car, reducing lift and increasing stability.",
        cost: 1800,
        effects: { hp: 0, torque: 0, topSpeed: +5, acceleration: -0.1, mileage: -0.3 },
      },
      {
        id: "diffuser",
        name: "Rear Diffuser",
        tier: "STAGE 2",
        description: "Extracts air from under the car to create a low-pressure zone that sucks the car down.",
        cost: 1400,
        effects: { hp: 0, torque: 0, topSpeed: +4, acceleration: -0.08, mileage: -0.2 },
      },
    ],
  },
];

const tierColors = {
  "STAGE 1": { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
  "STAGE 2": { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
  "STAGE 3": { bg: "bg-red-500/10", text: "text-red-400", border: "border-red-500/30" },
};

const StatBar = ({ label, value, baseValue, unit, max, color }) => {
  const basePct = Math.min((baseValue / max) * 100, 100);
  const nowPct = Math.min((value / max) * 100, 100);
  const diff = value - baseValue;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="tracking-[0.2em] text-white/40">{label}</span>
        <div className="flex items-center gap-2">
          {diff !== 0 && (
            <span className={`text-[10px] tracking-wider font-bold ${diff > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {diff > 0 ? "+" : ""}{diff.toFixed(1)}{unit}
            </span>
          )}
          <span className="font-bold text-white">{value.toFixed(1)}{unit}</span>
        </div>
      </div>
      <div className="relative h-1.5 w-full rounded-full bg-white/5">
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-full ${color}`}
          initial={{ width: `${basePct}%` }}
          animate={{ width: `${nowPct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {diff !== 0 && (
          <motion.div
            className={`absolute top-0 h-full rounded-full ${diff > 0 ? "bg-emerald-400/40" : "bg-red-400/40"}`}
            style={{ left: `${Math.min(basePct, nowPct)}%` }}
            animate={{ width: `${Math.abs(nowPct - basePct)}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        )}
      </div>
    </div>
  );
};

const VehicleDetail = ({ onBack }) => {
  const [selectedMods, setSelectedMods] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("engine");
  const [hoveredMod, setHoveredMod] = useState(null);

  const toggleMod = (modId) => {
    setSelectedMods((prev) => {
      const next = new Set(prev);
      if (next.has(modId)) next.delete(modId);
      else next.add(modId);
      return next;
    });
  };

  const allMods = modCategories.flatMap((c) => c.mods);
  const activeMods = allMods.filter((m) => selectedMods.has(m.id));

  const computedSpecs = activeMods.reduce(
    (acc, mod) => ({
      hp: acc.hp + mod.effects.hp,
      torque: acc.torque + mod.effects.torque,
      topSpeed: acc.topSpeed + mod.effects.topSpeed,
      acceleration: acc.acceleration + mod.effects.acceleration,
      mileage: acc.mileage + mod.effects.mileage,
    }),
    { ...vehicleData.baseSpecs }
  );

  const totalCost = activeMods.reduce((s, m) => s + m.cost, 0);
  const currentCategory = modCategories.find((c) => c.id === activeCategory);

  const previewSpecs = hoveredMod
    ? {
        hp: computedSpecs.hp + (selectedMods.has(hoveredMod.id) ? 0 : hoveredMod.effects.hp),
        torque: computedSpecs.torque + (selectedMods.has(hoveredMod.id) ? 0 : hoveredMod.effects.torque),
        topSpeed: computedSpecs.topSpeed + (selectedMods.has(hoveredMod.id) ? 0 : hoveredMod.effects.topSpeed),
        acceleration: computedSpecs.acceleration + (selectedMods.has(hoveredMod.id) ? 0 : hoveredMod.effects.acceleration),
        mileage: computedSpecs.mileage + (selectedMods.has(hoveredMod.id) ? 0 : hoveredMod.effects.mileage),
      }
    : computedSpecs;

  const displaySpecs = previewSpecs;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* HERO */}
      <div className="relative h-[55vh] overflow-hidden">
        <img
          src={vehicleData.image}
          alt={vehicleData.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050505]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />

        {/* HEADER */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs tracking-[0.25em] text-white/60 hover:text-white transition"
          >
            <ArrowLeft size={16} />
            FLEET
          </button>
          <div className="text-xs tracking-[0.35em] text-white/40">MODGARAGE</div>
          <div className="text-xs tracking-[0.25em] text-white/40">{vehicleData.year}</div>
        </div>

        {/* TITLE */}
        <div className="absolute bottom-10 left-8">
          <p className="text-[10px] tracking-[0.45em] text-white/40 mb-2">{vehicleData.brand} · {vehicleData.category}</p>
          <h1 className="text-6xl font-black tracking-tight leading-none">{vehicleData.name}</h1>
          <p className="mt-3 max-w-md text-sm text-white/50 leading-relaxed">{vehicleData.description}</p>
        </div>

        {/* QUICK STATS RIBBON */}
        <div className="absolute bottom-0 right-0 flex gap-px">
          {[
            { icon: Zap, label: "POWER", value: `${Math.round(displaySpecs.hp)} HP`, base: vehicleData.baseSpecs.hp },
            { icon: Gauge, label: "TOP SPEED", value: `${Math.round(displaySpecs.topSpeed)} KM/H`, base: vehicleData.baseSpecs.topSpeed },
            { icon: TrendingUp, label: "0-100", value: `${displaySpecs.acceleration.toFixed(1)}s`, base: vehicleData.baseSpecs.acceleration },
            { icon: Fuel, label: "MILEAGE", value: `${displaySpecs.mileage.toFixed(1)} KM/L`, base: vehicleData.baseSpecs.mileage },
          ].map(({ icon: Icon, label, value, base }) => (
            <div key={label} className="bg-black/60 backdrop-blur-xl px-5 py-4 border-l border-white/10">
              <p className="text-[9px] tracking-[0.3em] text-white/40 mb-1">{label}</p>
              <p className="text-sm font-bold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex gap-0 border-t border-white/5">

        {/* LEFT: MOD BUILDER */}
        <div className="flex-1 border-r border-white/5">
          {/* CATEGORY TABS */}
          <div className="flex border-b border-white/5">
            {modCategories.map((cat) => {
              const count = cat.mods.filter((m) => selectedMods.has(m.id)).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex-1 px-4 py-5 text-[10px] tracking-[0.3em] transition-all ${
                    activeCategory === cat.id
                      ? "text-white bg-white/5"
                      : "text-white/35 hover:text-white/70"
                  }`}
                >
                  <span>{cat.icon} {cat.label}</span>
                  {count > 0 && (
                    <span className="absolute top-3 right-3 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[9px] font-bold text-black">
                      {count}
                    </span>
                  )}
                  {activeCategory === cat.id && (
                    <motion.div layoutId="catLine" className="absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* MOD LIST */}
          <div className="p-6 space-y-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {currentCategory?.mods.map((mod) => {
                  const isSelected = selectedMods.has(mod.id);
                  const tier = tierColors[mod.tier];

                  return (
                    <motion.div
                      key={mod.id}
                      onMouseEnter={() => setHoveredMod(mod)}
                      onMouseLeave={() => setHoveredMod(null)}
                      whileHover={{ x: 4 }}
                      className={`group relative rounded-2xl border p-5 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "border-white/30 bg-white/[0.06]"
                          : "border-white/8 bg-white/[0.02] hover:border-white/15"
                      }`}
                      onClick={() => toggleMod(mod.id)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`text-[9px] tracking-[0.3em] px-2.5 py-1 rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}>
                              {mod.tier}
                            </span>
                          </div>
                          <h3 className="font-bold text-base tracking-tight">{mod.name}</h3>
                          <p className="mt-1.5 text-xs text-white/45 leading-relaxed">{mod.description}</p>

                          {/* EFFECT PILLS */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {Object.entries(mod.effects).map(([key, val]) => {
                              if (val === 0) return null;
                              const isPositive =
                                (key === "acceleration" || key === "mileage")
                                  ? key === "mileage" ? val > 0 : val < 0
                                  : val > 0;
                              const labels = { hp: "HP", torque: "TQ", topSpeed: "TOP SPEED", acceleration: "0-100", mileage: "MILEAGE" };
                              const units = { hp: "", torque: "", topSpeed: "km/h", acceleration: "s", mileage: "km/l" };
                              return (
                                <span
                                  key={key}
                                  className={`text-[9px] px-2 py-0.5 rounded-full font-semibold tracking-wider ${
                                    isPositive ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                                  }`}
                                >
                                  {val > 0 ? "+" : ""}{val}{units[key]} {labels[key]}
                                </span>
                              );
                            })}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-4 shrink-0">
                          <div className={`transition-colors ${isSelected ? "text-white" : "text-white/20 group-hover:text-white/50"}`}>
                            {isSelected ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] tracking-[0.2em] text-white/30">COST</p>
                            <p className="text-sm font-bold">₹{mod.cost.toLocaleString()}</p>
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

        {/* RIGHT: STATS + SUMMARY */}
        <div className="w-[340px] shrink-0 sticky top-0 h-screen overflow-y-auto flex flex-col">

          {/* LIVE STATS */}
          <div className="p-7 border-b border-white/5">
            <p className="text-[10px] tracking-[0.35em] text-white/35 mb-6">PERFORMANCE PROFILE</p>

            <div className="space-y-6">
              <StatBar label="POWER" value={displaySpecs.hp} baseValue={vehicleData.baseSpecs.hp} unit=" HP" max={950} color="bg-gradient-to-r from-amber-500 to-red-500" />
              <StatBar label="TORQUE" value={displaySpecs.torque} baseValue={vehicleData.baseSpecs.torque} unit=" NM" max={1000} color="bg-gradient-to-r from-orange-500 to-amber-500" />
              <StatBar label="TOP SPEED" value={displaySpecs.topSpeed} baseValue={vehicleData.baseSpecs.topSpeed} unit=" KM/H" max={400} color="bg-gradient-to-r from-blue-500 to-cyan-500" />
              <StatBar label="0-100 KM/H" value={Math.abs(displaySpecs.acceleration)} baseValue={vehicleData.baseSpecs.acceleration} unit="s" max={5} color="bg-gradient-to-r from-purple-500 to-pink-500" />
              <StatBar label="MILEAGE" value={displaySpecs.mileage} baseValue={vehicleData.baseSpecs.mileage} unit=" KM/L" max={15} color="bg-gradient-to-r from-emerald-500 to-teal-500" />
            </div>

            {hoveredMod && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3"
              >
                <Info size={12} className="text-white/30 shrink-0" />
                <p className="text-[10px] text-white/40 leading-relaxed">
                  Previewing: <span className="text-white/70">{hoveredMod.name}</span>
                </p>
              </motion.div>
            )}
          </div>

          {/* SELECTED MODS */}
          <div className="flex-1 p-7 border-b border-white/5">
            <p className="text-[10px] tracking-[0.35em] text-white/35 mb-4">SELECTED MODS</p>

            {activeMods.length === 0 ? (
              <p className="text-xs text-white/25 leading-relaxed">
                No mods selected yet. Pick parts from the left to begin building.
              </p>
            ) : (
              <div className="space-y-2">
                {activeMods.map((mod) => (
                  <motion.div
                    key={mod.id}
                    layout
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    className="flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3"
                  >
                    <div>
                      <p className="text-xs font-semibold">{mod.name}</p>
                      <p className="text-[9px] text-white/35 tracking-wider">{mod.tier}</p>
                    </div>
                    <p className="text-xs font-bold">₹{mod.cost.toLocaleString()}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* TOTAL + CTA */}
          <div className="p-7">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-[0.35em] text-white/40">MODIFICATION TOTAL</p>
            </div>
            <div className="flex items-baseline gap-2 mb-6">
              <p className="text-4xl font-black">₹{totalCost.toLocaleString()}</p>
              {totalCost > 0 && (
                <p className="text-xs text-white/30">{activeMods.length} mod{activeMods.length !== 1 ? "s" : ""}</p>
              )}
            </div>

            <button
              disabled={activeMods.length === 0}
              className={`w-full flex items-center justify-center gap-3 rounded-full py-4 text-xs font-bold tracking-[0.25em] transition-all ${
                activeMods.length > 0
                  ? "bg-white text-black hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={15} />
              {activeMods.length === 0 ? "SELECT MODS TO CONTINUE" : "REQUEST BUILD QUOTE"}
            </button>

            {activeMods.length > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setSelectedMods(new Set())}
                className="w-full mt-3 py-3 text-[10px] tracking-[0.3em] text-white/30 hover:text-white/60 transition"
              >
                CLEAR ALL
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetail;