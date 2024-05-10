import AlertContainer from "@/_components/_Admin/AlertContainer";
import SideMenuPC from "@/_components/_Admin/Menus/SideMenuPC";


export default function AdminLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <div>
            {/* --- サイドメニュー --- */}
            <SideMenuPC/>
            <main className="md:ml-56 relative min-h-screen bg-slate-200">
                {/* <LoginStateProvider> */}
                    {children}
                {/* </LoginStateProvider> */}
            </main>

            {/* --- ログインモーダル --- */}
            {/* <LoginModal/> */}

            {/* --- アラートメッセージ --- */}
            <AlertContainer/>
        </div>
    );
}