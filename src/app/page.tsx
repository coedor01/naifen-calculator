"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="size-64 inline-flex flex-col justify-center gap-4 ">
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/standards")}
      >
        标准
      </button>
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/brands")}
      >
        品牌
      </button>
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/products")}
      >
        产品
      </button>
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/reports")}
      >
        报告
      </button>
    </div>
  );
}
