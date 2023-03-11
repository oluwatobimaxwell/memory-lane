import { default as parseUrl } from 'url-parse';
import { useLinkHeader } from "../../api/hooks/getLinkHeader";


function getWebsiteAddress(link: string): string {
    const url = parseUrl(link);
    return url.hostname;
  }

export const useLinkData = (link: string) => {
  const { data, isLoading } = useLinkHeader(link);
  const possibleSiteName = getWebsiteAddress(data?.url || "");
  const favicon = data?.favicons[0];
  const title = data?.siteName || possibleSiteName;
  const description = data?.description || data?.title;
  const image = data?.images[0] || data?.videos[0] || data?.favicons[0];
  return { favicon, title, description, image, isLoading };
};
