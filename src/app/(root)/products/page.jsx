"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";

const Products = () => {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [page, setPage] = useState(1);

  let query = [];

  if (search.trim() !== "") {
    query.push(`name=${encodeURIComponent(search)}`);
  }

  if (priceRange && priceRange !== "all") {
    if (priceRange === "under100") {
      query.push(`priceMax=100`);
    } else if (priceRange === "100to200") {
      query.push(`priceMin=100`);
      query.push(`priceMax=200`);
    } else if (priceRange === "200to500") {
      query.push(`priceMin=200`);
      query.push(`priceMax=500`);
    } else if (priceRange === "above1000") {
      query.push(`priceMin=1000`);
    }
  }

  if (category && category !== "all") {
    query.push(`category=${encodeURIComponent(category)}`);
  }

  query.push(`page=${page}`);
  const queryString = query.length > 0 ? `?${query.join("&")}` : "";

  const { products, totalPages, loading, error } = useProducts(
    `/api/products${queryString}`
  );

  console.log(products);

  const clearFilter = () => {
    setCategory("all");
    setSearch("");
    setPriceRange("all");
    setPage(1);
  };


  return (
    <main className="p-6">
      {/* Filter Section */}
      <section className="flex items-center gap-4 mb-6 flex-wrap">
        <Select
          onValueChange={(value) => {
            setPriceRange(value);
            setPage(1);
          }}
          value={priceRange}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Prices" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Prices</SelectItem>
            <SelectItem value="under100">Under $100</SelectItem>
            <SelectItem value="100to200">$100 to $200</SelectItem>
            <SelectItem value="200to500">$200 to $500</SelectItem>
            <SelectItem value="above1000">Above $1000</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-60"
        />

        <Button variant="outline" onClick={clearFilter}>
          Clear Filters
        </Button>
      </section>

      {/* Products Grid */}
      <section>
        {/* {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading products</p>
        ) : ( */}
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg shadow-md overflow-hidden flex flex-col"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product?.thumbnail?.secure_url}
                      alt={product?.name}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="p-4 flex flex-col flex-grow">
                    <Link href={`/product/${product._id}`} className="mb-2">
                      <h2 className="text-xl font-semibold mb-2">
                        {product.name}
                      </h2>
                    </Link>
                    <span className="text-sm text-gray-500">
                      {product.category}
                    </span>
                    <p className="text-gray-600 flex-grow">
                      {product.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-bold text-indigo-600">
                        ${product.price}
                      </span>
                       
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No products found.
              </p>
            )}
          </div>
        {/* )} */}
      </section>

      {/* Pagination */}
      <section className="mt-10 flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {[...Array(totalPages).keys()].map((num) => {
              const pageNum = num + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    isActive={pageNum === page}
                    className={
                      pageNum === page ? "bg-indigo-600 text-white" : ""
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(pageNum);
                    }}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </main>
  );
};

export default Products;
