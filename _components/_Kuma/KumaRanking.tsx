import { ClinicKuma } from "@/_types/types_global";
import { faArrowRightLong, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import IconsCircle1 from "../_Global/icons/IconsCircle1";
import IconsCircle2 from "../_Global/icons/IconsCircle2";
import IconsTraiangle from "../_Global/icons/IconsTraiangle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { montserrat, notoSansJP } from "@/fonts";
import { getURL } from "@/_functions/url";


export default function KumaRanking({clinics}: {clinics: ClinicKuma[]}) {
    return (
        <>
            <div className="mb-8 px-10 py-6 text-center text-xl text-white font-bold bg-sky-400 shadow-lg">クマ取りできる人気クリニック比較</div>
            <div className={`clinic-table mx-0 md:mx-6 flex flex-col divide-y divide-gray-700 text-xs md:text-sm text-gray-700 bg-white border border-gray-700 overflow-auto ${notoSansJP.className}`}>
                <div className="w-fit flex divide-x divide-gray-700 bg-slate-50">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">
                        クリニック
                    </div>
                    {clinics.map((clinic, i) => (
                        <div key={i} className="shrink-0 w-32 md:w-40 px-2 py-2 flex flex-col items-center justify-center text-xs bg-orange-100">
                            <div className="mb-2 w-full h-16 md:h-20 bg-white">
                                <img src={clinic.img_logo} alt="" className="object-contain w-full h-full" />
                            </div>
                            <a href={getURL(clinic)} className="text-center text-blue-800 underline font-bold hover:opacity-70 active:opacity-100 transition-all">{clinic.name}</a>
                        </div>
                    ))}
                </div>

                {/* 料金: 注射 */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">注射料金(税込)</div>
                    {clinics.map((clinic, i) => (
                        <div key={i} className={`shrink-0 w-32 md:w-40 p-1.5 md:p-2 text-xs bg-white`}>
                            <div className={`p-2 w-full h-full flex flex-col items-center justify-center rounded-sm ${clinic.t_kiranai_bg?"bg-orange-50":""}`}>
                                {clinic.t_kiranai_icon > 0 &&
                                    <div className="my-2 w-10 h-10 flex items-center justify-center">
                                        {clinic.t_kiranai_icon === 1 && <IconsTraiangle color="text-blue-300" />}
                                        {clinic.t_kiranai_icon === 2 && <IconsCircle1 color="text-orange-300" />}
                                        {clinic.t_kiranai_icon === 3 && <IconsCircle2 color="text-red-400" />}
                                    </div>
                                }
                                <div className="flex flex-col items-center gap-0.5 text-gray-700">
                                    {clinic.t_kiranai && clinic.t_kiranai.split('\n').map((line, i) =>
                                        <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]}>{line}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 料金: たるみ取り */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">たるみ取り料金(税込)</div>
                    {clinics.map((clinic, i) => (
                        // <div key={i} className={`shrink-0 w-32 md:w-40 px-2 py-4 flex flex-col items-center justify-center text-xs `}>
                        //     {clinic.t_tarumi && clinic.t_tarumi.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                        // </div>
                        <div key={i} className={`shrink-0 w-32 md:w-40 p-1.5 md:p-2 text-xs bg-white`}>
                            <div className={`p-2 w-full h-full flex flex-col items-center justify-center rounded-sm ${clinic.t_tarumi_bg?"bg-orange-50":""}`}>
                                {clinic.t_tarumi_icon > 0 &&
                                    <div className="my-2 w-10 h-10 flex items-center justify-center">
                                        {clinic.t_tarumi_icon === 1 && <IconsTraiangle color="text-blue-300" />}
                                        {clinic.t_tarumi_icon === 2 && <IconsCircle1 color="text-orange-300" />}
                                        {clinic.t_tarumi_icon === 3 && <IconsCircle2 color="text-red-400" />}
                                    </div>
                                }
                                <div className="flex flex-col items-center gap-0.5 text-gray-700">
                                    {clinic.t_tarumi && clinic.t_tarumi.split('\n').map((line, i) =>
                                        <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]}>{line}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 無料カウンセリング */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">無料カウンセリング</div>
                    {clinics.map((clinic, i) => (
                        // <div key={i} className={`shrink-0 w-32 md:w-40 px-2 py-4 flex flex-col items-center justify-center text-xs `}>
                        //     {clinic.t_counseling && clinic.t_counseling.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                        // </div>
                        <div key={i} className={`shrink-0 w-32 md:w-40 p-1.5 md:p-2 text-xs bg-white`}>
                            <div className={`p-2 w-full h-full flex flex-col items-center justify-center rounded-sm ${clinic.t_counseling_bg?"bg-orange-50":""}`}>
                                {clinic.t_counseling_icon > 0 &&
                                    <div className="my-2 w-10 h-10 flex items-center justify-center">
                                        {clinic.t_counseling_icon === 1 && <IconsTraiangle color="text-blue-300" />}
                                        {clinic.t_counseling_icon === 2 && <IconsCircle1 color="text-orange-300" />}
                                        {clinic.t_counseling_icon === 3 && <IconsCircle2 color="text-red-400" />}
                                    </div>
                                }
                                <div className="flex flex-col items-center gap-0.5 text-gray-700">
                                    {clinic.t_counseling && clinic.t_counseling.split('\n').map((line, i) =>
                                        <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]}>{line}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 地域 */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">地域</div>
                    {clinics.map((clinic, i) => (
                        // <div key={i} className={`shrink-0 w-32 md:w-40 px-2 py-4 flex flex-col items-center justify-center text-xs `}>
                        //     {clinic.t_place && clinic.t_place.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                        // </div>
                        <div key={i} className={`shrink-0 w-32 md:w-40 p-1.5 md:p-2 text-xs bg-white`}>
                            <div className={`p-2 w-full h-full flex flex-col items-center justify-center rounded-sm ${clinic.t_place_bg?"bg-orange-50":""}`}>
                                {clinic.t_place_icon > 0 &&
                                    <div className="my-2 w-10 h-10 flex items-center justify-center">
                                        {clinic.t_place_icon === 1 && <IconsTraiangle color="text-blue-300" />}
                                        {clinic.t_place_icon === 2 && <IconsCircle1 color="text-orange-300" />}
                                        {clinic.t_place_icon === 3 && <IconsCircle2 color="text-red-400" />}
                                    </div>
                                }
                                <div className="flex flex-col items-center gap-0.5 text-gray-700">
                                    {clinic.t_place && clinic.t_place.split('\n').map((line, i) =>
                                        <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]}>{line}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* おすすめの人 */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">おすすめの人</div>
                    {clinics.map((clinic, i) => (
                        // <div key={i} className={`shrink-0 w-32 md:w-40 px-2 py-4 flex flex-col items-center justify-center text-xs `}>
                        //     {clinic.t_recommend && clinic.t_recommend.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                        // </div>
                        <div key={i} className={`shrink-0 w-32 md:w-40 p-1.5 md:p-2 text-xs bg-white`}>
                            <div className={`p-2 w-full h-full flex flex-col items-center justify-center rounded-sm ${clinic.t_recommend_bg?"bg-orange-50":""}`}>
                                {clinic.t_recommend_icon > 0 &&
                                    <div className="my-2 w-10 h-10 flex items-center justify-center">
                                        {clinic.t_recommend_icon === 1 && <IconsTraiangle color="text-blue-300" />}
                                        {clinic.t_recommend_icon === 2 && <IconsCircle1 color="text-orange-300" />}
                                        {clinic.t_recommend_icon === 3 && <IconsCircle2 color="text-red-400" />}
                                    </div>
                                }
                                <div className="flex flex-col items-center gap-0.5 text-gray-700">
                                    {clinic.t_recommend && clinic.t_recommend.split('\n').map((line, i) =>
                                        <ReactMarkdown key={i} rehypePlugins={[rehypeRaw]}>{line}</ReactMarkdown>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 公式サイト */}
                <div className="w-fit flex divide-x divide-gray-700">
                    <div className="shrink-0 px-2 w-20 md:w-36 flex items-center justify-center text-center bg-orange-100">公式サイト</div>
                    {clinics.map((clinic, i) => (
                        <div key={i} className={`shrink-0 w-32 md:w-40 px-2 py-4 flex flex-col items-center justify-center text-xs `}>
                            <a href={getURL(clinic)} className="px-3 py-2 text-white font-bold bg-pink-500 shadow shadow-pink-400 rounded hover:opacity-70 active:opacity-100 transition-all">詳細を見る</a>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mx-4 md:mx-20 flex flex-col items-center justify-center">
                <div className="my-4 ">
                    <FontAwesomeIcon icon={faCaretDown} className="w-10 h-10 text-sky-400" />
                </div>
                <div className="mb-2">＼初めてのクマ取りならまずは相談！／</div>
                <div className="mb-2 w-full h-40 bg-slate-100">
                    <img src={clinics[0].thumbnail} alt="" className="object-contain w-full h-full" />
                </div>
                <a href={getURL(clinics[0])} className="relative py-4 w-full flex items-center justify-center text-white font-bold bg-pink-500 rounded hover:opacity-70 active:opacity-100 transition-all">
                    {clinics[0].name}を予約する
                    <FontAwesomeIcon icon={faArrowRightLong} className={"absolute top-1/2 right-1 md:right-4 transform -translate-y-1/2 w-4 h-4 text-white"}/>
                </a>
            </div>
        </>
    );
}
