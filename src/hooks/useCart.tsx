import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useCart = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["myBookings", session?.user?.email],
    queryFn: () =>
      fetch(`/my-bookings/api/${session?.user?.email}`).then((res) =>
        res.json()
      ),
    enabled: !!session?.user?.email,
  });
};

export default useCart;
