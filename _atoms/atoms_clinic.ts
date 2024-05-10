import { ClinicKuma, ClinicKumaCourse } from "@/_types/types_global"
import { atom } from "jotai"


// ==================================================
// モーダル
// ==================================================
export const isOpenModalAddClinicKumaAtom = atom<boolean>(false); // MODAL: クリニック追加

// ==================================================
// クリニック
// ==================================================
export const clinicsKumaAtom = atom<ClinicKuma[]>([]);      // SIDEMENU: 表示状態
export const clinicKumaAtom = atom<ClinicKuma|null>(null);  // SIDEMENU: 表示状態

export const formClinicKumaIdAtom = atom<number|null>(null);    // CLINIC: ID
export const formClinicKumaNameAtom = atom<string>("");         // CLINIC: 名前
export const formClinicKumaUrlOfficialAtom = atom<string>("");  // CLINIC: 公式URL
export const formClinicKumaUrlAffiliateAtom = atom<string>(""); // CLINIC: アフィリエイトURL
export const formClinicKumaImgLogoAtom = atom<string>("");      // CLINIC: ロゴ画像
export const formClinicKumaTKiranaiAtom = atom<string>("");     // CLINIC: 表: 切らない
export const formClinicKumaTTarumiAtom = atom<string>("");      // CLINIC: 表: たるみ
export const formClinicKumaTCounselingAtom = atom<string>("");  // CLINIC: 表: カウンセリング
export const formClinicKumaTPlaceAtom = atom<string>("");       // CLINIC: 表: 場所
export const formClinicKumaTRecommendAtom = atom<string>("");   // CLINIC: 表: おすすめ
export const formClinicKumaTKiranaiIconAtom = atom<number>(0);     // CLINIC: 表: Icon 切らない
export const formClinicKumaTTarumiIconAtom = atom<number>(0);      // CLINIC: 表: Icon たるみ
export const formClinicKumaTCounselingIconAtom = atom<number>(0);  // CLINIC: 表: Icon カウンセリング
export const formClinicKumaTPlaceIconAtom = atom<number>(0);       // CLINIC: 表: Icon 場所
export const formClinicKumaTRecommendIconAtom = atom<number>(0);   // CLINIC: 表: Icon おすすめ
export const formClinicKumaTKiranaiBgAtom = atom<number>(0);     // CLINIC: 表: Bg 切らない
export const formClinicKumaTTarumiBgAtom = atom<number>(0);      // CLINIC: 表: Bg たるみ
export const formClinicKumaTCounselingBgAtom = atom<number>(0);  // CLINIC: 表: Bg カウンセリング
export const formClinicKumaTPlaceBgAtom = atom<number>(0);       // CLINIC: 表: Bg 場所
export const formClinicKumaTRecommendBgAtom = atom<number>(0);   // CLINIC: 表: Bg おすすめ

export const formClinicKumaCopyAtom = atom<string>("");         // CLINIC: コピー
export const formClinicKumaThumbnailAtom = atom<string>("");    // CLINIC: サムネイル
export const formClinicKumaPoint1Atom = atom<string>("");       // CLINIC: ポイント1
export const formClinicKumaPoint2Atom = atom<string>("");       // CLINIC: ポイント2
export const formClinicKumaPoint3Atom = atom<string>("");       // CLINIC: ポイント3
export const formClinicKumaTextAtom = atom<string>("");         // CLINIC: 本文
export const formClinicKumaOpentimeAtom = atom<string>("");     // CLINIC: 営業時間
export const formClinicKumaClinicCountAtom = atom<string>("");  // CLINIC: クリニック数
export const formClinicKumaCounselingAtom = atom<string>("");   // CLINIC: カウンセリング
export const formClinicKumaOptionAtom = atom<string>("");      // CLINIC: オプション
export const formClinicKumaAnesthesiaAtom = atom<string>("");   // CLINIC: 麻酔
export const formClinicKumaTypeBlueAtom = atom<boolean>(false); // CLINIC: タイプ: 青
export const formClinicKumaTypeBrownAtom = atom<boolean>(false);// CLINIC: タイプ: 茶
export const formClinicKumaTypeBlackAtom = atom<boolean>(false);// CLINIC: タイプ: 黒
export const formClinicKumaUnder10000Atom = atom<boolean>(false);        // CLINIC: フィルタ: 1万円以下
export const formClinicKumaUnder30000Atom = atom<boolean>(false);        // CLINIC: フィルタ: 3万円以下
export const formClinicKumaOver50000Atom = atom<boolean>(false);         // CLINIC: フィルタ: 5万円以上
export const formClinicKumaTreatmentChusyaAtom = atom<boolean>(false);   // CLINIC: フィルタ: 初診時のみ
export const formClinicKumaTreatmentSekkaiAtom = atom<boolean>(false);   // CLINIC: フィルタ: 切開
export const formClinicKumaTagLessVisitsAtom = atom<boolean>(false);     // CLINIC: フィルタ: 来院回数少ない
export const formClinicKumaTagNonSurgicalAtom = atom<boolean>(false);    // CLINIC: フィルタ: 非手術
export const formClinicKumaTagPost7pmAtom = atom<boolean>(false);        // CLINIC: フィルタ: 19時以降
export const formClinicKumaTagFreeCounselingAtom = atom<boolean>(false); // CLINIC: フィルタ: カウンセリング無料
export const formClinicKumaCreatedAtAtom = atom<string>("");             // CLINIC: 作成日
export const formClinicKumaUpdatedAtAtom = atom<string>("");             // CLINIC: 更新日
export const formClinicKumaStatusPublishAtom = atom<number>(0);          // CLINIC: 公開状態
export const formClinicKumaOrderByAtom = atom<number>(999);              // CLINIC: 並び順
export const formClinicKumaSearchOptionsAtom = atom<string>("");         // CLINIC: 検索条件

export const formClinicKumaCoursesAtom = atom<ClinicKumaCourse[]>([]);   // CLINIC: コース
