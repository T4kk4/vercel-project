"use client";

import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { clinicKumaAtom, clinicsKumaAtom, formClinicKumaIdAtom, formClinicKumaNameAtom, formClinicKumaUrlAffiliateAtom, formClinicKumaImgLogoAtom, formClinicKumaTKiranaiAtom, formClinicKumaTTarumiAtom, formClinicKumaTCounselingAtom, formClinicKumaTPlaceAtom, formClinicKumaTRecommendAtom, formClinicKumaCopyAtom, formClinicKumaThumbnailAtom, formClinicKumaPoint1Atom, formClinicKumaPoint2Atom, formClinicKumaPoint3Atom, formClinicKumaTextAtom, formClinicKumaOpentimeAtom, formClinicKumaClinicCountAtom, formClinicKumaCounselingAtom, formClinicKumaOptionAtom, formClinicKumaAnesthesiaAtom, formClinicKumaTypeBlueAtom, formClinicKumaTypeBrownAtom, formClinicKumaTypeBlackAtom, formClinicKumaUnder10000Atom, formClinicKumaUnder30000Atom, formClinicKumaOver50000Atom, formClinicKumaTreatmentChusyaAtom, formClinicKumaTreatmentSekkaiAtom, formClinicKumaTagLessVisitsAtom, formClinicKumaTagNonSurgicalAtom, formClinicKumaTagPost7pmAtom, formClinicKumaTagFreeCounselingAtom, formClinicKumaCreatedAtAtom, formClinicKumaUpdatedAtAtom, formClinicKumaCoursesAtom, formClinicKumaStatusPublishAtom, formClinicKumaOrderByAtom, formClinicKumaUrlOfficialAtom, formClinicKumaSearchOptionsAtom, formClinicKumaTKiranaiIconAtom, formClinicKumaTTarumiIconAtom, formClinicKumaTCounselingIconAtom, formClinicKumaTPlaceIconAtom, formClinicKumaTRecommendIconAtom, formClinicKumaTKiranaiBgAtom, formClinicKumaTTarumiBgAtom, formClinicKumaTCounselingBgAtom, formClinicKumaTPlaceBgAtom, formClinicKumaTRecommendBgAtom } from "@/_atoms/atoms_clinic";
import { searchOptionAtom } from "@/_atoms/atoms_searchOption";


export default function TableKumaClinicDetailMain() {

    // ================================
    // Atom管理
    // ================================
    // --- アラートの状態 ---
    const [,setShowAlert] = useAtom(isShowingAlertAtom);        // ALERT: 表示状態
    const [,setAlertMessage] = useAtom(alertMessageAtom);       // ALERT: メッセージ
    const [,setAlertType] = useAtom(alertTypeAtom);             // ALERT: タイプ
    // --- 検索条件 ---
    const [searchOption] = useAtom(searchOptionAtom); // 検索オプション
    // --- フォームの状態 ---
    const [formClinicName, setFormClinicName] = useAtom(formClinicKumaNameAtom);                           // FORM: 名前
    const [formClinicKumaUrlOfficial, setFormClinicKumaUrlOfficial] = useAtom(formClinicKumaUrlOfficialAtom); // FORM: 公式URL
    const [formClinicKumaUrlAffiliate, setFormClinicKumaUrlAffiliate] = useAtom(formClinicKumaUrlAffiliateAtom); // FORM: アフィリエイトURL
    const [formClinicThumbnail, setFormClinicThumbnail] = useAtom(formClinicKumaThumbnailAtom);            // FORM: サムネイル
    const [formClinicKumaImgLogo, setFormClinicKumaImgLogo] = useAtom(formClinicKumaImgLogoAtom);          // FORM: ロゴ画像
    const [formClinicKumaTKiranai, setFormClinicKumaTKiranai] = useAtom(formClinicKumaTKiranaiAtom);           // FORM: 表: 切らない
    const [formClinicKumaTTarumi, setFormClinicKumaTTarumi] = useAtom(formClinicKumaTTarumiAtom);              // FORM: 表: たるみ
    const [formClinicKumaTCounseling, setFormClinicKumaTCounseling] = useAtom(formClinicKumaTCounselingAtom);  // FORM: 表: カウンセリング
    const [formClinicKumaTPlace, setFormClinicKumaTPlace] = useAtom(formClinicKumaTPlaceAtom);                 // FORM: 表: 場所
    const [formClinicKumaTRecommend, setFormClinicKumaTRecommend] = useAtom(formClinicKumaTRecommendAtom);     // FORM: 表: おすすめ
    const [formClinicKumaTKiranaiIcon, setFormClinicKumaTKiranaiIcon] = useAtom(formClinicKumaTKiranaiIconAtom);          // FORM: 表: 切らない
    const [formClinicKumaTTarumiIcon, setFormClinicKumaTTarumiIcon] = useAtom(formClinicKumaTTarumiIconAtom);             // FORM: 表: たるみ
    const [formClinicKumaTCounselingIcon, setFormClinicKumaTCounselingIcon] = useAtom(formClinicKumaTCounselingIconAtom); // FORM: 表: カウンセリング
    const [formClinicKumaTPlaceIcon, setFormClinicKumaTPlaceIcon] = useAtom(formClinicKumaTPlaceIconAtom);                // FORM: 表: 場所
    const [formClinicKumaTRecommendIcon, setFormClinicKumaTRecommendIcon] = useAtom(formClinicKumaTRecommendIconAtom);    // FORM: 表: おすすめ
    const [formClinicKumaTKiranaiBg, setFormClinicKumaTKiranaiBg] = useAtom(formClinicKumaTKiranaiBgAtom);          // FORM: 表: 切らない
    const [formClinicKumaTTarumiBg, setFormClinicKumaTTarumiBg] = useAtom(formClinicKumaTTarumiBgAtom);             // FORM: 表: たるみ
    const [formClinicKumaTCounselingBg, setFormClinicKumaTCounselingBg] = useAtom(formClinicKumaTCounselingBgAtom); // FORM: 表: カウンセリング
    const [formClinicKumaTPlaceBg, setFormClinicKumaTPlaceBg] = useAtom(formClinicKumaTPlaceBgAtom);                // FORM: 表: 場所
    const [formClinicKumaTRecommendBg, setFormClinicKumaTRecommendBg] = useAtom(formClinicKumaTRecommendBgAtom);    // FORM: 表: おすすめ
    const [formClinicKumaCopy, setFormClinicKumaCopy] = useAtom(formClinicKumaCopyAtom);                   // FORM: コピー
    const [formClinicKumaPoint1, setFormClinicKumaPoint1] = useAtom(formClinicKumaPoint1Atom);             // FORM: ポイント1
    const [formClinicKumaPoint2, setFormClinicKumaPoint2] = useAtom(formClinicKumaPoint2Atom);             // FORM: ポイント2
    const [formClinicKumaPoint3, setFormClinicKumaPoint3] = useAtom(formClinicKumaPoint3Atom);             // FORM: ポイント3
    const [formClinicKumaText, setFormClinicKumaText] = useAtom(formClinicKumaTextAtom);                   // FORM: 本文
    const [formClinicKumaOpentime, setFormClinicKumaOpentime] = useAtom(formClinicKumaOpentimeAtom);          // FORM: 基本情報: 営業時間
    const [formClinicKumaClinicCount, setFormClinicKumaClinicCount] = useAtom(formClinicKumaClinicCountAtom); // FORM: 基本情報: クリニック数
    const [formClinicKumaCounseling, setFormClinicKumaCounseling] = useAtom(formClinicKumaCounselingAtom);    // FORM: 基本情報: カウンセリング
    const [formClinicKumaOption, setFormClinicKumaOption] = useAtom(formClinicKumaOptionAtom);                // FORM: 基本情報: オプション
    const [formClinicKumaAnesthesia, setFormClinicKumaAnesthesia] = useAtom(formClinicKumaAnesthesiaAtom);    // FORM: 基本情報: 麻酔
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

    const [displaySearchOption, setDisplaySearchOption] = React.useState([]);

    useEffect(() => {
        if (searchOption) {
            const searchOptions = JSON.parse(searchOption?.search_options??"");
            setDisplaySearchOption(searchOptions)
        }
    }, [searchOption]);

    const isSelected = (option:string) => {
        console.log("isSelected");
        console.log(formClinicKumaSearchOptions);
        const selectedOptions = formClinicKumaSearchOptions.split(",");
        return selectedOptions.includes(option);
    }

    const handleClickSearchOption = (option:string) => {
        const selectedOptions = formClinicKumaSearchOptions.split(",");
        if (selectedOptions.includes(option)) {
            const newOptions = selectedOptions.filter((item:string) => item !== option);
            setFormClinicKumaSearchOptions(newOptions.join(","));
        } else {
            const newOptions = [...selectedOptions, option];
            setFormClinicKumaSearchOptions(newOptions.join(","));
        }
    }

    return (
        <div>
            {/* クリニック名 */}
            <div className="mb-4">
                <div className="flex gap-2 ">
                    <div className="w-full">
                        <div className="mb-1 text-sm text-gray-700 font-bold">クリニック名</div>
                        <input value={formClinicName??""} onChange={(e)=>setFormClinicName(e.target.value)} className="px-3 py-2.5 w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder=" " />
                    </div>
                    <div className="shrink-0 w-40">
                        <div className="mb-1 text-sm text-gray-700 font-bold">掲載順</div>
                        <input type="number" value={formClinicKumaOrderBy??999} onChange={(e)=>setFormClinicKumaOrderBy(Number(e.target.value))} className="px-3 py-2.5 w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder=" " />
                    </div>
                </div>
            </div>

            {/* URL */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">URL</div>
                <input value={formClinicKumaUrlOfficial??""} onChange={(e)=>setFormClinicKumaUrlOfficial(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="公式URL" />
                <input value={formClinicKumaUrlAffiliate??""} onChange={(e)=>setFormClinicKumaUrlAffiliate(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="アフィリエイトURL" />
            </div>

            {/* 画像 */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">画像</div>
                <input value={formClinicThumbnail??""} onChange={(e)=>setFormClinicThumbnail(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="サムネイル" />
                <input value={formClinicKumaImgLogo??""} onChange={(e)=>setFormClinicKumaImgLogo(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="ロゴ" />
            </div>

            {/* コピー */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">コピー</div>
                <input value={formClinicKumaCopy??""} onChange={(e)=>setFormClinicKumaCopy(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder=" " />
            </div>

            {/* ポイント1 */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">ポイント1</div>
                <input value={formClinicKumaPoint1??""} onChange={(e)=>setFormClinicKumaPoint1(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="ポイント1" />
                <input value={formClinicKumaPoint2??""} onChange={(e)=>setFormClinicKumaPoint2(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="ポイント2" />
                <input value={formClinicKumaPoint3??""} onChange={(e)=>setFormClinicKumaPoint3(e.target.value)} className="px-3 py-2.5 h-full w-full rounded border border-gray-200 text-sm font-normal text-gray-900 tbg-white" placeholder="ポイント3" />
            </div>

            {/* 本文 */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">本文</div>
                <textarea value={formClinicKumaText??""} onChange={(e)=>setFormClinicKumaText(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="本文" rows={5}/>
            </div>

            {/* 表 */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">基本情報</div>
                <div className="mb-0.5 flex items-stretch gap-1">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">営業時間</div>
                    <textarea value={formClinicKumaOpentime??""} onChange={(e)=>setFormClinicKumaOpentime(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="営業時間" rows={3}/>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">クリニック数</div>
                    <textarea value={formClinicKumaClinicCount??""} onChange={(e)=>setFormClinicKumaClinicCount(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="クリニック数" rows={3}/>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">カウンセリング</div>
                    <textarea value={formClinicKumaCounseling??""} onChange={(e)=>setFormClinicKumaCounseling(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="カウンセリング" rows={3}/>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">オプション</div>
                    <textarea value={formClinicKumaOption??""} onChange={(e)=>setFormClinicKumaOption(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="オプション" rows={3}/>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">麻酔</div>
                    <textarea value={formClinicKumaAnesthesia??""} onChange={(e)=>setFormClinicKumaAnesthesia(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="麻酔" rows={3}/>
                </div>
            </div>

            {/* 表 */}
            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">表</div>
                <div className="mb-0.5 flex items-stretch gap-1">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">注射料金(税込)</div>
                    <textarea value={formClinicKumaTKiranai??""} onChange={(e)=>setFormClinicKumaTKiranai(e.target.value)} className="px-3 py-2.5 w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="注射料金(税込)" rows={3}/>
                    <div className="shrink-0 w-40 flex flex-col items-center justify-between gap-1 text-xs text-gray-400">
                        <div className="w-full flex items-center text-base">
                            <button onClick={()=>setFormClinicKumaTKiranaiIcon(3)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTKiranaiIcon===3?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◎</button>
                            <button onClick={()=>setFormClinicKumaTKiranaiIcon(2)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTKiranaiIcon===2?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◯</button>
                            <button onClick={()=>setFormClinicKumaTKiranaiIcon(1)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTKiranaiIcon===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>△</button>
                            <button onClick={()=>setFormClinicKumaTKiranaiIcon(0)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTKiranaiIcon===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>-</button>
                        </div>
                        <div className="w-full h-full flex items-center">
                            <button onClick={()=>setFormClinicKumaTKiranaiBg(1)} className={`w-full h-full rounded-lg border ${formClinicKumaTKiranaiBg===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>背景色あり</button>
                            <button onClick={()=>setFormClinicKumaTKiranaiBg(0)} className={`w-full h-full rounded-lg border ${formClinicKumaTKiranaiBg===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>背景色なし</button>
                        </div>
                    </div>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">たるみ取り料金(税込)</div>
                    <textarea value={formClinicKumaTTarumi??""} onChange={(e)=>setFormClinicKumaTTarumi(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="たるみ取り料金(税込)" rows={3}/>
                    <div className="shrink-0 w-40 flex flex-col items-center justify-between gap-1 text-xs text-gray-400">
                        <div className="w-full flex items-center text-base">
                            <button onClick={()=>setFormClinicKumaTTarumiIcon(3)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTTarumiIcon===3?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◎</button>
                            <button onClick={()=>setFormClinicKumaTTarumiIcon(2)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTTarumiIcon===2?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◯</button>
                            <button onClick={()=>setFormClinicKumaTTarumiIcon(1)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTTarumiIcon===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>△</button>
                            <button onClick={()=>setFormClinicKumaTTarumiIcon(0)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTTarumiIcon===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>-</button>
                        </div>
                        <div className="w-full h-full flex items-center">
                            <button onClick={()=>setFormClinicKumaTTarumiBg(1)} className={`w-full h-full rounded-lg border ${formClinicKumaTTarumiBg===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>背景色あり</button>
                            <button onClick={()=>setFormClinicKumaTTarumiBg(0)} className={`w-full h-full rounded-lg border ${formClinicKumaTTarumiBg===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>背景色なし</button>
                        </div>
                    </div>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">無料カウンセリング</div>
                    <textarea value={formClinicKumaTCounseling??""} onChange={(e)=>setFormClinicKumaTCounseling(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="無料カウンセリング" rows={3}/>
                    <div className="shrink-0 w-40 flex flex-col items-center justify-between gap-1 text-xs text-gray-400">
                        <div className="w-full flex items-center text-base">
                            <button onClick={()=>setFormClinicKumaTCounselingIcon(3)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTCounselingIcon===3?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◎</button>
                            <button onClick={()=>setFormClinicKumaTCounselingIcon(2)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTCounselingIcon===2?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◯</button>
                            <button onClick={()=>setFormClinicKumaTCounselingIcon(1)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTCounselingIcon===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>△</button>
                            <button onClick={()=>setFormClinicKumaTCounselingIcon(0)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTCounselingIcon===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>-</button>
                        </div>
                        <div className="w-full h-full flex items-center">
                            <button onClick={()=>setFormClinicKumaTCounselingBg(1)} className={`w-full h-full rounded-lg border ${formClinicKumaTCounselingBg===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>背景色あり</button>
                            <button onClick={()=>setFormClinicKumaTCounselingBg(0)} className={`w-full h-full rounded-lg border ${formClinicKumaTCounselingBg===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>背景色なし</button>
                        </div>
                    </div>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">おすすめの人</div>
                    <textarea value={formClinicKumaTRecommend??""} onChange={(e)=>setFormClinicKumaTRecommend(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="おすすめの人" rows={3}/>
                    <div className="shrink-0 w-40 flex flex-col items-center justify-between gap-1 text-xs text-gray-400">
                        <div className="w-full flex items-center text-base">
                            <button onClick={()=>setFormClinicKumaTRecommendIcon(3)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTRecommendIcon===3?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◎</button>
                            <button onClick={()=>setFormClinicKumaTRecommendIcon(2)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTRecommendIcon===2?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◯</button>
                            <button onClick={()=>setFormClinicKumaTRecommendIcon(1)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTRecommendIcon===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>△</button>
                            <button onClick={()=>setFormClinicKumaTRecommendIcon(0)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTRecommendIcon===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>-</button>
                        </div>
                        <div className="w-full h-full flex items-center">
                            <button onClick={()=>setFormClinicKumaTRecommendBg(1)} className={`w-full h-full rounded-lg border ${formClinicKumaTRecommendBg===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>背景色あり</button>
                            <button onClick={()=>setFormClinicKumaTRecommendBg(0)} className={`w-full h-full rounded-lg border ${formClinicKumaTRecommendBg===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>背景色なし</button>
                        </div>
                    </div>
                </div>
                <div className="mb-0.5 flex items-stretch gap-1 ">
                    <div className="shrink-0 w-36 bg-slate-50 flex items-center justify-center text-xs text-gray-400 border rounded-lg">地域</div>
                    <textarea value={formClinicKumaTPlace??""} onChange={(e)=>setFormClinicKumaTPlace(e.target.value)} className="px-3 py-2.5 h-full w-full rounded-lg border border-gray-200 text-xs text-gray-500 bg-white" placeholder="地域" rows={3}/>
                    <div className="shrink-0 w-40 flex flex-col items-center justify-between gap-1 text-xs text-gray-400">
                        <div className="w-full flex items-center text-base">
                            <button onClick={()=>setFormClinicKumaTPlaceIcon(3)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTPlaceIcon===3?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◎</button>
                            <button onClick={()=>setFormClinicKumaTPlaceIcon(2)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTPlaceIcon===2?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>◯</button>
                            <button onClick={()=>setFormClinicKumaTPlaceIcon(1)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTPlaceIcon===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>△</button>
                            <button onClick={()=>setFormClinicKumaTPlaceIcon(0)} className={`w-full py-1.5 rounded-lg border ${formClinicKumaTPlaceIcon===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>-</button>
                        </div>
                        <div className="w-full h-full flex items-center">
                            <button onClick={()=>setFormClinicKumaTPlaceBg(1)} className={`w-full h-full rounded-lg border ${formClinicKumaTPlaceBg===1?" text-white border-blue-500 bg-blue-500":" border-slate-200 bg-white"}`}>背景色あり</button>
                            <button onClick={()=>setFormClinicKumaTPlaceBg(0)} className={`w-full h-full rounded-lg border ${formClinicKumaTPlaceBg===0?" text-white border-gray-500 bg-gray-500":" border-slate-200 bg-white"}`}>背景色なし</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* 検索条件: チェックリスト */}
            <div>
                {displaySearchOption.map((searchOption:any, index:number) => (
                    <div key={index} className="mb-4">
                        <div className="mb-1 text-sm text-gray-700 font-bold">{searchOption.category}</div>
                        <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                            {searchOption.options.map((option:string, optionIndex:number) => (
                                <button key={optionIndex} onClick={()=>handleClickSearchOption(option)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${isSelected(option)?"bg-blue-500 text-white":"bg-white"}`}>{option}</button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* チェックリスト */}
            {/* <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">シミの種類</div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                    <button onClick={()=>setFormClinicKumaTypeBlue(formClinicKumaTypeBlue?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTypeBlue?"bg-blue-500 text-white":"bg-white"}`}>青シミ</button>
                    <button onClick={()=>setFormClinicKumaTypeBrown(formClinicKumaTypeBrown?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTypeBrown?"bg-blue-500 text-white":"bg-white"}`}>茶シミ</button>
                    <button onClick={()=>setFormClinicKumaTypeBlack(formClinicKumaTypeBlack?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTypeBlack?"bg-blue-500 text-white":"bg-white"}`}>黒シミ</button>
                </div>
            </div>

            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">価格帯</div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                    <button onClick={()=>setFormClinicKumaUnder10000(formClinicKumaUnder10000?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaUnder10000?"bg-blue-500 text-white":"bg-white"}`}>1万円以下</button>
                    <button onClick={()=>setFormClinicKumaUnder30000(formClinicKumaUnder30000?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaUnder30000?"bg-blue-500 text-white":"bg-white"}`}>3万円以下</button>
                    <button onClick={()=>setFormClinicKumaOver50000(formClinicKumaOver50000?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaOver50000?"bg-blue-500 text-white":"bg-white"}`}>5万円以上</button>
                </div>
            </div>

            <div className="mb-4">
                <div className="mb-1 text-sm text-gray-700 font-bold">施術タイプ</div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                    <button onClick={()=>setFormClinicKumaTreatmentChusya(formClinicKumaTreatmentChusya?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTreatmentChusya?"bg-blue-500 text-white":"bg-white"}`}>注射</button>
                    <button onClick={()=>setFormClinicKumaTreatmentSekkai(formClinicKumaTreatmentSekkai?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTreatmentSekkai?"bg-blue-500 text-white":"bg-white"}`}>切開</button>
                </div>
            </div>

            <div className="mb-10">
                <div className="mb-1 text-sm text-gray-700 font-bold">タグ</div>
                <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                    <button onClick={()=>setFormClinicKumaTagLessVisits(formClinicKumaTagLessVisits?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTagLessVisits?"bg-blue-500 text-white":"bg-white"}`}>通院回数を減らしたい</button>
                    <button onClick={()=>setFormClinicKumaTagNonSurgical(formClinicKumaTagNonSurgical?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTagNonSurgical?"bg-blue-500 text-white":"bg-white"}`}>切らない施術</button>
                    <button onClick={()=>setFormClinicKumaTagPost7pm(formClinicKumaTagPost7pm?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTagPost7pm?"bg-blue-500 text-white":"bg-white"}`}>19時以降もOK</button>
                    <button onClick={()=>setFormClinicKumaTagFreeCounseling(formClinicKumaTagFreeCounseling?false:true)} className={`px-3 py-2 h-full w-full rounded-full border border-gray-200 ${formClinicKumaTagFreeCounseling?"bg-blue-500 text-white":"bg-white"}`}>無料カウンセリング</button>
                </div>
            </div> */}

            {/* 公開ステータス */}
            <div className="mb-4 flex items-center justify-end">
                <div className="px-10 py-6 flex items-center gap-2 border-2 border-gray-300 bg-slate-200 rounded-lg">
                    <div className="">
                        <div className="mb-0.5 text-sm text-gray-400 font-bold">クリニック公開</div>
                        <div className="p-1 w-fit flex items-center gap-1 text-xs bg-white border border-gray-300 rounded-full">
                            <button onClick={()=>setFormClinicKumaStatusPublish(1)} className={"p-2 w-20 text-center rounded-full "+(formClinicKumaStatusPublish===1?"text-white bg-red-400 shadow font-bold":"text-gray-400 bg-white")}>公開</button>
                            <button onClick={()=>setFormClinicKumaStatusPublish(0)} className={"p-2 w-20 text-center rounded-full "+(formClinicKumaStatusPublish!==1?"text-white bg-slate-400 shadow font-bold":"text-gray-400 bg-white")}>非公開</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
