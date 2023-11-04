"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from "framer-motion"

import { getEventCategories } from  '../../components/data';

export default function Header() {
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    let { data: eventCategory, isLoading: isEventCategoryLoading, isError: isEventCategoryError} = getEventCategories();

    if (isEventCategoryError) return <div>Error...</div>
    if (isEventCategoryLoading) return <div>Loading...</div>

    const barVariants = {
        open: {opacity: 1, x: 0, display: "flex"},
        closed: {opacity: 0, x: "-100%", display: "hidden"},
    }

    const barShadowVariants = {
        open: {x: 0, display: 'block'},
        closed: {opacity: 0, x: 0},
    }

    const barIconVariants = {
        open: {rotate: 90},
        closed: {rotate: 0},
    }

    const dropDownIconVariants = {
        open: {rotate: 180, y: "-25%"},
        closed: {rotate: 0},
    }

    const dropDownVariants = {
        open: {opacity: 1, y: 0, display: 'flex'},
        closed: {opacity: 0, y: 0, height: 0, padding: 0},
    }

    return (
        <>
            <nav className="flex items-center h-16 py-4 pl-5 mx-8 bg-white rounded-md shadow-lg max-lg:px-5">
                <Image
                priority
                src={'/images/logo-black.png'}
                width={128}
                height={37}
                alt={"Logo with black text"}
                />
                <motion.i className="w-4 h-4 ml-auto fas fa-bars lg:hidden" onClick={() => setIsBarOpen(isBarOpen => !isBarOpen)}
                    animate={isBarOpen ? "open" : "closed"}
                    variants={barIconVariants}
                />
                <div className="flex flex-row items-center w-full max-lg:hidden">
                    <ul className="flex justify-end w-full gap-4 px-6 ml-auto font-bold font-Lexend">
                        <li className="flex items-center h-16 hover:text-blush"><Link href="/">Forside</Link></li>
                        <li className="flex items-center h-16 hover:text-blush"><Link href="/about">Om os</Link></li>
                        <li className="flex items-center h-16">
                            <div>
                                <div className="relative inline-block group">
                                    <div className="flex items-center gap-1 hover:text-blush">
                                        <Link href="/events">Events</Link>
                                        <motion.i className="fas fa-chevron-down" />
                                    </div>
                                    <ul className="absolute z-10 flex-col hidden w-40 gap-3 p-3 text-sm bg-white rounded-md shadow-lg font-Lexend group-hover:flex">
                                        {eventCategory.map((category) => (
                                            <li key={category._id}>
                                                <Link className="hover:text-blush" href="#">{category.category}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            </li>
                        <li className="flex items-center h-16 hover:text-blush"><Link href="/contact">Kontakt</Link></li>
                        <li className="flex items-center h-16 hover:text-blush"><Link href="/news">Nyheder</Link></li>
                    </ul>
                    <div className="flex items-center justify-center h-16 text-xs font-bold text-white hover:text-blush hover:bg-opacity-25 w-52 rounded-r-md bg-blush">
                        <Link href="/contact">Gratis prøveperiode</Link>
                    </div>
                </div>
            </nav>

            <motion.div
                id="sidebar-shadow"
                className="fixed top-0 left-0 z-10 hidden w-full h-full bg-black opacity-50"
                animate={isBarOpen ? "open" : "closed"}
                variants={barShadowVariants}
            />
                <motion.section
                    id="mobile-sidebar"
                    className="absolute top-0 left-0 z-10 flex-col hidden w-1/2 h-full p-4 opacity-100 bg-headerSidebar"
                    animate={isBarOpen ? "open" : "closed"}
                    variants={barVariants}
                    transition={{ duration: 0.25 }}
                >
                    <motion.i className="ml-auto text-white fas fa-times" onClick={() => setIsBarOpen(isBarOpen => !isBarOpen)}
                        animate={isBarOpen ? "open" : "closed"}
                        variants={barVariants}
                    />
                    <Image
                    className="my-20"
                    src={'/images/logo-white.png'}
                    width={128}
                    height={37}
                    alt={"Logo with white text"}
                    />
                    <ul className="flex flex-col gap-2 font-bold text-white font-Archivo">
                        <li>
                            <Link href="#">Forside</Link>
                        </li>
                        <li>
                            <Link href="#">Om os</Link>
                        </li>
                            <div href="#" className="flex flex-col justify-center">
                                <div className="flex">
                                    <li>
                                        <Link href="#">Events</Link>
                                    </li>
                                    <motion.i className="ml-auto fas fa-chevron-down" onClick={() => setIsDropDownOpen(isDropDownOpen => !isDropDownOpen)}
                                        animate={isDropDownOpen ? "open" : "closed"}
                                        variants={dropDownIconVariants}
                                    />
                                </div>
                                
                                <motion.ul
                                id="mobile-dropdown"
                                className="flex-col hidden gap-2 px-2 pt-2"
                                animate={isDropDownOpen ? "open" : "closed"}
                                variants={dropDownVariants}
                                >
                                    {eventCategory && eventCategory.map((event) => (
                                        <li key={event._id}>
                                            <Link href="#">{event.category}</Link>
                                        </li>
                                    ))}
                                </motion.ul>
                            </div>
                        <li>
                            <Link href="#">Kontakt</Link>
                        </li>
                        <li>
                            <Link href="#">Nyheder</Link>
                        </li>
                    </ul>
                </motion.section>
        </>
    )
}