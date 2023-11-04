"use client"

import Header from './components/rework/header';
import FrontHeroHero from './components/rework/fronthero';
import Community from './components/rework/community';
import Goals from './components/rework/goals';
import Centrum from './components/centrum';
import HvemErVi from './components/hvemervi';
import Footer from './components/rework/footer';
import PanoramaSwiper from './components/panoramaswiper';
import ScrollToTop from './components/scrolltotop';

export default function Home() {
  return (
    <>
      <Header />
      <FrontHeroHero />
      <Community />
      <Goals />
      <Centrum />
      <HvemErVi />
      <PanoramaSwiper />
      <div className="h-60"></div>
      <Footer />
      <ScrollToTop />
    </>
  )
}
