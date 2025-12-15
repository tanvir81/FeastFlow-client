import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./useAxios";

export default function useMeals() {
  return useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosInstance.get("/meals");
      return res.data;
    },
  });
}
