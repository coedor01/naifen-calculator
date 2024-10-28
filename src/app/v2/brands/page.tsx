import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export default async function BrandsPage() {
  return <Suspense fallback={<Loading />}>BrandsPage</Suspense>;
}
