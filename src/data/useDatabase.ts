import Database, { SavedLink } from "./Database";
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
}

export const useSavedLinks = (
  params: Params,
  options?: Omit<UseQueryOptions<SavedLink[], any>, "queryKey" | "queryFn">
) =>
  useQuery<SavedLink[], any>(
    ["saved-links", params],
    () => db.getAllSavedLinks(params.limit || 10, params.offset || 0),
    options
  );

export const useSaveLink = () => {
  const queryClient = useQueryClient();
  return useMutation((link: SavedLink) => db.saveLink(link), {
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-links"]);
    },
  });
};

export const useDeleteLink = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => db.deleteLink(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["saved-links"]);
    },
  });
};
