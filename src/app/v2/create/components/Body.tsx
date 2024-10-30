"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { createReport } from "../../axios/localServices";

interface 奶粉成分对比数据项 {
  真实值: number;
  标准最小值: number;
  标准最大值: number | null;
  比较结果: number;
}

interface 奶粉基本成分对比数据结构 {
  蛋白质含量?: 奶粉成分对比数据项;
  脂肪总含量?: 奶粉成分对比数据项;
  亚油酸含量?: 奶粉成分对比数据项;
  α亚麻酸含量?: 奶粉成分对比数据项;
  亚油酸与α亚麻酸的比值?: 奶粉成分对比数据项;
  碳水化合物含量?: 奶粉成分对比数据项;
}
interface 奶粉维生素数据结构 {
  维生素A含量?: 奶粉成分对比数据项;
  维生素D含量?: 奶粉成分对比数据项;
  维生素E含量?: 奶粉成分对比数据项;
  维生素K1含量?: 奶粉成分对比数据项;
  维生素B1含量?: 奶粉成分对比数据项;
  维生素B2含量?: 奶粉成分对比数据项;
  维生素B6含量?: 奶粉成分对比数据项;
  维生素B12含量?: 奶粉成分对比数据项;
  烟酸含量?: 奶粉成分对比数据项;
  叶酸含量?: 奶粉成分对比数据项;
  泛酸含量?: 奶粉成分对比数据项;
  维生素C含量?: 奶粉成分对比数据项;
  生物素含量?: 奶粉成分对比数据项;
  胆碱含量?: 奶粉成分对比数据项;
}

interface 奶粉矿物质数据结构 {
  钠含量?: 奶粉成分对比数据项;
  钾含量?: 奶粉成分对比数据项;
  铜含量?: 奶粉成分对比数据项;
  镁含量?: 奶粉成分对比数据项;
  铁含量?: 奶粉成分对比数据项;
  锌含量?: 奶粉成分对比数据项;
  锰含量?: 奶粉成分对比数据项;
  钙含量?: 奶粉成分对比数据项;
  磷含量?: 奶粉成分对比数据项;
  钙磷比值?: 奶粉成分对比数据项;
  碘含量?: 奶粉成分对比数据项;
  氯含量?: 奶粉成分对比数据项;
  硒含量?: 奶粉成分对比数据项;
}

interface 标准成分项的数据结构 {
  最小值: number;
  最大值: number;
}

interface 标准成分的数据结构 {
  蛋白质含量: 标准成分项的数据结构;
  脂肪总含量: 标准成分项的数据结构;
  亚油酸含量: 标准成分项的数据结构;
  α亚麻酸含量: 标准成分项的数据结构;
  亚油酸与α亚麻酸的比值: 标准成分项的数据结构;
  碳水化合物含量: 标准成分项的数据结构;
  维生素A含量: 标准成分项的数据结构;
  维生素D含量: 标准成分项的数据结构;
  维生素E含量: 标准成分项的数据结构;
  维生素K1含量: 标准成分项的数据结构;
  维生素B1含量: 标准成分项的数据结构;
  维生素B2含量: 标准成分项的数据结构;
  维生素B6含量: 标准成分项的数据结构;
  维生素B12含量: 标准成分项的数据结构;
  烟酸含量: 标准成分项的数据结构;
  叶酸含量: 标准成分项的数据结构;
  泛酸含量: 标准成分项的数据结构;
  维生素C含量: 标准成分项的数据结构;
  生物素含量: 标准成分项的数据结构;
  胆碱含量: 标准成分项的数据结构;
  钠含量: 标准成分项的数据结构;
  钾含量: 标准成分项的数据结构;
  铜含量: 标准成分项的数据结构;
  镁含量: 标准成分项的数据结构;
  铁含量: 标准成分项的数据结构;
  锌含量: 标准成分项的数据结构;
  锰含量: 标准成分项的数据结构;
  钙含量: 标准成分项的数据结构;
  磷含量: 标准成分项的数据结构;
  钙磷比值: 标准成分项的数据结构;
  碘含量: 标准成分项的数据结构;
  氯含量: 标准成分项的数据结构;
  硒含量: 标准成分项的数据结构;
}

interface 标准的数据结构 {
  标准名称: string;
  千焦: {
    乳基: 标准成分的数据结构;
    豆基: 标准成分的数据结构;
  };
  千卡路里: {
    乳基: 标准成分的数据结构;
    豆基: 标准成分的数据结构;
  };
}

type 能量计量单位类型 = "千焦" | "千卡路里";
type 乳基或豆基类型 = "乳基" | "豆基";
type 报告类型 = "基本成分" | "维生素" | "矿物质";

function cmpValue(value: number, min: number, max: number) {
  if (value < min) {
    return -1;
  } else if (value <= max) {
    return 0;
  } else {
    return 1;
  }
}

interface 品牌 {
  id: number;
  name: string;
}

export default function Body({
  standards,
  brands,
}: {
  standards: 标准的数据结构[];
  brands: 品牌[];
}) {
  const [step, setStep] = useState<number>(0);

  const [能量计量单位, set能量计量单位] = useState<能量计量单位类型>("千焦");
  const [能量转换常数, set能量转换常数] = useState<number>(1);
  const [乳基或豆基, set乳基或豆基] = useState<乳基或豆基类型>("乳基");
  const [对照标准索引, set对照标准索引] = useState<number>(0);
  function handleStepOneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 能量计量单位OrNull = formData.get("能量计量单位") as 能量计量单位类型;
    const 能量转换常数OrNull = Number(formData.get("能量转换常数")) as number;
    const 乳基或豆基OrNull = formData.get("乳基或豆基") as 乳基或豆基类型;
    const 对照标准索引OrNull = Number(formData.get("对照标准索引")) as number;

    console.log(`能量计量单位=${能量计量单位OrNull}`);
    console.log(`能量转换常数=${能量转换常数OrNull}`);
    console.log(`乳基或豆基=${乳基或豆基OrNull}`);
    console.log(`对照标准索引=${对照标准索引OrNull}`);
    if (
      能量计量单位OrNull === null ||
      能量转换常数OrNull === null ||
      乳基或豆基OrNull === null ||
      对照标准索引OrNull === null
    ) {
      console.log("未正确填写信息");
      return;
    }

    set能量计量单位(能量计量单位OrNull);
    set能量转换常数(能量转换常数OrNull);
    set乳基或豆基(乳基或豆基OrNull);
    set对照标准索引(对照标准索引OrNull);

    setStep(step + 1);
  }

  const [奶粉基本成分对比数据, set奶粉基本成分对比数据] =
    useState<奶粉基本成分对比数据结构>({});
  function handleStepTwoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 蛋白质含量OrNull = Number(formData.get("蛋白质含量")) as number;
    const 脂肪总含量OrNull = Number(formData.get("脂肪总含量")) as number;
    const 亚油酸含量OrNull = Number(formData.get("亚油酸含量")) as number;
    const α亚麻酸含量OrNull = Number(formData.get("α亚麻酸含量")) as number;
    const 碳水化合物含量OrNull = Number(
      formData.get("碳水化合物含量")
    ) as number;

    console.log(`蛋白质含量OrNull=${蛋白质含量OrNull}`);
    console.log(`脂肪总含量OrNull=${脂肪总含量OrNull}`);
    console.log(`亚油酸含量OrNull=${亚油酸含量OrNull}`);
    console.log(`α亚麻酸含量OrNull=${α亚麻酸含量OrNull}`);
    console.log(`碳水化合物含量OrNull=${碳水化合物含量OrNull}`);

    if (
      蛋白质含量OrNull === null ||
      脂肪总含量OrNull === null ||
      亚油酸含量OrNull === null ||
      α亚麻酸含量OrNull === null ||
      碳水化合物含量OrNull === null
    ) {
      console.log("未正确填写信息");
      return;
    }
    const 标准 = standards[对照标准索引];

    set奶粉基本成分对比数据({
      蛋白质含量: {
        真实值: 蛋白质含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].蛋白质含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].蛋白质含量.最大值,
        比较结果: cmpValue(
          蛋白质含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].蛋白质含量.最小值,
          标准[能量计量单位][乳基或豆基].蛋白质含量.最大值
        ),
      },
      脂肪总含量: {
        真实值: 脂肪总含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].脂肪总含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].脂肪总含量.最大值,
        比较结果: cmpValue(
          脂肪总含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].脂肪总含量.最小值,
          标准[能量计量单位][乳基或豆基].脂肪总含量.最大值
        ),
      },
      亚油酸含量: {
        真实值: 亚油酸含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].亚油酸含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].亚油酸含量.最大值,
        比较结果: cmpValue(
          亚油酸含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].亚油酸含量.最小值,
          标准[能量计量单位][乳基或豆基].亚油酸含量.最大值
        ),
      },
      α亚麻酸含量: {
        真实值: α亚麻酸含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].α亚麻酸含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].α亚麻酸含量.最大值,
        比较结果: cmpValue(
          α亚麻酸含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].α亚麻酸含量.最小值,
          标准[能量计量单位][乳基或豆基].α亚麻酸含量.最大值
        ),
      },
      亚油酸与α亚麻酸的比值: {
        真实值:
          (亚油酸含量OrNull * 能量转换常数) /
          ((α亚麻酸含量OrNull * 能量转换常数) / 1000),
        标准最小值: 标准[能量计量单位][乳基或豆基].亚油酸与α亚麻酸的比值.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].亚油酸与α亚麻酸的比值.最大值,
        比较结果: cmpValue(
          (亚油酸含量OrNull * 能量转换常数) /
            ((α亚麻酸含量OrNull * 能量转换常数) / 1000),
          标准[能量计量单位][乳基或豆基].亚油酸与α亚麻酸的比值.最小值,
          标准[能量计量单位][乳基或豆基].亚油酸与α亚麻酸的比值.最大值
        ),
      },
      碳水化合物含量: {
        真实值: 碳水化合物含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].碳水化合物含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].碳水化合物含量.最大值,
        比较结果: cmpValue(
          碳水化合物含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].碳水化合物含量.最小值,
          标准[能量计量单位][乳基或豆基].碳水化合物含量.最大值
        ),
      },
    });

    setStep(step + 1);
  }

  const [奶粉维生素对比数据, set奶粉维生素对比数据] =
    useState<奶粉维生素数据结构>({});
  function handleStepThirdSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 维生素A含量OrNull = Number(formData.get("维生素A含量")) as number;
    const 维生素D含量OrNull = Number(formData.get("维生素D含量")) as number;
    const 维生素E含量OrNull = Number(formData.get("维生素E含量")) as number;
    const 维生素K1含量OrNull = Number(formData.get("维生素K1含量")) as number;
    const 维生素B1含量OrNull = Number(formData.get("维生素B1含量")) as number;
    const 维生素B2含量OrNull = Number(formData.get("维生素B2含量")) as number;
    const 维生素B6含量OrNull = Number(formData.get("维生素B6含量")) as number;
    const 维生素B12含量OrNull = Number(formData.get("维生素B12含量")) as number;
    const 烟酸含量OrNull = Number(formData.get("烟酸含量")) as number;
    const 叶酸含量OrNull = Number(formData.get("叶酸含量")) as number;
    const 泛酸含量OrNull = Number(formData.get("泛酸含量")) as number;
    const 维生素C含量OrNull = Number(formData.get("维生素C含量")) as number;
    const 生物素含量OrNull = Number(formData.get("生物素含量")) as number;
    const 胆碱含量OrNull = Number(formData.get("胆碱含量")) as number;

    console.log(`维生素A含量OrNull=${维生素A含量OrNull}`);
    console.log(`维生素D含量OrNull=${维生素D含量OrNull}`);
    console.log(`维生素E含量OrNull=${维生素E含量OrNull}`);
    console.log(`维生素K1含量OrNull=${维生素K1含量OrNull}`);
    console.log(`维生素B1含量OrNull=${维生素B1含量OrNull}`);
    console.log(`维生素B2含量OrNull=${维生素B2含量OrNull}`);
    console.log(`维生素B6含量OrNull=${维生素B6含量OrNull}`);
    console.log(`维生素B12含量OrNull=${维生素B12含量OrNull}`);
    console.log(`烟酸含量OrNull=${烟酸含量OrNull}`);
    console.log(`叶酸含量OrNull=${叶酸含量OrNull}`);
    console.log(`泛酸含量OrNull=${泛酸含量OrNull}`);
    console.log(`维生素C含量OrNull=${维生素C含量OrNull}`);
    console.log(`生物素含量OrNull=${生物素含量OrNull}`);
    console.log(`胆碱含量OrNull=${胆碱含量OrNull}`);

    if (
      维生素A含量OrNull === null ||
      维生素D含量OrNull === null ||
      维生素E含量OrNull === null ||
      维生素K1含量OrNull === null ||
      维生素B1含量OrNull === null ||
      维生素B2含量OrNull === null ||
      维生素B6含量OrNull === null ||
      维生素B12含量OrNull === null ||
      烟酸含量OrNull === null ||
      叶酸含量OrNull === null ||
      泛酸含量OrNull === null ||
      维生素C含量OrNull === null ||
      生物素含量OrNull === null ||
      胆碱含量OrNull === null
    ) {
      console.log("未正确填写信息");
      return;
    }

    const 标准 = standards[对照标准索引];
    set奶粉维生素对比数据({
      维生素A含量: {
        真实值: 维生素A含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素A含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素A含量.最大值,
        比较结果: cmpValue(
          维生素A含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素A含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素A含量.最大值
        ),
      },
      维生素D含量: {
        真实值: 维生素D含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素D含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素D含量.最大值,
        比较结果: cmpValue(
          维生素D含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素D含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素D含量.最大值
        ),
      },
      维生素E含量: {
        真实值: 维生素E含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素E含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素E含量.最大值,
        比较结果: cmpValue(
          维生素E含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素E含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素E含量.最大值
        ),
      },
      维生素K1含量: {
        真实值: 维生素K1含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素K1含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素K1含量.最大值,
        比较结果: cmpValue(
          维生素K1含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素K1含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素K1含量.最大值
        ),
      },
      维生素B1含量: {
        真实值: 维生素B1含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素B1含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素B1含量.最大值,
        比较结果: cmpValue(
          维生素B1含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素B1含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素B1含量.最大值
        ),
      },
      维生素B2含量: {
        真实值: 维生素B2含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素B2含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素B2含量.最大值,
        比较结果: cmpValue(
          维生素B2含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素B2含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素B2含量.最大值
        ),
      },
      维生素B6含量: {
        真实值: 维生素B6含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素B6含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素B6含量.最大值,
        比较结果: cmpValue(
          维生素B6含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素B6含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素B6含量.最大值
        ),
      },
      维生素B12含量: {
        真实值: 维生素B12含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素B12含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素B12含量.最大值,
        比较结果: cmpValue(
          维生素B12含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素B12含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素B12含量.最大值
        ),
      },
      烟酸含量: {
        真实值: 烟酸含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].烟酸含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].烟酸含量.最大值,
        比较结果: cmpValue(
          烟酸含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].烟酸含量.最小值,
          标准[能量计量单位][乳基或豆基].烟酸含量.最大值
        ),
      },
      叶酸含量: {
        真实值: 叶酸含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].叶酸含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].叶酸含量.最大值,
        比较结果: cmpValue(
          叶酸含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].叶酸含量.最小值,
          标准[能量计量单位][乳基或豆基].叶酸含量.最大值
        ),
      },
      泛酸含量: {
        真实值: 泛酸含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].泛酸含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].泛酸含量.最大值,
        比较结果: cmpValue(
          泛酸含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].泛酸含量.最小值,
          标准[能量计量单位][乳基或豆基].泛酸含量.最大值
        ),
      },
      维生素C含量: {
        真实值: 维生素C含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].维生素C含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].维生素C含量.最大值,
        比较结果: cmpValue(
          维生素C含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].维生素C含量.最小值,
          标准[能量计量单位][乳基或豆基].维生素C含量.最大值
        ),
      },
      生物素含量: {
        真实值: 生物素含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].生物素含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].生物素含量.最大值,
        比较结果: cmpValue(
          生物素含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].生物素含量.最小值,
          标准[能量计量单位][乳基或豆基].生物素含量.最大值
        ),
      },
      胆碱含量: {
        真实值: 胆碱含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].胆碱含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].胆碱含量.最大值,
        比较结果: cmpValue(
          胆碱含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].胆碱含量.最小值,
          标准[能量计量单位][乳基或豆基].胆碱含量.最大值
        ),
      },
    });

    setStep(step + 1);
  }

  const [奶粉矿物质对比数据, set奶粉矿物质对比数据] =
    useState<奶粉矿物质数据结构>({});
  function handleStepForthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 钠含量OrNull = Number(formData.get("钠含量")) as number;
    const 钾含量OrNull = Number(formData.get("钾含量")) as number;
    const 铜含量OrNull = Number(formData.get("铜含量")) as number;
    const 镁含量OrNull = Number(formData.get("镁含量")) as number;
    const 铁含量OrNull = Number(formData.get("铁含量")) as number;
    const 锌含量OrNull = Number(formData.get("锌含量")) as number;
    const 锰含量OrNull = Number(formData.get("锰含量")) as number;
    const 钙含量OrNull = Number(formData.get("钙含量")) as number;
    const 磷含量OrNull = Number(formData.get("磷含量")) as number;
    const 碘含量OrNull = Number(formData.get("碘含量")) as number;
    const 氯含量OrNull = Number(formData.get("氯含量")) as number;
    const 硒含量OrNull = Number(formData.get("硒含量")) as number;

    console.log(`钠含量OrNull=${钠含量OrNull}`);
    console.log(`钾含量OrNull=${钾含量OrNull}`);
    console.log(`铜含量OrNull=${铜含量OrNull}`);
    console.log(`镁含量OrNull=${镁含量OrNull}`);
    console.log(`铁含量OrNull=${铁含量OrNull}`);
    console.log(`锌含量OrNull=${锌含量OrNull}`);
    console.log(`锰含量OrNull=${锰含量OrNull}`);
    console.log(`钙含量OrNull=${钙含量OrNull}`);
    console.log(`磷含量OrNull=${磷含量OrNull}`);
    console.log(`碘含量OrNull=${碘含量OrNull}`);
    console.log(`氯含量OrNull=${氯含量OrNull}`);
    console.log(`硒含量OrNull=${硒含量OrNull}`);

    if (
      钠含量OrNull === null ||
      钾含量OrNull === null ||
      铜含量OrNull === null ||
      镁含量OrNull === null ||
      铁含量OrNull === null ||
      锌含量OrNull === null ||
      锰含量OrNull === null ||
      钙含量OrNull === null ||
      磷含量OrNull === null ||
      碘含量OrNull === null ||
      氯含量OrNull === null ||
      硒含量OrNull === null
    ) {
      console.log("未正确填写信息");
      return;
    }

    const 标准 = standards[对照标准索引];
    set奶粉矿物质对比数据({
      钠含量: {
        真实值: 钠含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].钠含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].钠含量.最大值,
        比较结果: cmpValue(
          钠含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].钠含量.最小值,
          标准[能量计量单位][乳基或豆基].钠含量.最大值
        ),
      },
      钾含量: {
        真实值: 钾含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].钾含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].钾含量.最大值,
        比较结果: cmpValue(
          钾含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].钾含量.最小值,
          标准[能量计量单位][乳基或豆基].钾含量.最大值
        ),
      },
      铜含量: {
        真实值: 铜含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].铜含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].铜含量.最大值,
        比较结果: cmpValue(
          铜含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].铜含量.最小值,
          标准[能量计量单位][乳基或豆基].铜含量.最大值
        ),
      },
      镁含量: {
        真实值: 镁含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].镁含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].镁含量.最大值,
        比较结果: cmpValue(
          镁含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].镁含量.最小值,
          标准[能量计量单位][乳基或豆基].镁含量.最大值
        ),
      },
      铁含量: {
        真实值: 铁含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].铁含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].铁含量.最大值,
        比较结果: cmpValue(
          铁含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].铁含量.最小值,
          标准[能量计量单位][乳基或豆基].铁含量.最大值
        ),
      },
      锌含量: {
        真实值: 锌含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].锌含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].锌含量.最大值,
        比较结果: cmpValue(
          锌含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].锌含量.最小值,
          标准[能量计量单位][乳基或豆基].锌含量.最大值
        ),
      },
      锰含量: {
        真实值: 锰含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].锰含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].锰含量.最大值,
        比较结果: cmpValue(
          锰含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].锰含量.最小值,
          标准[能量计量单位][乳基或豆基].锰含量.最大值
        ),
      },
      钙含量: {
        真实值: 钙含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].钙含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].钙含量.最大值,
        比较结果: cmpValue(
          钙含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].钙含量.最小值,
          标准[能量计量单位][乳基或豆基].钙含量.最大值
        ),
      },
      磷含量: {
        真实值: 磷含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].磷含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].磷含量.最大值,
        比较结果: cmpValue(
          磷含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].磷含量.最小值,
          标准[能量计量单位][乳基或豆基].磷含量.最大值
        ),
      },
      钙磷比值: {
        真实值: (钙含量OrNull * 能量转换常数) / (磷含量OrNull * 能量转换常数),
        标准最小值: 标准[能量计量单位][乳基或豆基].钙磷比值.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].钙磷比值.最大值,
        比较结果: cmpValue(
          (钙含量OrNull * 能量转换常数) / (磷含量OrNull * 能量转换常数),
          标准[能量计量单位][乳基或豆基].钙磷比值.最小值,
          标准[能量计量单位][乳基或豆基].钙磷比值.最大值
        ),
      },
      碘含量: {
        真实值: 碘含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].碘含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].碘含量.最大值,
        比较结果: cmpValue(
          碘含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].碘含量.最小值,
          标准[能量计量单位][乳基或豆基].碘含量.最大值
        ),
      },
      氯含量: {
        真实值: 氯含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].氯含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].氯含量.最大值,
        比较结果: cmpValue(
          氯含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].氯含量.最小值,
          标准[能量计量单位][乳基或豆基].氯含量.最大值
        ),
      },
      硒含量: {
        真实值: 硒含量OrNull * 能量转换常数,
        标准最小值: 标准[能量计量单位][乳基或豆基].硒含量.最小值,
        标准最大值: 标准[能量计量单位][乳基或豆基].硒含量.最大值,
        比较结果: cmpValue(
          硒含量OrNull * 能量转换常数,
          标准[能量计量单位][乳基或豆基].硒含量.最小值,
          标准[能量计量单位][乳基或豆基].硒含量.最大值
        ),
      },
    });

    setStep(step + 1);
  }

  const 报告列表: {
    名称: 报告类型;
    数据: 奶粉基本成分对比数据结构 | 奶粉维生素数据结构 | 奶粉矿物质数据结构;
  }[] = [
    { 名称: "基本成分", 数据: 奶粉基本成分对比数据 },
    { 名称: "维生素", 数据: 奶粉维生素对比数据 },
    { 名称: "矿物质", 数据: 奶粉矿物质对比数据 },
  ];
  const [当前报告名称, set当前报告名称] = useState<报告类型>("基本成分");

  const [是否新建品牌, set是否新建品牌] = useState<boolean>(
    brands.length === 0
  );
  const router = useRouter();
  async function handleStepFifthSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为

    // 获取表单数据
    const formData = new FormData(event.currentTarget);
    const 品牌IDOrNull = Number(formData.get("品牌ID")) as number;
    const 新建品牌名称OrNull = formData.get("新建品牌名称") as string;
    const 产品名称OrNull = formData.get("产品名称") as string;
    const 段位OrNull = Number(formData.get("段位")) as number;
    const 价格OrNull = Number(formData.get("价格")) as number;
    const 重量OrNull = Number(formData.get("重量")) as number;
    const 能量计量单位OrNull = formData.get("能量计量单位") as string;
    const 能量OrNull = Number(formData.get("能量")) as number;

    console.log(`品牌IDOrNull=${品牌IDOrNull}`);
    console.log(`新建品牌名称OrNull=${新建品牌名称OrNull}`);
    console.log(`产品名称OrNull=${产品名称OrNull}`);
    console.log(`段位OrNull=${段位OrNull}`);
    console.log(`价格OrNull=${价格OrNull}`);
    console.log(`能量计量单位OrNull=${能量计量单位OrNull}`);
    console.log(`能量OrNull=${能量OrNull}`);

    if (
      品牌IDOrNull === null ||
      新建品牌名称OrNull === null ||
      产品名称OrNull === null ||
      段位OrNull === null ||
      价格OrNull === null ||
      重量OrNull === null ||
      能量计量单位OrNull === null ||
      能量OrNull === null
    ) {
      console.log("未正确填写信息");
      return;
    }

    const 标准 = standards[对照标准索引];
    const details = [];
    for (const [key, value] of Object.entries(奶粉基本成分对比数据)) {
      details.push({
        type: "基本成分",
        element: key,
        content: value.真实值,
        minContent: value.标准最小值,
        maxContent: value.标准最大值,
        cmp: value.比较结果,
      });
    }
    for (const [key, value] of Object.entries(奶粉维生素对比数据)) {
      details.push({
        type: "维生素",
        element: key,
        content: value.真实值,
        minContent: value.标准最小值,
        maxContent: value.标准最大值,
        cmp: value.比较结果,
      });
    }
    for (const [key, value] of Object.entries(奶粉矿物质对比数据)) {
      details.push({
        type: "矿物质",
        element: key,
        content: value.真实值,
        minContent: value.标准最小值,
        maxContent: value.标准最大值,
        cmp: value.比较结果,
      });
    }

    try {
      await createReport({
        standard: 标准.标准名称,
        product: {
          name: 产品名称OrNull,
          level: 段位OrNull,
          energy: 能量OrNull,
          weight: 重量OrNull,
          weightUnit: 能量计量单位OrNull,
          price: 价格OrNull,
          brandId: 品牌IDOrNull,
          newBrandName: 新建品牌名称OrNull,
          needNewBrand: 是否新建品牌,
        },
        details: details,
      });
      router.push("/v2");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="fixed top-0 w-full h-12 bg-red-400 rounded-b-sm inline-flex items-center justify-center text-white font-medium">
        新建奶粉配方报告
      </div>
      <div className="fixed top-12 bottom-0 w-full bg-red-200 rounded-sm flex flex-col items-center justify-start">
        {step === 0 && (
          <form onSubmit={handleStepOneSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">1. 初始数据填写</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-none">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">能量计量单位</span>
                </div>
                <select
                  className="select select-bordered"
                  name="能量计量单位"
                  defaultValue="千焦"
                >
                  <option value="千焦">千焦（KJ）</option>
                  <option value="千卡路里">千卡路里（KCal）</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">能量转换常数</span>
                  <span className="label-text-alt text-gray-500">
                    标准化为100KJ或100KCAL
                  </span>
                </div>
                <input
                  type="text"
                  name="能量转换常数"
                  placeholder="请输入能量转换常数"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">乳基或豆基</span>
                </div>
                <select
                  className="select select-bordered"
                  defaultValue="乳基"
                  name="乳基或豆基"
                >
                  <option value="乳基">乳基</option>
                  <option value="豆基">豆基</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">对照标准</span>
                </div>
                <select className="select select-bordered" name="对照标准">
                  {standards.map((standard, index) => (
                    <option key={index} value={index}>
                      {standard.标准名称}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              下一步
            </button>
          </form>
        )}
        {step === 1 && (
          <form onSubmit={handleStepTwoSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">2. 蛋白质&脂肪&碳水</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-contain">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">蛋白质含量</span>
                  <span className="label-text-alt text-gray-500">单位：g</span>
                </div>
                <input
                  type="text"
                  name="蛋白质含量"
                  placeholder="请输入蛋白质含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">脂肪总含量</span>
                  <span className="label-text-alt text-gray-500">单位：g</span>
                </div>
                <input
                  type="text"
                  name="脂肪总含量"
                  placeholder="请输入脂肪总含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">亚油酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：g</span>
                </div>
                <input
                  type="text"
                  name="亚油酸含量"
                  placeholder="请输入亚油酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">α亚麻酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="α亚麻酸含量"
                  placeholder="请输入α-亚麻酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">
                    碳水化合物含量
                  </span>
                  <span className="label-text-alt text-gray-500">单位：g</span>
                </div>
                <input
                  type="text"
                  name="碳水化合物含量"
                  placeholder="请输入碳水化合物含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              下一步
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleStepThirdSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">3. 维生素</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-contain">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素A含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素A含量"
                  placeholder="请输入维生素A含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素D含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素D含量"
                  placeholder="请输入维生素D含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素E含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="维生素E含量"
                  placeholder="请输入维生素E含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素K1含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素K1含量"
                  placeholder="请输入维生素K1含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素B1含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素B1含量"
                  placeholder="请输入维生素B1含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素B2含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素B2含量"
                  placeholder="请输入维生素B2含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素B6含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素B6含量"
                  placeholder="请输入维生素B6含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素B12含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="维生素B12含量"
                  placeholder="请输入维生素B12含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">烟酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="烟酸含量"
                  placeholder="请输入烟酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">叶酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="叶酸含量"
                  placeholder="请输入叶酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">泛酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="泛酸含量"
                  placeholder="请输入泛酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">维生素C含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="维生素C含量"
                  placeholder="请输入维生素C含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">生物素含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="生物素含量"
                  placeholder="请输入生物素含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">胆碱含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="胆碱含量"
                  placeholder="请输入胆碱含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              下一步
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleStepForthSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">4. 矿物质</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-contain">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">钠含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="钠含量"
                  placeholder="请输入钠含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">钾含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="钾含量"
                  placeholder="请输入钾含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">铜含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="铜含量"
                  placeholder="请输入铜含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">镁含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="镁含量"
                  placeholder="请输入镁含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">铁含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="铁含量"
                  placeholder="请输入铁含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">锌含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="锌含量"
                  placeholder="请输入锌含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">锰含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="锰含量"
                  placeholder="请输入锰含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">钙含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="钙含量"
                  placeholder="请输入钙含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">磷含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="磷含量"
                  placeholder="请输入磷含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">碘含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="碘含量"
                  placeholder="请输入碘含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">氯含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  name="氯含量"
                  placeholder="请输入氯含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">硒含量</span>
                  <span className="label-text-alt text-gray-500">单位：μg</span>
                </div>
                <input
                  type="text"
                  name="硒含量"
                  placeholder="请输入硒含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              生成报告
            </button>
          </form>
        )}
        {step === 4 && (
          <>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">对比报告</span>
            </div>
            <div role="tablist" className="tabs tabs-lifted w-80">
              {报告列表.map((报告, 索引) => (
                <a
                  key={索引}
                  role="tab"
                  className={clsx(
                    "tab  [--tab-bg:white] [--tab-border-color:white]",
                    报告.名称 === 当前报告名称
                      ? "tab-active text-red-900 font-medium"
                      : "text-gray-500"
                  )}
                  onClick={() => set当前报告名称(报告.名称)}
                >
                  {报告.名称}
                </a>
              ))}
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-white overflow-y-scroll overscroll-none">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th>成分</th>
                    <th>含量</th>
                    <th>标准值</th>
                  </tr>
                </thead>
                {当前报告名称 === "基本成分" && (
                  <tbody>
                    {Object.entries(奶粉基本成分对比数据).map(
                      ([成分, 数据], index) => (
                        <tr key={index}>
                          <td>{成分}</td>
                          <td
                            className={clsx(
                              数据.比较结果 === -1 && "text-green-600",
                              数据.比较结果 === 1 && "text-red-600"
                            )}
                          >
                            {数据.真实值.toFixed(2)}
                          </td>
                          <td>
                            {数据.标准最小值}-{数据.标准最大值}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                )}
                {当前报告名称 === "维生素" && (
                  <tbody>
                    {Object.entries(奶粉维生素对比数据).map(
                      ([成分, 数据], index) => (
                        <tr key={index}>
                          <td>{成分}</td>
                          <td
                            className={clsx(
                              数据.比较结果 === -1 && "text-green-600",
                              数据.比较结果 === 1 && "text-red-600"
                            )}
                          >
                            {数据.真实值.toFixed(2)}
                          </td>
                          <td>
                            {数据.标准最小值}-{数据.标准最大值}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                )}
                {当前报告名称 === "矿物质" && (
                  <tbody>
                    {Object.entries(奶粉矿物质对比数据).map(
                      ([成分, 数据], index) => (
                        <tr key={index}>
                          <td>{成分}</td>
                          <td
                            className={clsx(
                              数据.比较结果 === -1 && "text-green-600",
                              数据.比较结果 === 1 && "text-red-600"
                            )}
                          >
                            {数据.真实值.toFixed(2)}
                          </td>
                          <td>
                            {数据.标准最小值}-{数据.标准最大值}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                )}
              </table>
            </div>
            <button
              className="btn btn-square btn-error w-80 mt-8 text-white"
              onClick={() => setStep(step + 1)}
            >
              保存报告
            </button>
          </>
        )}
        {step === 5 && (
          <form onSubmit={handleStepFifthSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">保存报告</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-contain">
              {!是否新建品牌 && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-red-900">品牌名称</span>
                    <a
                      className="label-text-alt text-gray-500"
                      onClick={() => set是否新建品牌(true)}
                    >
                      没有找到？
                    </a>
                  </div>
                  <select
                    className="select select-bordered"
                    defaultValue="1"
                    name="品牌名称"
                  >
                    <option value="1">美素力</option>
                    <option value="2">美赞臣</option>
                  </select>
                </label>
              )}
              {是否新建品牌 && (
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text text-red-900">
                      新建品牌名称
                    </span>
                    <a
                      className="label-text-alt text-gray-500"
                      onClick={() => set是否新建品牌(false)}
                    >
                      选择现有品牌
                    </a>
                  </div>
                  <input
                    type="text"
                    name="新建品牌名称"
                    placeholder="请输入新建品牌名称"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              )}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">产品名称</span>
                </div>
                <input
                  type="text"
                  name="产品名称"
                  placeholder="请输入产品名称"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">段位</span>
                </div>
                <select
                  className="select select-bordered"
                  defaultValue="1"
                  name="段位"
                >
                  <option value="1">1段（0-6月龄）</option>
                  <option value="2">2段（6-12月龄）</option>
                  <option value="3">3段（12-36月龄）</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">价格</span>
                </div>
                <input
                  type="text"
                  name="价格"
                  placeholder="请输入价格"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">重量</span>
                </div>
                <input
                  type="text"
                  name="重量"
                  placeholder="请输入重量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">能量计量单位</span>
                </div>
                <select
                  className="select select-bordered"
                  name="能量计量单位"
                  defaultValue="千焦"
                >
                  <option value="千焦">千焦（KJ）</option>
                  <option value="千卡路里">千卡路里（KCal）</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">能量</span>
                </div>
                <input
                  type="text"
                  name="能量"
                  placeholder="请输入能量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              保存
            </button>
          </form>
        )}
      </div>
    </>
  );
}
