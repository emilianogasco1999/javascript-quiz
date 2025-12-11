import { create } from "zustand";
import { type Questions } from "../Types";
import confetti from "canvas-confetti";
import { persist } from "zustand/middleware";

interface State {
  preguntas: Questions[];
  currentQuestion: number;
  fetchQuestion: (limit: number) => Promise<void>;
  selectAnswer: (questionsId: number, answerIndex: number) => void;
  goPreviousQuestion: () => void;
  goNextQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        preguntas: [],
        currentQuestion: 0,

        fetchQuestion: async (limit: number) => {
          const rest = await fetch("/data.json");
          const json = await rest.json();
          const preguntas = await json
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ preguntas });
        },

        selectAnswer: (questionsId: number, answerIndex: number) => {
          const { preguntas } = get();

          const newQuestion = structuredClone(preguntas);
          const questionIndex = newQuestion.findIndex(
            (q) => q.id === questionsId
          );

          const questionInfo = newQuestion[questionIndex];

          const isCorrectUserAnswer =
            questionInfo.respuesta_correcta === answerIndex;

          if (isCorrectUserAnswer) confetti();

          newQuestion[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          set({
            preguntas: newQuestion,
          });
        },
        goNextQuestion: () => {
          const { currentQuestion, preguntas } = get();
          const nextQuestion = currentQuestion + 1;

          if (nextQuestion < preguntas.length) {
            set({ currentQuestion: nextQuestion });
          }
        },
        goPreviousQuestion: () => {
          const { currentQuestion } = get();
          const previousQuestion = currentQuestion - 1;

          if (previousQuestion >= 0) {
            set({ currentQuestion: previousQuestion });
          }
        },
        reset: () => {
          set({ currentQuestion: 0, preguntas: [] });
        },
      };
    },
    { name: "questions" }
  )
);
