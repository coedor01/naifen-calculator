import { ProductOut, ReportOut } from "@/app/v2/axios/localServices/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { 标准的数据结构 } from "@/app/v2/core/types";

function formatNaifenLabel(brandName: string, productName: string) {
  return `${brandName} · ${productName}`;
}

function formatNaifenName(productId: number) {
  return `product-${productId}`;
}

export default function Body({
  standards,
  reports,
}: {
  standards: 标准的数据结构[];
  reports: ReportOut[];
}) {
  const [step, setStep] = useState<number>(0);

  const elementsMap = new Map<string, string[]>();
  for (const standard of standards) {
    elementsMap.set(standard.标准名称, standard.成分);
  }

  const productsMap = new Map<string, ProductOut[]>();
  for (const report of reports) {
    let products = productsMap.get(report.standard);
    if (!products) {
      products = [];
    }
    products.push(report.product);
    productsMap.set(report.standard, products);
  }

  const [products, setProducts] = useState<ProductOut[]>([]);
  const [elements, setElements] = useState<string[]>([]);
  function handleChangeStandard(event: ChangeEvent<HTMLSelectElement>) {
    let products = productsMap.get(event.target.value);
    if (!products) {
      products = [];
    }
    setProducts(products);

    let elements = elementsMap.get(event.target.value);
    if (!elements) {
      elements = [];
    }
    setElements(elements);
  }

  const [selectedProducts, setSelectedProducts] = useState<ProductOut[]>([]);
  const [reportDetailsMap, setReportDetailsMap] = useState<
    Map<number, Map<string, number>>
  >(new Map());
  async function handleStepOneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    const formData = new FormData(event.currentTarget);
    const 对照标准OrNull = formData.get("对照标准") as string;

    const _selectedProducts = [];
    for (const product of products) {
      const checkBoxData = formData.get(formatNaifenName(product.id)) as string;
      if (checkBoxData === "on") {
        _selectedProducts.push(product);
      }
    }

    if (
      对照标准OrNull === null ||
      对照标准OrNull === "" ||
      _selectedProducts.length === 0
    ) {
      console.log("缺少必填参数");
      return;
    }
    setSelectedProducts(_selectedProducts);
    console.log(`selectedProducts=${JSON.stringify(_selectedProducts)}`);

    const query = {
      standard: 对照标准OrNull,
      productIds: _selectedProducts.map((item) => item.id).join(","),
      extras: "details",
    };
    try {
      const res: Response = await fetch(
        "/v2/api/reports?" + new URLSearchParams(query).toString()
      );
      const body: { ok: boolean; data: ReportOut[] } = await res.json();
      if (body?.ok && body?.data) {
        const _reportDetailsMap = new Map();
        for (const item of body.data) {
          const detailsMap = new Map();
          if (item?.details) {
            for (const detail of item.details) {
              detailsMap.set(detail.element, detail.content);
            }
          }
          _reportDetailsMap.set(item.product.id, detailsMap);
        }
        setReportDetailsMap(_reportDetailsMap);
      }
    } catch (e) {
      console.log(e);
    }

    setStep(step + 1);
  }

  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  function handleStepTwoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    const formData = new FormData(event.currentTarget);

    const _selectedElements = [];
    for (const element of elements) {
      const checkBoxData = formData.get(element) as string;
      if (checkBoxData === "on") {
        _selectedElements.push(element);
      }
    }

    if (_selectedElements.length === 0) {
      console.log("缺少必填参数");
      return;
    }
    setSelectedElements(_selectedElements);
    console.log(`chosenElements=${_selectedElements}`);

    setStep(step + 1);
  }
  console.log(`chosenElements=${selectedElements}`);

  return (
    <>
      <div className="fixed top-0 w-full h-12 bg-red-400 rounded-b-sm inline-flex items-center justify-center text-white font-medium">
        奶粉配方报告对比
      </div>
      <div className="fixed top-12 bottom-0 w-full bg-red-200 rounded-sm flex flex-col items-center justify-start">
        {step === 0 && (
          <form onSubmit={handleStepOneSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">1. 产品选择</span>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-red-900">对照标准</span>
              </div>
              <select
                className="select select-bordered"
                name="对照标准"
                onChange={handleChangeStandard}
              >
                <option disabled selected className="text-gray-500" value="">
                  请选择对照标准
                </option>
                {reports.map((report, index) => (
                  <option key={index} value={report.standard}>
                    {`${report.standard}`}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text text-red-900">奶粉品类</span>
              </div>
              <div className="w-full h-fit max-h-80 bg-white p-2 rounded-lg">
                {products.length == 0 && (
                  <p className="w-full inline-flex items-end justify-center text-sm text-gray-500">
                    暂无可选
                  </p>
                )}
                {products.map((item, index) => (
                  <div key={index} className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        {formatNaifenLabel(item.brand.name, item.name)}
                      </span>
                      <input
                        type="checkbox"
                        name={formatNaifenName(item.id)}
                        className="checkbox"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </label>

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
              <span className="text-2xl text-red-900">2. 成分选择</span>
            </div>

            <label className="form-control w-full max-w-xs">
              <div className="w-full h-fit max-h-96 bg-white p-2 rounded-lg overflow-y-auto">
                {elements.map((item, index) => (
                  <div key={index} className="form-control">
                    <label className="label cursor-pointer">
                      <span className="label-text">{item}</span>
                      <input type="checkbox" name={item} className="checkbox" />
                    </label>
                  </div>
                ))}
              </div>
            </label>

            <button
              type="submit"
              className="btn btn-square btn-error w-80 mt-8 text-white"
            >
              下一步
            </button>
          </form>
        )}
        {step === 2 && (
          <>
            <div className="w-80 pt-8 mb-4 inline-flex flex-col items-start">
              <span className="text-2xl text-red-900">对比报告</span>
              <span className="text-sm text-gray-500">
                *以下数值按100KJ计算得出
              </span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-white overflow-y-scroll overscroll-none">
              <table className="table table-zebra">
                <thead>
                  <tr>
                    <th className="w-16"></th>
                    {selectedProducts.map((item, index) => (
                      <th key={index}>
                        {formatNaifenLabel(item.brand.name, item.name)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>价格</td>
                    {selectedProducts.map((item, index) => (
                      <td key={index}>
                        {reportDetailsMap.get(item.id)?.get("价格")}
                      </td>
                    ))}
                  </tr>
                  {selectedElements.map((element, elemIndex) => (
                    <tr key={elemIndex}>
                      <td>{element}</td>
                      {selectedProducts.map((item, index) => (
                        <td key={index}>
                          {reportDetailsMap.get(item.id)?.get(element)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
