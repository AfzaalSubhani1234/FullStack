"use client";

import { useState } from "react";

export default function BookmarkEditForm({
    bookmark,
    onUpdate,
    onCancel,
}) {
    const [title, setTitle] =
        useState(
            bookmark.title
        );

    const [url, setUrl] =
        useState(
            bookmark.url
        );

    const [note, setNote] =
        useState(
            bookmark.note || ""
        );

    async function handleSubmit(
        e
    ) {
        e.preventDefault();

        await onUpdate(
            bookmark.id,
            {
                title,
                url,
                note,
            }
        );
    }

    return (
        <form
            onSubmit={
                handleSubmit
            }
        >
            <input
                value={title}
                onChange={(e) =>
                    setTitle(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <input
                value={url}
                onChange={(e) =>
                    setUrl(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <textarea
                value={note}
                onChange={(e) =>
                    setNote(
                        e.target.value
                    )
                }
            />

            <br />
            <br />

            <button
                type="submit"
            >
                Update
            </button>

            <button
                type="button"
                onClick={
                    onCancel
                }
            >
                Cancel
            </button>
        </form>
    );
}