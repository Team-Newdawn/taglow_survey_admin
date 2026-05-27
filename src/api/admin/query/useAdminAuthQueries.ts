import { useQuery } from "@tanstack/react-query";
import { useAdminApiController } from "../controller/adminApiControllerProvider";
import { adminQueryKeys } from "./queryKeys";

export function useCurrentAdminQuery() {
  const controller = useAdminApiController();
  return useQuery({
    queryKey: adminQueryKeys.currentAdmin,
    queryFn: () => controller.getCurrentAdmin(),
  });
}
