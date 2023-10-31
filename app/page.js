"use client"

import Header from './components/header';
import Hero from './components/hero';
import Faellesskab from './components/faellesskab';
import VoresMael from './components/voresmael';
import Centrum from './components/centrum';
import HvemErVi from './components/hvemervi';
import Footer from './components/footer';
import PanoramaSwiper from './components/panoramaswiper';

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Faellesskab />
      <VoresMael />
      <Centrum />
      <HvemErVi />
      <PanoramaSwiper />
      <Footer />
    </>
  )
}
