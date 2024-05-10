"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// ====================================
// ClinicKuma
// ====================================
// --- テーブル用: 検索全件取得 ---
export async function tableSearchClinicKumas(keyword:string|null=null) {
    let query = supabase.from("clinic_kuma").select(`*, clinic_kuma_course(id)`).order("order_by", { ascending: true }).order("created_at", { ascending: false })
    if (keyword != null && keyword != "") query = query.ilike('name', `%${keyword}%`);
    return await query;
};

// --- 取得: 1件 ---
export async function getClinicKumaById(id:string) {
    return await supabase.from("clinic_kuma").select(`*, clinic_kuma_course(*)`).eq('id', id).single();
};

// --- 取得: 1件 名前 ---
export async function getClinicKumaByName(name:string) {
    return await supabase.from("clinic_kuma").select(`*, clinic_kuma_course(*)`).eq('name', name).single();
};

// --- 取得: 全件 ---
export async function getClinicKumas() {
    return await supabase.from("clinic_kuma").select(`*, clinic_kuma_course(*)`).eq('status_publish', 1).order("order_by", { ascending: true });
};

// --- 更新 ---
export async function updateClinicKuma(clinic: any) {
    return await supabase.from("clinic_kuma").update(clinic).eq('id', clinic.id).select("*").single();
};

// --- 新規作成 ---
export async function insertClinicKuma(clinic: any) {
    return await supabase.from("clinic_kuma").insert(clinic).select("*").single();
};


// --- 新規作成: キーワードから取得or作成 ---
export async function upsertClinicKumaByName(name:string) {
    console.log("upsertClinicKumaByName", name);
    try {
        let newClinicKuma = null;
        // --- keywordでSelectPostを取得 ---
        const {data: resClinicKuma} = await getClinicKumaByName(name); // API: ClinicKumaを取得
        // --- keywordが同じSelectPostが存在する場合: 取得 ---
        if (resClinicKuma) {
            newClinicKuma = resClinicKuma
        }
        // --- keywordが同じSelectPostが存在しない場合: 新規作成 ---
        else {
            const {data: resInsertClinic} = await insertClinicKuma({name: name}); // API: SelectPostを作成
            newClinicKuma = resInsertClinic
        }
        return {data: newClinicKuma, error: null};
    } catch (error) {
        console.log(error);
        return {data: null, error: error};
    }
}

// ====================================
// ClinicKumaCourse
// ====================================
// --- 新規作成: 1件 ---
export async function insertClinicKumaCourse(clinicKumaCourse: any) {
    return await supabase.from("clinic_kuma_course").insert(clinicKumaCourse).select("*").single();
};

// --- 更新: 1件 ---
export async function updateClinicKumaCourse(clinicKumaCourse: any) {
    return await supabase.from("clinic_kuma_course").update(clinicKumaCourse).eq('id', clinicKumaCourse.id).select("*").single();
};

// --- 削除: 1件 ---
export async function deleteClinicKumaCourse(id: string|number) {
    return await supabase.from("clinic_kuma_course").delete().eq('id', id).select("*").single();
};