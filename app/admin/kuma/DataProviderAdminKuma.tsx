"use client";

import { lpAtom, lpsAtom } from "@/_atoms/atoms_lp";
import { Lp } from "@/_types/types_global";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

export default function DataProviderAdminKuma({baseLps, baseLp}: {baseLps: Lp[], baseLp: Lp}) {

    // ==============================
    // Atom管理
    // ==============================
    // --- データ一覧 ---
    const [lps, setLps] = useAtom(lpsAtom);       // トピック一覧
    const [lp, setLp] = useAtom(lpAtom);       // トピック一覧


    useEffect(() => {
        // ==============================
        // 初期化
        // ==============================
        // --- データ一覧 ---
        console.log("baseLps", baseLps)
        console.log("baseLp", baseLp)
        setLps(baseLps);
        setLp(baseLp);
    }, [baseLps, baseLp, setLps, setLp]);

    return <></>;
}