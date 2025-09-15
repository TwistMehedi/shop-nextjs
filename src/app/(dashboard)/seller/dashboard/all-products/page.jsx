"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Edit, Trash, FileMinus } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";

const AllProducts = () => {
  const { products, loading, error } = useProducts(
    "/api/products/seller/all-products"
  );

  // local action handlers
  const handleEdit = (id) => {
    console.log("Edit product:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete product:", id);
  };

  const handleDraft = (id) => {
    console.log("Mark draft:", id);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardContent className="p-0">
        {/* header for desktop */}
        <div className="hidden md:grid grid-cols-[96px_1fr_120px_96px_48px] gap-4 items-center p-4 border-b">
          <div className="text-sm font-medium text-slate-500">Thumbnail</div>
          <div className="text-sm font-medium text-slate-500">Name</div>
          <div className="text-sm font-medium text-slate-500">Price</div>
          <div className="text-sm font-medium text-slate-500">Stock</div>
          <div className="text-sm font-medium text-slate-500 text-right"> </div>
        </div>

        <div className="divide-y">
          <AnimatePresence>
            {products?.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="flex flex-col md:grid md:grid-cols-[96px_1fr_120px_96px_48px] gap-4 items-center p-4"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 md:w-20 md:h-20 rounded overflow-hidden bg-slate-50 border flex-shrink-0">
                  <img
                    src={p.thumbnail.secure_url || p.images?.[0]?.url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-slate-900 truncate">
                    {p.name}
                  </div>
                  {p.draft && (
                    <div className="text-xs text-amber-600 mt-1">Draft</div>
                  )}
                </div>

                {/* Price */}
                <div className="text-sm text-slate-700">
                  ৳ {Number(p.price || 0).toLocaleString()}
                </div>

                {/* Stock */}
                <div className="text-sm">
                  {Number(p.stock) > 0 ? (
                    <span className="text-green-600">{p.stock}</span>
                  ) : (
                    <span className="text-red-600">Out</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(p.id)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(p.id)}>
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDraft(p.id)}>
                        <FileMinus className="w-4 h-4 mr-2" /> Mark Draft
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {products?.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No products found
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AllProducts;
