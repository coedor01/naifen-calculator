import { Suspense } from "react";
import Loading from "../components/Loading";

export default async function BrandsPage() {
  return <Suspense fallback={<Loading />}>BrandsPage</Suspense>;
}
