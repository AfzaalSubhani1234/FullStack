"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Poll = {
    id: string;
    question: string;
    user_id: string;
    created_at: string;
};

type PollOption = {
    id: string;
    poll_id: string;
    option_text: string;
    votes: number;
};

export default function PollPage() {
    const supabase = createClient();

    const [poll, setPoll] = useState<Poll | null>(null);
    const [options, setOptions] = useState<PollOption[]>([]);

    const [selectedOption, setSelectedOption] = useState("");
    const [hasVoted, setHasVoted] = useState(false);

    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const loadPoll = async () => {
            setLoading(true);
            setError("");

            const pollId = window.location.pathname
                .split("/")
                .pop();

            if (!pollId) {
                setError("Poll ID is missing.");
                setLoading(false);
                return;
            }

            // Check if this browser already voted
            const voted = localStorage.getItem(
                `voted_${pollId}`
            );

            if (voted === "true") {
                setHasVoted(true);
            }

            // Get poll
            const { data: pollData, error: pollError } =
                await supabase
                    .from("polls")
                    .select("*")
                    .eq("id", pollId)
                    .single();

            if (pollError || !pollData) {
                setError("Poll not found.");
                setLoading(false);
                return;
            }

            // Get options
            const {
                data: optionsData,
                error: optionsError,
            } = await supabase
                .from("poll_options")
                .select("*")
                .eq("poll_id", pollId)
                .order("id");

            if (optionsError) {
                setError("Could not load poll options.");
                setLoading(false);
                return;
            }

            setPoll(pollData);
            setOptions(optionsData || []);

            setLoading(false);
        };

        loadPoll();
    }, []);

    // Calculate total votes
    const totalVotes = options.reduce(
        (total, option) => total + option.votes,
        0
    );

    // Calculate percentage
    const getPercentage = (votes: number) => {
        if (totalVotes === 0) {
            return 0;
        }

        return Math.round((votes / totalVotes) * 100);
    };

    // Vote
    const handleVote = async () => {
        setError("");
        setSuccess("");

        if (!selectedOption) {
            setError("Please select an option.");
            return;
        }

        if (hasVoted) {
            setError("You have already voted.");
            return;
        }

        setVoting(true);

        const pollId = window.location.pathname
            .split("/")
            .pop();

        if (!pollId) {
            setError("Poll ID is missing.");
            setVoting(false);
            return;
        }

        const { error: voteError } = await supabase.rpc(
            "vote_on_poll_option",
            {
                option_id: selectedOption,
            }
        );

        if (voteError) {
            setError(voteError.message);
            setVoting(false);
            return;
        }

        // Remember vote
        localStorage.setItem(
            `voted_${pollId}`,
            "true"
        );

        setHasVoted(true);

        setSuccess("Your vote has been recorded!");

        // Get updated results
        const { data: updatedOptions } =
            await supabase
                .from("poll_options")
                .select("*")
                .eq("poll_id", pollId)
                .order("id");

        if (updatedOptions) {
            setOptions(updatedOptions);
        }

        setVoting(false);
    };

    // Loading
    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Loading poll...</p>
            </main>
        );
    }

    // Error
    if (error && !poll) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">
                        Something went wrong
                    </h1>

                    <p className="mt-2 text-red-500">
                        {error}
                    </p>
                </div>
            </main>
        );
    }

    if (!poll) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p>Poll not found.</p>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen max-w-lg p-8">
            <h1 className="text-3xl font-bold">
                {poll.question}
            </h1>

            {/* Voting */}
            {!hasVoted && (
                <div className="mt-6 space-y-3">
                    {options.map((option) => (
                        <label
                            key={option.id}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-gray-50"
                        >
                            <input
                                type="radio"
                                name="poll-option"
                                value={option.id}
                                checked={
                                    selectedOption === option.id
                                }
                                onChange={() =>
                                    setSelectedOption(option.id)
                                }
                            />

                            <span>{option.option_text}</span>
                        </label>
                    ))}

                    <button
                        onClick={handleVote}
                        disabled={voting}
                        className="mt-4 w-full rounded bg-black p-3 text-white disabled:opacity-50"
                    >
                        {voting ? "Voting..." : "Vote"}
                    </button>
                </div>
            )}

            {/* Results */}
            <div className="mt-8">
                <h2 className="text-xl font-bold">
                    Results
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Total votes: {totalVotes}
                </p>

                <div className="mt-4 space-y-5">
                    {options.map((option) => {
                        const percentage = getPercentage(
                            option.votes
                        );

                        return (
                            <div key={option.id}>
                                <div className="mb-1 flex justify-between">
                                    <span>
                                        {option.option_text}
                                    </span>

                                    <span className="font-semibold">
                                        {percentage}%
                                    </span>
                                </div>

                                <div className="h-4 w-full rounded bg-gray-200">
                                    <div
                                        className="h-4 rounded bg-black"
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />
                                </div>

                                <p className="mt-1 text-sm text-gray-500">
                                    {option.votes} votes
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {hasVoted && (
                <p className="mt-6 rounded bg-gray-100 p-3 text-center">
                    You have already voted on this browser.
                </p>
            )}

            {error && (
                <p className="mt-4 text-red-500">
                    {error}
                </p>
            )}

            {success && (
                <p className="mt-4 text-green-600">
                    {success}
                </p>
            )}
        </main>
    );
}