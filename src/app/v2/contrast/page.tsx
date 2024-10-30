"use client";

import { Suspense, useEffect, useState } from "react";
import { ReportOut } from "@/app/v2/axios/localServices/types";
import Loading from "@/app/components/Loading";
import Body from "./components/Body";

export default function ContrastReportsPage() {
  const [standards, setStandards] = useState([]);
  const [reports, setReports] = useState<ReportOut[]>([]);

  useEffect(() => {
    async function fetchStandards() {
      const res = await fetch("/standards.json");
      const data = await res.json();
      setStandards(data);
    }
    async function fetchReports() {
      const res = await fetch("/v2/api/reports");
      const body = await res.json();
      if (body?.ok) {
        setReports(body.data);
      } else {
        console.log("请求报告数据失败");
      }
    }
    fetchStandards();
    fetchReports();
  }, []);
  return (
    <Suspense fallback={<Loading />}>
      <Body standards={standards} reports={reports} />
    </Suspense>
  );
}
