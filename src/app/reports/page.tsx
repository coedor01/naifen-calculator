import { Suspense } from "react";
import Body from "./components/Body";
import Loading from "./components/Loading";

export default async function ReportsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Body />
    </Suspense>
  );
}
