import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import { agate } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { useQuestionsStore } from "../store/questions";

import { type Questions as QuestionsType } from "../Types";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "../components/Footer";

const getBackgroundColor = (info: QuestionsType, index: number) => {
  const { userSelectedAnswer, respuesta_correcta } = info;

  if (userSelectedAnswer == null) return "transparent";

  if (index != respuesta_correcta && index != userSelectedAnswer)
    return "transparent";

  if (index == respuesta_correcta) return "green";

  if (index == userSelectedAnswer) return "red";

  return "trnasparent";
};

const Question = ({ info }: { info: QuestionsType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left", mt: 4 }}
    >
      <Typography variant="h5">{info.pregunta}</Typography>
      <SyntaxHighlighter language="javascript" style={agate}>
        {info.codigo}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: "#333" }} disablePadding>
        {info.respuestas.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{ backgroundColor: getBackgroundColor(info, index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.preguntas);
  const currentQuestions = useQuestionsStore((state) => state.currentQuestion);
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  const questionsInfo = questions[currentQuestions];

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestions === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestions + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestions >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionsInfo} />
      <Footer />
    </>
  );
};
