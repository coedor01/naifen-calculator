import { ReportIn } from "@/app/v2/axios/localServices/types";
import prisma from "@/app/v2/client";
import { NextResponse } from "next/server";

export async function GET() {
  const reports = await prisma.report.findMany({
    select: {
      id: true,
      standard: true,
      product: {
        select: {
          id: true,
          brand: true,
          name: true,
          level: true,
          energy: true,
          weight: true,
          weightUnit: true,
          price: true,
        },
      },
    },
  });
  return NextResponse.json({ ok: true, data: reports }, { status: 200 });
}

export async function POST(request: Request) {
  const data: ReportIn = await request.json();

  let brandId = 0;
  if (data.product.needNewBrand) {
    if (!data.product.newBrandName) {
      return NextResponse.json(
        { ok: false, error: "缺少新建品牌名称" },
        { status: 200 }
      );
    }
    const brand = await prisma.brand.create({
      data: { name: data.product.newBrandName },
      select: { id: true },
    });
    brandId = brand.id;
  } else {
    if (!data.product.brandId) {
      return NextResponse.json(
        { ok: false, error: "缺少品牌ID" },
        { status: 200 }
      );
    }
    brandId = data.product.brandId;
  }

  const product = await prisma.product.create({
    data: {
      name: data.product.name,
      level: data.product.level,
      brandId,
      energy: data.product.energy,
      weight: data.product.weight,
      weightUnit: data.product.weightUnit,
      price: data.product.price,
    },
  });

  const report = await prisma.report.create({
    data: {
      standard: data.standard,
      productId: product.id,
    },
  });

  const detailsIn = [];
  for (const detail of data.details) {
    detailsIn.push({ reportId: report.id, ...detail });
  }

  const details = await prisma.reportDetail.createManyAndReturn({
    data: detailsIn,
  });
  return NextResponse.json(
    {
      ok: true,
      data: { id: report.id, standard: report.standard, product, details },
    },
    { status: 200 }
  );
}
