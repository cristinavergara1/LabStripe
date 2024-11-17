"use client"
import Link from 'next/link';
import React from 'react';
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
    return (
        <section className='shadow-xl bg-white sticky top-0'>
            <div className='container mx-auto py-2 text-[24px] flex justify-between items-center'>
                <div className='cursor-pointer'>
                    <Link href="/">Tienda deportiva Barbosa</Link>
                </div>
                <div className='relative cursor-pointer'>
                    <Link href="/cart">
                        <div>
                            <FiShoppingCart />
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Navbar;
