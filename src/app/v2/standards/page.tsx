import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export default async function StandardsPage() {
  return <Suspense fallback={<Loading />}>StandardsPage</Suspense>;
}
