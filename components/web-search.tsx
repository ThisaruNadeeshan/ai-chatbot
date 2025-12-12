"use client";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

type WebSearchResult = {
  title: string;
  url: string;
  text: string;
  publishedDate?: string;
  author?: string;
};

type WebSearchOutput = {
  query: string;
  results: WebSearchResult[];
  totalResults: number;
  message: string;
  error?: string;
};

export function WebSearch({
  searchResults,
}: {
  searchResults?: WebSearchOutput;
}) {
  if (!searchResults) {
    return null;
  }

  if ("error" in searchResults && searchResults.error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-500 dark:bg-red-950/50">
        <p className="font-medium">Web Search Error</p>
        <p className="text-sm">{searchResults.error}</p>
      </div>
    );
  }

  if (searchResults.results.length === 0) {
    return (
      <div className="rounded-lg border border-muted bg-muted/50 p-4">
        <p className="font-medium text-muted-foreground text-sm">
          {searchResults.message || "No results found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">
          Search results for: &quot;{searchResults.query}&quot;
        </p>
        <span className="text-muted-foreground text-xs">
          {searchResults.totalResults} result
          {searchResults.totalResults !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-3">
        {searchResults.results.map((result, index) => (
          <div
            key={index}
            className="rounded-lg border bg-card p-4 transition-colors hover:bg-accent"
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <Link
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-1"
              >
                <h3 className="font-medium text-sm text-primary group-hover:underline">
                  {result.title}
                </h3>
              </Link>
              <Link
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-muted-foreground transition-colors hover:text-primary"
                aria-label="Open in new tab"
              >
                <ExternalLinkIcon className="size-4" />
              </Link>
            </div>

            {result.text && (
              <p className="text-muted-foreground text-xs leading-relaxed line-clamp-3">
                {result.text}
              </p>
            )}

            <div className="mt-2 flex items-center gap-3 text-muted-foreground text-xs">
              {result.publishedDate && (
                <span>
                  {new Date(result.publishedDate).toLocaleDateString()}
                </span>
              )}
              {result.author && <span>by {result.author}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

