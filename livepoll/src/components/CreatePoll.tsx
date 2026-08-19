"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CreatePoll() {
    const supabase = createClient();

    const [question, setQuestion] = useState("");
    const [options, setOptions] = useState(["", ""]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleCreatePoll = async () => {
        setError("");
        setSuccess("");

        // Check question
        if (!question.trim()) {
            setError("Please enter a question.");
            return;
        }

        // Remove empty options
        const cleanedOptions = options
            .map((option) => option.trim())
            .filter((option) => option !== "");



        if (cleanedOptions.length < 2) {
            setError("A poll needs at least 2 options.");
            return;
        }


        if (cleanedOptions.length > 5) {
            setError("A poll can have at most 5 options.");
            return;
        }

        setLoading(true);


        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setError("You must be logged in.");
            setLoading(false);
            return;
        }


        const { data: poll, error: pollError } = await supabase
            .from("polls")
            .insert({
                user_id: user.id,
                question: question.trim(),
            })
            .select()
            .single();

        if (pollError) {
            setError(pollError.message);
            setLoading(false);
            return;
        }


        const optionsToInsert = cleanedOptions.map((option) => ({
            poll_id: poll.id,
            option_text: option,
            votes: 0,
        }));

        const { error: optionsError } = await supabase
            .from("poll_options")
            .insert(optionsToInsert);

        if (optionsError) {
            setError(optionsError.message);
            setLoading(false);
            return;
        }

        // Reset form
        setQuestion("");
        setOptions(["", ""]);

        setSuccess("Poll created successfully!");
        setLoading(false);
    };

    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, ""]);
        }
    };

    const removeOption = () => {
        if (options.length > 2) {
            setOptions(options.slice(0, -1));
        }
    };

    return (
        <div className="mt-8 max-w-lg">
            <h2 className="text-2xl font-bold">
                Create Poll
            </h2>




            <input
                type="text"
                placeholder="Enter your question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-4 w-full rounded border p-2"
            />


            <div className="mt-4 space-y-3">
                {options.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                            const newOptions = [...options];

                            newOptions[index] = e.target.value;

                            setOptions(newOptions);
                        }}
                        className="w-full rounded border p-2"
                    />
                ))}
            </div>


            <div className="mt-4">
                {options.length < 5 && (
                    <button
                        type="button"
                        onClick={addOption}
                        className="rounded border px-4 py-2"
                    >
                        + Add Option
                    </button>
                )}

                {options.length > 2 && (
                    <button
                        type="button"
                        onClick={removeOption}
                        className="ml-2 rounded border px-4 py-2"
                    >
                        Remove Option
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={handleCreatePoll}
                disabled={loading}
                className="mt-6 w-full rounded bg-black p-2 text-white disabled:opacity-50"
            >
                {loading ? "Creating..." : "Create Poll"}
            </button>


            {error && (
                <p className="mt-3 text-red-500">
                    {error}
                </p>
            )}

            {/* Success */}
            {success && (
                <p className="mt-3 text-green-600">
                    {success}
                </p>
            )}
        </div>
    );
}