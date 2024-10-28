import { Suspense } from "react";
import Loading from "@/app/components/Loading";

export default async function ProductsPage() {
  return <Suspense fallback={<Loading />}>ProductsPage</Suspense>;
}
