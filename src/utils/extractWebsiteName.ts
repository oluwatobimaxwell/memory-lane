import { default as parseUrl } from "url-parse";

export function extractWebsiteName(url: string): string {
  try {
    // Remove the protocol from the URL
  let websiteUrl = url.replace(/(^\w+:|^)\/\//, "");

  // Remove any path or query parameters from the URL
  const questionMarkIndex = websiteUrl.indexOf("?");
  if (questionMarkIndex !== -1) {
    websiteUrl = websiteUrl.substring(0, questionMarkIndex);
  }
  const slashIndex = websiteUrl.indexOf("/");
  if (slashIndex !== -1) {
    websiteUrl = websiteUrl.substring(0, slashIndex);
  }

  // Split the URL into parts and return the domain name without the extension
  const parts = websiteUrl.split(".");
  if (parts.length > 2) {
    return parts[1];
  }
  return parts[0];
  } catch (error) {
    // console.log("Error extracting website name:", error);
    console.log("Error extracting website name:", url);
    return url;
  }
}

export function isValidLink(text: string): boolean {
  const urlRegex = /^(ftp|http|https):\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
  return urlRegex.test(text);
}


export function getWebsiteAddress(link: string): string {
  const url = parseUrl(link);
  return url.hostname;
}