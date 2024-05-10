import { formClinicKumaCoursesAtom, formClinicKumaIdAtom } from "@/_atoms/atoms_clinic";
import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";
import { insertClinicKumaCourse } from "@/_lib/supabase_kuma";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React, { useState } from "react";
import TableKumaClinicDetailCoursesItem from "./TableKumaClinicDetailCoursesItem";

export default function TableKumaClinicDetailCourses() {

    // ================================
    // Atom管理
    // ================================
    // --- アラートの状態 ---
    const [,setShowAlert] = useAtom(isShowingAlertAtom);        // ALERT: 表示状態
    const [,setAlertMessage] = useAtom(alertMessageAtom);       // ALERT: メッセージ
    const [,setAlertType] = useAtom(alertTypeAtom);             // ALERT: タイプ
    // --- 処理状況のステータス ---
    const [isProcessing, setIsProcessing] = useState<boolean>(false); // 処理ステータス: 開始/終了
    // --- 入力フォーム ---
    const [formClinicId, setFormClinicId] = useAtom(formClinicKumaIdAtom);                        // FORM: Topic ID
    const [formClinicKumaCourses, setFormClinicKumaCourses] = useAtom(formClinicKumaCoursesAtom); // FORM: 関連: コース
    const [formCourseName, setFormCourseName] = useState(""); // FORM: コース名
    const [formCoursePrice, setFormCoursePrice] = useState(""); // FORM: コース価格


    // ================================
    // 関数
    // ================================
    // --- コース追加 ---
    const handleAddCourse = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // --- バリデーション ---
        if (formCourseName==="" || formCoursePrice==="") {
            setShowAlert(true);
            setAlertType("error");
            setAlertMessage("コース名と価格を入力してください");
            return;
        }
        // --- 処理開始 ---
        setIsProcessing(true);
        try {
            const {data: resCourse, error} = await insertClinicKumaCourse({clinic_kuma_id: formClinicId, name: formCourseName, price: formCoursePrice});
            if (error) throw error;
            // --- 追加 ---
            setFormClinicKumaCourses([...formClinicKumaCourses, resCourse]);
            // --- フォーム初期化 ---
            setFormCourseName("");
            setFormCoursePrice("");
        } catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("コースの追加に失敗しました");
        } finally {
            // --- 処理終了 ---
            setShowAlert(true);
            setIsProcessing(false);
        }
    }


    return (
        <>
            {/* 新規追加 */}
            {/* <div className="mb-8 flex flex-col gap-2 ">
                <div className="text-sm text-gray-700 font-bold">コースを新規追加</div>
                <div className="flex flex-col gap-2">
                    <form onSubmit={handleAddCourse} className="flex items-stretch gap-1">
                        <input type="text" value={formCourseName} onChange={(e)=>setFormCourseName(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 bg-white" placeholder="コース名" />
                        <input type="text" value={formCoursePrice} onChange={(e)=>setFormCoursePrice(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 bg-white" placeholder="コース料金" />
                        <button type="submit" className="shrink-0 w-20 flex items-center justify-center gap-1 text-xs text-white bg-blue-400 hover:bg-blue-300 active:bg-blue-400 rounded cursor-pointer transition-all"><FontAwesomeIcon icon={faPlus} className="w-4 h-4" />追加</button>
                    </form>
                </div>
            </div> */}

            {/* 一覧/編集 */}
            <div className="mb-8 flex flex-col gap-2 ">
                <div className="text-sm text-gray-700 font-bold">コース一覧/編集</div>
                <div className="w-full ">
                    {/* ヘッダー */}
                    <div className="mb-0.5 flex items-center text-gray-400 text-sm">
                        <div className="px-1 w-12 shrink-0">ID</div>
                        <div className="px-1 shrink-1 w-full ">コース名</div>
                        <div className="px-1 shrink-1 w-full ">コース料金</div>
                        <div className="w-fit shrink-0 flex items-stretch">
                            <div className="w-8 flex items-center justify-center">保存</div>
                            <div className="w-8 flex items-center justify-center">削除</div>
                        </div>
                    </div>
                    {/* リスト */}
                    <div className="border flex flex-col divide-y rounded overflow-hidden bg-white">
                        {formClinicKumaCourses?.map((course, i) => (
                            <TableKumaClinicDetailCoursesItem key={i} course={course} />
                        ))}

                        {/* フォーム */}
                        <form onSubmit={handleAddCourse} className="flex items-stretch text-sm divide-x bg-slate-50">
                            {/* ID */}
                            <div className="w-12 shrink-0 flex items-center justify-center text-xs text-gray-400 font-bold bg-slate-100">追加</div>
                            {/* コース名 */}
                            <div className="w-full shrink-1 p-0.5">
                                <textarea value={formCourseName} onChange={(e)=>setFormCourseName(e.target.value)} className="p-2 w-full h-full bg-slate-50" placeholder="コース名" rows={2} />
                            </div>
                            {/* コース料金 */}
                            <div className="w-full shrink-1 p-0.5">
                                <textarea value={formCoursePrice} onChange={(e)=>setFormCoursePrice(e.target.value)} className="p-2 w-full h-full bg-slate-50" placeholder="コース料金" rows={2} />
                            </div>
                            <div className="w-fit shrink-0 flex items-stretch divide-x">
                                <button type="submit" className="shrink-0 w-16 flex items-center justify-center gap-1 text-xs text-white bg-blue-400 hover:bg-blue-300 active:bg-blue-400 cursor-pointer transition-all"><FontAwesomeIcon icon={faPlus} className="w-4 h-4" />追加</button>
                                {/* 保存 */}
                                {/* <div className="w-16 flex items-center justify-center">
                                    <button onClick={()=>handleSaveCourse()} className={`w-full h-full flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-blue-50 active:bg-blue-100 transition-all`}>
                                        <FontAwesomeIcon icon={faFloppyDisk} className="w-3 h-3" />
                                    </button>
                                </div> */}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}
