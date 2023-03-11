import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { getYoutubeMeta, YoutubeMeta } from 'react-native-youtube-iframe';
import { default as parseUrl } from 'url-parse';

async function fetchHeaderData(link: string): Promise<any> {
  // TODO: Add resolveDNSHost option
  const data = await getLinkPreview(link);
  return data;
}
async function getYoutubeData(link: string): Promise<any> {
  const regex = /(?:\/|%3D|v=)([0-9A-Za-z_-]{11}).*/;
  const match = link.match(regex);
  const videoId = match ? match[1] : null;
  if (!videoId) return null;
  return await getYoutubeMeta(videoId);
}

interface LinkPreviewData {
  contentType: string;
  description?: string;
  favicons: string[];
  images: string[];
  mediaType: string;
  siteName?: string;
  title: string;
  url: string;
  videos: string[];
}

export const useLinkHeader = (
  link: string,
  options?: Omit<UseQueryOptions<LinkPreviewData, any>, "queryKey" | "queryFn">
) =>
  useQuery<LinkPreviewData, any>(
    ["links", link],
    () => fetchHeaderData(link),
    options
  );

export const useGetYoutubeData = (
  link: string,
  options?: Omit<UseQueryOptions<YoutubeMeta, any>, "queryKey" | "queryFn">
) =>
  useQuery<YoutubeMeta, any>(
    ["links-youtube", link],
    () => getYoutubeData(link),
    options
  );
