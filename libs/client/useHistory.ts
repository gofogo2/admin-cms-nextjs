import { HistoryMedia } from "@prisma/client";
import { useEffect } from "react";
import useSWR from "swr";

interface UseHistoryState {
  ok: boolean;
  histoyMedias: HistoryMedia[];
}

export default function useHistory() {
  const { data, error } = useSWR<UseHistoryState>("/api/historys/history");

  useEffect(() => {
    if (data && !data.ok) {
      console.log("error");
    } else {
      console.log();
    }
  }, [data]);

  return { histoyMedias: data?.histoyMedias, isLoading: !data && !error };
}
