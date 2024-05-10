"use client";

import { clinicsKumaAtom, isOpenModalAddClinicKumaAtom } from '@/_atoms/atoms_clinic';
import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from '@/_atoms/atoms_global';
import { upsertClinicKumaByName } from '@/_lib/supabase_kuma';
import { ClinicKuma } from '@/_types/types_global';
import { faCircleNotch, faTag, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAtom } from 'jotai';
import React from 'react'

export default function TableKumaClinicAddModal() {

    // ============================
    // Atom管理
    // ============================
    // --- モーダル ---
    const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAddClinicKumaAtom); // モーダルの表示状態
    // --- 入力値 ---
    const [formText, setFormText] = React.useState("");            // FORM: 入力値
    const [isProcessing, setIsProcessing] = React.useState(false); // 処理ステータス
    // --- アラートの状態 ---
    const [,setShowAlert] = useAtom(isShowingAlertAtom);        // ALERT: 表示状態
    const [,setAlertMessage] = useAtom(alertMessageAtom);       // ALERT: メッセージ
    const [,setAlertType] = useAtom(alertTypeAtom);             // ALERT: タイプ
    // --- プロダクト一覧 ---
    const [clinics, setClinics] = useAtom(clinicsKumaAtom);       // クリニック一覧

    // Clinicsの作成 ============================
    const handleCreate = async () => {
        setIsProcessing(true);
        // --- 処理: 入力値を配列に変換 ---
        const newClinics = formText.split(",").map((postKeyword) => ({name: postKeyword.trim()}))
        console.log("newClinics", newClinics)

        // --- 処理: SelectPostを作成 ---
        try {
            const createdClinics: ClinicKuma[] = []; // 作成したプロダクトを格納する配列
            // newKeywordsを一つずつ処理してproductsに追加
            for (const c of newClinics) {
                const {data: resPost} = await upsertClinicKumaByName(c.name);
                if (resPost) createdClinics.push(resPost);
            }
            setClinics(prevClinics => [...prevClinics, ...createdClinics]);
            setAlertMessage("更新しました。"); // エラーメッセージを設定
            setAlertType("success");         // アラートタイプを 'success' に設定
            setShowAlert(true);              // アラートを表示
        } catch (error) {
            console.log(error);
            setAlertMessage("更新に失敗しました。"); // エラーメッセージを設定
            setAlertType("error");                // アラートタイプを 'error' に設定
            setShowAlert(true);                   // アラートを表示
            return;
        } finally {
            setIsProcessing(false);          // 処理ステータス: 終了
            setFormText("");                 // 入力値をクリア
            setIsOpenModal(false);           // モーダルを閉じる
        }
    }


    return (
        <>
            {isOpenModal && (
                <div className="fixed z-20 inset-0 overflow-y-auto" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen md:block px-2 py-2 md:p-0 text-center">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" aria-hidden="true" onClick={()=>setIsOpenModal(false)}></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"></span>

                        {/* モーダルの本体 */}
                        <div className="p-4 md:p-10 w-full md:w-3/5 h-full inline-block align-middle bg-slate-50 rounded-lg overflow-hidden transform border border-gray-300">

                            {/* 閉じるボタン（固定表示） */}
                            <div onClick={()=>setIsOpenModal(false)} className="p-2 block md:hidden absolute top-3 right-3">
                                <FontAwesomeIcon icon={faXmark} className="w-6 h-6 text-gray-300 float-right cursor-pointer" />
                            </div>

                            {/* モーダルの中身 */}
                            <div className="mb-10 w-full overflow-auto text-left">
                                <div className="mb-4 flex items-center gap-1 text-base text-gray-700 font-bold">
                                    <FontAwesomeIcon icon={faTag} className="w-5 h-5 text-gray-400" />
                                    クリニック追加
                                </div>
                                <div className="mb-4 flex items-stretch gap-2">
                                    <div className="px-3 w-full flex items-center gap-1 text-gray-700 bg-white rounded-lg border">
                                        <input type="text" value={formText} onChange={(e) => setFormText(e.target.value)} className="p-2 w-full text-sm focus:outline-none" />
                                    </div>
                                    <div className="shrink-0 flex items-stretch gap-2 text-xs">
                                        {isProcessing
                                            ? <div className="shrink-0 w-24 flex items-center justify-center gap-1 bg-green-100 hover:bg-green-200 active:bg-green-100 transition-all border border-green-200 rounded-lg">
                                                <FontAwesomeIcon icon={faCircleNotch} className={`w-4 h-4 text-green-300 animate-spin ${isProcessing?"":"hidden"}`} />
                                            </div>
                                            : <button onClick={handleCreate} className="shrink-0 w-24 flex items-center justify-center gap-1 text-green-400 hover:text-green-500 active:text-green-400 bg-green-100 hover:bg-green-200 active:bg-green-100 transition-all border border-green-200 rounded-lg">
                                                追加
                                            </button>
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-end text-xs text-gray-400">※カンマ区切りで入力すると複数作成できます。（例: 湘南美容外科, レジーナクリニック, ...）</div>
                            </div>

                            {/* モーダルを閉じるボタン */}
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                <button onClick={()=>setIsOpenModal(false)} className="py-2 px-4 flex items-center gap-1 text-xs text-gray-400 font-bold bg-slate-200 hover:bg-slate-300 active:bg-slate-200 rounded-lg shadow transition-all">
                                    <FontAwesomeIcon icon={faXmark} className="w-3 h-3 text-gray-400" />
                                    閉じる
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
