import { tool } from "ai";
import { z } from "zod";

export const webSearch = tool({
  description:
    "Search the web for current information, news, articles, or any topic. Use this when you need up-to-date information that might not be in your training data, or when the user asks about current events, recent news, or real-time information. Always cite sources when using web search results.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "The search query to find relevant web pages, articles, or information"
      ),
    numResults: z
      .number()
      .min(1)
      .max(10)
      .default(5)
      .optional()
      .describe("Number of search results to return (1-10, default: 5)"),
  }),
  execute: async ({ query, numResults = 5 }) => {
    const apiKey = process.env.EXA_API_KEY;

    if (!apiKey) {
      return {
        error:
          "EXA API key is not configured. Please set EXA_API_KEY in your environment variables.",
      };
    }

    try {
      const response = await fetch("https://api.exa.ai/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          query,
          num_results: numResults,
          contents: {
            text: {
              max_characters: 1000,
            },
          },
          highlights: {
            num_sentences: 3,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `EXA API error: ${response.status} ${response.statusText}`;

        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error || errorData.message) {
            errorMessage = errorData.error || errorData.message;
          }
        } catch {
          // If parsing fails, use the raw error text if available
          if (errorText) {
            errorMessage = `${errorMessage}. ${errorText}`;
          }
        }

        return {
          error: errorMessage,
        };
      }

      const data = await response.json();

      // Format the results for the AI model
      const results =
        data.results?.map((result: any) => ({
          title: result.title || "Untitled",
          url: result.url || "",
          text: result.text || result.highlight || "",
          publishedDate: result.published_date || undefined,
          author: result.author || undefined,
        })) || [];

      if (results.length === 0) {
        return {
          query,
          results: [],
          totalResults: 0,
          message: `No results found for "${query}". Try rephrasing your search query.`,
        };
      }

      return {
        query,
        results,
        totalResults: results.length,
        message: `Found ${results.length} search result(s) for "${query}"`,
      };
    } catch (error) {
      return {
        error:
          error instanceof Error
            ? `Web search failed: ${error.message}`
            : "Web search failed due to an unknown error",
      };
    }
  },
});

