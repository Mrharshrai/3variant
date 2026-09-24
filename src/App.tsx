import './index.css';
import { ThemeProvider } from './contexts/ThemeProvider';
import ThemeSwitcher from './components/ThemeSwitcher';
import Cursor from './components/Cursor';
import ScrollChrome from './components/ScrollChrome';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import AISection from './components/AISection';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Cursor />
      <ScrollChrome />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Services />
        <TechStack />
        <Projects />
        <AISection />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ThemeSwitcher />
    </ThemeProvider>
  );
}

export default App;
