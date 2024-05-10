import { Lp } from "@/_types/types_global";
import { atom } from "jotai";


// ==================================================
// モーダル
// ==================================================
export const isOpenModalAddLpAtom = atom<boolean>(false);     // MODAL: ページ追加
export const addLpCategoryNameAtom = atom<string|null>(null); // MODAL: ページ追加: カテゴリ名

// ==================================================
// ページ
// ==================================================
export const lpsAtom = atom<Lp[]>([]);      // SIDEMENU: 表示状態
export const lpAtom = atom<Lp|null>(null);  // SIDEMENU: 表示状態


// ==================================================
// フォーム
// ==================================================
export const formLpIdAtom = atom<number|null>(null);      // FORM: ID
export const formLpNameAtom = atom<string>("");           // FORM: ページ名
export const formLpCategoryNameAtom = atom<string>("");   // FORM: カテゴリ名

export const formLpImgMainVisualAtom = atom<string>("");  // FORM: メインビジュアル
export const formIsDisplayBox1Atom = atom<boolean>(false);      // FORM: Box1（テーブル前）
export const formIsDisplayBox2Atom = atom<boolean>(false);      // FORM: Box2（リスト前）
export const formIsDisplayBox3Atom = atom<boolean>(false);      // FORM: Box3（検索前）
export const formLpBoxBeforeTableAtom = atom<string>("");      // FORM: テーブル前ボックス
export const formLpBoxBeforeListAtom = atom<string>("");      // FORM: リスト前ボックス
export const formLpBoxBeforeSearchAtom = atom<string>("");      // FORM: 検索前ボックス
export const formLpStatusPublishAtom = atom<number>(0);      // FORM: 公開ステータス
export const formLpCreatedAtAtom = atom<string|null>(null);      // FORM: 作成日
export const formLpUpdatedAtAtom = atom<string|null>(null);      // FORM: 更新日
