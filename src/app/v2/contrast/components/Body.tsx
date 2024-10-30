import { ProductOut, ReportOut } from "@/app/v2/axios/localServices/types";
import { ChangeEvent, FormEvent, useState } from "react";
import { 标准的数据结构 } from "@/app/v2/core/types";

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

  function handleStepOneSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // 阻止表单的默认提交行为
    setStep(step + 1);
  }
  return (
    <>
      <div className="fixed top-0 w-full h-12 bg-red-400 rounded-b-sm inline-flex items-center justify-center text-white font-medium">
        奶粉配方报告对比
      </div>
      <div className="fixed top-12 bottom-0 w-full bg-red-200 rounded-sm flex flex-col items-center justify-start">
        {step === 0 && (
          <form onSubmit={handleStepOneSubmit}>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">1. 对照数据选择</span>
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
              <div className="dropdown">
                <div tabIndex={0} role="button" className="btn w-full">
                  Click
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow  w-full"
                >
                  <li>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Remember me</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox"
                        />
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-control">
                      <label className="label cursor-pointer">
                        <span className="label-text">Remember me</span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox"
                        />
                      </label>
                    </div>
                  </li>
                </ul>
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
      </div>
    </>
  );
}
