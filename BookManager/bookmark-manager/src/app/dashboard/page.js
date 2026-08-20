"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
    getCurrentUser,
    logout,
} from "@/services/authService";

import {
    getFolders,
    createFolder,
    deleteFolder,
} from "@/services/folderService";

import {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark,
} from "@/services/bookmarkService";

import FolderForm from "@/components/FolderForm";
import FolderList from "@/components/FolderList";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import BookmarkEditForm from "@/components/BookmarkEditForm";

import styles from "./dashboard.module.css";

export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] = useState(null);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] =
        useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [search, setSearch] = useState("");
    const [editingBookmark, setEditingBookmark] =
        useState(null);

    useEffect(() => {
        initialize();
    }, []);

    async function initialize() {
        const currentUser =
            await getCurrentUser();

        if (!currentUser) {
            router.push("/login");
            return;
        }

        setUser(currentUser);

        await loadFolders();
    }

    async function loadFolders() {
        try {
            const data = await getFolders();

            setFolders(data);

            if (data.length > 0) {
                setSelectedFolder(data[0]);

                await loadBookmarks(
                    data[0].id
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadBookmarks(folderId) {
        try {
            const data =
                await getBookmarks(folderId);

            setBookmarks(data);
        } catch (error) {
            console.error(error);
        }
    }

    async function handleAddFolder(
        name,
        userId
    ) {
        try {
            await createFolder(
                name,
                userId
            );

            await loadFolders();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteFolder(
        folderId
    ) {
        try {
            await deleteFolder(folderId);

            setBookmarks([]);
            setSelectedFolder(null);

            await loadFolders();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSelectFolder(
        folder
    ) {
        setSelectedFolder(folder);

        await loadBookmarks(folder.id);
    }

    async function handleAddBookmark(
        bookmark
    ) {
        try {
            await createBookmark(bookmark);

            await loadBookmarks(
                bookmark.folder_id
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteBookmark(
        bookmarkId
    ) {
        try {
            await deleteBookmark(
                bookmarkId
            );

            await loadBookmarks(
                selectedFolder.id
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleUpdateBookmark(
        id,
        updatedData
    ) {
        try {
            await updateBookmark(
                id,
                updatedData
            );

            setEditingBookmark(null);

            await loadBookmarks(
                selectedFolder.id
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleLogout() {
        await logout();

        router.push("/login");
    }

    const filteredBookmarks =
        bookmarks.filter((bookmark) =>
            bookmark.title
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );

    return (
        <div className={styles.dashboard}>
            {/* Sidebar */}

            <aside className={styles.sidebar}>
                <h1
                    className={
                        styles.sidebarTitle
                    }
                >
                    Folders
                </h1>

                {user && (
                    <FolderForm
                        userId={user.id}
                        onAddFolder={
                            handleAddFolder
                        }
                    />
                )}

                <hr className={styles.divider} />

                <FolderList
                    folders={folders}
                    selectedFolder={
                        selectedFolder
                    }
                    onSelectFolder={
                        handleSelectFolder
                    }
                    onDeleteFolder={
                        handleDeleteFolder
                    }
                />

                <button
                    className={
                        styles.logoutBtn
                    }
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </aside>

            {/* Main */}

            <main className={styles.main}>
                <h1
                    className={
                        styles.mainTitle
                    }
                >
                    Bookmark Manager
                </h1>

                {selectedFolder ? (
                    <>
                        <h2
                            className={
                                styles.folderHeading
                            }
                        >
                            Folder:{" "}
                            {
                                selectedFolder.name
                            }
                        </h2>

                        <input
                            className={
                                styles.searchInput
                            }
                            type="text"
                            placeholder="Search bookmarks..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <div
                            className={
                                styles.card
                            }
                        >
                            {user && (
                                <BookmarkForm
                                    folderId={
                                        selectedFolder.id
                                    }
                                    userId={
                                        user.id
                                    }
                                    onSubmit={
                                        handleAddBookmark
                                    }
                                />
                            )}
                        </div>

                        {editingBookmark && (
                            <div
                                className={
                                    styles.card
                                }
                            >
                                <h3>
                                    Edit Bookmark
                                </h3>

                                <BookmarkEditForm
                                    bookmark={
                                        editingBookmark
                                    }
                                    onUpdate={
                                        handleUpdateBookmark
                                    }
                                    onCancel={() =>
                                        setEditingBookmark(
                                            null
                                        )
                                    }
                                />
                            </div>
                        )}

                        <div
                            className={
                                styles.card
                            }
                        >
                            <BookmarkList
                                bookmarks={
                                    filteredBookmarks
                                }
                                onDelete={
                                    handleDeleteBookmark
                                }
                                onEdit={
                                    setEditingBookmark
                                }
                            />
                        </div>
                    </>
                ) : (
                    <div
                        className={
                            styles.emptyState
                        }
                    >
                        <h2>
                            No Folder Selected
                        </h2>

                        <p>
                            Create a folder
                            and start saving
                            bookmarks.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}