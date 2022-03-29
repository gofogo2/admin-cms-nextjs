import { HistoryMedia } from "@prisma/client";
import { useEffect } from "react";
import useSWR from "swr";

interface UseHistoryState {
  ok: boolean;
  histoyMedia: HistoryMedia;
}

export default function useHistory(id: number) {
  const { data, error } = useSWR<UseHistoryState>("/api/historys/" + id);

  console.log(data);

  useEffect(() => {
    if (data && !data.ok) {
      console.log("error");
    } else {
    }
  }, [data]);

  return { histoyMedia: data?.histoyMedia, isLoading: !data && !error };
}
