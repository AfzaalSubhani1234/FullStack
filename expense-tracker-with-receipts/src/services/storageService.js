import supabase from "../lib/supabase";

export async function uploadReceipt(file, userId) {
    const fileExt = file.name.split(".").pop();

    const fileName = `${Date.now()}.${fileExt}`;

    const filePath = `${userId}/${fileName}`;

    const { error } = await supabase.storage
        .from("receipts")
        .upload(filePath, file);

    if (error) throw error;

    return filePath;
}

export async function getReceiptUrl(filePath) {
    const { data, error } = await supabase.storage
        .from("receipts")
        .createSignedUrl(filePath, 60);

    if (error) throw error;

    return data.signedUrl;
}

export async function deleteReceipt(filePath) {
    const { error } = await supabase.storage
        .from("receipts")
        .remove([filePath]);

    if (error) throw error;
}