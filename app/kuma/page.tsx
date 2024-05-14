import KumaClinicList from "@/_components/_Kuma/KumaClinicList";
import KumaRanking from "@/_components/_Kuma/KumaRanking";
import KumaSearch from "@/_components/_Kuma/KumaSearch";
import { getClinicKumas, tableSearchClinicKumas } from "@/_lib/supabase_kuma";
import { notoSansJP } from "@/fonts";
import React from "react";
import DataProviderKuma from "./DataProviderKuma";
import { getLpById } from "@/_lib/supabase_lp";
import ReactMarkdown from "react-markdown";
import { Lp } from "@/_types/types_global";
import { getSearchOptionsByCategoryName } from "@/_lib/supabase_searchOptions";
import BoxContent from "@/_components/_Global/box/BoxContent";


// ==============================
// Props（URLパラメータ）
// ==============================
type Props = {
    params: {};
    searchParams: {
        lp?: string;        // Lp ID
    };
};

// ==============================
// リビルド間隔
// ==============================
export const revalidate = 0  // 0分


export default async function Kuma({ params, searchParams }: Props) {

    // ==============================
    // SSR: データの取得
    // ==============================
    // --- URLパラメータの取得 ---
    const lpId = searchParams.lp ? searchParams.lp : null;     // URL: Post ID

    if (!lpId) return;
    const { data: lp, error: lpError } = await getLpById(lpId);
    if (lpError) return;
    if (!lp) return;

    // --- データ取得 ---
    const { data: clinics, error } = await getClinicKumas();

    // console.log(lp)
    // console.log(clinics)
    const {data: searchOption, error: searchOptionError} = await getSearchOptionsByCategoryName("kuma");

    // 現在の年
    const year = new Date().getFullYear();

    return (
        <>
            <div className={`max-w-3xl mx-auto bg-white shado-lg ${notoSansJP.className}`}>
                <DataProviderKuma baseClinics={clinics??[]} />

                {/* メインビジュアル */}
                <div className="relative mb-10 h-60 md:h-96 bg-slate-200">
                    <img src={lp?.img_main_visual} alt="" className="object-cover w-full h-full" />
                    <div className="px-3 absolute bottom-2 right-2 text-gray-700 font-bold bg-white border-2 border-gray-700">
                        PR
                    </div>
                </div>

                {/* コンテンツ: クマの種類と施術タイプ */}
                {(lp?.box_before_table && lp?.is_display_box_before_table) &&
                    <div className="mb-10 box box_1">
                        {/* <ReactMarkdown>{lp?.box_before_table}</ReactMarkdown> */}
                        <BoxContent content={lp?.box_before_table} />
                    </div>
                }

                {/* クリニック比較 */}
                <div className="mb-10">
                    <KumaRanking clinics={clinics??[]} />
                </div>

                {/* コンテンツ: クマに合わせた施術の選び方 */}
                {(lp?.box_before_list && lp?.is_display_box_before_list) &&
                    <div className="mb-10 box box_2">
                        {/* <ReactMarkdown>{lp?.box_before_list}</ReactMarkdown> */}
                        <BoxContent content={lp?.box_before_list} />
                    </div>
                }

                {/* おすすめクリニック */}
                <div className="mb-10">
                    <KumaClinicList clinics={clinics??[]} />
                </div>

                {/* コンテンツ: クマに合わせた施術の選び方 */}
                {(lp?.box_before_search && lp?.is_display_box_before_search) &&
                    <div className="mb-10 box box_3">
                        <ReactMarkdown>{lp?.box_before_search}</ReactMarkdown>
                    </div>
                }

                {/* クマ取りクリニック検索 */}
                <div className="mb-10">
                    <KumaSearch searchOption={searchOption} />
                </div>

                {/* コラム */}
                {/* <div className="px-4 md:px-20 ">コラム一覧</div> */}

                <div className="mb-4 flex items-center justify-center gap-2 text-sm">
                    <a href="/kuma/about" target="_blank" rel="noopener noreferrer" className="text-blue-800 font-bold">運営者情報</a>
                    <div>/</div>
                    <a href="/kuma/info" target="_blank" rel="noopener noreferrer" className="text-blue-800 font-bold">調査概要</a>
                </div>

                <div className="pb-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    ©︎ {year}
                </div>
            </div>
        </>
    );
}