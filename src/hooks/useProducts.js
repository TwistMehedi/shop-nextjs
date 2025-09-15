"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = (url) => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
       
          setProducts(response.data.products || []);
   
      } catch (err) {
         setLoading(false);
       console.log(err)
      }
    };

    fetchProducts();
  }, [url]);

  return { products, loading };
};
