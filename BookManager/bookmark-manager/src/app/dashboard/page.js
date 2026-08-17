"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import FolderForm from "@/components/FolderForm";
import {
    getFolders,
    createFolder,
} from "@/services/folderService";
import styles from "./dashboard.module.css";

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return;
        }

        setUser(user);

        loadFolders();
    }

    async function loadFolders() {
        try {
            const data = await getFolders();
            setFolders(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAddFolder(name, userId) {
        try {
            await createFolder(name, userId);

            loadFolders();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>

            {user && (
                <FolderForm
                    onAddFolder={handleAddFolder}
                    userId={user.id}
                />
            )}

            <h2>Folders</h2>

            <ul>
                {folders.map((folder) => (
                    <li key={folder.id}>
                        {folder.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}