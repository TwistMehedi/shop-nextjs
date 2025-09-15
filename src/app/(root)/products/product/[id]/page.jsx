"use client";

import { useProducts } from "@/hooks/useProducts";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";

const Product = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProducts(
    `/api/products/product/${id}`
  );

  console.log(product);

  if (isLoading) {
    return <p className="text-center py-10">Loading product...</p>;
  }

  if (!product) {
    return <p className="text-center py-10">Product not found</p>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Left side - Images */}
        <div>
          <Card className="overflow-hidden shadow-lg">
            <div className="relative w-full h-96 bg-gray-100">
              <img
                src={product.thumbnail?.secure_url}
                alt={product.name}
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            </div>
            <CardContent className="flex gap-2 mt-4 overflow-x-auto">
              {product.images?.map((img, i) => (
                <div
                  key={i}
                  className="w-20 h-20 border rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={img.secure_url}
                    alt={`${product.name}-${i}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right side - Details */}
        <div>
          <motion.h1
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {product.name}
          </motion.h1>

          <div className="flex items-center gap-2 mb-4">
            <Badge>{product.category}</Badge>
            <Badge variant="outline">{product.brand}</Badge>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <span>
              {product.averageRating} / 5 ({product.totalReviews} reviews)
            </span>
          </div>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-indigo-600">
              ${product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="line-through text-gray-500">
                ${product.price}
              </span>
            )}
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="bg-indigo-600 text-white">
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Buy Now
            </Button>
          </div>

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Variants</h3>
            <div className="flex gap-3">
              {product.variants?.map((v) => (
                <Badge key={v._id} variant="secondary">
                  {v.color} / {v.size}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default Product;
