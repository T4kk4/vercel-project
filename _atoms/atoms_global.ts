import { atom } from "jotai"


// ==================================================
// メニュー
// ==================================================
export const isOpenSideMenuAtom = atom<boolean>(true)   // SIDEMENU: 表示状態


//==================================================
// ローディング
//==================================================
export const isLoadingAtom = atom<boolean>(false)   // LOADING: 表示状態


//==================================================
// アラート
//==================================================
export const isShowingAlertAtom = atom<boolean>(false)
export const alertMessageAtom = atom<string>("")
export const alertTypeAtom = atom<"success" | "error" | "copy">("success")


//==================================================
// モーダル
//==================================================
export const isOpenLoginModalAtom = atom(false);                       // MODAL: [ログイン]表示状態