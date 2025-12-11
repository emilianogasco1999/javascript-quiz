import { useQuestionsStore } from "../store/questions";

export const useQuestionData = () => {
  const questions = useQuestionsStore((state) => state.preguntas);
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;

  questions.forEach((question) => {
    console.log(question);
    const { userSelectedAnswer, respuesta_correcta } = question;
    if (userSelectedAnswer == null) unanswered++;
    else if (userSelectedAnswer === respuesta_correcta) correct++;
    else incorrect++;
  });
  return { correct, incorrect, unanswered };
};
