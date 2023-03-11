import { default as parseUrl } from "url-parse";
import { useGetYoutubeData, useLinkHeader } from "./getLinkHeader";

function getWebsiteAddress(link: string): string {
  const url = parseUrl(link);
  return url.hostname;
}

export const useLinkData = (link: string) => {

  const { data, isLoading } = useLinkHeader(link, { enabled: !!link });
  const possibleSiteName = getWebsiteAddress(data?.url || "");
  const favicon = data?.favicons[0];
  const title = possibleSiteName || data?.siteName;
  const description = data?.description || data?.title;
  const image = data?.images[0] || data?.videos[0] || data?.favicons[0];

  const { data: youtube, isLoading: youtubeLoading } = useGetYoutubeData(link, {
    enabled: !!link && title?.includes("youtube"),
  });
  if (youtube) {
    return {
      favicon,
      // @ts-ignore
      title: youtube?.provider_name || "YouTube",
      description: youtube.title,
      image: youtube.thumbnail_url,
      isLoading: youtubeLoading,
    };
  }
  return { favicon, title, description, image, isLoading };
};
