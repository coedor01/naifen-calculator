"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="size-64 inline-flex flex-col justify-center gap-4 ">
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/v2/create")}
      >
        新建报告
      </button>
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/v2/contrast")}
      >
        对比报告
      </button>
    </div>
  );
}
