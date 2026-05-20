import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Autoplay,
  Navigation,
} from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const builds = [
  {
    name: "NISSAN GTR R35",
    type: "STREET MONSTER",
    power: "900HP",
    color: "from-red-500/30",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=1600&auto=format&fit=crop",
  },

  {
    name: "SUPRA MK4",
    type: "DRIFT SPEC",
    power: "720HP",
    color: "from-orange-500/30",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1600&auto=format&fit=crop",
  },

  {
    name: "PORSCHE GT3",
    type: "TRACK BUILD",
    power: "640HP",
    color: "from-blue-500/30",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
  },

  {
    name: "BMW M4",
    type: "EURO PERFORMANCE",
    power: "700HP",
    color: "from-purple-500/30",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1600&auto=format&fit=crop",
  },
];

const FeaturedBuilds = () => {
  return (
    <section className="relative overflow-hidden bg-[#050505] py-32 text-white">

      {/* TOP */}
      <div className="mb-20 text-center">

        <p className="mb-4 text-sm tracking-[0.35em] text-white/40">
          PREMIUM CUSTOM BUILDS
        </p>

        <h1 className="text-6xl font-black uppercase tracking-[0.08em] md:text-8xl">
          FEATURED
          <span className="block text-white/15">
            MACHINES
          </span>
        </h1>
      </div>

      {/* SLIDER */}
      <div className="relative">

        <Swiper
          modules={[
            EffectCoverflow,
            Autoplay,
            Navigation,
          ]}
          effect="coverflow"
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          speed={1200}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: ".next-btn",
            prevEl: ".prev-btn",
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: -80,
            depth: 250,
            modifier: 2.5,
            scale: 0.82,
            slideShadows: false,
          }}
          className="featuredSwiper"
        >

          {builds.map((car, index) => (
            <SwiperSlide
              key={index}
              className="!w-[85vw] md:!w-[1000px] cursor-grab"
            >

              <div className="relative h-[500px] overflow-hidden rounded-[35px] border border-white/10 bg-[#0b0b0b]">

                {/* IMAGE */}
                <img
                  src={car.image}
                  alt={car.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />

                {/* ACTIVE COLOR GLOW */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${car.color} to-transparent opacity-0 transition duration-700 swiper-slide-active:opacity-100`}
                />

                {/* CONTENT */}
                <div className="absolute left-10 top-1/2 z-10 max-w-xl -translate-y-1/2">

                  <p className="mb-4 text-xs tracking-[0.35em] text-white/50">
                    {car.type}
                  </p>

                  <h2 className="text-5xl font-black uppercase leading-none tracking-[0.08em] md:text-7xl">
                    {car.name}
                  </h2>

                  <div className="mt-8 flex items-center gap-6">

                    <div className="rounded-full border border-white/15 bg-white/10 px-6 py-3 backdrop-blur-xl">
                      <p className="text-xs tracking-[0.25em] text-white/50">
                        POWER
                      </p>

                      <h3 className="mt-1 text-lg font-bold">
                        {car.power}
                      </h3>
                    </div>

                    <button className="rounded-full border border-white/15 bg-white px-7 py-4 text-xs font-semibold tracking-[0.25em] text-black transition hover:scale-105">
                      VIEW BUILD
                    </button>
                  </div>
                </div>

                {/* BIG TEXT */}
                <h1 className="absolute bottom-[-30px] right-4 text-[170px] font-black uppercase leading-none text-white/5">
                  MOD
                </h1>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BUTTONS */}
        {/* <button className="prev-btn absolute left-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white hover:text-black">

          <ChevronLeft size={22} />
        </button>

        <button className="next-btn absolute right-6 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl transition hover:bg-white hover:text-black">

          <ChevronRight size={22} />
        </button> */}
      </div>
    </section>
  );
};

export default FeaturedBuilds;