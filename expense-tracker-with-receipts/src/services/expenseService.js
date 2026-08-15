import supabase from "../lib/supabase";

export async function addExpense(expense) {
    const { data, error } = await supabase
        .from("expenses")
        .insert([expense])
        .select();

    if (error) throw error;

    return data[0];
}



export async function getExpensesByMonth(
    userId,
    year,
    month
) {
    const startDate =
        `${year}-${String(month).padStart(2, "0")}-01`;

    const endDate =
        `${year}-${String(month).padStart(2, "0")}-31`;

    const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .gte("expense_date", startDate)
        .lte("expense_date", endDate)
        .order("expense_date", {
            ascending: false,
        });

    if (error) throw error;

    return data;
}



export async function deleteExpense(id) {
    const { error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id);

    if (error) throw error;
}