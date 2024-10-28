"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="size-64 inline-flex flex-col justify-center gap-4 ">
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/reports")}
      >
        查看报告
      </button>
      <button
        className="btn btn-error text-white"
        onClick={() => router.push("/reports/create")}
      >
        新建报告
      </button>
    </div>
  );
}
