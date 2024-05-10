"use client";

import { updateClinicKumaCourse } from "@/_lib/supabase_kuma";
import { insertSearchOption, updateSearchOption } from "@/_lib/supabase_searchOptions";
import { SearchOption } from "@/_types/types_global";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";


export default function AdminSettingSearchOptions({baseSearchOption, categoryName}: {baseSearchOption: any, categoryName: string}) {

    const [searchOptionData, setSearchOptionData] = React.useState<SearchOption|null>(null);
    const [searchOptions, setSearchOptions] = React.useState<{category:string, options:string[]}[]>([]);

    useEffect(() => {
        if (baseSearchOption) {
            setSearchOptionData(baseSearchOption);
        }
    }, [baseSearchOption]);

    useEffect(() => {
        if (searchOptionData) {
            const json = JSON.parse(searchOptionData.search_options);
            setSearchOptions(json);
        }
    }, [searchOptionData]);

    // ============================================================
    // 保存
    // ============================================================
    const handleSave = async () => {
        console.log(searchOptions);
        const searchOptionsString = JSON.stringify(searchOptions);
        try {
            if (searchOptionData) {
                console.log("update");
                await updateSearchOption({id: searchOptionData.id, search_options: searchOptionsString})
            } else {
                console.log("insert");
                const {data, error} = await insertSearchOption({category_name: categoryName, search_options: searchOptionsString});
                if (data) {setSearchOptionData(data);}
            }
        } catch (error) {
            console.error(error);
        }
    };


    // ============================================================
    // searchOption
    // ============================================================
    // searchOptionの追加
    const handleAddSearchOption = () => {
        setSearchOptions([...searchOptions, {category:"新しい検索条件", options:["選択肢"]}]);
    };

    // searchOption.categoryの変更
    const handleCategoryChange = (index: number, text:string) => {
        const values = [...searchOptions];
        values[index].category = text;
        setSearchOptions(values);
    };

    // searchOption.categoryの削除
    const handleRemoveSearchOption = (index: number) => {
        const values = [...searchOptions];
        values.splice(index, 1);
        setSearchOptions(values);
    };

    // ============================================================
    // searchOption.options
    // ============================================================
    // searchOption.optionsの追加
    const handleAddOption = (index: number) => {
        const values = [...searchOptions];
        values[index].options.push("");
        setSearchOptions(values);
    };

    // searchOption.optionsの変更
    const handleOptionChange = (index: number, optionIndex: number, text:string) => {
        const values = [...searchOptions];
        values[index].options[optionIndex] = text;
        setSearchOptions(values);
    };

    // searchOption.optionsの削除
    const handleRemoveOption = (index: number, optionIndex: number) => {
        const values = [...searchOptions];
        values[index].options.splice(optionIndex, 1);
        setSearchOptions(values);
    };

    return (
        <div className="p-4">
            <div className="mb-4 text-xl text-gray-700 font-bold">検索条件の設定</div>
            <div className="mb-4 p-6 bg-slate-50 rounded">
                {searchOptions.map((searchOption, index) => (
                    <div key={index} className="mb-4">
                        {/* カテゴリ */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between gap-4">
                                <input value={searchOption.category??""} onChange={(e)=>handleCategoryChange(index, e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="選択カテゴリ" />
                                <button onClick={()=>handleRemoveSearchOption(index)} className="flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCircleMinus} className="w-4 h-4 text-red-400" />
                                </button>
                            </div>
                        </div>

                        {/* 選択肢 */}
                        <div className="mb-4 ml-6">
                            {searchOption.options.map((option, optionIndex) => (
                                <div key={optionIndex} className="flex items-center justify-between gap-4">
                                    <input value={option??""} onChange={(e)=>handleOptionChange(index, optionIndex, e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="選択肢" />
                                    <button onClick={()=>handleRemoveOption(index, optionIndex)} className="flex items-center justify-center">
                                        <FontAwesomeIcon icon={faCircleMinus} className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>
                            ))}
                            <button onClick={()=>handleAddOption(index)} className="mx-2 my-2 flex items-center gap-1 text-xs"><FontAwesomeIcon icon={faCirclePlus} className="w-4 h-4 text-blue-400" />選択肢の追加</button>
                        </div>

                        <hr className="border-1 border-gray-200" />
                    </div>
                ))}
                <div className="my-6">
                    <button onClick={handleAddSearchOption} className="mx-2 my-2 flex items-center gap-1 text-xs"><FontAwesomeIcon icon={faCirclePlus} className="w-4 h-4 text-blue-400" />選択カテゴリの追加</button>
                </div>
            </div>
            <div className="flex justify-end">
                <button onClick={handleSave} className="px-4 py-2 text-xs text-white bg-blue-400 rounded">保存</button>
            </div>
        </div>
    );
}
