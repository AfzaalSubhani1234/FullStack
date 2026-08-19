"use client";

import { useState } from "react";

export default function BookmarkForm({
    onSubmit,
    folderId,
    userId,
}) {
    const [title, setTitle] =
        useState("");

    const [url, setUrl] =
        useState("");

    const [note, setNote] =
        useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!title || !url) {
            return;
        }

        await onSubmit({
            title,
            url,
            note,
            folder_id: folderId,
            user_id: userId,
        });

        setTitle("");
        setUrl("");
        setNote("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) =>
                    setTitle(e.target.value)
                }
            />

            <br />
            <br />

            <input
                type="text"
                placeholder="URL"
                value={url}
                onChange={(e) =>
                    setUrl(e.target.value)
                }
            />

            <br />
            <br />

            <textarea
                placeholder="Note"
                value={note}
                onChange={(e) =>
                    setNote(e.target.value)
                }
            />

            <br />
            <br />

            <button type="submit">
                Save Bookmark
            </button>
        </form>
    );
}