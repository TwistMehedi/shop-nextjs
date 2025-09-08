"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex flex-wrap items-center gap-4 md:flex-row p-6">
       
      <Button>Button</Button>

       
      <Button className="bg-green-600 hover:bg-green-700 text-white">
        Green Button
      </Button>

      
      <Button className="bg-red-600 hover:bg-red-700 text-white">
        Red Button
      </Button>

       
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
          Animated Button
        </Button>
      </motion.div>
    </div>
  )
}
