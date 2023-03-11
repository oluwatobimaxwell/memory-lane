import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { getLinkPreview } from "link-preview-js";

async function fetchHeaderData(link: string): Promise<any> {
  const data = await getLinkPreview(link);
  return data;
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
