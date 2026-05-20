import Home from "./Home";
import Showcase from "./Showcase";
import About from "./About";
import FeaturedBuilds from "../components/FeturesBuild";
import Categories from "./Category";
import Footer from "../components/Footer";

const Landing =() => {
  return (
    <main className="bg-[#050505] text-white overflow-x-hidden scrollbar-none ">
      
      {/* HERO */}
      <section id="home">
        <Home />
      </section>

      <FeaturedBuilds />
      <Categories />

      {/* SECOND PAGE */}
      <section id="showcase">
        <Showcase />
      </section>

      {/* ABOUT PAGE */}
      <section id="about">
        <About />
      </section>
      <Footer />
    </main>
  );
}

export default Landing