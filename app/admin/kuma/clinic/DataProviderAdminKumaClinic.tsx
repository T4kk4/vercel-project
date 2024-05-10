"use client";

import { clinicKumaAtom, clinicsKumaAtom } from "@/_atoms/atoms_clinic";
import { searchOptionAtom } from "@/_atoms/atoms_searchOption";
import { ClinicKuma, SearchOption } from "@/_types/types_global";
import { useAtom } from "jotai";
import React, { useEffect } from "react";


export default function DataProviderAdminKumaClinic({baseClinics, baseClinic, baseSearchOption}: {baseClinics: ClinicKuma[], baseClinic: ClinicKuma, baseSearchOption: SearchOption}) {

    // ==============================
    // Atom管理
    // ==============================
    // --- データ一覧 ---
    const [clinics, setClinics] = useAtom(clinicsKumaAtom);            // トピック一覧
    const [clinic, setClinic] = useAtom(clinicKumaAtom);               // トピック一覧
    const [searchOption, setSearchOption] = useAtom(searchOptionAtom); // 検索オプション


    useEffect(() => {
        // ==============================
        // 初期化
        // ==============================
        // --- データ一覧 ---
        setClinics(baseClinics);
        setClinic(baseClinic);
        setSearchOption(baseSearchOption);
    }, [baseClinics, baseClinic, setClinics, setClinic, baseSearchOption, setSearchOption]);

    return <></>;
}
