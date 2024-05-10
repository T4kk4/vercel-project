import { SearchOption } from "@/_types/types_global";
import { atom } from "jotai"


// ==================================================
// モーダル
// ==================================================
export const searchOptionAtom = atom<SearchOption|null>(null); // MODAL: クリニック追加
