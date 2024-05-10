"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// ====================================
// Lp
// ====================================
// --- 取得: 1件 ---
export async function getLpById(id:string) {
    return await supabase.from("lp").select(`*`).eq('id', id).single();
};


// --- 新規作成 ---
export async function insertLps(pages:any[]) {
    return await supabase.from("lp").insert(pages).select(`*`);
};

// --- 更新 ---
export async function updateLp(lp:any) {
    return await supabase.from("lp").update(lp).eq('id', lp.id).select("*").single();
}


// --- テーブル用: 検索全件取得 ---
export async function tableSearchLps(keyword:string|null=null, category_name:string|null=null) {
    let query = supabase.from("lp").select(`*`).order("created_at", { ascending: false })
    if (keyword != null && keyword != "") query = query.ilike('name', `%${keyword}%`);
    if (category_name != null && category_name != "") query = query.eq('category_name', category_name);
    return await query;
};

