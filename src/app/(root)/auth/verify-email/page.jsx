"use client";

import { useVerifyEmailMutation } from "@/app/redux/api/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function VerifyEmail() {

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verifyEmail, { isLoading, isError, error }] = useVerifyEmailMutation();
  const router = useRouter();

 useEffect(() => {
  const saveEmail = async () => {
    if (!token) return;
    try {
      const res = await verifyEmail(token).unwrap();
      console.log("✅ Verified:", res);
      toast.success(res.message);
      router.push("/");
    } catch (err) {
      console.error("❌ Email verification failed:", err);
    }
  };

  saveEmail();
}, [token]);  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>

        {isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-500 font-medium"
          >
            Verifying...
          </motion.p>
        )}

        {isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 font-medium"
          >
            {/* {console.log(isError)} */}
            Verification failed: {error?.data?.message}
          </motion.p>
        )}

        {!isLoading && !isError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 font-medium"
          >
            Verification completed successfully!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
