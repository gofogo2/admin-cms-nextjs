import { BookDonation, HistoryContent } from "@prisma/client";
import { useEffect } from "react";
import useSWR from "swr";

interface UseBookDonationState {
  ok: boolean;
  bookDonations: BookDonation[];
}

export default function useBookDonation() {
  const { data, error } = useSWR<UseBookDonationState>("/api/book-donation/");

  useEffect(() => {
    if (data && !data.ok) {
      console.log("error");
    } else {
      console.log(data?.bookDonations);
    }
  }, [data]);

  return { bookDonations: data?.bookDonations, isLoading: !data && !error };
}
