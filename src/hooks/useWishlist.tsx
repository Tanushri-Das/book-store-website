import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useWishlist = () => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["myWishlists", session?.user?.email],
    queryFn: () =>
      fetch(`/my-wishlists/api/${session?.user?.email}`).then((res) =>
        res.json()
      ),
    enabled: !!session?.user?.email,
    
    refetchInterval: 20000,
  });
};

export default useWishlist;
