import { supabase } from "@/lib/supabase";

export async function getFolders() {
    const { data, error } = await supabase
        .from("folders")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        throw error;
    }

    return data;
}

export async function createFolder(name, userId) {
    const { data, error } = await supabase
        .from("folders")
        .insert([
            {
                name,
                user_id: userId,
            },
        ])
        .select();

    if (error) {
        throw error;
    }

    return data;
}

export async function deleteFolder(id) {
    const { error } = await supabase
        .from("folders")
        .delete()
        .eq("id", id);

    if (error) {
        throw error;
    }
}