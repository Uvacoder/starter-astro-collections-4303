import { map } from "nanostores";

export const filters = map({
  search: "",
} as Record<string, string | string[]>);
