"use client";

import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function GithubGraph() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide [&_text]:selection:!text-black [&_text]:dark:selection:!text-black">
            <div className="flex min-w-max justify-center text-xs px-4 [&_text]:fill-gray-500 dark:[&_text]:fill-gray-400">
                <GitHubCalendar
                    username="shar-mayank"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    blockSize={10}
                    blockMargin={4}
                    fontSize={12}
                />
            </div>
        </div>
    );
}
