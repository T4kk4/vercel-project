import { formIsDisplayBox1Atom, formIsDisplayBox2Atom, formIsDisplayBox3Atom, formLpBoxBeforeListAtom, formLpBoxBeforeSearchAtom, formLpBoxBeforeTableAtom, formLpImgMainVisualAtom } from "@/_atoms/atoms_lp";
import { useAtom } from "jotai";
import React from "react";


export default function TableLpDetailContent() {
    const [formLpImgMainVisual, setFormLpImgMainVisual] = useAtom(formLpImgMainVisualAtom);        // FORM: メインビジュアル
    const [formIsDisplayBox1, setFormIsDisplayBox1] = useAtom(formIsDisplayBox1Atom);              // FORM: Box1（テーブル前）
    const [formIsDisplayBox2, setFormIsDisplayBox2] = useAtom(formIsDisplayBox2Atom);              // FORM: Box2（リスト前）
    const [formIsDisplayBox3, setFormIsDisplayBox3] = useAtom(formIsDisplayBox3Atom);              // FORM: Box3（検索前）
    const [formLpBoxBeforeTable, setFormLpBoxBeforeTable] = useAtom(formLpBoxBeforeTableAtom);     // FORM: テーブル前ボックス
    const [formLpBoxBeforeList, setFormLpBoxBeforeList] = useAtom(formLpBoxBeforeListAtom);        // FORM: リスト前ボックス
    const [formLpBoxBeforeSearch, setFormLpBoxBeforeSearch] = useAtom(formLpBoxBeforeSearchAtom);  // FORM: 検索前ボックス

    return (
        <div>
            <div className="flex flex-col gap-2 text-sm">
                {/* メインビジュアル */}
                <div className="mb-2">
                    <div className="mb-1 text-xs font-bold">TOP画像</div>
                    <input type="text" placeholder="画像URL" value={formLpImgMainVisual} onChange={(e)=>setFormLpImgMainVisual(e.target.value)} className="p-2 w-full rounded-lg"/>
                </div>

                <div className="mb-2">
                    <div className="mb-1 flex items-center justify-between">
                        <div className="text-xs font-bold">Box1</div>
                        <div className="p-1 flex items-center bg-white rounded-lg">
                            <button onClick={()=>setFormIsDisplayBox1(true)} className={`px-2 py-1 text-xs rounded-lg ${formIsDisplayBox1?"bg-slate-400 text-white":"text-gray-400"}`}>表示</button>
                            <button onClick={()=>setFormIsDisplayBox1(false)} className={`px-2 py-1 text-xs rounded-lg ${!formIsDisplayBox1?"bg-slate-400 text-white":"text-gray-400"}`}>非表示</button>
                        </div>
                    </div>
                    <div className="relative">
                        <textarea name="" rows={5} placeholder="box1（Markdown記法）" value={formLpBoxBeforeTable} onChange={(e)=>setFormLpBoxBeforeTable(e.target.value)} className="p-2 w-full rounded-lg"/>
                        {!formIsDisplayBox1 && <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex items-center justify-center text-white font-bold text-lg rounded-lg">非表示中</div>}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 bg-slate-200 rounded">クリニック: 表</div>
                </div>

                <div className="mb-2">
                    <div className="mb-1 flex items-center justify-between">
                        <div className="text-xs font-bold">Box2</div>
                        <div className="p-1 flex items-center bg-white rounded-lg">
                            <button onClick={()=>setFormIsDisplayBox2(true)} className={`px-2 py-1 text-xs rounded-lg ${formIsDisplayBox2?"bg-slate-400 text-white":"text-gray-400"}`}>表示</button>
                            <button onClick={()=>setFormIsDisplayBox2(false)} className={`px-2 py-1 text-xs rounded-lg ${!formIsDisplayBox2?"bg-slate-400 text-white":"text-gray-400"}`}>非表示</button>
                        </div>
                    </div>
                    <div className="relative">
                        <textarea name="" rows={5} placeholder="box2（Markdown記法）" value={formLpBoxBeforeList} onChange={(e)=>setFormLpBoxBeforeList(e.target.value)} className="p-2 w-full rounded-lg"/>
                        {!formIsDisplayBox2 && <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex items-center justify-center text-white font-bold text-lg rounded-lg">非表示中</div>}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 bg-slate-200 rounded">クリニック: おすすめリストXX選</div>
                </div>

                <div className="mb-2">
                    <div className="mb-1 flex items-center justify-between">
                        <div className="text-xs font-bold">Box3</div>
                        <div className="p-1 flex items-center bg-white rounded-lg">
                            <button onClick={()=>setFormIsDisplayBox3(true)} className={`px-2 py-1 text-xs rounded-lg ${formIsDisplayBox3?"bg-slate-400 text-white":"text-gray-400"}`}>表示</button>
                            <button onClick={()=>setFormIsDisplayBox3(false)} className={`px-2 py-1 text-xs rounded-lg ${!formIsDisplayBox3?"bg-slate-400 text-white":"text-gray-400"}`}>非表示</button>
                        </div>
                    </div>
                    <div className="relative">
                        <textarea name="" rows={5} placeholder="box3（Markdown記法）" value={formLpBoxBeforeSearch} onChange={(e)=>setFormLpBoxBeforeSearch(e.target.value)} className="p-2 w-full rounded-lg"/>
                        {!formIsDisplayBox3 && <div className="z-10 absolute top-0 left-0 w-full h-full bg-gray-700 bg-opacity-70 flex items-center justify-center text-white font-bold text-lg rounded-lg">非表示中</div>}
                    </div>
                </div>

                <div className="mb-2">
                    <div className="p-6 text-sm text-gray-400 bg-slate-200 rounded">検索</div>
                </div>
            </div>
        </div>
    );
}
