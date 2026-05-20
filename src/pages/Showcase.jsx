import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cars = [
  {
    title: "LUXURY",
    subtitle: "ROLLS ROYCE",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    glow: "bg-purple-500/20",
  },

  {
    title: "BEAUTY QUEEN",
    subtitle: "PORSCHE 911",
    image:
      "https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=1600&auto=format&fit=crop",
    glow: "bg-pink-500/20",
  },

  {
    title: "SPORTS",
    subtitle: "NISSAN GTR",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
    glow: "bg-red-500/20",
  },
];

const Showcase = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-28 text-white md:px-10">

      {/* BACKGROUND */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* TOP */}
        <div className="mb-20 text-center">

          <p className="mb-4 text-xs tracking-[0.4em] text-white/40">
            MODGARAGE COLLECTION
          </p>

          <h1 className="text-6xl font-black uppercase tracking-[0.08em] md:text-8xl">
            SHOWCASE
          </h1>
        </div>

        {/* CARS */}
        <div className="grid gap-6 lg:grid-cols-3">

          {cars.map((car, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className={`group relative overflow-hidden rounded-[35px] border border-white/10 bg-[#0b0b0b]
              ${index === 1 ? "h-[750px]" : "h-[620px]"}`}
            >

              {/* IMAGE */}
              <motion.img
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: 1,
                }}
                src={car.image}
                alt={car.subtitle}
                className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* GLOW */}
              <div
                className={`absolute bottom-[-100px] left-1/2 h-[250px] w-[250px] -translate-x-1/2 rounded-full blur-[120px] ${car.glow}`}
              />

              {/* CONTENT */}
              <div className="absolute bottom-0 left-0 w-full p-8">

                {/* CATEGORY */}
                <p className="mb-4 text-xs tracking-[0.35em] text-white/50">
                  {car.title}
                </p>

                {/* NAME */}
                <h2 className="text-4xl font-black uppercase leading-none tracking-[0.08em] md:text-5xl">
                  {car.subtitle}
                </h2>

                {/* LINE */}
                <div className="mt-6 h-[1px] w-20 bg-white/40" />

                {/* BUTTON */}
                <button className="mt-8 flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-6 py-4 text-xs tracking-[0.25em] backdrop-blur-xl transition hover:bg-white hover:text-black">

                  VIEW BUILD

                  <ArrowUpRight size={16} />
                </button>
              </div>

              {/* BIG TEXT */}
              <h1 className="absolute bottom-[-25px] right-4 text-[140px] font-black uppercase leading-none text-white/5">
                MOD
              </h1>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;