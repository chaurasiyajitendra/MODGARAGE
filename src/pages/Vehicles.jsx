import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, ArrowUpRight, Zap, Gauge, X } from "lucide-react";
import { carsData } from "../utils/vehiclesData";
import { useNavigate } from "react-router";

// ─── category config ────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "ALL",
    label: "All Vehicles",
    count: null,
    accent: "#ffffff",
    desc: "The complete MODGARAGE fleet",
  },
  {
    id: "Supercar",
    label: "Supercars",
    count: null,
    accent: "#f43f5e",
    desc: "Raw power. Zero compromise.",
    icon: "🏁",
  },
  {
    id: "Drift",
    label: "Drift",
    count: null,
    accent: "#f97316",
    desc: "Sideways is the only way.",
    icon: "🌀",
  },
  {
    id: "Luxury",
    label: "Luxury",
    count: null,
    accent: "#c4a35a",
    desc: "Effortless refinement.",
    icon: "💎",
  },
  {
    id: "Off-Road",
    label: "Off-Road",
    count: null,
    accent: "#22c55e",
    desc: "No road? No problem.",
    icon: "🏔",
  },
  {
    id: "Muscle",
    label: "Muscle",
    count: null,
    accent: "#3b82f6",
    desc: "American thunder.",
    icon: "💪",
  },
  {
    id: "Classic",
    label: "Classics",
    count: null,
    accent: "#a78bfa",
    desc: "Heritage on wheels.",
    icon: "🕰",
  },
];

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "hp_desc", label: "Power ↓" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "speed_desc", label: "Top Speed ↓" },
];

const catAccent = (cat) =>
  CATEGORIES.find((c) => c.id === cat)?.accent ?? "#ffffff";

const StatBar = ({ value, color }) => (
  <div className="h-[3px] w-full rounded-full bg-white/10 overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ background: color }}
      initial={{ width: 0 }}
      whileInView={{ width: `${value}%` }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    />
  </div>
);

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)}Cr`;
  if (p >= 100000) return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

// ─── vehicle card ────────────────────────────────────────────────────────────
const VehicleCard = ({ car, onSelect, index }) => {
  const accent = catAccent(car.category);
  const navigate = useNavigate();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: (index % 12) * 0.04 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(car)}
      className="group relative rounded-[20px] border border-white/8 bg-[#0c0c0c] overflow-hidden cursor-pointer"
    >
      {/* image */}
      <div className="relative h-[200px] overflow-hidden">
        <img
          src={car.image}
          alt={car.model}
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-black/20 to-transparent" />

        {/* category pill */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.25em] border backdrop-blur-sm"
          style={{
            color: accent,
            borderColor: `${accent}40`,
            background: `${accent}15`,
          }}
        >
          {car.category.toUpperCase()}
        </div>

        {/* year badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[9px] tracking-widest text-white/50 border border-white/10 bg-black/40 backdrop-blur-sm">
          {car.year}
        </div>
      </div>

      {/* body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div>
            <p className="text-[9px] tracking-[0.3em] text-white/35 mb-0.5">
              {car.brand.toUpperCase()}
            </p>
            <h3 className="text-lg font-black tracking-tight leading-tight">
              {car.model}
            </h3>
          </div>
          <p
            className="text-sm font-bold shrink-0 mt-0.5"
            style={{ color: accent }}
          >
            {formatPrice(car.basePrice)}
          </p>
        </div>

        {/* quick specs row */}
        <div className="flex gap-3 mt-3 mb-4">
          <div className="flex items-center gap-1.5">
            <Zap size={10} className="text-white/30" />
            <span className="text-[10px] text-white/60 font-semibold">
              {car.specs.hp} HP
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Gauge size={10} className="text-white/30" />
            <span className="text-[10px] text-white/60 font-semibold">
              {car.specs.topSpeed}
            </span>
          </div>
          <div className="text-[10px] text-white/40">{car.specs.driveTrain}</div>
        </div>

        {/* stat bars */}
        <div className="space-y-2 mb-4">
          {[
            { label: "SPEED", value: car.stats.speed },
            { label: "HANDLING", value: car.stats.handling },
            { label: "COMFORT", value: car.stats.comfort },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[8px] tracking-[0.2em] text-white/30 w-14 shrink-0">
                {label}
              </span>
              <StatBar value={value} color={accent} />
              <span className="text-[9px] font-bold text-white/50 w-6 text-right shrink-0">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* cta */}
        <button
          onClick={()=>{navigate(`/single/${car.id}`)}}
          className="w-full flex items-center cursor-pointer justify-center gap-2 rounded-full py-2.5 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 border"
          style={{
            borderColor: `${accent}50`,
            color: accent,
            background: `${accent}10`,
          }}
        >
          BUILD THIS CAR
          <ArrowUpRight size={12} />
        </button>
      </div>

      {/* hover glow */}
      <div
        className="absolute bottom-[-80px] left-1/2 h-[180px] w-[180px] -translate-x-1/2 rounded-full opacity-0 blur-[80px] transition-opacity duration-700 group-hover:opacity-100 pointer-events-none"
        style={{ background: accent }}
      />
    </motion.div>
  );
};

// ─── main page ───────────────────────────────────────────────────────────────
const Vehicles = ({ onSelectCar }) => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);
  const [driveFilter, setDriveFilter] = useState("ALL");

  const categoriesWithCount = useMemo(
    () =>
      CATEGORIES.map((c) => ({
        ...c,
        count:
          c.id === "ALL"
            ? carsData.length
            : carsData.filter((car) => car.category === c.id).length,
      })),
    []
  );

  const filteredCars = useMemo(() => {
    let cars = [...carsData];

    if (activeCategory !== "ALL")
      cars = cars.filter((c) => c.category === activeCategory);

    if (searchQuery.trim())
      cars = cars.filter(
        (c) =>
          c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (driveFilter !== "ALL")
      cars = cars.filter((c) => c.specs.driveTrain === driveFilter);

    switch (sortBy) {
      case "hp_desc":
        cars.sort((a, b) => b.specs.hp - a.specs.hp);
        break;
      case "price_asc":
        cars.sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "price_desc":
        cars.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "speed_desc":
        cars.sort((a, b) => b.stats.speed - a.stats.speed);
        break;
      default:
        break;
    }

    return cars;
  }, [activeCategory, searchQuery, sortBy, driveFilter]);

  const activeCatData = categoriesWithCount.find(
    (c) => c.id === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#050505]/80 backdrop-blur-2xl px-8 py-5 flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-[0.06em]">MODGARAGE</h1>

        <div className="flex items-center gap-3">
          {/* search */}
          <div className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/[0.03] w-52">
            <Search size={13} className="text-white/30 shrink-0" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cars…"
              className="bg-transparent text-xs text-white placeholder:text-white/25 outline-none w-full tracking-wide"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <X size={12} className="text-white/30 hover:text-white" />
              </button>
            )}
          </div>

          {/* sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="appearance-none border border-white/10 rounded-full px-4 py-2 bg-white/[0.03] text-xs text-white outline-none tracking-widest cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-black">
                {o.label}
              </option>
            ))}
          </select>

          {/* filter toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-widest transition-all ${
              showFilters
                ? "border-white bg-white text-black"
                : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30"
            }`}
          >
            <SlidersHorizontal size={13} />
            FILTER
          </button>
        </div>
      </header>

      {/* ── FILTER DRAWER ── */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/8 bg-[#080808]"
          >
            <div className="px-8 py-5 flex items-center gap-6">
              <p className="text-[9px] tracking-[0.35em] text-white/35 shrink-0">
                DRIVETRAIN
              </p>
              <div className="flex gap-2 flex-wrap">
                {["ALL", "RWD", "AWD", "4WD", "FWD"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDriveFilter(d)}
                    className={`px-4 py-1.5 rounded-full text-[10px] tracking-widest border transition-all ${
                      driveFilter === d
                        ? "bg-white text-black border-white"
                        : "border-white/15 text-white/50 hover:border-white/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* ── LEFT CATEGORY RAIL ── */}
        <aside className="sticky top-[73px] h-[calc(100vh-73px)] w-[220px] shrink-0 border-r border-white/8 flex flex-col py-8 overflow-y-auto">
          {categoriesWithCount.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`group relative text-left px-7 py-4 transition-all duration-200 ${
                activeCategory === cat.id ? "bg-white/[0.05]" : "hover:bg-white/[0.02]"
              }`}
            >
              {activeCategory === cat.id && (
                <motion.div
                  layoutId="catIndicator"
                  className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full"
                  style={{ background: cat.accent ?? "#fff" }}
                />
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs font-bold tracking-[0.15em] transition-colors ${
                      activeCategory === cat.id
                        ? "text-white"
                        : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {cat.icon && (
                      <span className="mr-2 text-sm">{cat.icon}</span>
                    )}
                    {cat.label.toUpperCase()}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold tabular-nums transition-colors ${
                    activeCategory === cat.id
                      ? "text-white/70"
                      : "text-white/20"
                  }`}
                >
                  {cat.count}
                </span>
              </div>
            </button>
          ))}
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 px-8 pt-8 pb-20">
          {/* page title strip */}
          <div className="mb-8 flex items-end justify-between">
            <div>
              <motion.h2
                key={activeCategory}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl font-black tracking-tight leading-none"
                style={{ color: activeCatData?.accent ?? "#fff" }}
              >
                {activeCatData?.label.toUpperCase()}
              </motion.h2>
              <motion.p
                key={`desc-${activeCategory}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1.5 text-xs text-white/35 tracking-[0.2em]"
              >
                {activeCatData?.desc} —{" "}
                <span className="text-white/60">{filteredCars.length} vehicles</span>
              </motion.p>
            </div>
          </div>

          {/* grid */}
          <AnimatePresence mode="popLayout">
            {filteredCars.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-white/25 text-sm tracking-[0.3em]"
              >
                NO VEHICLES FOUND
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
              >
                {filteredCars.map((car, i) => (
                  <VehicleCard
                    key={car.id}
                    car={car}
                    onSelect={onSelectCar}
                    index={i}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Vehicles;