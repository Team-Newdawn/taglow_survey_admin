export type ParticipantFlowStep = Readonly<
  | { type: "login" }
  | { type: "intro" }
  | { type: "section"; sectionIndex: number }
  | { type: "complete" }
>;

export type ParticipantAnswer = number | string | string[] | ChoiceTextAnswer | ImageTagAnswer | undefined;
export type ParticipantAnswers = Record<string, ParticipantAnswer>;

export type ChoiceTextAnswer = Readonly<{
  choiceValue?: string;
  text?: string;
}>;

export type ImageTagAnswer = Readonly<{
  image?: {
    storageBucket: string;
    storagePath: string;
    signedUrl?: string;
  };
  tags: ImageTagPin[];
}>;

export type ImageTagPin = Readonly<{
  id: string;
  xRatio: number;
  yRatio: number;
  tagType?: string;
  text?: string;
}>;
