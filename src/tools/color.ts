import { isString, startsWith } from "lodash";

export const isColorString = (s: unknown): s is string => {
	if (!isString(s)) return false;
	return startsWith(s, "#") || startsWith(s, "rgb") || startsWith(s, "hsl");
};