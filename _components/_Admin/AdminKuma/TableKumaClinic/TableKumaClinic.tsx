"use client";

import { clinicsKumaAtom, isOpenModalAddClinicKumaAtom } from "@/_atoms/atoms_clinic";
import { isLoadingAtom } from "@/_atoms/atoms_global";
import TableSearchBar from "@/_components/_Admin/Tables/TableSearchBar";
import { montserrat, notoSansJP } from "@/fonts";
import { useAtom } from "jotai";
import React, { useMemo } from "react";
import TableKumaClinicBody from "./TableKumaClinicBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function TableKumaClinic() {

    // ==============================
    // Atom管理
    // ==============================
    // --- モーダル ---
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAddClinicKumaAtom); // モーダルの表示状態
    // --- データ一覧 ---
    const [clinics] = useAtom(clinicsKumaAtom);       // トピック一覧
    const [isLoading] = useAtom(isLoadingAtom);     // ローディング

    // フィルター
    const filteredData = useMemo(() => {
        return clinics;
    }, [clinics]);


    return (
        <>
            <div className="relative h-screen grid" style={{gridTemplateRows: "min-content minmax(0, 1fr)", gridTemplateColumns: "minmax(0, 1fr)",}}>
                <div className="" style={{ gridRow: 1 }}>

                    {/* 検索バー: 上 */}
                    <div className="p-3 border-b border-gray-300 flex items-center gap-4">
                        <button className={`relative flex items-center text-xl font-bold ${montserrat.className}`}>
                            CLIINIC
                            <span className={`ml-2 px-2 py-1 text-gray-700 bg-slate-200 rounded-lg text-sm ${notoSansJP.className}`}>クマ取り</span>
                        </button>
                        <div className="flex-1">
                            {/* 検索バー: 入力&ボタン */}
                            <div>
                                {/* <TableSearchBar /> */}
                            </div>

                            {/* 検索バー: 詳細検索ボタン&バージョン選択 */}
                            {/* <div className="mt-2 flex justify-between items-center">
                                <AdvancedSearchButton initialQuery={searchInputValue} />
                                <div className="text-sm text-gray-500">
                                    <VersionSelect />
                                </div>
                            </div> */}
                        </div>
                    </div>

                    {/* 検索結果: 件数 */}
                    <div className="flex items-stretch justify-between p-2 px-4 bg-slate-100">
                        {filteredData && (
                            <div className="flex items-center text-sm text-gray-500">
                                Found {filteredData.length}{" "}
                                {filteredData.length === 1 ? "item" : "items"}
                            </div>
                        )}
                        <button onClick={()=>setIsOpenModal(true)} className="flex items-center gap-1 justify-center text-sm text-gray-400 hover:text-gray-700 transition-all active:text-gray-400">
                            <FontAwesomeIcon icon={faPlus} className="w-3 h-3" />追加
                        </button>
                    </div>
                </div>

                {/* テーブル */}
                <div style={{ gridRow: 2 }} className="px-2">
                    {isLoading || !filteredData
                        ? (
                            <div className="mt-16 flex items-center justify-center gap-2">
                                <div className="animate-spin h-6 w-6 border-2 border-blue-400 rounded-full border-t-transparent"></div>
                                Downloading...
                            </div>
                        ) : (
                            <>
                                <TableKumaClinicBody />
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}
