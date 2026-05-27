import { useQuery } from "@tanstack/react-query";
import { useAdminApiController } from "../controller/adminApiControllerProvider";
import type { PreviewOptions } from "../model";
import { adminQueryKeys } from "./queryKeys";

export function usePreviewSurveyQuery(surveyId: string, options: PreviewOptions) {
  const controller = useAdminApiController();
  return useQuery({
    queryKey: adminQueryKeys.preview(surveyId, options),
    queryFn: () => controller.getPreviewSurvey({ surveyId, options }),
    enabled: Boolean(surveyId),
  });
}
