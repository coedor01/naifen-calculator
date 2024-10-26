"use client";

import { useState } from "react";

export default function Home() {
  let [step, setStep] = useState<number>(0);

  return (
    <>
      <div className="fixed top-0 w-full h-12 bg-red-400 rounded-b-sm inline-flex items-center justify-center text-white font-medium">
        奶粉配方报告生成
      </div>
      <div className="fixed top-12 bottom-0 w-full bg-red-200 rounded-sm flex flex-col items-center justify-start">
        {step === 0 && (
          <>
            <div className="w-80 pt-8 mb-4">
              <span className="text-2xl text-red-900">1. 初始数据填写</span>
            </div>
            <div className="w-80 h-96 p-3 rounded-sm bg-red-50 overflow-y-scroll overscroll-none">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">能量计量单位</span>
                </div>
                <select className="select select-bordered" defaultValue="千焦">
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
                  placeholder="请输入能量转换常数"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">乳基或豆基</span>
                </div>
                <select className="select select-bordered" defaultValue="乳基">
                  <option value="乳基">乳基</option>
                  <option value="豆基">豆基</option>
                </select>
              </label>
            </div>
            <button
              className="btn btn-square btn-error w-80 mt-8 text-white"
              onClick={() => setStep(step + 1)}
            >
              下一步
            </button>
          </>
        )}
        {step === 1 && (
          <>
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
                  placeholder="请输入脂肪总含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">叶油酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：g</span>
                </div>
                <input
                  type="text"
                  placeholder="请输入叶油酸含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text text-red-900">α-叶麻酸含量</span>
                  <span className="label-text-alt text-gray-500">单位：mg</span>
                </div>
                <input
                  type="text"
                  placeholder="请输入α-叶麻酸含量"
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
                  placeholder="请输入碳水化合物含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              className="btn btn-square btn-error w-80 mt-8 text-white"
              onClick={() => setStep(step + 1)}
            >
              下一步
            </button>
          </>
        )}
        {step === 2 && (
          <>
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
                  placeholder="请输入胆碱含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              className="btn btn-square btn-error w-80 mt-8 text-white"
              onClick={() => setStep(step + 1)}
            >
              下一步
            </button>
          </>
        )}
        {step === 3 && (
          <>
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
                  placeholder="请输入硒含量"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <button
              className="btn btn-square btn-error w-80 mt-8 text-white"
              onClick={() => setStep(step + 1)}
            >
              生成报告
            </button>
          </>
        )}
      </div>
    </>
  );
}
