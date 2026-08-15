import supabase from "../lib/supabase";

export async function signup(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                name,
            },
        },
    });

    if (error) throw error;

    return data;
}

export async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;

    return data;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
}

export async function getCurrentUser() {
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

