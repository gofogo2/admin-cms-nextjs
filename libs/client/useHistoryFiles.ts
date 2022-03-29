import { HistoryFile } from "./../../node_modules/.prisma/client/index.d";
import { HistoryMedia } from "@prisma/client";
import { useEffect } from "react";
import useSWR from "swr";

interface UseHistoryFilesState {
  ok: boolean;
  historyFiles: HistoryFile[];
}

export default function useHistoryFiles(id: number) {
  const { data, error } = useSWR<UseHistoryFilesState>(
    "/api/history-files/" + id
  );

  useEffect(() => {
    if (data && !data.ok) {
      console.log("error");
    } else {
      console.log(data?.historyFiles);
    }
  }, [data]);

  return { historyFiles: data?.historyFiles, isLoading: !data && !error };
}
