import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { Search, SlidersHorizontal, ArrowUpRight, Zap, Gauge, X, ChevronDown } from "lucide-react";
import { carsData, CATEGORY_ACCENTS } from "../utils/vehiclesData";

const CATEGORIES = [
  { id: "ALL",      label: "All Vehicles", icon: "🚗" },
  { id: "Supercar", label: "Supercars",    icon: "🏁" },
  { id: "Drift",    label: "Drift",        icon: "🌀" },
  { id: "Luxury",   label: "Luxury",       icon: "💎" },
  { id: "Off-Road", label: "Off-Road",     icon: "🏔" },
  { id: "Muscle",   label: "Muscle",       icon: "💪" },
  { id: "Classic",  label: "Classics",     icon: "🕰" },
  { id: "Hatchback",label: "Hatchback",    icon: "🚘" },
  { id: "Sedan",    label: "Sedan",        icon: "🚙" },
];

const SORT_OPTIONS = [
  { value: "default",    label: "Featured"    },
  { value: "hp_desc",    label: "Power ↓"     },
  { value: "price_asc",  label: "Price ↑"     },
  { value: "price_desc", label: "Price ↓"     },
  { value: "speed_desc", label: "Top Speed ↓" },
];

const formatPrice = (p) => {
  if (p >= 10000000) return `₹${(p / 10000000).toFixed(1)}Cr`;
  if (p >= 100000)   return `₹${(p / 100000).toFixed(1)}L`;
  return `₹${p.toLocaleString()}`;
};

const MiniBar = ({ value, accent }) => (
  <div className="h-[3px] flex-1 rounded-full bg-white/10 overflow-hidden">
    <div className="h-full rounded-full" style={{ width: `${value}%`, background: accent }} />
  </div>
);

const VehicleCard = ({ car, index }) => {
  const navigate = useNavigate();
  const accent   = CATEGORY_ACCENTS[car.category] ?? "#ffffff";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.38, delay: (index % 15) * 0.03 }}
      whileHover={{ y: -5 }}
      onClick={() => navigate(`/single/${car.id}`)}
      className="group relative rounded-[20px] border border-white/8 bg-[#0d0d0d] overflow-hidden cursor-pointer select-none"
    >
      <div className="relative h-[185px] overflow-hidden">
        <img src={car.image} alt={car.model} loading="lazy"
          className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/15 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[8px] font-bold tracking-[0.22em] border backdrop-blur-sm"
          style={{ color: accent, borderColor: `${accent}45`, background: `${accent}18` }}>
          {car.category.toUpperCase()}
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[8px] tracking-widest text-white/45 border border-white/10 bg-black/50 backdrop-blur-sm">
          {car.year}
        </div>
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: accent }}>
            <ArrowUpRight size={13} className="text-black" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="text-[8px] tracking-[0.3em] text-white/30 mb-0.5 truncate">{car.brand.toUpperCase()}</p>
            <h3 className="text-[15px] font-black tracking-tight leading-tight truncate">{car.model}</h3>
          </div>
          <p className="text-xs font-bold shrink-0" style={{ color: accent }}>{formatPrice(car.basePrice)}</p>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {[
            { icon: <Zap size={8} className="text-white/30" />, label: `${car.specs.hp} HP` },
            { icon: <Gauge size={8} className="text-white/30" />, label: car.specs.topSpeed },
            { label: car.specs.driveTrain },
            { label: car.specs.fuelType },
          ].map(({ icon, label }, i) => (
            <span key={i} className="flex items-center gap-1 text-[9px] text-white/45 bg-white/[0.04] border border-white/8 px-2 py-0.5 rounded-full">
              {icon}{label}
            </span>
          ))}
        </div>
        <div className="space-y-1.5 mb-3.5">
          {[
            { label: "SPD", value: car.stats.speed    },
            { label: "HDL", value: car.stats.handling },
            { label: "CMF", value: car.stats.comfort  },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[7px] tracking-[0.2em] text-white/25 w-7 shrink-0">{label}</span>
              <MiniBar value={value} accent={accent} />
              <span className="text-[8px] font-bold text-white/40 w-5 text-right shrink-0">{value}</span>
            </div>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-1.5 rounded-full py-2 text-[9px] font-bold tracking-[0.18em] border transition-all"
          style={{ borderColor: `${accent}50`, color: accent, background: `${accent}0d` }}>
          BUILD THIS CAR <ArrowUpRight size={11} />
        </button>
      </div>
      <div className="pointer-events-none absolute bottom-[-90px] left-1/2 h-[200px] w-[200px] -translate-x-1/2 rounded-full opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: accent }} />
    </motion.div>
  );
};

const Vehicles = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery,    setSearchQuery]    = useState("");
  const [sortBy,         setSortBy]         = useState("default");
  const [driveFilter,    setDriveFilter]    = useState("ALL");
  const [showFilters,    setShowFilters]    = useState(false);

  const catCounts = useMemo(() => {
    const map = {};
    carsData.forEach((c) => { map[c.category] = (map[c.category] ?? 0) + 1; });
    return map;
  }, []);

  const filteredCars = useMemo(() => {
    let cars = [...carsData];
    if (activeCategory !== "ALL") cars = cars.filter((c) => c.category === activeCategory);
    if (searchQuery.trim()) cars = cars.filter((c) =>
      c.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (driveFilter !== "ALL") cars = cars.filter((c) => c.specs.driveTrain === driveFilter);
    switch (sortBy) {
      case "hp_desc":    cars.sort((a, b) => b.specs.hp    - a.specs.hp);    break;
      case "price_asc":  cars.sort((a, b) => a.basePrice   - b.basePrice);   break;
      case "price_desc": cars.sort((a, b) => b.basePrice   - a.basePrice);   break;
      case "speed_desc": cars.sort((a, b) => b.stats.speed - a.stats.speed); break;
      default: break;
    }
    return cars;
  }, [activeCategory, searchQuery, sortBy, driveFilter]);

  const activeCatMeta   = CATEGORIES.find((c) => c.id === activeCategory);
  const activeCatAccent = CATEGORY_ACCENTS[activeCategory] ?? "#ffffff";

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#050505]/85 backdrop-blur-2xl px-7 py-4 flex items-center gap-4">
        <h1 className="text-xl font-black tracking-[0.08em] shrink-0">MODGARAGE</h1>
        <div className="flex items-center gap-1.5 border border-white/10 rounded-full px-3.5 py-2 bg-white/[0.03] w-52">
          <Search size={12} className="text-white/30 shrink-0" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brand or model…"
            className="bg-transparent text-[11px] text-white placeholder:text-white/25 outline-none w-full" />
          {searchQuery && <button onClick={() => setSearchQuery("")}><X size={11} className="text-white/30 hover:text-white" /></button>}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none border border-white/10 rounded-full px-4 py-2 pr-7 bg-white/[0.03] text-[10px] text-white outline-none tracking-widest cursor-pointer">
              {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>)}
            </select>
            <ChevronDown size={10} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
          </div>
          <button onClick={() => setShowFilters((p) => !p)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-[10px] tracking-widest transition-all ${
              showFilters ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.03] text-white/55 hover:border-white/30"}`}>
            <SlidersHorizontal size={12} /> FILTER
          </button>
        </div>
      </header>

      {/* FILTER DRAWER */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-white/8 bg-[#080808]">
            <div className="px-7 py-4 flex items-center gap-5 flex-wrap">
              <p className="text-[8px] tracking-[0.4em] text-white/30">DRIVETRAIN</p>
              {["ALL","RWD","AWD","4WD","FWD"].map((d) => (
                <button key={d} onClick={() => setDriveFilter(d)}
                  className={`px-3.5 py-1.5 rounded-full text-[9px] tracking-widest border transition-all ${
                    driveFilter === d ? "bg-white text-black border-white" : "border-white/12 text-white/45 hover:border-white/35"}`}>
                  {d}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="sticky top-[61px] h-[calc(100vh-61px)] w-[196px] shrink-0 border-r border-white/8 py-5 overflow-y-auto">
          {CATEGORIES.map((cat) => {
            const count  = cat.id === "ALL" ? carsData.length : (catCounts[cat.id] ?? 0);
            const accent = CATEGORY_ACCENTS[cat.id] ?? "#fff";
            const active = activeCategory === cat.id;
            return (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`group relative w-full text-left px-5 py-3 transition-all ${active ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}`}>
                {active && (
                  <motion.div layoutId="sidebarIndicator" className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full"
                    style={{ background: accent }} />
                )}
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-bold tracking-[0.14em] flex items-center gap-1.5 transition-colors ${
                    active ? "text-white" : "text-white/35 group-hover:text-white/65"}`}>
                    <span className="text-sm">{cat.icon}</span>
                    {cat.label.toUpperCase()}
                  </span>
                  <span className={`text-[9px] font-bold tabular-nums ${active ? "text-white/55" : "text-white/18"}`}>{count}</span>
                </div>
              </button>
            );
          })}
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 px-6 pt-6 pb-16">
          <div className="mb-5 flex items-end justify-between border-b border-white/6 pb-5">
            <div>
              <motion.h2 key={activeCategory} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-black tracking-tight" style={{ color: activeCatAccent }}>
                {activeCatMeta?.label.toUpperCase()}
              </motion.h2>
              <p className="mt-1 text-[9px] text-white/30 tracking-[0.18em]">
                {filteredCars.length} vehicles
              </p>
            </div>
            {(driveFilter !== "ALL" || searchQuery) && (
              <button onClick={() => { setDriveFilter("ALL"); setSearchQuery(""); }}
                className="flex items-center gap-1.5 text-[9px] text-white/40 hover:text-white/70 tracking-widest border border-white/10 rounded-full px-3 py-1.5 transition">
                <X size={10} /> CLEAR FILTERS
              </button>
            )}
          </div>

          <AnimatePresence mode="popLayout">
            {filteredCars.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 gap-3">
                <p className="text-2xl">🔍</p>
                <p className="text-[10px] tracking-[0.35em] text-white/25">NO VEHICLES FOUND</p>
              </motion.div>
            ) : (
              <motion.div layout className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredCars.map((car, i) => (
                  <VehicleCard key={car.id} car={car} index={i} />
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