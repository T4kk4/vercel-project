import { formClinicKumaCoursesAtom, formClinicKumaIdAtom } from "@/_atoms/atoms_clinic";
import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";
import { deleteClinicKumaCourse, updateClinicKumaCourse } from "@/_lib/supabase_kuma";
import { ClinicKumaCourse } from "@/_types/types_global";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React, { useState } from "react";

export default function TableKumaClinicDetailCoursesItem({course}: {course: ClinicKumaCourse}) {

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
    const [formCourseName, setFormCourseName] = useState(course.name);    // FORM: コース名
    const [formCoursePrice, setFormCoursePrice] = useState(course.price); // FORM: コース価格

    // ================================
    // 関数
    // ================================
    // --- コース保存 ---
    const handleSaveCourse = async () => {
        // --- バリデーション ---
        if (formCourseName==="" || formCoursePrice==="") {
            setShowAlert(true);
            setAlertType("error");
            setAlertMessage("コース名と価格を入力してください");
            return;
        }
        // --- 確認 ---
        if (!window.confirm('本当にコースを更新しますか？')) return;
        // --- 処理開始 ---
        setIsProcessing(true);
        try {
            // --- 更新 ---
            const {data: resCourse, error} = await updateClinicKumaCourse({id: course.id, clinic_kuma_id: formClinicId, name: formCourseName, price: formCoursePrice});
            if (error) throw error;
            // --- 更新 ---
            const updatedCourses = formClinicKumaCourses.map((c)=>c.id===resCourse.id ? resCourse : c);
            setFormClinicKumaCourses(updatedCourses);
            setAlertType("success");
            setAlertMessage("コースを更新しました");
        } catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("コースの更新に失敗しました");
        } finally {
            // --- 処理終了 ---
            setShowAlert(true);
            setIsProcessing(false);
        }
    }

    // --- コース削除 ---
    const handleDeleteCourse = async (id: number) => {
        // --- 処理開始 ---
        setIsProcessing(true);
        // --- 確認 ---
        if (!window.confirm('本当にコースを削除しますか？')) return;
        try {
            // --- 削除 ---
            const {error} = await deleteClinicKumaCourse(id);
            if (error) throw error;
            // --- 削除 ---
            const updatedCourses = formClinicKumaCourses.filter((c)=>c.id!==id);
            setFormClinicKumaCourses(updatedCourses);
            setAlertType("success");
            setAlertMessage("コースを削除しました");
        } catch (error) {
            console.error(error);
            setAlertType("error");
            setAlertMessage("コースの削除に失敗しました");
        } finally {
            // --- 処理終了 ---
            setShowAlert(true);
            setIsProcessing(false);
        }
    }


    return (
        <div className="flex items-stretch text-sm divide-x">
            {/* ID */}
            <div className="w-12 shrink-0 flex items-center justify-center text-xs text-gray-400 font-bold bg-slate-100">{course.id}</div>
            {/* コース名 */}
            <div className="w-full shrink-1 p-0.5">
                <textarea value={formCourseName} onChange={(e)=>setFormCourseName(e.target.value)} className="p-2 w-full h-full" placeholder="コース名" rows={2} />
            </div>
            {/* コース料金 */}
            <div className="w-full shrink-1 p-0.5">
                <textarea value={formCoursePrice} onChange={(e)=>setFormCoursePrice(e.target.value)} className="p-2 w-full h-full" placeholder="コース料金" rows={2} />
            </div>
            <div className="w-fit shrink-0 flex items-stretch divide-x">
                {/* 保存 */}
                <div className="w-8 flex items-center justify-center">
                    <button onClick={()=>handleSaveCourse()} className={`w-full h-full flex items-center justify-center text-gray-300 hover:text-blue-400 hover:bg-blue-50 active:bg-blue-100 transition-all`}>
                        <FontAwesomeIcon icon={faFloppyDisk} className="w-3 h-3" />
                    </button>
                </div>
                {/* 削除 */}
                <div className="w-8 flex items-center justify-center">
                    <button onClick={()=>handleDeleteCourse(course.id)} className="w-full h-full flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 transition-all">
                        <FontAwesomeIcon icon={faTrash} className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}
