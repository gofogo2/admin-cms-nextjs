import { ResponseType } from "@libs/server/withHandler";
import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: ResponseType;
  error?: string;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  async function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    const reuslt = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) =>
        setState((prev) => {
          return { ...prev, data };
        })
      ) //...prev,data:data
      .catch((error) => setState((prev) => ({ ...prev, error }))) //...prev,data:error
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
    return;
  }
  return [mutation, { ...state }];
}
