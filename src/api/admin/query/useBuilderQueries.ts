import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminApiController } from "../controller/adminApiControllerProvider";
import type {
  CreateQuestionCommand,
  CreateSectionCommand,
  ReorderQuestionsCommand,
  ReorderSectionsCommand,
  UpdateQuestionCommand,
  UpdateSectionCommand,
} from "../model";
import { adminQueryKeys } from "./queryKeys";

export function useSectionsQuery(surveyId: string) {
  return useSurveyDetailSliceQuery(surveyId, "sections");
}

export function useQuestionsQuery(surveyId: string) {
  return useSurveyDetailSliceQuery(surveyId, "questions");
}

export function useAssetsQuery(surveyId: string) {
  return useSurveyDetailSliceQuery(surveyId, "assets");
}

export function useCreateSectionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateSectionCommand) => controller.createSection(command),
    onSuccess: (section) => invalidateBuilder(queryClient, section.surveyId),
  });
}

export function useUpdateSectionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateSectionCommand & { surveyId: string }) => controller.updateSection(command),
    onSuccess: (_section, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

export function useReorderSectionsMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ReorderSectionsCommand) => controller.reorderSections(command),
    onSuccess: (_sections, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

export function useDeleteSectionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: { surveyId: string; sectionId: string }) => controller.deleteSection(command.sectionId),
    onSuccess: (_result, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

export function useCreateQuestionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: CreateQuestionCommand) => controller.createQuestion(command),
    onSuccess: (question) => invalidateBuilder(queryClient, question.surveyId),
  });
}

export function useUpdateQuestionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: UpdateQuestionCommand & { surveyId: string }) => controller.updateQuestion(command),
    onSuccess: (_question, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

export function useReorderQuestionsMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: ReorderQuestionsCommand) => controller.reorderQuestions(command),
    onSuccess: (_questions, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

export function useDeleteQuestionMutation() {
  const controller = useAdminApiController();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (command: { surveyId: string; questionId: string }) => controller.deleteQuestion(command.questionId),
    onSuccess: (_result, command) => invalidateBuilder(queryClient, command.surveyId),
  });
}

function useSurveyDetailSliceQuery<TKey extends "sections" | "questions" | "assets">(surveyId: string, key: TKey) {
  const controller = useAdminApiController();
  const queryKey =
    key === "sections"
      ? adminQueryKeys.sections(surveyId)
      : key === "questions"
        ? adminQueryKeys.questions(surveyId)
        : adminQueryKeys.assets(surveyId);

  return useQuery({
    queryKey,
    queryFn: async () => {
      const detail = await controller.getSurveyDetail(surveyId);
      return detail[key];
    },
    enabled: Boolean(surveyId),
  });
}

function invalidateBuilder(queryClient: ReturnType<typeof useQueryClient>, surveyId: string) {
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.survey(surveyId) });
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.sections(surveyId) });
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.questions(surveyId) });
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.assets(surveyId) });
  void queryClient.invalidateQueries({ queryKey: adminQueryKeys.previewRoot(surveyId) });
}
