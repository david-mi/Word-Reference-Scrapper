import { CustomError } from "../../middlewares/errorsHandler.js";

export async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new CustomError(
      "There is no page corresponding to your request",
      response.status
    );
  }

  const data = await response.text();

  return data;
}