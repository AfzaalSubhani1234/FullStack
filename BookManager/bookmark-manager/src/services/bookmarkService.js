import { supabase } from "@/lib/supabase";

export async function createBookmark(
    bookmark
) {
    const { data, error } =
        await supabase
            .from("bookmarks")
            .insert([bookmark])
            .select();

    if (error) throw error;

    return data;
}

export async function getBookmarks(
    folderId
) {
    const { data, error } =
        await supabase
            .from("bookmarks")
            .select("*")
            .eq("folder_id", folderId)
            .order("created_at", {
                ascending: false,
            });

    if (error) throw error;

    return data;
}

export async function updateBookmark(
    id,
    updates
) {
    const { data, error } =
        await supabase
            .from("bookmarks")
            .update(updates)
            .eq("id", id)
            .select();

    if (error) throw error;

    return data;
}

export async function deleteBookmark(
    id
) {
    const { error } =
        await supabase
            .from("bookmarks")
            .delete()
            .eq("id", id);

    if (error) throw error;
}

export async function searchBookmarks(
    folderId,
    searchTerm
) {
    const { data, error } =
        await supabase
            .from("bookmarks")
            .select("*")
            .eq("folder_id", folderId)
            .ilike(
                "title",
                `%${searchTerm}%`
            );

    if (error) throw error;

    return data;
}