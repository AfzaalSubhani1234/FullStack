"use client";

import { useState } from "react";

export default function FolderForm({
    onAddFolder,
    userId,
}) {
    const [name, setName] =
        useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        if (!name.trim()) return;

        await onAddFolder(
            name,
            userId
        );

        setName("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Folder Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <button type="submit">
                Add Folder
            </button>
        </form>
    );
}