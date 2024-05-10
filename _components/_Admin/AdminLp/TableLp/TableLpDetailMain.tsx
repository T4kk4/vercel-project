import { formLpBoxBeforeListAtom, formLpBoxBeforeSearchAtom, formLpBoxBeforeTableAtom, formLpImgMainVisualAtom, formLpNameAtom, formLpStatusPublishAtom } from "@/_atoms/atoms_lp";
import { useAtom } from "jotai";
import React from "react";

export default function TableLpDetailMain() {

    const [formLpName, setFormLpName] = useAtom(formLpNameAtom);      // FORM: ページ名
    const [formLpStatusPublish, setFormLpStatusPublish] = useAtom(formLpStatusPublishAtom);      // FORM: 公開ステータス

    return (
        <div>
            {/* Lp名 */}
            <div className="mb-4">
                <div className="flex gap-2 ">
                    <div className="w-full">
                        <div className="mb-1 text-sm text-gray-700 font-bold">LP名</div>
                        <input value={formLpName??""} onChange={(e)=>setFormLpName(e.target.value)} className="px-3 py-2.5 w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder=" " />
                    </div>
                    {/* <div className="shrink-0 w-40">
                        <div className="mb-1 text-sm text-gray-700 font-bold">掲載順</div>
                        <input type="number" value={formClinicKumaOrderBy??999} onChange={(e)=>setFormClinicKumaOrderBy(Number(e.target.value))} className="px-3 py-2.5 w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder=" " />
                    </div> */}
                </div>
            </div>

            {/* 公開ステータス */}
            <div className="mb-4 flex items-center justify-end">
                <div className="px-10 py-6 flex items-center gap-2 border-2 border-gray-300 bg-slate-200 rounded-lg">
                    <div className="">
                        <div className="mb-0.5 text-sm text-gray-400 font-bold">クリニック公開</div>
                        <div className="p-1 w-fit flex items-center gap-1 text-xs bg-white border border-gray-300 rounded-full">
                            <button onClick={()=>setFormLpStatusPublish(1)} className={"p-2 w-20 text-center rounded-full "+(formLpStatusPublish===1?"text-white bg-red-400 shadow font-bold":"text-gray-400 bg-white")}>公開</button>
                            <button onClick={()=>setFormLpStatusPublish(0)} className={"p-2 w-20 text-center rounded-full "+(formLpStatusPublish!==1?"text-white bg-slate-400 shadow font-bold":"text-gray-400 bg-white")}>非公開</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
