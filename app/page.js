"use client"

import Header from './components/rework/header';
import FrontHero from './components/rework/fronthero';
import Community from './components/rework/community';
import Goals from './components/rework/goals';
import Centrum from './components/centrum';
import HvemErVi from './components/hvemervi';
import Footer from './components/rework/footer';
import PanoramaSwiper from './components/panoramaswiper';
import FrontSwiper from './components/rework/frontswiper';
import ScrollToTop from './components/scrolltotop';

export default function Home() {
  return (
    <>
      <Header />
      {/* <FrontHero /> */}
      <Community />
      {/* <Goals /> */}
      <Centrum />
      {/* <HvemErVi /> */}
      <FrontSwiper />
      <Footer />
      <ScrollToTop />
    </>
  )
}
