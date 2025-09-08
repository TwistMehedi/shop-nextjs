"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const SendMessage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify Your Email
        </h1>
        <p className="text-gray-600 mb-6">
          We’ve sent a verification link to your email address.  
          Please check your inbox and click the link to activate your account.
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition"
        >
          Go Back Home
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Didn’t receive the email?{" "}
          <a
            href="#"
            className="text-indigo-600 hover:underline font-medium"
          >
            Resend
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default SendMessage;
