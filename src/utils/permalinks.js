import slugify from 'slugify'
import { SITE } from "~/config.mjs";

const trim = (str, ch) => {
  let start = 0, end = str.length;
  while(start < end && str[start] === ch)
      ++start;
  while(end > start && str[end - 1] === ch)
      --end;
  return (start > 0 || end < str.length) ? str.substring(start, end) : str;
}

const trimSlash = (s) => trim(s, "/");
const createPath = (...params) =>  "/" + params.filter((el) => !!el).join("/")

const baseUrl = trimSlash(SITE.baseUrl);
export const CONTENT_BASE = slugify(trimSlash(SITE.contentSlug), { lower: true });

const cleanSlug = (slug) => trimSlash(slug);

export const getCanonical = (path = "") => new URL(path, SITE.domain);

export const getPermalink = (slug = "", type = "page") => {
  const _slug = cleanSlug(slug);

  switch (type) {
    case "content":
      return createPath(baseUrl, CONTENT_BASE, _slug);

    case "page":
    default:
      return createPath(baseUrl, _slug);
  }
};

export const getHomePermalink = () => {
  const permalink = getPermalink();
  return permalink !== "/" ? permalink + "/" : permalink;
}

export const getSlug = (text) => slugify(text);