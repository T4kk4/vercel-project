// =============================================================================
// CLINIC KUMA
// =============================================================================
export type ClinicKuma = {
    id: number
    name: string
    url_official: string
    url_affiliate: string
    img_logo: string

    t_kiranai: string
    t_tarumi: string
    t_counseling: string
    t_place: string
    t_recommend: string
    t_kiranai_icon: number
    t_tarumi_icon: number
    t_counseling_icon: number
    t_place_icon: number
    t_recommend_icon: number
    t_kiranai_bg: number
    t_tarumi_bg: number
    t_counseling_bg: number
    t_place_bg: number
    t_recommend_bg: number

    copy: string
    thumbnail: string
    point_1: string
    point_2: string
    point_3: string
    text: string
    opentime: string
    clinic_count: string
    counseling: string
    option: string
    anesthesia: string
    type_blue: boolean
    type_brown: boolean
    type_black: boolean
    under_10000: boolean
    under_30000: boolean
    over_50000: boolean
    treatment_chusya: boolean
    treatment_sekkai: boolean
    tag_less_visits: boolean
    tag_non_surgical: boolean
    tag_post_7pm: boolean
    tag_free_counseling: boolean
    search_options: string
    created_at: string
    updated_at: string
    status_publish: number
    order_by: number
    clinic_kuma_course: ClinicKumaCourse[]
}


// =============================================================================
// CLINIC KUMA COURSE
// =============================================================================
export type ClinicKumaCourse = {
    id: number
    clinic_kuma_id: number
    name: string
    price: string
    created_at: string
    updated_at: string
    clinic_kuma: ClinicKuma
}


// =============================================================================
// PAGE
// =============================================================================
export type Lp = {
    id: number
    name: string
    category_name: string
    img_main_visual: string
    is_display_box_before_table: boolean
    is_display_box_before_list: boolean
    is_display_box_before_search: boolean
    box_before_table: string
    box_before_list: string
    box_before_search: string
    created_at: string
    updated_at: string
    status_publish: number
}


// =============================================================================
// Search Options
// =============================================================================
export type SearchOption = {
    id: number;
    category_name: string;
    search_options: string;
    created_at: string;
    updated_at: string;
}