"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 border-b border-gray-800 bg-black/70 backdrop-blur-lg text-white"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-white tracking-wide">
          Lux<span className="text-pink-500">Shop</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-300">
          {["Home", "Categories", "Trending", "Contact"].map((link, i) => (
            <motion.div key={i} whileHover={{ scale: 1.1, color: "#ec4899" }}>
              <Link href={`/${link.toLowerCase()}`}>{link}</Link>
            </motion.div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-6">
          <Link href="/cart">
            <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-pink-500 transition" />
          </Link>
          <Link href="/admin/dashboard">
            <User className="w-6 h-6 text-gray-300 hover:text-pink-500 transition" />
          </Link>

          {/* Hamburger Button */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden bg-black/90 text-gray-200 px-6 py-6 space-y-6 border-t border-gray-700"
          >
            {["Home", "Categories", "Trending", "Contact"].map((link, i) => (
              <motion.div key={i} whileHover={{ x: 10, color: "#ec4899" }}>
                <Link
                  href={`/${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
