import { Suspense } from "react";
import Loading from "@/app/components/Loading";
import Body from "./components/Body";

export default async function ContrastReportsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Body />
    </Suspense>
  );
}
