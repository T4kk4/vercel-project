import { ClinicKuma } from "@/_types/types_global";


export const getURL = (clinic: ClinicKuma) => {
    // clinic.url_affiliateが空欄でなければ、それを返す。空欄ならclinic.url_officialを返す
    if (clinic.url_affiliate) return clinic.url_affiliate;
    return clinic.url_official;
}