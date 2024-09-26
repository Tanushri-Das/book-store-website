import { Choose } from "@/types";
import { useQuery } from "@tanstack/react-query";

const useChoose = () => {
  return useQuery<Choose[]>({
    queryKey: ["choose"],
    queryFn: () =>
      fetch(`/api/choose`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });
};

export default useChoose;
