"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = (url) => {

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
//  console.log(data);
  useEffect(() => {

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
       
          setData(response.data.data || []);
   
      } catch (err) {
         setLoading(false);
       console.log(err)
      }
    };

    fetchProducts();
  }, [url]);

  return { data, loading };
};
