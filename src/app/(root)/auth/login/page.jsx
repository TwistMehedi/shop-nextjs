"use client";
import { useForm } from "react-hook-form";
import { loginUserData } from "@/app/zodValidation/userValidation";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useLoginUserMutation } from "@/app/redux/api/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "@/app/redux/slice/userSlice";

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginUserData),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginHandler = async (values) => {
    dispatch(loginStart());
    try {
      const res = await loginUser(values).unwrap();
      dispatch(loginSuccess(res.user));

      if (res.success) {
        setTimeout(() => {
          toast.success(res.message);
          router.push("/");
        }, 200);
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error(
        error?.data?.message || error?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      { (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-center mb-6">
            Login to your Account
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(loginHandler)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="******" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </Form>
        </motion.div>
      )}
    </>
  );
}
