"use client";

import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function BoxContent({ content }: { content: string }) {
    useEffect(() => {
        const paragraphs = document.querySelectorAll('.box p');
        paragraphs.forEach(p => {
            // `<p>` タグの中に `<img>` タグが存在するかチェック
            if (p.querySelector('img')) {
                // `<img>` タグが存在する場合、パディングを除去
                p.classList.remove('px-4', 'md:px-20');
            } else {
                // `<img>` タグが存在しない場合、パディングを追加
                p.classList.add('px-4', 'md:px-20');
            }
        });
    }, [content]);  // `content` が変更された場合に再実行

    return <ReactMarkdown>{content}</ReactMarkdown>;
}