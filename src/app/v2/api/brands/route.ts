import prisma from "@/app/v2/client";
import { NextResponse } from "next/server";

export async function GET() {
  const brands = await prisma.brand.findMany();
  return NextResponse.json({ ok: true, data: brands }, { status: 200 });
}
