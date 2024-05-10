import AdminSettingSearchOptions from "@/_components/_Admin/AdminSettings/AdminSettingSearchOptions";
import { getSearchOptionsByCategoryName } from "@/_lib/supabase_searchOptions";
import { montserrat, notoSansJP } from "@/fonts";
import React from "react";


// ===================================
// リビルド間隔
// ===================================
export const revalidate = 0  // 1分（60秒）


export default async function AdminKumaSetting() {

    const {data: searchOption, error} = await getSearchOptionsByCategoryName("kuma");

    return (
        <div className="relative h-full bg-white">
            <div className="relative h-screen">
                <div className="">

                    {/* 検索バー: 上 */}
                    <div className="p-3 border-b border-gray-300 flex items-center gap-4">
                        <button className={`relative flex items-center text-xl font-bold ${montserrat.className}`}>
                            SETTING
                            <span className={`ml-2 px-2 py-1 text-gray-700 bg-slate-200 rounded-lg text-sm ${notoSansJP.className}`}>クマ取り</span>
                        </button>
                    </div>
                </div>

                <div className="px-2">
                    <AdminSettingSearchOptions baseSearchOption={searchOption} categoryName={"kuma"} />
                </div>

            </div>
        </div>
    );
};
