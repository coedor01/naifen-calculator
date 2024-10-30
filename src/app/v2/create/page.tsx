"use client";

import { useEffect, useState } from "react";
import Body from "./components/Body";
import Loading from "@/app/components/Loading";

export default function CreateReportPage() {
  const [standards, setStandards] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    async function fetchStandards() {
      const res = await fetch("/standards.json");
      const data = await res.json();
      setStandards(data);
    }
    async function fetchBrands() {
      const res = await fetch("/v2/api/brands");
      const body = await res.json();
      if (body?.ok) {
        setBrands(body.data);
      } else {
        console.log("请求品牌数据失败");
      }
    }
    fetchStandards();
    fetchBrands();
  }, []);

  if (!standards) return <Loading />;

  return <Body standards={standards} brands={brands} />;
}
