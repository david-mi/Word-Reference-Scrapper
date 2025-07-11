import { JSDOM } from "jsdom";

export const windowAdapter = new JSDOM().window;