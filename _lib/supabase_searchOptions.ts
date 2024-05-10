"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


// ====================================
// SearchOptions
// ====================================
// --- 取得: 特定のcategory_name ---
export async function getSearchOptionsByCategoryName(category_name:string) {
    return await supabase.from("search_option").select("*").eq('category_name', category_name).single();
};

// --- 新規追加: 検索条件 ---
export async function insertSearchOption(searchOption: any) {
    return await supabase.from("search_option").insert(searchOption).select("*").single();
};

// --- 更新: 検索条件 ---
export async function updateSearchOption(searchOption: any) {
    return await supabase.from("search_option").update(searchOption).eq('id', searchOption.id).select("*").single();
};

