import "./globals.css";


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
    return (
        <html lang="ja">
            <body className={`bg-slate-100`}>{children}</body>
        </html>
    );
}
