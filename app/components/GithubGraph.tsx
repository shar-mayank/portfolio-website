"use client";

import { GitHubCalendar } from "react-github-calendar";

export function GithubGraph() {
    return (
        <div className="w-full overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex min-w-max justify-center text-xs px-4">
                <GitHubCalendar
                    username="PythonHacker24"
                    colorScheme="light"
                    blockSize={10}
                    blockMargin={4}
                    fontSize={12}
                />
            </div>
        </div>
    );
}
