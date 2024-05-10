import { searchTextAtom } from "@/_atoms/atoms_table";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import React from "react";


export default function TableSearchBar() {

    // ============================
    // ページ情報
    // ============================
    const router = useRouter();
    const pathName = usePathname();

    // ============================
    // Atom管理
    // ============================
    const [formText, setFormText] = useAtom(searchTextAtom);

    // ============================
    // 関数
    // ============================
    // --- 検索ボタン押下時 ---
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formText);
        const params = new URLSearchParams();     // パラメータ
        if (formText) params.set('q', formText);  // 検索ワードをパラメータに追加
        const url = `${pathName}${params.toString() ? '?' + params.toString() : ''}`;
        router.push(url);
    }

    return (
        <>
            <form onSubmit={onSubmit} className="relative text-gray-700">
                <FontAwesomeIcon icon={faSearch} className="pl-4 absolute top-1/2 left-0 transform -translate-y-1/2 w-4 h-4" />
                <input type="text" value={formText} onChange={(e) => setFormText(e.target.value)} className="w-full h-10 p-2 pl-10 py-2 bg-gray-50 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500" />
                <button type="submit" className="absolute top-1/2 right-0 transform -translate-y-1/2 w-20 h-10 text-white bg-blue-500 rounded-r">検索</button>
            </form>
        </>
    );
}
