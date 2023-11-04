import Header from '../components/rework/header';
import FrontHero from '../components/rework/fronthero';
import Community from '../components/rework/community';
import Goals from '../components/rework/goals';
import Footer from '../components/rework/footer';
import ScrollToTop from '../components/scrolltotop';
import "./style.css";

export default function Rework() {
    return (
        <>
            <Header />
            <FrontHero />
            <Community />
            <Goals />
            <Footer />
            <ScrollToTop />
        </>
    )
}