"use client";

import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";
import { lpsAtom, lpAtom, formLpIdAtom, formLpNameAtom, formLpCategoryNameAtom, formLpImgMainVisualAtom, formLpBoxBeforeTableAtom, formLpBoxBeforeListAtom, formLpBoxBeforeSearchAtom, formLpStatusPublishAtom, formLpCreatedAtAtom, formLpUpdatedAtAtom, formIsDisplayBox1Atom, formIsDisplayBox2Atom, formIsDisplayBox3Atom } from "@/_atoms/atoms_lp";
import { updateLp } from "@/_lib/supabase_lp";
import { faArrowRightLong, faArrowUpRightFromSquare, faCircleNotch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import TableLpDetailMain from "./TableLpDetailMain";
import TableLpDetailContent from "./TableLpDetailContent";

export default function TableLpDetail() {

    // ================================
    // ページデータ管理
    // ================================
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    // const keyword = searchParams.get('q') ? searchParams.get('q') : null;   // URL: 検索ワード
    // const topicId = searchParams.get('tp') ? searchParams.get('tp') : null; // URL: トピックID
    const tab = searchParams.get('tab') ? searchParams.get('tab') : null;   // URL: タブ
    const params = new URLSearchParams(searchParams);                       // 現在のURLパラメータ

    // ================================
    // Atom管理
    // ================================
    // --- アラートの状態 ---
    const [,setShowAlert] = useAtom(isShowingAlertAtom);        // ALERT: 表示状態
    const [,setAlertMessage] = useAtom(alertMessageAtom);       // ALERT: メッセージ
    const [,setAlertType] = useAtom(alertTypeAtom);             // ALERT: タイプ

    // --- ステータス ---
    const [isProcessing, setIsProcessing] = useState<boolean>(false); // 処理状況: 保存中

    // --- 対象 ---
    const [lp] = useAtom(lpAtom);       // トピック一覧
    const [,setLps] = useAtom(lpsAtom);       // トピック一覧

    // --- 入力値 ---
    const [formLpId, setFormLpId] = useAtom(formLpIdAtom);      // FORM: ID
    const [formLpName, setFormLpName] = useAtom(formLpNameAtom);      // FORM: ページ名
    const [formLpCategoryName, setFormLpCategoryName] = useAtom(formLpCategoryNameAtom);          // FORM: カテゴリ名
    const [formLpImgMainVisual, setFormLpImgMainVisual] = useAtom(formLpImgMainVisualAtom);       // FORM: 画像: メインビジュアル
    const [formIsDisplayBox1, setFormIsDisplayBox1] = useAtom(formIsDisplayBox1Atom);             // FORM: 表示: Box1（テーブル前）
    const [formIsDisplayBox2, setFormIsDisplayBox2] = useAtom(formIsDisplayBox2Atom);             // FORM: 表示: Box2（リスト前）
    const [formIsDisplayBox3, setFormIsDisplayBox3] = useAtom(formIsDisplayBox3Atom);             // FORM: 表示: Box3（検索前）
    const [formLpBoxBeforeTable, setFormLpBoxBeforeTable] = useAtom(formLpBoxBeforeTableAtom);    // FORM: テキスト: Box1（テーブル前）
    const [formLpBoxBeforeList, setFormLpBoxBeforeList] = useAtom(formLpBoxBeforeListAtom);       // FORM: テキスト: Box2（リスト前）
    const [formLpBoxBeforeSearch, setFormLpBoxBeforeSearch] = useAtom(formLpBoxBeforeSearchAtom); // FORM: テキスト: Box3（検索前）
    const [formLpStatusPublish, setFormLpStatusPublish] = useAtom(formLpStatusPublishAtom);       // FORM: 公開ステータス
    const [formLpCreatedAt, setFormLpCreatedAt] = useAtom(formLpCreatedAtAtom);      // FORM: 作成日
    const [formLpUpdatedAt, setFormLpUpdatedAt] = useAtom(formLpUpdatedAtAtom);      // FORM: 更新日

    // ================================
    // フォームの初期値
    // ================================
    useEffect(() => {
        if (lp) {
            setFormLpId(lp.id);
            setFormLpName(lp.name);
            setFormLpCategoryName(lp.category_name);
            setFormLpImgMainVisual(lp.img_main_visual);
            setFormIsDisplayBox1(lp.is_display_box_before_table);
            setFormIsDisplayBox2(lp.is_display_box_before_list);
            setFormIsDisplayBox3(lp.is_display_box_before_search);
            setFormLpBoxBeforeTable(lp.box_before_table);
            setFormLpBoxBeforeList(lp.box_before_list);
            setFormLpBoxBeforeSearch(lp.box_before_search);
            setFormLpStatusPublish(lp.status_publish);
            setFormLpCreatedAt(lp.created_at);
            setFormLpUpdatedAt(lp.updated_at);
        }
    }, [lp]);


    // ================================
    // 関数: ボタンの処理
    // ================================
    // --- フォームを閉じるボタン ---
    const handleCloseForm = () => {
        params.delete('lp'); // URL: post_idの削除
        params.delete('tab');  // URL: タブの削除
        router.push(`${pathName}${params.toString() ? '?' + params.toString() : ''}`); // URL: 更新
    }

    // --- メニューのタブ選択 ---
    const handleSelectTab = (tab: string|null) => {
        if (!tab) {
            const params = new URLSearchParams(searchParams); // 現在のURLパラメータ
            params.delete('tab');                             // URL: タブ
            router.push(`${pathName}${params.toString() ? '?' + params.toString() : ''}`);
        } else {
            params.set('tab', tab);                          // URL: タブ
            router.push(`${pathName}${params.toString() ? '?' + params.toString() : ''}`);
        }
    }

    // --- フォーム送信処理: Topic, Category, Link ---
    const handleSubmit = async () => {
        console.log("submit");
        setIsProcessing(true);          // 処理ステータス: 開始
        // --- 確認 ---
        if (!window.confirm('本当に更新しますか？')) {
            setIsProcessing(false);
            return
        };
        if (!formLpId) return;
        // --- 処理 ---
        try {
            // --- 更新 ---
            console.log("update")
            const newLp = {
                id: formLpId,
                name: formLpName,
                category_name: formLpCategoryName,
                img_main_visual: formLpImgMainVisual,
                is_display_box_before_table: formIsDisplayBox1,
                is_display_box_before_list: formIsDisplayBox2,
                is_display_box_before_search: formIsDisplayBox3,
                box_before_table: formLpBoxBeforeTable,
                box_before_list: formLpBoxBeforeList,
                box_before_search: formLpBoxBeforeSearch,
                status_publish: formLpStatusPublish,
            }
            const { data: resLp, error } = await updateLp(newLp);
            if (error) throw error;
            // --- トピック一覧の更新 ---
            setLps(prevLps => prevLps.map(prevLp => prevLp.id === resLp?.id ? resLp : prevLp));
            setAlertMessage("更新しました。"); // エラーメッセージを設定
            setAlertType("success");         // アラートタイプを 'success' に設定
        } catch (error) {
            console.log(error);
            setAlertMessage("更新に失敗しました。"); // エラーメッセージを設定
            setAlertType("error");                // アラートタイプを 'error' に設定
        } finally {
            setShowAlert(true);              // アラートを表示
            setIsProcessing(false);          // 処理ステータス: 終了
        }
    };

    return (
        <>
            <div className="fixed z-10 right-0 top-0 h-screen max-w-full w-[1000px] flex flex-col shadow-2xl rounded-l-2xl bg-slate-100">
                {/* ================================ */}
                {/* PRODUCT: ヘッダー */}
                {/* ================================ */}
                <div className="shrink-0 p-6 flex items-center gap-4 bg-white">
                    {/* x閉じるボタン */}
                    <FontAwesomeIcon icon={faXmark} onClick={handleCloseForm} className="shrink-0 p-1 w-5 h-5 text-gray-300 hover:text-gray-700 cursor-pointer transition-all hover:bg-slate-100 active:bg-slate-200 rounded-full" />

                    <div className="w-full flex items-center justify-between">
                        {/* TOPIC: タイトル */}
                        <div className="font-bold">{lp?.name}</div>

                        {/* TOPIC: 送信ボタン */}
                        <div className="px- flex items-center justify-end gap-2">
                            <FontAwesomeIcon icon={faCircleNotch} className={`w-5 h-5 text-gray-300 animate-spin ${isProcessing?"":"hidden"}`} />
                            {isProcessing
                                ? <div className="px-5 py-2 flex items-center gap-1 text-sm text-gray-400 font-bold bg-slate-200 rounded">
                                    保存
                                    <FontAwesomeIcon icon={faArrowRightLong} className="w-6 h-5" />
                                </div>
                                :
                                <button onClick={handleSubmit} className="px-5 py-2 flex items-center gap-1 text-sm text-blue-400 hover:text-white font-bold bg-white border border-blue-400 hover:bg-blue-400 active:bg-blue-300 rounded transition-all">
                                    保存
                                    <FontAwesomeIcon icon={faArrowRightLong} className="w-6 h-5" />
                                </button>
                            }
                        </div>
                    </div>
                </div>

                {/* ================================ */}
                {/* TAG: メニュー */}
                {/* ================================ */}
                <div className="shrink-0 px-6 flex justify-between border-b text-sm text-gray-400 bg-white">
                    <div className="flex justify-between ">
                        <button onClick={()=>handleSelectTab(null)} className={`px-4 py-2 ${!tab ? "text-blue-500 border-b-2 border-blue-500":"hover:text-gray-700 transition-all"}`}>詳細</button>
                        <button onClick={()=>handleSelectTab("content")} className={`px-3 py-2 ${tab ==="content" ? "text-blue-500 border-b-2 border-blue-500":"hover:text-gray-700 transition-all"}`}>コンテンツ</button>
                    </div>
                    <div className="flex justify-between text-xs">
                        {/* <button className={`cursor-no-drop px-2 py-2 ${tab==="preview" ? "text-blue-500 border-b-2 border-blue-500":"hover:text-gray-700 transition-all"}`}>プレビュー</button> */}
                        <a href={`/kuma?lp=${lp?.id}`} target="_blank" rel="noopener noreferrer" className="px-2 py-2 flex items-center gap-1 hover:text-blue-500 transition-all">
                            <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="w-3 h-3" />
                            公開ページ
                        </a>
                    </div>
                </div>

                {/* ================================ */}
                {/* TAG: メイン */}
                {/* ================================ */}
                <div className="h-full px-6 py-6 overflow-auto">
                    {/* --- TAB: 詳細 --- */}
                    {!tab && <TableLpDetailMain />}

                    {/* --- TAB: コンテンツ --- */}
                    {tab==="content" && <TableLpDetailContent />}

                </div>
            </div>
        </>
    );
}
