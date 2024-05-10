'use client';

import React, {useState} from 'react';
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTv, faList } from '@fortawesome/free-solid-svg-icons'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Montserrat } from 'next/font/google';
import { montserrat } from '@/fonts';
import SideMenuPCUser from './SideMenuPCUser';


export default function SideMenuPC() {
    const router = useRouter()
    const pathname = usePathname()
    // const searchParams = useSearchParams()

    const menuItems = [
        {name: "クマ取り", pages: [
            {name: "基本設定", path: "/admin/kuma/setting"},
            {name: "LP編集", path: "/admin/kuma"},
            {name: "クリニック一覧", path: "/admin/kuma/clinic"},
        ]},
        {name: "二重整形", pages: []},
        {name: "脱毛", pages: []},
    ]

    return (
        <nav className="z-10 hidden md:block md:fixed w-56 py-4 px-4 left-0 top-0 bottom-0 overflow-y-auto overflow-hidden shadow-xl bg-white">
            <div className="w-full min-h-full mx-auto px-0 flex flex-col items-stretch justify-between">
                <div>
                    {/*=================================*/}
                    {/* サイドバー: ヘッダー */}
                    {/*=================================*/}
                    <div className=''>
                        <Link href="/" className="px-0 flex items-center gap-2 text-sm text-slate-700 font-bold">
                            <div className={`flex items-center text-gray-900 text-center font-bold text-lg ${montserrat.className}`}>
                                {process.env.NEXT_PUBLIC_SITE_NAME_HEADER}
                            </div>
                        </Link>
                    </div>
                    <hr className="my-4 md:min-w-full hidden lg:block"/>

                    {/* サイドバー: コンテンツ */}
                    <div className={"flex flex-col items-stretch opacity-100 relative"}>

                        {menuItems.map((menu, index) => (
                            <div key={index}>
                                <div className="mb-2 text-xs text-slate-400 font-bold">
                                    {menu.name}
                                </div>
                                <div className="flex flex-col md:mb-4">
                                    {menu.pages.map((page, index) => (
                                        <div key={index} className="items-center">
                                            <Link href={page.path} className={"py-2 flex items-center text-xs font-bold " +
                                                    (pathname === page.path
                                                        ? "text-blue-500 hover:text-blue-600"
                                                        : "text-slate-600 hover:text-slate-400")}>
                                                    <FontAwesomeIcon icon={faList} className={"w-4 mr-2 " +
                                                        (pathname === page.path
                                                            ? "opacity-75"
                                                            : "text-slate-300")
                                                    }/>
                                                    {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/*=================================*/}
                {/* サイドバー: フッター */}
                {/*=================================*/}
                <div>
                    {/* <SideMenuPCUser/> */}
                </div>
            </div>
        </nav>
    );
};