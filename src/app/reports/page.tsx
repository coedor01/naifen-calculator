import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import Body from "./components/Body";

export default async function ReportsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Body />
    </Suspense>
  );
}
