"use client";

import { clinicsKumaAtom } from "@/_atoms/atoms_clinic";
import { ClinicKuma } from "@/_types/types_global";
import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightLong, faSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React from "react";


export default function KumaClinicList({clinics}: {clinics: ClinicKuma[]}) {

    const [isOpenOtherClinics, setIsOpenOtherClinics] = React.useState(false);

    const clinicsTop3 = clinics.slice(0, 3)
    const clinicsOther = clinics.slice(3)

    return (
        <>
            <div className="mb-8 px-10 py-6 text-center text-xl text-white font-bold bg-sky-400 shadow-lg">厳選！おすすめクリニック紹介</div>

            {clinicsTop3.map((clinic, i) => (
                <div key={i} className="mb-10 px-4 md:px-20 border-b border-gray-700">
                    <div className="mb-1 text-xs md:text-base text-pink-400 font-bold">{clinic.copy}</div>
                    <div className="mb-2">
                        <a href={clinic.url_official} className="text-lg md:text-2xl text-blue-800 font-bold underline hover:opacity-70 active:opacity-100 transition-all">{clinic.name}</a>
                    </div>
                    <div className="mb-8 ">
                        <a href={clinic.url_official} className="w-full h-44 md:h-52 bg-slate-50 hover:opacity-70 active:opacity-100 transition-all">
                            <img src={clinic.thumbnail} alt="" className="object-contain w-full h-full" />
                        </a>
                    </div>

                    <div className="mb-8 p-4 bg-yellow-50">
                        <div className="mb-4 w-full flex flex-col items-center justify-center">
                            <div className="mb-3 font-bold">{clinic.name}の特徴</div>
                            <div className="w-28 md:w-32 border-t border-emerald-300"></div>
                        </div>
                        <div className="px-2 md:px-6 flex flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_1}</div>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_2}</div>
                            <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_3}</div>
                        </div>
                    </div>

                    {clinic.clinic_kuma_course.length>0 && (
                        <div className="mb-1 flex flex-col divide-y divide-gray-900 text-xs border border-gray-900">
                            <div className="flex bg-orange-950 text-white font-bold">
                                <div className="shrink-0 w-24 md:w-40 px-4 flex items-center justify-center border-r border-white">施術</div>
                                <div className="p-2 md:p-4 w-full flex items-center justify-center">料金(税込)</div>
                            </div>
                            {clinic.clinic_kuma_course.map((course, i) => (
                                <div key={i} className="flex">
                                    <div className="shrink-0 w-24 md:w-40 px-4 flex flex-col items-center justify-center border-r border-gray-900 bg-orange-50">
                                        {course.name && course.name.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                    <div className="p-4 w-full flex flex-col items-center justify-center">
                                        {course.price && course.price.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mb-6 flex items-center justify-end text-sm md:text-base font-bold">
                        <div className="">【公式】</div>
                        <a href={clinic.url_official} className="text-blue-700 underline">{clinic.url_official}</a>
                    </div>

                    <div className="mb-6 text-sm leading-6">
                        {clinic.text && clinic.text.split('\n').map((line, i) => <div key={i} className="mb-3">{line}</div>)}
                    </div>

                    <div className="mb-1 flex flex-col divide-y divide-gray-900 text-xs border border-gray-900">
                        <div className="flex">
                            <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">営業時間</div>
                            <div className="p-3 md:p-4 w-full flex flex-col">
                                {clinic.opentime && clinic.opentime.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">医院数</div>
                            <div className="p-3 md:p-4 w-full flex flex-col">
                                {clinic.clinic_count && clinic.clinic_count.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">初回カウンセリング</div>
                            <div className="p-3 md:p-4 w-full flex flex-col">
                                {clinic.counseling && clinic.counseling.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">オプション</div>
                            <div className="p-3 md:p-4 w-full flex flex-col">
                                {clinic.option && clinic.option.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                            </div>
                        </div>
                        <div className="flex">
                            <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">麻酔代</div>
                            <div className="p-3 md:p-4 w-full flex flex-col">
                                {clinic.anesthesia && clinic.anesthesia.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                            </div>
                        </div>
                    </div>

                    <div className="my-16 flex items-center justify-center ">
                        <div className="p-6 w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-[0_0_5px_3px_rgba(0,0,0,0.05)]">
                            <div className="mb-1 flex items-center justify-center gap-2 text-pink-500">
                                <FontAwesomeIcon icon={faSlash} className="w-4 h-4" />
                                <div>{clinic.copy}</div>
                                <FontAwesomeIcon icon={faSlash} className="w-4 h-4 -scale-x-100" />
                            </div>
                            <div className="mb-2 w-60 h-32 bg-white">
                                <img src={clinic.img_logo} alt="" className="object-contain w-full h-full" />
                            </div>
                            <a href={clinic.url_official} className="relative py-4 w-full flex items-center justify-center text-white font-bold bg-pink-500 rounded hover:opacity-70 active:opacity-100 transition-all">
                                {clinic.name}を予約する
                                <FontAwesomeIcon icon={faArrowRightLong} className={"absolute top-1/2 right-1 md:right-4 transform -translate-y-1/2 w-4 h-4 text-white"}/>
                            </a>
                        </div>
                    </div>
                </div>
            ))}


            {(clinics.length>3 && !isOpenOtherClinics) && (
                <div className="mt-10 flex items-center justify-center">
                    <button onClick={()=>setIsOpenOtherClinics(true)} className="w-1/2 py-4 flex justify-center text-pink-500 font-bold border border-pink-500 rounded-full">4位以下をもっと見る</button>
                </div>
            )}

            {isOpenOtherClinics && (
                <>
                    {clinicsOther.map((clinic, i) => (
                        <div key={i} className="mb-10 px-4 md:px-20 border-b border-gray-700">
                            <div className="mb-1 text-xs md:text-base text-pink-400 font-bold">{clinic.copy}</div>
                            <div className="mb-2 text-lg md:text-2xl text-blue-800 font-bold underline">{clinic.name}</div>
                            <div className="mb-8 w-full h-44 md:h-52 bg-slate-50">
                                <img src={clinic.thumbnail} alt="" className="object-contain w-full h-full" />
                            </div>
        
                            <div className="mb-8 p-4 bg-yellow-50">
                                <div className="mb-4 w-full flex flex-col items-center justify-center">
                                    <div className="mb-3 font-bold">{clinic.name}の特徴</div>
                                    <div className="w-28 md:w-32 border-t border-emerald-300"></div>
                                </div>
                                <div className="px-2 md:px-6 flex flex-col gap-2 text-sm">
                                    <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_1}</div>
                                    <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_2}</div>
                                    <div className="flex items-center gap-2"><FontAwesomeIcon icon={faSquareCheck} className="w-4 h-4 text-pink-500" />{clinic.point_3}</div>
                                </div>
                            </div>
        
                            <div className="mb-1 flex flex-col divide-y divide-gray-900 text-xs border border-gray-900">
                                <div className="flex bg-orange-950 text-white font-bold">
                                    <div className="shrink-0 w-24 md:w-40 px-4 flex items-center justify-center border-r border-white">施術</div>
                                    <div className="p-2 md:p-4 w-full flex items-center justify-center">料金(税込)</div>
                                </div>
                                {clinic.clinic_kuma_course.map((course, i) => (
                                    <div key={i} className="flex">
                                        <div className="shrink-0 w-24 md:w-40 px-4 flex flex-col items-center justify-center border-r border-gray-900 bg-orange-50">
                                            {course.name && course.name.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                        </div>
                                        <div className="p-4 w-full flex flex-col items-center justify-center">
                                            {course.price && course.price.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                        </div>
                                    </div>
                                ))}
                            </div>
        
                            <div className="mb-6 flex items-center justify-end text-sm md:text-base font-bold">
                                <div className="">【公式】</div>
                                <div className="text-blue-700 underline">{clinic.url_official}</div>
                            </div>
        
                            <div className="mb-6 text-sm leading-6">
                                {clinic.text && clinic.text.split('\n').map((line, i) => <div key={i} className="mb-3">{line}</div>)}
                            </div>
        
                            <div className="mb-1 flex flex-col divide-y divide-gray-900 text-xs border border-gray-900">
                                <div className="flex">
                                    <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">営業時間</div>
                                    <div className="p-3 md:p-4 w-full flex flex-col">
                                        {clinic.opentime && clinic.opentime.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">医院数</div>
                                    <div className="p-3 md:p-4 w-full flex flex-col">
                                        {clinic.clinic_count && clinic.clinic_count.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">初回カウンセリング</div>
                                    <div className="p-3 md:p-4 w-full flex flex-col">
                                        {clinic.counseling && clinic.counseling.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">オプション</div>
                                    <div className="p-3 md:p-4 w-full flex flex-col">
                                        {clinic.option && clinic.option.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="px-2 md:px-0 shrink-0 w-24 md:w-40 flex items-center justify-center font-bold border-r border-gray-900 bg-orange-50">麻酔代</div>
                                    <div className="p-3 md:p-4 w-full flex flex-col">
                                        {clinic.anesthesia && clinic.anesthesia.split('\n').map((line, i) => <div key={i} className="">{line}</div>)}
                                    </div>
                                </div>
                            </div>
        
                            <div className="my-16 flex items-center justify-center ">
                                <div className="p-6 w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-[0_0_5px_3px_rgba(0,0,0,0.05)]">
                                    <div className="mb-1 flex items-center justify-center gap-2 text-pink-500">
                                        <FontAwesomeIcon icon={faSlash} className="w-4 h-4" />
                                        <div>{clinic.copy}</div>
                                        <FontAwesomeIcon icon={faSlash} className="w-4 h-4 -scale-x-100" />
                                    </div>
                                    <div className="mb-2 w-60 h-32 bg-white">
                                        <img src={clinic.img_logo} alt="" className="object-contain w-full h-full" />
                                    </div>
                                    <a href={clinic.url_official} className="relative py-4 w-full flex items-center justify-center text-white font-bold bg-pink-500 rounded hover:opacity-70 active:opacity-100 transition-all">
                                        {clinic.name}を予約する
                                        <FontAwesomeIcon icon={faArrowRightLong} className={"absolute top-1/2 right-1 md:right-4 transform -translate-y-1/2 w-4 h-4 text-white"}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}
