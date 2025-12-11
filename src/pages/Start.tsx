import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestion);

  const LIMIT_QUESTIONS = 10;

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      ¡Empezar!
    </Button>
  );
};
