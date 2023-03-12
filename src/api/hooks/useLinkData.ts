import {
  extractWebsiteName,
  isValidLink,
  getWebsiteAddress,
} from "../../utils/extractWebsiteName";
import { useGetYoutubeData, useLinkHeader } from "./getLinkHeader";

export const useLinkData = (inputLink: string) => {
  const { data, isLoading } = useLinkHeader(inputLink, {
    enabled: !!inputLink,
  });
  const possibleSiteName = getWebsiteAddress(data?.url || "");
  const favicon = data?.favicons[0];
  const title = extractWebsiteName(
    possibleSiteName || data?.siteName || inputLink || ""
  );
  // const description = data?.description || data?.title;
  const image = data?.images[0] || data?.videos[0] || data?.favicons[0];
  const link = data?.url || inputLink;

  let isValid = isValidLink(inputLink);

  let description = data?.description || data?.title;
  if (!isValid) {
    description = `${description}\n${inputLink}`;
  }

  if (!description) {
    description = inputLink;
  }

  const { data: youtube, isLoading: youtubeLoading } = useGetYoutubeData(
    inputLink,
    {
      enabled: !!inputLink && title?.includes("youtube"),
    }
  );
  if (youtube) {
    return {
      favicon,
      // @ts-ignore
      title: extractWebsiteName(youtube?.provider_name || "YouTube"),
      description: isValid ? youtube?.title : `${youtube?.title}\n${inputLink}`,
      image: youtube.thumbnail_url,
      isLoading: youtubeLoading,
      link,
    };
  }
  return { favicon, title, description, image, link, isLoading };
};
