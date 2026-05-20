import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    title: "SPORTS CARS",
    subtitle: "High-speed performance machines engineered for precision.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "LUXURY CARS",
    subtitle: "Premium comfort blended with aggressive power.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "OFF-ROAD VEHICLES",
    subtitle: "Built for terrain domination and adventure.",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop",
  },

  {
    title: "DRIFT CARS",
    subtitle: "Sideways monsters made for smoke and style.",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?q=80&w=1600&auto=format&fit=crop",
  },
];

const Categories = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-32 text-white md:px-10">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[150px]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="mb-4 text-sm tracking-[0.35em] text-white/40">
            VEHICLE DIVISIONS
          </p>

          <h1 className="text-6xl font-black uppercase tracking-[0.08em] md:text-8xl">
            CATEGORIES
          </h1>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid gap-6 md:grid-cols-2">

          {categories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative h-[500px] overflow-hidden rounded-[28px] border border-white/10"
            >

              {/* IMAGE */}
              <motion.img
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.8 }}
                src={item.image}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* TOP BUTTON */}
              <motion.button
                whileHover={{
                  rotate: 45,
                  scale: 1.1,
                }}
                className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
              >
                <ArrowUpRight size={20} />
              </motion.button>

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 p-8">

                <h2 className="max-w-md text-4xl font-black uppercase leading-tight tracking-[0.08em] md:text-5xl">
                  {item.title}
                </h2>

                <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
                  {item.subtitle}
                </p>

                {/* LINE */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "120px" }}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                  }}
                  className="mt-8 h-[2px] bg-white"
                />
              </div>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                <div className="absolute bottom-[-120px] left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full bg-white/10 blur-[120px]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;