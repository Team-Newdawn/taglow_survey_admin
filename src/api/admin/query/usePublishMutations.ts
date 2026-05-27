import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminApiController } from "../controller/adminApiControllerProvider";
import { adminQueryKeys } from "./queryKeys";

export function usePublishValidationQuery(surveyId: string) {
  const controller = useAdminApiController();
  return useQuery({
    queryKey: ["admin", "survey", surveyId, "publishValidation"] as const,
    queryFn: () => controller.validateBeforePublish(surveyId),
    enabled: Boolean(surveyId),
  });
}

export function usePublishSurveyMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (surveyId: string) => controller.publishSurvey(surveyId),
    onSuccess: (survey) => invalidatePublishState(queryClient, survey.id),
  });
}

export function useCloseSurveyMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (surveyId: string) => controller.closeSurvey(surveyId),
    onSuccess: (survey) => invalidatePublishState(queryClient, survey.id),
  });
}

export function useCreateNextVersionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (surveyId: string) => controller.createNextVersion(surveyId),
    onSuccess: (survey) => {
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.surveys });
      void queryClient.invalidateQueries({ queryKey: adminQueryKeys.survey(survey.id) });
    },
  });
}

function invalidatePublishState(queryClient: ReturnType<typeof useQueryClient>, surveyId: string) {
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.surveys });
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.survey(surveyId) });
}
