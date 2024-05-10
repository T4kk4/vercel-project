import React, { useMemo } from "react";
import {
    ColumnDef,          // 列定義
    flexRender,         // レンダリング
    getCoreRowModel,    // テーブルの行モデル
    getSortedRowModel,  // ソート済みのテーブルの行モデル
    Row,                // 行
    useReactTable,      // テーブルを作成
} from "@tanstack/react-table";
import { useAtom } from "jotai";
import { useVirtualizer } from "@tanstack/react-virtual";
import { lpsAtom } from "@/_atoms/atoms_lp";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


// 型定義: テーブルのカラム
export type DataTableColumn = {
    name: string;                                     // 列の名前
    width?: number;                                   // 列のカラム幅
    value: (row: string[]) => string;                 // 表示する値
    styledValue?: (row: string[]) => React.ReactNode; // 表示する値のスタイル
};

// テーブルの列定義
const columns: DataTableColumn[] = [
    {
        name: "ID",
        value: (row) => row[0],
        width: 80,
        // styledValue: (row) => {
        //     return <div className=""><span className={`px-2 py-1 text-xs text-center rounded bg-slate-200`}>{row[0]}</span></div>
        // }
    },
    // {
    //     name: "カテゴリ",
    //     value: (row) => row[1],
    //     width: 92,
    //     styledValue: (row) => {
    //         return <div className="px-1"><span className={`px-2 py-1 text-xs text-center rounded bg-slate-200`}>{row[1]}</span></div>
    //     }
    // },
    {
        name: "LP名",
        value: (row) => row[2],
    },
    // {
    //     name: "タイトル",
    //     value: (row) => row[2],
    //     width: 300,
    // },
    // {
    //     name: "商品数",
    //     value: (row) => row[3],
    //     width: 80,
    //     styledValue: (row) => {
    //         return <div className="px-1"><span className={`px-2 py-1 text-xs text-center rounded ${row[3]==="0"?"bg-slate-100":"bg-green-100"}`}>{row[3]}</span></div>
    //     }
    // },
    // {
    //     name: "依頼",
    //     value: (row) => row[4],
    //     width: 80,
    //     styledValue: (row) => {
    //         return <div className="px-1"><span className={`px-2 py-1 text-xs text-center rounded ${row[4]==="0"?"bg-slate-100":"bg-green-100"}`}>{row[4]}</span></div>
    //     }
    // },
    // {
    //     name: "掲載順",
    //     value: (row) => row[2],
    //     width: 80,
    //     styledValue: (row) => {
    //         return <div className="px-1"><span className={`px-2 py-1 text-xs text-center rounded bg-slate-100`}>{row[2]}</span></div>
    //     }
    // },
    {
        name: "公開",
        value: (row) => row[3],
        width: 80,
        styledValue: (row) => {
            if (row[3] === "公開") return <span className="px-2 py-1 text-xs bg-green-100 rounded">{row[3]}</span>
            return <span className="px-2 py-1 text-xs bg-slate-200 rounded">{row[3]}</span>
        }
    },
    // {
    //     name: "ｻｲﾄﾏｯﾌﾟ",
    //     value: (row) => row[7],
    //     width: 80,
    //     styledValue: (row) => {
    //         if (row[7] === "掲載") return <span className="px-2 py-1 text-xs bg-green-100 rounded">{row[7]}</span>
    //         return <span className="px-2 py-1 text-xs bg-slate-100 rounded">{row[7]}</span>
    //     }
    // },
    {
        name: "変更日",
        value: (row) => row[4],
        width: 100,
    },
];


export default function TableLpBody() {
    // ================================
    // Atom管理
    // ================================
    const [lps] = useAtom(lpsAtom);

    // ================================
    // ページ管理
    // ================================
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const keyword = searchParams.get('q') ? searchParams.get('q') : null;   // URL: 検索ワード


    // ================================
    // Topic: データ処理
    // ================================
    const data = useMemo(() => {
        return lps.map(lp => {

            return [
                lp.id.toString(),  // ID
                lp.category_name,  // カテゴリ
                lp.name,           // 名前
                lp.status_publish ? "公開" : "非公開",        // 公開
                lp.updated_at.substring(0, 10)     // 更新日
            ];
        });
    }, [lps]);

    // ================================
    // React Table: テーブル
    // ================================
    // テーブルのカラムを作成
    const columnDefs = React.useMemo<ColumnDef<string[]>[]>(() => {
        return columns.map((col) => ({
            id: col.name,
            accessorFn: (row) => row[columns.findIndex(c => c.name === col.name)], // 列の値
            cell: (info) => col.styledValue?.(info.row.original) ?? <span className="whitespace-nowrap">{col.value(info.row.original)}</span>, // 列の値をスタイル付きで表示する
            header: () => <strong>{col.name}</strong>,                             // 列名
            size: col.width,                                                       // 列幅
        }));
    }, [columns]);

    // テーブルのデータを作成
    const table = useReactTable({
        data,
        columns: columnDefs,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    // ================================
    // React Virtualizer: 表示されていない行を非表示にする
    // ================================
    // テーブルの高さを設定
    const tableContainerRef = React.useRef<HTMLDivElement>(null); // テーブルのコンテナ
    const { rows } = table.getRowModel();                         // テーブルの行

    const rowVirtualizer = useVirtualizer({
        getScrollElement: () => tableContainerRef.current, // テーブルのコンテナを取得
        count: rows.length,     // 要素の合計数
        estimateSize: () => 40, // 要素の1つの高さ
        overscan: 10,           // 余裕: 表示されていない行の数
    });

    const totalSize = rowVirtualizer.getTotalSize();      // テーブルの高さ: 1行の高さ * テーブルの行数
    const virtualRows = rowVirtualizer.getVirtualItems(); // 表示されている行


    const paddingTop = virtualRows.length > 0 ? virtualRows[0]?.start ?? 0 : 0;                                     // テーブルの上部の余白
    const paddingBottom = virtualRows.length > 0 ? totalSize - (virtualRows[virtualRows.length - 1]?.end ?? 0) : 0; // テーブルの下部の余白

    const minTableWidth = useMemo(
        () => columnDefs.reduce((acc, col) => acc + (col.size ?? 128), 0),
        [columnDefs],
    );

    // ================================
    // 詳細: ページ遷移
    // ================================
    const onClickRow = (row: Row<string[]>) => {
        const params = new URLSearchParams();     // パラメータ
        if (keyword) params.set('q', keyword);    // 検索ワードをパラメータに追加
        params.set('lp', row.original[0]);        // トピックIDをパラメータに追加
        const url = `${pathName}${params.toString() ? '?' + params.toString() : ''}`;
        router.push(url);
    }

    // console.log(virtualRows[0]?.start);
    // console.log(paddingTop);
    // console.log(table);
    // console.log(rows);
    // console.log(data);
    // console.log(rowVirtualizer);
    // console.log(rowVirtualizer.getVirtualItems());

    return (
        <div ref={tableContainerRef} className="overflow-auto h-full">
            <table className="border-collapse border-spacing-0 table-fixed w-full text-sm" style={{minWidth: minTableWidth,}}>

                {/* HEADER: テーブル */}
                <thead className="sticky top-0 m-0 bg-white shadow-sm">
                    {table.getHeaderGroups().map((headerGroup, headerGroupIndex) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, headerIndex) => {
                                return (
                                    <th key={header.id}
                                        colSpan={header.colSpan}
                                        style={{ width: header.column.columnDef.size }}
                                        className={`text-left text-sm px-1 pt-2 pb-3 h-10 ${headerGroupIndex === 0 && headerIndex === 0 ? "pl-2" : ""}`}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>

                {/* BODY: テーブル */}
                <tbody>
                    {paddingTop > 0 && (
                        <tr>
                            <td style={{ height: `${paddingTop}px` }} />
                        </tr>
                    )}
                    {virtualRows.map((virtualRow) => {
                        const row = rows[virtualRow.index] as Row<string[]>;
                        // console.log(row)
                        return (
                            <tr key={row.id} onClick={()=>onClickRow(row)} className="hover:bg-slate-100 active:bg-slate-200 cursor-pointer">
                                {row.getVisibleCells().map((cell, cellIndex) => {
                                    return (
                                        <td key={cell.id} className={`p-1 w-full h-10 overflow-x-auto ${cellIndex === 0 ? "pl-2 rounded-l" : ""}`}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                    {paddingBottom > 0 && (
                        <tr>
                            <td style={{ height: `${paddingBottom}px` }} />
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
