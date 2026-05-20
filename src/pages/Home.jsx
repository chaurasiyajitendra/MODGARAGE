import {
  Menu,
  Search,
  Mouse,
} from "lucide-react";

import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import { useState } from "react";


const Home = () => {
  const [NavPanle, setNavPanle] = useState(false)
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] text-white">

      {/* Animated Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(80,80,90,0.25),transparent_55%)]"
      />

      {/* Top Navbar */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 z-20 flex w-full items-center justify-between px-10 py-8"
      >
        <button onClick={()=>{NavPanle ? setNavPanle(false) : setNavPanle(true)}} className="text-white hover:scale-110 transition">
          <Menu size={28} strokeWidth={1.5} />
        </button>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.1em" }}
          transition={{ duration: 1.2 }}
          className="text-4xl uppercase font-black tracking-[0.1em]"
        >
          MODgarage
        </motion.h1>

        <div className="flex items-center gap-5 text-sm">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 transition hover:scale-110 hover:bg-white hover:text-black">
            <Search size={16} />
          </button>
        </div>
      </motion.header>

      {/* Left Menu */}
      {/* <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-10 top-1/2 z-20 -translate-y-1/2"
      >
        <nav className="space-y-8">
          {menuItems.map((item, index) => (
            <motion.div
              whileHover={{ x: 10 }}
              key={item}
              className="relative"
            >
              <button
                className={`text-sm tracking-[0.2em] transition-all duration-300 ${
                  index === 0
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item}
              </button>

              {index === 0 && (
                <motion.div
                  layoutId="activeMenu"
                  className="mt-1 h-[2px] w-10 bg-white"
                />
              )}
            </motion.div>
          ))}
        </nav>
      </motion.aside> */}
      { !!NavPanle && <Navbar data={setNavPanle} /> }

      {/* Huge Background Text */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 2 }}
        className="pointer-events-none absolute -top-20 inset-0 flex items-center justify-center"
      >
        <h2 className="select-none uppercase font-[logo] text-[16vw] leading-none tracking-[0.08em]">
          MODgarage
        </h2>
      </motion.div>

      {/* Car Image */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="absolute left-1/2 top-[60%] z-10 w-[70%] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.img
  
          animate={{
            // y: [0, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          src="./car.png"
          alt="Toyota Trueno"
          className="w-full scale-90 rotate-y-180  object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
        />
      </motion.div>

      {/* Left Specs */}
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="absolute bottom-40 left-44 z-20 flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full bg-white"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Top Speed
          </p>
          <p className="text-sm text-white/90">
            201 kph / 125 mph
          </p>
        </div>
      </motion.div>

      {/* Right Specs */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-44 right-36 z-20 flex items-center gap-4"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/50">
          <motion.div
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="h-2 w-2 rounded-full bg-white"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">
            Power
          </p>
          <p className="text-sm text-white/90">
            112 bhp / 84 kW
          </p>
        </div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-20 left-1/2 z-20 max-w-3xl -translate-x-1/2 text-center"
      >
        <p className="text-sm leading-7 text-white/70">
          The AE86 generation of the Toyota Corolla Levin and Toyota
          Sprinter Trueno is a lightweight coupe introduced by Toyota
          in 1983 as part of the fifth generation Corolla lineup.
        </p>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-10 z-20 flex gap-10 text-sm text-white/70"
      >
        {["Twitter", "Facebook", "Instagram"].map((social) => (
          <motion.button
            whileHover={{
              y: -4,
              color: "#ffffff",
            }}
            key={social}
          >
            {social}
          </motion.button>
        ))}
      </motion.div>

      {/* Mouse Icon */}
      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-white/60"
      >
        <Mouse size={22} strokeWidth={1.5} />
      </motion.div>

    </div>
  );
};

export default Home;