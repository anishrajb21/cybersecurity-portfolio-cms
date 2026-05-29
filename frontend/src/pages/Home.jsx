import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Certificates from "../components/Certificates";
import Badges from "../components/Badges";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Certificates />
      <Badges />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;