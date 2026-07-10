import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import LoadingScreen from "./components/LoadingScreen";
import ParticlesBackground from "./components/ParticlesBackground";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import GithubStats from "./components/GithubStats";
import Experience from "./components/Experience";
import Certificates from "./components/Certificates";
import Resume from "./components/Resume";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import CommandTerminal from "./components/CommandTerminal";
import EasterEggs from "./components/EasterEggs";
import MusicPlayer from "./components/MusicPlayer";

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-700">
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}

        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ParticlesBackground />
            <CustomCursor />
            <Navbar />
            <MusicPlayer />
            <main className="relative z-10">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <GithubStats />
              <Experience />
              <Certificates />
              <Resume />
              <Blog />
              <Contact />
            </main>
            <div className="relative z-10">
              <Footer />
            </div>
            <Chatbot />
            <CommandTerminal />
            <EasterEggs />
          </motion.div>
        )}
      </div>
    </ThemeProvider>
  );
}
