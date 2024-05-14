import KumaClinicList from "@/_components/_Kuma/KumaClinicList";
import KumaResultCondition from "@/_components/_Kuma/KumaResultCondition";
import KumaSearch from "@/_components/_Kuma/KumaSearch";
import { notoSansJP } from "@/fonts";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import DataProviderKumaResult from "./DataProviderKumaResult";
import { getSearchOptionsByCategoryName } from "@/_lib/supabase_searchOptions";


const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ==============================
// Props（URLパラメータ）
// ==============================
type Props = {
    params: {};
    searchParams: {
        kumaType: string;
        budget: string;
        treatments: string;
        conditions: string;
        options: string;
    };
};

// ==============================
// リビルド間隔
// ==============================
export const revalidate = 0  // 0分


export default async function KumaResult({ params, searchParams }: Props) {

    let query = supabase
        .from("clinic_kuma")
        .select(`*, clinic_kuma_course(*)`);

    const isAndSearch = true;
    // options に基づく条件
    if (searchParams.options) {
        const options = searchParams.options.split(",").filter(option => option);
        if (options.length > 0) {
            if (isAndSearch) { // AND条件
                // query.ilike('search_options', option)を使って検索条件を追加（optionが空文字列の場合は追加しない）
                options.forEach(option => {
                    query = query.ilike('search_options', `%${option}%`);
                });
            } else {          // OR条件
                const conditions = options.map(option => `search_options.ilike.%${option}%`).join(',');
                query = query.or(conditions);
            }
        }
    }

    // // kumaType に基づく条件
    // if (searchParams.kumaType === 'blue') {
    //     query = query.is('type_blue', true);
    // } else if (searchParams.kumaType === 'brown') {
    //     query = query.is('type_brown', true);
    // } else if (searchParams.kumaType === 'black') {
    //     query = query.is('type_black', true);
    // }

    // // budget に基づく条件
    // if (searchParams.budget === 'under10000') {
    //     query = query.is('under_10000', true);
    // } else if (searchParams.budget === 'under30000') {
    //     query = query.is('under_30000', true);
    // } else if (searchParams.budget === 'over50000') {
    //     query = query.is('over_50000', true);
    // }

    // // treatments に基づく条件
    // if (searchParams.treatments && searchParams.treatments.includes('Chusya')) {
    //     query = query.is('treatment_chusya', true);
    // }
    // if (searchParams.treatments && searchParams.treatments.includes('Sekkai')) {
    //     query = query.is('treatment_sekkai', true);
    // }

    // // conditions に基づく条件
    // if (searchParams.conditions && searchParams.conditions.includes('LessVisits')) {
    //     query = query.is('tag_less_visits', true);
    // }
    // if (searchParams.conditions && searchParams.conditions.includes('NonSurgical')) {
    //     query = query.is('tag_non_surgical', true);
    // }
    // if (searchParams.conditions && searchParams.conditions.includes('Post7pm')) {
    //     query = query.is('tag_post_7pm', true);
    // }
    // if (searchParams.conditions && searchParams.conditions.includes('FreeCounseling')) {
    //     query = query.is('tag_free_counseling', true);
    // }

    // クエリの実行
    const { data: clinics, error } = await query;

    // 検索条件の取得
    const {data: searchOption, error: searchOptionError} = await getSearchOptionsByCategoryName("kuma");

    return (
        <>
            <div className={`max-w-3xl mx-auto bg-white shado-lg ${notoSansJP.className}`}>
                <DataProviderKumaResult baseClinics={clinics??[]} />

                <div className="px-4 py-4 mb-10 flex items-center gap-1 text-sm text-gray-400 bg-slate-100">
                    <a href={`/kuma`} className="text-blue-800 font-bold underline">トップ</a>
                    <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                    <div className="">検索結果</div>
                </div>

                <div className="mb-10 ">
                    <KumaResultCondition />
                </div>

                <div className="mb-10">
                    <KumaClinicList clinics={clinics??[]} />
                </div>

                {/* 再検索フォーム */}
                <div className="mb-10">
                    <KumaSearch searchOption={searchOption} />
                </div>

                {/* コラム */}
                <div className="px-4 md:px-20 ">コラム一覧</div>

                <div className="mb-4 flex items-center justify-center gap-2 text-sm">
                    <a href="/kuma/about" className="text-blue-800 font-bold">運営者情報</a>
                    <div>/</div>
                    <a href="/kuma/info" className="text-blue-800 font-bold">調査概要</a>
                </div>

                <div className="pb-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                    ©︎ 2023
                </div>
            </div>
        </>
    );
}
