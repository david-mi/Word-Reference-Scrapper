import { RequestHandler } from "express";

export const parseTranslations: RequestHandler = async (req, res, next) => {
  try {
    throw new Error("Not implemented yet");
    res.status(200).json({ Message: "test" });
  }
  catch (error) {
    next(error);
  }
};