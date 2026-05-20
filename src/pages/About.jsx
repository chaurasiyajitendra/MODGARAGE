
import { Wrench, Gauge, ShieldCheck } from "lucide-react";

const  About =()=> {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#070707] px-10 py-28 text-white">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_50%)]" />

      {/* REAL SCROLL LINE */}
      {/* <div className="fixed right-20 top-0 z-50 h-screen w-[1px] bg-white/10">
        <div
          className="w-full bg-white transition-all duration-150"
          style={{
            height: `${
              ((window.scrollY + window.innerHeight) /
                document.documentElement.scrollHeight) *
              100
            }%`,
          }}
        />
      </div> */}

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* LABEL */}
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] w-14 bg-white" />

          <p className="text-sm tracking-[0.4em] text-white/60">
            ABOUT MODGARAGE
          </p>
        </div>

        {/* TITLE */}
        <h1 className="max-w-5xl text-6xl font-black uppercase leading-[0.95] tracking-[0.08em] md:text-8xl">
          BUILT FOR
          <span className="block text-white/20">
            CAR ENTHUSIASTS
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-12 max-w-3xl text-lg leading-9 text-white/65">
          ModGarage is an automotive platform focused on tuning culture,
          performance upgrades, aftermarket parts, custom builds, and
          aggressive visual styling. Built for enthusiasts who live for
          speed, precision, and engineering.
        </p>

        {/* FEATURES */}
        <div className="mt-24 grid gap-8 md:grid-cols-3">
          
          <div className="border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm">
            <Wrench size={38} strokeWidth={1.5} />

            <h3 className="mt-8 text-2xl font-semibold tracking-[0.08em]">
              CUSTOM BUILDS
            </h3>

            <p className="mt-5 leading-7 text-white/60">
              Explore unique body kits, wheels, suspension setups,
              and aggressive visual modifications.
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm">
            <Gauge size={38} strokeWidth={1.5} />

            <h3 className="mt-8 text-2xl font-semibold tracking-[0.08em]">
              PERFORMANCE
            </h3>

            <p className="mt-5 leading-7 text-white/60">
              Turbo systems, ECU tuning, horsepower upgrades,
              and track-ready engineering.
            </p>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-10 backdrop-blur-sm">
            <ShieldCheck size={38} strokeWidth={1.5} />

            <h3 className="mt-8 text-2xl font-semibold tracking-[0.08em]">
              PREMIUM PARTS
            </h3>

            <p className="mt-5 leading-7 text-white/60">
              High-quality aftermarket brands trusted by modern
              automotive communities worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About