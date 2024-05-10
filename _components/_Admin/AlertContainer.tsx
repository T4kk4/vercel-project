'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { faCircleCheck, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { alertMessageAtom, alertTypeAtom, isShowingAlertAtom } from "@/_atoms/atoms_global";


export default function AlertContainer() {
    const [isShowingAlert, setIsShowingAlert] = useAtom(isShowingAlertAtom);
    const [alertMessage] = useAtom(alertMessageAtom)
    const [alertType] = useAtom(alertTypeAtom);
    const [hideAlert, setHideAlert] = useState(false);

    // ==============================
    // アラート表示後の処理（3秒間アラート表示を出すため）
    useEffect(() => {
        if (isShowingAlert) {
            const timer1 = setTimeout(() => { setHideAlert(true); }, 2500); // 2.5秒後にアラート非表示アニメーションを開始する
            const timer2 = setTimeout(() => { setIsShowingAlert(false); setHideAlert(false); }, 3000); // 3秒後にアラート非表示フラグを下げる
            return () => { clearTimeout(timer1); clearTimeout(timer2); };
        }
    }, [isShowingAlert, setIsShowingAlert]);

    return (
        <>
            {isShowingAlert &&
                <div className={`px-4 py-4 w-full fixed top-3 left-0 z-50 flex items-center justify-center gap-1 text-white ${hideAlert ? 'animate-slide-out-top' : 'animate-slide-in-top'}`}>
                {/* // <div className="px-4 py-4 w-full fixed top-3 left-0 z-50 flex items-center justify-center gap-1 text-white"> */}
                    {alertType === 'success' &&
                        <div className="py-4 w-full md:w-1/3 mx-auto flex items-center justify-center gap-1 border-2 border-emerald-700 text-emerald-700 bg-emerald-200 bg-opacity-90 rounded-xl font-bold">
                            <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
                            {alertMessage}
                        </div>
                    }
                    {alertType === 'error' &&
                        <div className="py-4 w-full md:w-1/3 mx-auto flex items-center justify-center gap-1 bg-red-500 bg-opacity-90 rounded-xl font-bold">
                            <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4" />
                            {alertMessage}
                        </div>
                    }
                </div>
            }
        </>
    );
}
