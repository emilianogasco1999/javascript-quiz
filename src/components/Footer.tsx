import { Button } from "@mui/material";
import { useQuestionData } from "../hooks/useQuestionData";
import { useQuestionsStore } from "../store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionData();

  const reset = useQuestionsStore((state) => state.reset);
  return (
    <footer style={{ marginTop: "16px" }}>
      <strong>{`✅ ${correct} Correctas - ❌ ${incorrect} Incorrectas - ❓ ${unanswered} Sin contestar`}</strong>
      <div style={{ marginTop: "16px" }}>
        <Button variant="outlined" onClick={() => reset()}>
          Resetear Juego
        </Button>
      </div>
    </footer>
  );
};
