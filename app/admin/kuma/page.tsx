import KumaContentForm from "@/_components/_Admin/AdminKuma/KumaContentForm";
import { getLpById, tableSearchLps } from "@/_lib/supabase_lp";
import { montserrat, notoSansJP } from "@/fonts";
import React from "react";
import DataProviderAdminKuma from "./DataProviderAdminKuma";
import TableKumaLp from "@/_components/_Admin/AdminKuma/TableKumaLp/TableKumaLp";
import TableLpDetail from "@/_components/_Admin/AdminLp/TableLp/TableLpDetail";
import TableKumaLpAddModal from "@/_components/_Admin/AdminKuma/TableKumaLp/TableKumaLpAddModal";


// ==============================
// Props（URLパラメータ）
// ==============================
type Props = {
    params: {};
    searchParams: {
        q?: string;         // 検索ワード
        lp?: string;        // Lp ID
        tab?: string;       // 表示タブ
    };
};


// ==============================
// リビルド間隔
// ==============================
export const revalidate = 0  // 0分


export default async function AdminKuma({ params, searchParams }: Props) {

    // ==============================
    // SSR: データの取得
    // ==============================
    // --- URLパラメータの取得 ---
    const keyword = searchParams.q ? searchParams.q : null;             // URL: 検索ワード
    const lpId = searchParams.lp ? searchParams.lp : null;     // URL: Post ID

    // --- データ取得 ---
    const { data: lps, error } = await tableSearchLps(keyword, "kuma");

    // --- データ取得: 特定IDのProduct ---
    let lp = null;
    if (lpId) {
        const { data: resLp, error } = await getLpById(lpId);
        lp = resLp
    }

    console.log("lps", lps)
    console.log("lp", lp)


    return (
        <div className="">
            {/* データ処理 */}
            <DataProviderAdminKuma baseLps={lps??[]} baseLp={lp} />


            <div className="relative h-full bg-white">
                {/* テーブル */}
                <TableKumaLp />

                {/* 詳細: 右 */}
                {lpId && <TableLpDetail />}

                {/* モーダル: 記事追加 */}
                <TableKumaLpAddModal />
            </div>
        </div>
    );
}
