import { notoSansJP } from "@/fonts";
import React from "react";

export default function KumaInfo() {

    return (
        <div className={`my-10 px-4 py-10 md:p-10 max-w-3xl mx-auto bg-white shado-lg ${notoSansJP.className}`}>
            <div className="mb-6 flex items-center justify-center">
                <h1 className="text-xl font-bold">調査概要</h1>
            </div>

            <div className="mb-4 px-3 py-2 border-l-2 border-sky-400 text-lg font-bold">
                【調査の企画】クマ取り整形調査部
            </div>
            <div className="p-2 flex flex-col text-sm md:text-base text-gray-700 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査目的</div>
                    <div className="p-1 w-full">クマ取り整形に関するアンケート調査</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査方法</div>
                    <div className="p-1 w-full">Webアンケート</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査対象地域</div>
                    <div className="p-1 w-full">日本国内</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査の母集団</div>
                    <div className="p-1 w-full">20代～50代までの女性で、かつインターネットユーザー</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査対象者</div>
                    <div className="p-1 w-full">うちアンケートに回答があったユーザー</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">有効回答数</div>
                    <div className="p-1 w-full">200名</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">調査の期間</div>
                    <div className="p-1 w-full">2024/3/1～2024/3/31</div>
                </div>
            </div>
        </div>
    );
}
