import { Suspense } from "react";
import Loading from "../components/Loading";

export default async function ProductsPage() {
  return <Suspense fallback={<Loading />}>ProductsPage</Suspense>;
}
