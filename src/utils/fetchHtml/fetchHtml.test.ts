import { it, describe, expect } from "vitest";
import { fetchHtml } from "./fetchHtml.js";

describe("fetchHtml", () => {
  it("should fetch a web page and return its content as a string", async () => {
    const url = "https://example.com";
    const content = await fetchHtml(url);

    expect(typeof content).toBe("string");
    expect(content.length).toBeGreaterThan(0);
  });

  it("should throw an error for an invalid URL", async () => {
    const invalidUrl = "invalid-url";
    await expect(fetchHtml(invalidUrl)).rejects.toThrow();
  });

  it("should throw an error for a non-existent page", async () => {
    const nonExistentUrl = "https://example.com/non-existent-page";
    await expect(fetchHtml(nonExistentUrl)).rejects.toThrow();
  });
});
