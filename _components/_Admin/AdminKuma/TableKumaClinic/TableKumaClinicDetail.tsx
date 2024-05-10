"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useAtom } from "jotai";
import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";
import { clinicKumaAtom, clinicsKumaAtom, formClinicKumaIdAtom, formClinicKumaNameAtom, formClinicKumaUrlAffiliateAtom, formClinicKumaImgLogoAtom, formClinicKumaTKiranaiAtom, formClinicKumaTTarumiAtom, formClinicKumaTCounselingAtom, formClinicKumaTPlaceAtom, formClinicKumaTRecommendAtom, formClinicKumaCopyAtom, formClinicKumaThumbnailAtom, formClinicKumaPoint1Atom, formClinicKumaPoint2Atom, formClinicKumaPoint3Atom, formClinicKumaTextAtom, formClinicKumaOpentimeAtom, formClinicKumaClinicCountAtom, formClinicKumaCounselingAtom, formClinicKumaOptionAtom, formClinicKumaAnesthesiaAtom, formClinicKumaTypeBlueAtom, formClinicKumaTypeBrownAtom, formClinicKumaTypeBlackAtom, formClinicKumaUnder10000Atom, formClinicKumaUnder30000Atom, formClinicKumaOver50000Atom, formClinicKumaTreatmentChusyaAtom, formClinicKumaTreatmentSekkaiAtom, formClinicKumaTagLessVisitsAtom, formClinicKumaTagNonSurgicalAtom, formClinicKumaTagPost7pmAtom, formClinicKumaTagFreeCounselingAtom, formClinicKumaCreatedAtAtom, formClinicKumaUpdatedAtAtom, formClinicKumaCoursesAtom, formClinicKumaStatusPublishAtom, formClinicKumaOrderByAtom, formClinicKumaUrlOfficialAtom, formClinicKumaSearchOptionsAtom, formClinicKumaTKiranaiIconAtom, formClinicKumaTTarumiIconAtom, formClinicKumaTCounselingIconAtom, formClinicKumaTPlaceIconAtom, formClinicKumaTRecommendIconAtom, formClinicKumaTKiranaiBgAtom, formClinicKumaTTarumiBgAtom, formClinicKumaTCounselingBgAtom, formClinicKumaTPlaceBgAtom, formClinicKumaTRecommendBgAtom } from "@/_atoms/atoms_clinic";
import TableKumaClinicDetailCourses from "./TableKumaClinicDetailCourses";
import TableKumaClinicDetailMain from "./TableKumaClinicDetailMain";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong, faCircleNotch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { updateClinicKuma } from "@/_lib/supabase_kuma";
import { searchOptionAtom } from "@/_atoms/atoms_searchOption";


export default function TableKumaClinicDetail() {
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
    const [clinic] = useAtom(clinicKumaAtom);       // トピック一覧
    const [,setClinics] = useAtom(clinicsKumaAtom);       // トピック一覧

    // --- 検索条件 ---
    const [searchOption] = useAtom(searchOptionAtom); // 検索オプション

    // --- フォームの状態 ---
    const [formClinicId, setFormClinicId] = useAtom(formClinicKumaIdAtom);                                 // FORM: ID
    const [formClinicName, setFormClinicName] = useAtom(formClinicKumaNameAtom);                           // FORM: 名前
    const [formClinicKumaUrlOfficial, setFormClinicKumaUrlOfficial] = useAtom(formClinicKumaUrlOfficialAtom); // FORM: 公式URL
    const [formClinicKumaUrlAffiliate, setFormClinicKumaUrlAffiliate] = useAtom(formClinicKumaUrlAffiliateAtom); // FORM: アフィリエイトURL
    const [formClinicThumbnail, setFormClinicThumbnail] = useAtom(formClinicKumaThumbnailAtom);            // FORM: サムネイル
    const [formClinicKumaImgLogo, setFormClinicKumaImgLogo] = useAtom(formClinicKumaImgLogoAtom);          // FORM: ロゴ画像

    const [formClinicKumaTKiranai, setFormClinicKumaTKiranai] = useAtom(formClinicKumaTKiranaiAtom);       // FORM: 表: 切らない
    const [formClinicKumaTTarumi, setFormClinicKumaTTarumi] = useAtom(formClinicKumaTTarumiAtom);          // FORM: 表: たるみ
    const [formClinicKumaTCounseling, setFormClinicKumaTCounseling] = useAtom(formClinicKumaTCounselingAtom); // FORM: 表: カウンセリング
    const [formClinicKumaTPlace, setFormClinicKumaTPlace] = useAtom(formClinicKumaTPlaceAtom);             // FORM: 表: 場所
    const [formClinicKumaTRecommend, setFormClinicKumaTRecommend] = useAtom(formClinicKumaTRecommendAtom); // FORM: 表: おすすめ
    const [formClinicKumaTKiranaiIcon, setFormClinicKumaTKiranaiIcon] = useAtom(formClinicKumaTKiranaiIconAtom);       // FORM: 表: 切らない
    const [formClinicKumaTTarumiIcon, setFormClinicKumaTTarumiIcon] = useAtom(formClinicKumaTTarumiIconAtom);          // FORM: 表: たるみ
    const [formClinicKumaTCounselingIcon, setFormClinicKumaTCounselingIcon] = useAtom(formClinicKumaTCounselingIconAtom); // FORM: 表: カウンセリング
    const [formClinicKumaTPlaceIcon, setFormClinicKumaTPlaceIcon] = useAtom(formClinicKumaTPlaceIconAtom);             // FORM: 表: 場所
    const [formClinicKumaTRecommendIcon, setFormClinicKumaTRecommendIcon] = useAtom(formClinicKumaTRecommendIconAtom); // FORM: 表: おすすめ
    const [formClinicKumaTKiranaiBg, setFormClinicKumaTKiranaiBg] = useAtom(formClinicKumaTKiranaiBgAtom);       // FORM: 表: 切らない
    const [formClinicKumaTTarumiBg, setFormClinicKumaTTarumiBg] = useAtom(formClinicKumaTTarumiBgAtom);          // FORM: 表: たるみ
    const [formClinicKumaTCounselingBg, setFormClinicKumaTCounselingBg] = useAtom(formClinicKumaTCounselingBgAtom); // FORM: 表: カウンセリング
    const [formClinicKumaTPlaceBg, setFormClinicKumaTPlaceBg] = useAtom(formClinicKumaTPlaceBgAtom);             // FORM: 表: 場所
    const [formClinicKumaTRecommendBg, setFormClinicKumaTRecommendBg] = useAtom(formClinicKumaTRecommendBgAtom); // FORM: 表: おすすめ

    const [formClinicKumaCopy, setFormClinicKumaCopy] = useAtom(formClinicKumaCopyAtom);                   // FORM: コピー
    const [formClinicKumaPoint1, setFormClinicKumaPoint1] = useAtom(formClinicKumaPoint1Atom);             // FORM: ポイント1
    const [formClinicKumaPoint2, setFormClinicKumaPoint2] = useAtom(formClinicKumaPoint2Atom);             // FORM: ポイント2
    const [formClinicKumaPoint3, setFormClinicKumaPoint3] = useAtom(formClinicKumaPoint3Atom);             // FORM: ポイント3
    const [formClinicKumaText, setFormClinicKumaText] = useAtom(formClinicKumaTextAtom);                   // FORM: 本文
    const [formClinicKumaOpentime, setFormClinicKumaOpentime] = useAtom(formClinicKumaOpentimeAtom);       // FORM: 営業時間
    const [formClinicKumaClinicCount, setFormClinicKumaClinicCount] = useAtom(formClinicKumaClinicCountAtom); // FORM: クリニック数
    const [formClinicKumaCounseling, setFormClinicKumaCounseling] = useAtom(formClinicKumaCounselingAtom); // FORM: カウンセリング
    const [formClinicKumaOption, setFormClinicKumaOption] = useAtom(formClinicKumaOptionAtom);          // FORM: オプション
    const [formClinicKumaAnesthesia, setFormClinicKumaAnesthesia] = useAtom(formClinicKumaAnesthesiaAtom); // FORM: 麻酔
    const [formClinicKumaTypeBlue, setFormClinicKumaTypeBlue] = useAtom(formClinicKumaTypeBlueAtom);       // FORM: タイプ: 青
    const [formClinicKumaTypeBrown, setFormClinicKumaTypeBrown] = useAtom(formClinicKumaTypeBrownAtom);    // FORM: タイプ: 茶
    const [formClinicKumaTypeBlack, setFormClinicKumaTypeBlack] = useAtom(formClinicKumaTypeBlackAtom);    // FORM: タイプ: 黒
    const [formClinicKumaUnder10000, setFormClinicKumaUnder10000] = useAtom(formClinicKumaUnder10000Atom); // FORM: フィルタ: 1万円以下
    const [formClinicKumaUnder30000, setFormClinicKumaUnder30000] = useAtom(formClinicKumaUnder30000Atom); // FORM: フィルタ: 3万円以下
    const [formClinicKumaOver50000, setFormClinicKumaOver50000] = useAtom(formClinicKumaOver50000Atom);    // FORM: フィルタ: 5万円以上
    const [formClinicKumaTreatmentChusya, setFormClinicKumaTreatmentChusya] = useAtom(formClinicKumaTreatmentChusyaAtom); // FORM: フィルタ: 初診時のみ
    const [formClinicKumaTreatmentSekkai, setFormClinicKumaTreatmentSekkai] = useAtom(formClinicKumaTreatmentSekkaiAtom); // FORM: フィルタ: 切開
    const [formClinicKumaTagLessVisits, setFormClinicKumaTagLessVisits] = useAtom(formClinicKumaTagLessVisitsAtom); // FORM: フィルタ: 来院回数少ない
    const [formClinicKumaTagNonSurgical, setFormClinicKumaTagNonSurgical] = useAtom(formClinicKumaTagNonSurgicalAtom); // FORM: フィルタ: 非手術
    const [formClinicKumaTagPost7pm, setFormClinicKumaTagPost7pm] = useAtom(formClinicKumaTagPost7pmAtom); // FORM: フィルタ: 19時以降
    const [formClinicKumaTagFreeCounseling, setFormClinicKumaTagFreeCounseling] = useAtom(formClinicKumaTagFreeCounselingAtom); // FORM: フィルタ: カウンセリング無料
    const [formClinicKumaStatusPublish, setFormClinicKumaStatusPublish] = useAtom(formClinicKumaStatusPublishAtom); // FORM: 公開ステータス
    const [formClinicKumaOrderBy, setFormClinicKumaOrderBy] = useAtom(formClinicKumaOrderByAtom); // FORM: 並び順
    const [formClinicKumaSearchOptions, setFormClinicKumaSearchOptions] = useAtom(formClinicKumaSearchOptionsAtom); // FORM: 検索条件

    // --- フォームの状態: 関連 ---
    const [formClinicKumaCourses, setFormClinicKumaCourses] = useAtom(formClinicKumaCoursesAtom); // FORM: 関連: コース


    // ================================
    // フォームの初期値
    // ================================
    useEffect(() => {
        if (clinic) {
            setFormClinicId(clinic.id);
            setFormClinicName(clinic.name);
            setFormClinicKumaUrlOfficial(clinic.url_official);
            setFormClinicKumaUrlAffiliate(clinic.url_affiliate);
            setFormClinicThumbnail(clinic.thumbnail);
            setFormClinicKumaImgLogo(clinic.img_logo);
            setFormClinicKumaTKiranai(clinic.t_kiranai);
            setFormClinicKumaTTarumi(clinic.t_tarumi);
            setFormClinicKumaTCounseling(clinic.t_counseling);
            setFormClinicKumaTPlace(clinic.t_place);
            setFormClinicKumaTRecommend(clinic.t_recommend);
            setFormClinicKumaTKiranaiIcon(clinic.t_kiranai_icon);
            setFormClinicKumaTTarumiIcon(clinic.t_tarumi_icon);
            setFormClinicKumaTCounselingIcon(clinic.t_counseling_icon);
            setFormClinicKumaTPlaceIcon(clinic.t_place_icon);
            setFormClinicKumaTRecommendIcon(clinic.t_recommend_icon);
            setFormClinicKumaTKiranaiBg(clinic.t_kiranai_bg);
            setFormClinicKumaTTarumiBg(clinic.t_tarumi_bg);
            setFormClinicKumaTCounselingBg(clinic.t_counseling_bg);
            setFormClinicKumaTPlaceBg(clinic.t_place_bg);
            setFormClinicKumaTRecommendBg(clinic.t_recommend_bg);
            setFormClinicKumaCopy(clinic.copy);
            setFormClinicKumaPoint1(clinic.point_1);
            setFormClinicKumaPoint2(clinic.point_2);
            setFormClinicKumaPoint3(clinic.point_3);
            setFormClinicKumaText(clinic.text);
            setFormClinicKumaOpentime(clinic.opentime);
            setFormClinicKumaClinicCount(clinic.clinic_count);
            setFormClinicKumaCounseling(clinic.counseling);
            setFormClinicKumaOption(clinic.option);
            setFormClinicKumaAnesthesia(clinic.anesthesia);
            setFormClinicKumaTypeBlue(clinic.type_blue);
            setFormClinicKumaTypeBrown(clinic.type_brown);
            setFormClinicKumaTypeBlack(clinic.type_black);
            setFormClinicKumaUnder10000(clinic.under_10000);
            setFormClinicKumaUnder30000(clinic.under_30000);
            setFormClinicKumaOver50000(clinic.over_50000);
            setFormClinicKumaTreatmentChusya(clinic.treatment_chusya);
            setFormClinicKumaTreatmentSekkai(clinic.treatment_sekkai);
            setFormClinicKumaTagLessVisits(clinic.tag_less_visits);
            setFormClinicKumaTagNonSurgical(clinic.tag_non_surgical);
            setFormClinicKumaTagPost7pm(clinic.tag_post_7pm);
            setFormClinicKumaTagFreeCounseling(clinic.tag_free_counseling);
            setFormClinicKumaStatusPublish(clinic.status_publish);
            setFormClinicKumaOrderBy(clinic.order_by);
            setFormClinicKumaCourses(clinic.clinic_kuma_course??[]);
            setFormClinicKumaSearchOptions(clinic.search_options??"");
            setIsProcessing(false)
        }
    }, [clinic]);


    // ================================
    // 関数: ボタンの処理
    // ================================
    // --- フォームを閉じるボタン ---
    const handleCloseForm = () => {
        params.delete('clinic'); // URL: post_idの削除
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
        if (!formClinicId) return;
        // --- 処理 ---
        try {
            // --- Tagの更新 ---
            console.log("update tag")
            const newClinic = {
                id: formClinicId,
                name: formClinicName,
                url_official: formClinicKumaUrlOfficial,
                url_affiliate: formClinicKumaUrlAffiliate,
                thumbnail: formClinicThumbnail,
                img_logo: formClinicKumaImgLogo,
                t_kiranai: formClinicKumaTKiranai,
                t_tarumi: formClinicKumaTTarumi,
                t_counseling: formClinicKumaTCounseling,
                t_place: formClinicKumaTPlace,
                t_recommend: formClinicKumaTRecommend,
                t_kiranai_icon: formClinicKumaTKiranaiIcon,
                t_tarumi_icon: formClinicKumaTTarumiIcon,
                t_counseling_icon: formClinicKumaTCounselingIcon,
                t_place_icon: formClinicKumaTPlaceIcon,
                t_recommend_icon: formClinicKumaTRecommendIcon,
                t_kiranai_bg: formClinicKumaTKiranaiBg,
                t_tarumi_bg: formClinicKumaTTarumiBg,
                t_counseling_bg: formClinicKumaTCounselingBg,
                t_place_bg: formClinicKumaTPlaceBg,
                t_recommend_bg: formClinicKumaTRecommendBg,
                copy: formClinicKumaCopy,
                point_1: formClinicKumaPoint1,
                point_2: formClinicKumaPoint2,
                point_3: formClinicKumaPoint3,
                text: formClinicKumaText,
                opentime: formClinicKumaOpentime,
                clinic_count: formClinicKumaClinicCount,
                counseling: formClinicKumaCounseling,
                option: formClinicKumaOption,
                anesthesia: formClinicKumaAnesthesia,
                type_blue: formClinicKumaTypeBlue,
                type_brown: formClinicKumaTypeBrown,
                type_black: formClinicKumaTypeBlack,
                under_10000: formClinicKumaUnder10000,
                under_30000: formClinicKumaUnder30000,
                over_50000: formClinicKumaOver50000,
                treatment_chusya: formClinicKumaTreatmentChusya,
                treatment_sekkai: formClinicKumaTreatmentSekkai,
                tag_less_visits: formClinicKumaTagLessVisits,
                tag_non_surgical: formClinicKumaTagNonSurgical,
                tag_post_7pm: formClinicKumaTagPost7pm,
                tag_free_counseling: formClinicKumaTagFreeCounseling,
                status_publish: formClinicKumaStatusPublish,
                order_by: formClinicKumaOrderBy,
                search_options: formClinicKumaSearchOptions,
            }
            const { data: resClinic } = await updateClinicKuma(newClinic);
            // --- トピック一覧の更新 ---
            setClinics(currentClinics => {
                return currentClinics.map(clinic => {
                    if (clinic.id === resClinic.id) return { ...clinic, ...resClinic };
                    return clinic;
                });
            });
            console.log(resClinic);
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
                        <div className="font-bold">{clinic?.name}</div>

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
                <div className="shrink-0 px-6 flex border-b text-sm text-gray-400 bg-white">
                    <button onClick={()=>handleSelectTab(null)} className={`px-4 py-2 ${!tab ? "text-blue-500 border-b-2 border-blue-500":"hover:text-gray-700 transition-all"}`}>詳細</button>
                    <button onClick={()=>handleSelectTab("courses")} className={`px-4 py-2 ${tab==="courses" ? "text-blue-500 border-b-2 border-blue-500":"hover:text-gray-700 transition-all"}`}>コース</button>
                </div>

                {/* ================================ */}
                {/* TAG: メイン */}
                {/* ================================ */}
                <div className="h-full px-6 py-6 overflow-auto">
                    {/* --- TAB: 詳細 --- */}
                    {!tab && <TableKumaClinicDetailMain />}

                    {/* --- TAB: タグ --- */}
                    {tab==="courses" && <TableKumaClinicDetailCourses />}

                </div>
            </div>
        </>
    );
}
