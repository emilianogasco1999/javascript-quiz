export interface Questions {
  id: number;
  pregunta: string;
  codigo: string;
  respuestas: string[];
  respuesta_correcta: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
