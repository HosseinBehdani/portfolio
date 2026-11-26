import Seo from './app/components/seo/Seo';
import Navbar from './app/components/navbar/Navbar';
import Hero from './app/components/hero/Hero';
import About from './app/components/about/About';
import Status from './app/components/status/Status';
import Skills from './app/components/skills/Skills';
import Experience from './app/components/experience/Experience';
import Projects from './app/components/projects/Projects';
import Certificates from './app/components/certificates/Certificates';
import Contact from './app/components/contact/Contact';
import Footer from './app/components/footer/Footer';
import ScrollToTop from './app/components/scroll-to-top/ScrollToTop';

function App() {
    return (
        <>
            <Seo />
            <Navbar />
            <main id="main-content">
                <Hero />
                <section className="lg:py-3">
                    <div className="px-3 lg:px-6 grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
                        <About />
                        <Status />
                    </div>
                </section>
                <Skills />
                <Experience />
                <Projects />
                <section className="lg:py-3">
                    <div className="px-3 lg:px-6 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-5 items-stretch">
                        <Certificates />
                        <Contact />
                    </div>
                </section>
            </main>
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default App;