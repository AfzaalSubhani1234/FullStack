"use client";

export default function BookmarkList({
    bookmarks,
    onDelete,
    onEdit,
}) {
    if (!bookmarks || bookmarks.length === 0) {
        return <p>No bookmarks found.</p>;
    }

    return (
        <div>
            <h2>Bookmarks</h2>

            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "15px",
                        marginBottom: "15px",
                        borderRadius: "8px",
                    }}
                >
                    <h3>{bookmark.title}</h3>

                    <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {bookmark.url}
                    </a>

                    {bookmark.note && (
                        <p>
                            <strong>Note:</strong>{" "}
                            {bookmark.note}
                        </p>
                    )}

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <button
                            onClick={() =>
                                onEdit(bookmark)
                            }
                        >
                            Edit
                        </button>

                        <button
                            onClick={() =>
                                onDelete(bookmark.id)
                            }
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}