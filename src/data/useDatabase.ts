import Database, { SavedLink, WebsiteGroup } from "./Database";
import {
  UseQueryOptions,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

const db = new Database();

interface Params {
  limit?: number;
  offset?: number;
  filter?: Partial<SavedLink>;
  query?: string;
}

export const useSavedLinks = (
  params: Params,
  options?: Omit<UseQueryOptions<SavedLink[], any>, "queryKey" | "queryFn">
) =>
  useQuery<SavedLink[], any>(
    ["saved-links", params],
    () =>
      db.getAllSavedLinks(
        params.limit || 10,
        params.offset || 0,
        params.filter,
        params.query
      ),
    options
  );

export const useSaveLink = () =>
  useMutation((link: SavedLink) => db.saveLink(link));

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => db.deleteLink(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-links"]);
    },
  });
};

export const useGetLinkByLink = (
  link: string,
  options?: Omit<UseQueryOptions<SavedLink | null, any>, "queryKey" | "queryFn">
) =>
  useQuery<SavedLink | null, any>(
    ["saved-links", link],
    () => db.getLinkByLink(link),
    options
  );

export const useGetWebsiteGroup = (
  options?: Omit<UseQueryOptions<WebsiteGroup[], any>, "queryKey" | "queryFn">
) =>
  useQuery<WebsiteGroup[], any>(
    ["saved-links", "website-group"],
    () => db.getAllDistinctTitlesAndFavicons(),
    options
  );
