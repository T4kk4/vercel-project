"use client";

import { SearchOption } from "@/_types/types_global";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function KumaSearch({searchOption}: {searchOption: SearchOption}) {

    const router = useRouter();
    const [kumaType, setKumaType] = useState<string>("");
    const [budget, setBudget] = useState<string>("");
    const [treatments, setTreatments] = useState<string[]>([]);
    const [conditions, setConditions] = useState<string[]>([]);

    const [displaySearchOptions, setDisplaySearchOptions] = useState<{category:string, options:string[]}[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    useEffect(() => {
        if (searchOption) {
            const json = JSON.parse(searchOption.search_options);
            setDisplaySearchOptions(json);
        }
    }, [searchOption]);


    const handleTreatment = (treatment: string) => {
        if(treatments.includes(treatment)){
            setTreatments(treatments.filter(t=>t!==treatment))
        }else{
            setTreatments([...treatments, treatment])
        }
    }

    const handleCondition = (condition: string) => {
        if(conditions.includes(condition)){
            setConditions(conditions.filter(c=>c!==condition))
        }else{
            setConditions([...conditions, condition])
        }
    }

    const handleClickOption = (option: string) => {
        if(selectedOptions.includes(option)){
            setSelectedOptions(selectedOptions.filter(o=>o!==option));
        }else{
            setSelectedOptions([...selectedOptions, option]);
        }
    }

    // パラメータの生成
    const onSearch = () => {
        const params = new URLSearchParams();
        if(selectedOptions.length>0) params.append("options", selectedOptions.join(","));
        // if(kumaType!=="") params.append("kumaType", kumaType);
        // if(budget!=="") params.append("budget", budget);
        // if(treatments.length>0) params.append("treatments", treatments.join(","));
        // if(conditions.length>0) params.append("conditions", conditions.join(","));
        const url = `/kuma/result?${params.toString()}`;
        console.log(url);
        router.push(url);
    }

    return (
        <>
            <div className="mb-8 px-10 py-6 text-center text-xl text-white font-bold bg-sky-400 shadow-lg">クマ取りクリニック検索</div>
            <div className="mb-8 px-4 md:px-20 text-sm text-gray-700">
                {displaySearchOptions.map((searchOption, index) => (
                    <div key={index}>
                        <div className="mb-2 font-bold">{searchOption.category}</div>
                        <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                            {searchOption.options.map((option, optionIndex) => (
                                <button key={optionIndex} onClick={()=>handleClickOption(option)} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                                    <FontAwesomeIcon icon={selectedOptions.includes(option)?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {/* <div className="mb-2 font-bold">くまの種類</div>
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                    <button onClick={()=>setKumaType("")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={kumaType===""?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        特になし
                    </button>
                    <button onClick={()=>setKumaType("blue")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={kumaType==="blue"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        青
                    </button>
                    <button onClick={()=>setKumaType("brown")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={kumaType==="brown"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        茶
                    </button>
                    <button onClick={()=>setKumaType("black")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={kumaType==="black"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        黒
                    </button>
                </div>

                <div className="mb-2 font-bold">予算</div>
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                    <button onClick={()=>setBudget("")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={budget===""?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        特になし
                    </button>
                    <button onClick={()=>setBudget("under10000")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={budget==="under10000"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        1万円以下
                    </button>
                    <button onClick={()=>setBudget("under30000")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={budget==="under30000"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        3万円以下
                    </button>
                    <button onClick={()=>setBudget("over50000")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={budget==="over50000"?faCircleCheck:faCircle} className="w-4 h-4 text-sky-300" />
                        5万円以上
                    </button>
                </div>

                <div className="mb-2 font-bold">施術方法</div>
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                    <button onClick={()=>handleTreatment("")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={treatments.includes("")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        特になし
                    </button>
                    <button onClick={()=>handleTreatment("Chusya")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={treatments.includes("Chusya")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        注射
                    </button>
                    <button onClick={()=>handleTreatment("Sekkai")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={treatments.includes("Sekkai")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        切開
                    </button>
                </div>

                <div className="mb-2 font-bold">こだわり条件</div>
                <div className="mb-4 grid grid-cols-2 md:grid-cols-4 gap-2 font-bold">
                    <button onClick={()=>handleCondition("LessVisits")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={conditions.includes("LessVisits")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        通院回数を減らしたい
                    </button>
                    <button onClick={()=>handleCondition("NonSurgical")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={conditions.includes("NonSurgical")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        切らない施術
                    </button>
                    <button onClick={()=>handleCondition("Post7pm")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={conditions.includes("Post7pm")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        19時以降もOK
                    </button>
                    <button onClick={()=>handleCondition("FreeCounseling")} className="px-2 py-2 flex items-center justify-start gap-2 border border-sky-300 rounded-lg ">
                        <FontAwesomeIcon icon={conditions.includes("FreeCounseling")?faSquareCheck:faSquare} className="w-4 h-4 text-sky-300" />
                        無料カウンセリング
                    </button>
                </div> */}
            </div>
            <div className="flex justify-center">
                <button onClick={onSearch} className="py-4 w-2/3 text-white text-sm font-bold bg-pink-500 rounded-lg">この条件で検索する</button>
            </div>
        </>
    );
}
