"use client";

import { clinicsKumaAtom } from '@/_atoms/atoms_clinic';
import { ClinicKuma } from '@/_types/types_global';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react'

export default function DataProviderKumaResult({baseClinics}: {baseClinics: ClinicKuma[]}) {

    // ==============================
    // Atom管理
    // ==============================
    // --- データ一覧 ---
    const [, setClinics] = useAtom(clinicsKumaAtom);       // トピック一覧

    useEffect(() => {
        // ==============================
        // 初期化
        // ==============================
        // --- データ一覧 ---
        setClinics(baseClinics);
    }, [baseClinics, setClinics]);
    return <></>
}