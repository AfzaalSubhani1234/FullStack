import BookmarkEditForm from "../../components/BookmarkEditForm"


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
import styles from "./dashboard.module.css"
export default function DashboardPage() {
    const router = useRouter();

    const [user, setUser] =
        useState(null);

    const [folders, setFolders] =
        useState([]);

    const [
        selectedFolder,
        setSelectedFolder,
    ] = useState(null);

    const [bookmarks, setBookmarks] =
        useState([]);

    const [search, setSearch] =
        useState("");

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

        loadFolders();
    }

    async function loadFolders() {
        try {
            const data =
                await getFolders();

            setFolders(data);

            if (
                data &&
                data.length > 0
            ) {
                setSelectedFolder(
                    data[0]
                );

                loadBookmarks(
                    data[0].id
                );
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function loadBookmarks(
        folderId
    ) {
        try {
            const data =
                await getBookmarks(
                    folderId
                );

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

            loadFolders();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteFolder(
        folderId
    ) {
        try {
            await deleteFolder(
                folderId
            );

            setSelectedFolder(
                null
            );

            setBookmarks([]);

            loadFolders();
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSelectFolder(
        folder
    ) {
        setSelectedFolder(folder);

        loadBookmarks(
            folder.id
        );
    }

    async function handleAddBookmark(
        bookmark
    ) {
        try {
            await createBookmark(
                bookmark
            );

            loadBookmarks(
                bookmark.folder_id
            );
        } catch (error) {
            console.error(error);
        }
    }

    async function handleDeleteBookmark(
        id
    ) {
        try {
            await deleteBookmark(id);

            loadBookmarks(
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
        bookmarks.filter(
            (bookmark) =>
                bookmark.title
                    .toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (
        <div
            style={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            {/* Sidebar */}

            <div
                style={{
                    width: "250px",
                    padding: "20px",
                    borderRight:
                        "1px solid #ddd",
                }}
            >
                <h1>Folders</h1>

                {user && (
                    <FolderForm
                        userId={user.id}
                        onAddFolder={
                            handleAddFolder
                        }
                    />
                )}

                <hr />

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

                <hr />

                <button
                    onClick={
                        handleLogout
                    }
                >
                    Logout
                </button>
            </div>


            <div
                style={{
                    flex: 1,
                    padding: "20px",
                }}
            >
                <h1>
                    Bookmark Manager
                </h1>

                {selectedFolder && (
                    <>
                        <h2>
                            Folder:
                            {" "}
                            {
                                selectedFolder.name
                            }
                        </h2>

                        <input
                            type="text"
                            placeholder="Search bookmarks..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                        <hr />

                        <BookmarkForm
                            folderId={
                                selectedFolder.id
                            }
                            userId={user.id}
                            onSubmit={
                                handleAddBookmark
                            }
                        />

                        <hr />

                        <BookmarkList
                            bookmarks={
                                filteredBookmarks
                            }
                            onDelete={
                                handleDeleteBookmark
                            }
                        />
                    </>
                )}
            </div>
        </div>
    );
}