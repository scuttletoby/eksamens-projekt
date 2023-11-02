"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { motion, useScroll } from "framer-motion"

export default function Header() {
    const [isBarOpen, setIsBarOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);
    const { scrollY } = useScroll()

    const barVariants = {
        open: {opacity: 1, x: 0, display: 'flex'},
        closed: {opacity: 0, x: "-50%"},
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

    const navVariants = {
        block: {display: 'sticky'},
        sticky: {display: 'flex'},
    }

    const tempEventName = "Events";
    const tempEventCategories = [
        {"_id": "1o2m4gprosmspgmosrg", "category": "Xtreme"},
        {"_id": "132m41rasdaspgmosrg", "category": "Konkurrence"},
        {"_id": "142m4gprosmspgmosrg", "category": "Motionister"},
        {"_id": "112m4gpasd213gmosrg", "category": "Juniorer"},
        {"_id": "112sgprosmsasd2osrg", "category": "Alle"},
    ];

    return (
        <>
            <motion.nav className="flex items-center h-16 px-5 py-4 mx-8 my-4 bg-white rounded-md shadow-lg">
                <Image
                priority
                animate={(scrollY > 450) ? "block" : "sticky"}
                variants={navVariants}
                src={'/images/logo-black.png'}
                width={128}
                height={37}
                alt={"Logo with black text"}
                />
                <motion.i className="w-4 h-4 ml-auto fas fa-bars" onClick={() => setIsBarOpen(isBarOpen => !isBarOpen)}
                    animate={isBarOpen ? "open" : "closed"}
                    variants={barIconVariants}
                />
            </motion.nav>

            <motion.div
                id="sidebar-shadow"
                className="fixed top-0 left-0 hidden w-full h-full bg-black opacity-50"
                animate={isBarOpen ? "open" : "closed"}
                variants={barShadowVariants}
            />
                <motion.section
                    id="mobile-sidebar"
                    className="absolute top-0 left-0 z-10 flex-col hidden w-1/2 h-full p-4 opacity-100 bg-headerSidebar"
                    animate={isBarOpen ? "open" : "closed"}
                    variants={barVariants}
                >
                    <i className="ml-auto text-white fas fa-times" onClick={() => setIsBarOpen(isBarOpen => !isBarOpen)} />
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
                                        <Link href="#">{tempEventName}</Link>
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
                                    {tempEventCategories && tempEventCategories.map((event) => (
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