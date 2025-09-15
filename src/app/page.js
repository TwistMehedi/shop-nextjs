"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* ✅ Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            Redefine <span className="text-pink-500">Shopping</span>
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
            Experience luxury products with futuristic design.
          </p>

          <Link href="/products">
            <Button className="mt-6 px-8 py-4 text-lg rounded-2xl bg-pink-500 hover:bg-pink-600">
              Shop Now
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* ✅ Category Scroll */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Shop by <span className="text-pink-500">Category</span>
        </h2>
        <div className="flex gap-6 overflow-x-scroll no-scrollbar">
          {["Sneakers", "Watches", "Bags", "Headphones", "Jackets"].map(
            (cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 2 }}
                className="min-w-[220px] h-60 rounded-2xl bg-gray-800 flex items-center justify-center text-xl font-semibold shadow-lg cursor-pointer"
              >
                {cat}
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* ✅ Featured Products */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Trending <span className="text-pink-500">Now</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((p) => (
            <motion.div
              key={p}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg cursor-pointer"
            >
              <Image
                src={`/products/${p}.jpg`}
                alt="Product"
                width={500}
                height={500}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold">Premium Product {p}</h3>
                <p className="text-gray-400 mt-2">$199.00</p>
                <Button className="mt-4 w-full bg-pink-500 hover:bg-pink-600">
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-t from-black to-gray-900">
        <h2 className="text-3xl font-bold mb-10 text-center">
          What Our <span className="text-pink-500">Buyers Say</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((t) => (
            <motion.div
              key={t}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gray-800 rounded-2xl shadow-lg"
            >
              <p className="text-gray-300 italic">
                “Amazing quality and premium shopping experience. Totally worth
                it!”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Image
                  src={`/users/${t}.jpg`}
                  alt="User"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <span className="text-sm font-semibold">Happy Buyer {t}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ✅ Footer */}
      <footer className="py-10 text-center bg-black border-t border-gray-800">
        <p className="text-gray-500">
          © 2025 LuxShop. All rights reserved. | Crafted with ❤️ in Next.js
        </p>
      </footer>
    </div>
  );
}
