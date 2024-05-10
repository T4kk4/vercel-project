import React from "react";
import DataProviderAdminKumaClinic from "./DataProviderAdminKumaClinic";
import { getClinicKumaById, tableSearchClinicKumas } from "@/_lib/supabase_kuma";
import TableKumaClinic from "@/_components/_Admin/AdminKuma/TableKumaClinic/TableKumaClinic";
import TableKumaClinicDetail from "@/_components/_Admin/AdminKuma/TableKumaClinic/TableKumaClinicDetail";
import TableKumaClinicAddModal from "@/_components/_Admin/AdminKuma/TableKumaClinic/TableKumaClinicAddModal";
import { getSearchOptionsByCategoryName } from "@/_lib/supabase_searchOptions";



// ==============================
// Props（URLパラメータ）
// ==============================
type Props = {
    params: {};
    searchParams: {
        q?: string;         // 検索ワード
        clinic?: string;      // Post ID
        tab?: string;       // 表示タブ
    };
};


// ==============================
// リビルド間隔
// ==============================
export const revalidate = 0  // 0分


export default async function AdminKumaClinic({ params, searchParams }: Props) {

    // ==============================
    // SSR: データの取得
    // ==============================
    // --- URLパラメータの取得 ---
    const keyword = searchParams.q ? searchParams.q : null;             // URL: 検索ワード
    const clinicId = searchParams.clinic ? searchParams.clinic : null;     // URL: Post ID

    // --- データ取得 ---
    const { data: clinics, error } = await tableSearchClinicKumas(keyword);

    // --- データ取得: 特定IDのProduct ---
    let clinic = null;
    if (clinicId) {
        const { data: resClinic, error } = await getClinicKumaById(clinicId);
        clinic = resClinic
    }

    const {data: searchOption, error: searchOptionError} = await getSearchOptionsByCategoryName("kuma");

    return (
        <>
            {/* データ処理 */}
            <DataProviderAdminKumaClinic baseClinics={clinics??[]} baseClinic={clinic} baseSearchOption={searchOption} />

            <div className="relative h-full bg-white">
                {/* テーブル */}
                <TableKumaClinic />

                {/* 詳細: 右 */}
                {clinicId && <TableKumaClinicDetail />}

                {/* モーダル: 記事追加 */}
                <TableKumaClinicAddModal />
            </div>
        </>
    );
}
