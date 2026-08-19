"use client";

export default function FolderList({
    folders,
    selectedFolder,
    onSelectFolder,
    onDeleteFolder,
}) {
    return (
        <div>
            <h2>Folders</h2>

            {folders.map((folder) => (
                <div
                    key={folder.id}
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginBottom: "10px",
                    }}
                >
                    <button
                        onClick={() =>
                            onSelectFolder(folder)
                        }
                        style={{
                            fontWeight:
                                selectedFolder?.id ===
                                    folder.id
                                    ? "bold"
                                    : "normal",
                        }}
                    >
                        {folder.name}
                    </button>

                    <button
                        onClick={() =>
                            onDeleteFolder(folder.id)
                        }
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}