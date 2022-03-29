import { HistoryContent } from "@prisma/client";
import { useEffect } from "react";
import useSWR from "swr";

interface UseHistoryContentState {
  ok: boolean;
  historyContent: HistoryContent[];
}

export default function useHistoryContent(id: number) {
  const { data, error } = useSWR<UseHistoryContentState>(
    `/api/history-content/${id.toString()}`
  );

  useEffect(() => {
    if (data && !data.ok) {
      console.log("error");
    } else {
      console.log(data?.historyContent);
    }
  }, [data]);

  return { historyContent: data?.historyContent, isLoading: !data && !error };
}
