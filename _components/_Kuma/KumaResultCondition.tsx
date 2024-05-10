"use client";

import { clinicsKumaAtom } from "@/_atoms/atoms_clinic";
import { faSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React from "react";

export default function KumaResultCondition() {

    const [clinics,] = useAtom(clinicsKumaAtom);

    return (
        <div className="px-4 md:px-20 border-b border-gray-700">
            <div className="relative mb-6 p-4 md:p-10 border-2 border-cyan-500 rounded-lg">
                <div className="absolute top-0 right-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white px-2 flex items-center justify-center gap-1 text-sm text-gray-700 font-bold">
                    <FontAwesomeIcon icon={faSlash} className="w-4 h-4" />
                    あなたの選んだ条件
                    <FontAwesomeIcon icon={faSlash} className="w-4 h-4 -scale-x-100" />
                </div>
                <div className="text-sm md:text-base text-cyan-700">
                    <div className="flex items-center border-b border-dashed border-gray-300">
                        <div className="shrink-0 w-24 md:w-40 flex items-center justify-center font-bold">くまの種類</div>
                        <div>：</div>
                        <div className="p-3 text-gray-700 font-bold">くまの種類</div>
                    </div>
                    <div className="flex items-center border-b border-dashed border-gray-300">
                        <div className="shrink-0 w-24 md:w-40 flex items-center justify-center font-bold">予算</div>
                        <div>：</div>
                        <div className="p-3 text-gray-700 font-bold">予算</div>
                    </div>
                    <div className="flex items-center border-b border-dashed border-gray-300">
                        <div className="shrink-0 w-24 md:w-40 flex items-center justify-center font-bold">施術方法</div>
                        <div>：</div>
                        <div className="p-3 text-gray-700 font-bold">施術方法</div>
                    </div>
                    <div className="flex items-center border-b border-dashed border-gray-300">
                        <div className="shrink-0 w-24 md:w-40 flex items-center justify-center font-bold">こだわり条件</div>
                        <div>：</div>
                        <div className="p-3 text-gray-700 font-bold">こだわり条件</div>
                    </div>
                </div>
            </div>

            <div className="mb-6 flex items-center justify-center font-bold">
                <span className="text-red-400">{clinics.length}件</span>見つかりました！
            </div>
        </div>
    );
}
