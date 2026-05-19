import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import GithubActivity from "@/components/GithubActivity";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <div className="relative z-10">
        <About />
        <Projects />
        <TechStack />
        <GithubActivity />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
