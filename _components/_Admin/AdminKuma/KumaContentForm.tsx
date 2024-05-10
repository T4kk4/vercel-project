"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function KumaContentForm() {

    const [formMainVisual, setFormMainVisual] = React.useState<string>("")
    const [formBox1, setFormBox1] = React.useState<string>("")
    const [formBox2, setFormBox2] = React.useState<string>("")
    const [formBox3, setFormBox3] = React.useState<string>("")

    useEffect(() => {
    }, [formMainVisual, formBox1, formBox2, formBox3]);

    return (
        <div className="p-10 flex gap-4">
            <div className="w-1/2 flex flex-col text-sm">
                {/* メインビジュアル */}
                <div className="mb-2">
                    <div className="mb-0.5 text-xs font-bold">メインビジュアル</div>
                    <input type="text" placeholder="画像URL" value={formMainVisual} onChange={(e)=>setFormMainVisual(e.target.value)} className="p-2 w-full rounded-lg"/>
                </div>

                <div className="mb-2">
                    <div className="mb-0.5 text-xs font-bold">Box1</div>
                    <textarea name="" rows={5} placeholder="box1（Markdown記法）" value={formBox1} onChange={(e)=>setFormBox1(e.target.value)} className="p-2 w-full rounded-lg"/>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">表: クリニック</div>
                </div>

                <div className="mb-2">
                    <div className="mb-0.5 text-xs font-bold">Box2</div>
                    <textarea name="" rows={5} placeholder="box2（Markdown記法）" value={formBox2} onChange={(e)=>setFormBox2(e.target.value)} className="p-2 w-full rounded-lg"/>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">リスト: クリニック</div>
                </div>

                <div className="mb-2">
                    <div className="mb-0.5 text-xs font-bold">Box3</div>
                    <textarea name="" rows={5} placeholder="box3（Markdown記法）" value={formBox3} onChange={(e)=>setFormBox3(e.target.value)} className="p-2 w-full rounded-lg"/>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">検索</div>
                </div>
            </div>

            <div className="w-1/2 flex flex-col gap-2 p-2 bg-white">
                <ReactMarkdown>{`![](${formMainVisual})`}</ReactMarkdown>
                <ReactMarkdown>{formBox1}</ReactMarkdown>
                <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">表: クリニック</div>
                <ReactMarkdown>{formBox2}</ReactMarkdown>
                <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">リスト: クリニック</div>
                <ReactMarkdown>{formBox3}</ReactMarkdown>
                <div className="p-6 text-sm text-gray-400 border bg-slate-300 rounded-lg">検索</div>
            </div>
        </div>
    );
}
