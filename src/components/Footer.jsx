const Footer =() => {
  return (
    <footer className="border-t border-white/10 bg-black px-10 py-24 text-white">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-[12vw] font-black leading-none text-white/10">
          MODGARAGE
        </h1>

        <div className="mt-16 flex flex-col justify-between gap-10 md:flex-row">

          <div>
            <p className="max-w-md leading-8 text-white/60">
              Premium automotive modification platform for
              enthusiasts, tuners, racers, and creators.
            </p>
          </div>

          <div className="space-y-4 text-sm tracking-[0.25em] text-white/60">
            <p>INSTAGRAM</p>
            <p>TWITTER</p>
            <p>YOUTUBE</p>
            <p>DISCORD</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer