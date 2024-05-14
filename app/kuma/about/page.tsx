import { notoSansJP } from "@/fonts";
import React from "react";

export default function KumaAbout() {
    return (
        <div className={`my-10 px-4 py-10 md:p-10 max-w-3xl mx-auto bg-white shado-lg ${notoSansJP.className}`}>
            <div className="mb-6 flex items-center justify-center">
                <h1 className="text-xl font-bold">運営会社</h1>
            </div>

            <div className="mb-4 px-3 py-2 border-l-2 border-sky-400 text-lg font-bold">
                運営会社情報
            </div>

            <div className="p-2 flex flex-col text-sm md:text-base text-gray-700 border border-gray-700 rounded-lg">
                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">媒体運営元</div>
                    <div className="p-1 w-full">株式会社ととっぷ</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">所在地</div>
                    <div className="p-1 w-full">〒102-0083 東京都千代田区麹町5-5-1 葵シャトー3F</div>
                </div>

                <div className="flex items-center">
                    <div className="p-1 shrink-0 w-1/4 md:w-1/5 font-bold">電話番号</div>
                    <div className="p-1 w-full">03-4405-7741</div>
                </div>
            </div>
        </div>
    );
}
