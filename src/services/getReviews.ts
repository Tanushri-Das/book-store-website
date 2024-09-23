import { Reviews } from "@/types";
import { useQuery } from "@tanstack/react-query";

const getReviews = () => {
  return useQuery<Reviews[]>({
    queryKey: ["reviews"],
    queryFn: () =>
      fetch(`/api/reviews`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });
};

export default getReviews;
