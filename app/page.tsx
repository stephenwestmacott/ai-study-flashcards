"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Paper,
  Chip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { School, Psychology, Lightbulb } from "@mui/icons-material";
import { Flashcard } from "@/app/lib/types";

const topics = [
  "Fundamentals – units, process variables, safety, drawings, loop diagrams",
  "Pressure & Level",
  "Flow Measurement",
  "Temperature Measurement",
  "Analytical – pH, conductivity, gas analyzers",
  "Control Systems – control strategies, feedback/feedforward",
  "Final Control Elements – valves, actuators, I/P converters",
  "Calibration & Maintenance – standards, procedures, error checking",
  "Safety Systems – alarms, interlocks, SIL",
];

const difficulties = [
  { value: "easy", label: "Easy", color: "success" as const },
  { value: "medium", label: "Medium", color: "warning" as const },
  { value: "hard", label: "Hard", color: "error" as const },
];

export default function Home() {
  const [topic, setTopic] = useState("Fundamentals – units, process variables, safety, drawings, loop diagrams");
  const [difficulty, setDifficulty] = useState("hard");
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setFlashcard(null);
    setSelectedAnswer("");
    setShowAnswer(false);
    
    try {
      const response = await fetch(`/api/generate/${topic}/${difficulty}`);
      const data = await response.json();
      setFlashcard(data);
    } catch (error) {
      console.error("Error generating flashcard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  const isCorrect = selectedAnswer === flashcard?.answer;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
          <School sx={{ mr: 2, verticalAlign: "middle" }} />
          AI Study Flashcards
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Generate personalized flashcards to enhance your learning
        </Typography>
      </Box>

      {/* Configuration Panel */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <FormControl sx={{ flex: 1.5 }}>
            <InputLabel>Topic</InputLabel>
            <Select
              value={topic}
              label="Topic"
              onChange={(e) => setTopic(e.target.value)}
            >
              {topics.map((t) => (
                <MenuItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 0.27 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              value={difficulty}
              label="Difficulty"
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficulties.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  <Chip
                    label={d.label}
                    color={d.color}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Lightbulb />}
            sx={{ px: 4, py: 1.5 }}
          >
            {loading ? "Generating..." : "Generate Flashcard"}
          </Button>
        </Box>
      </Paper>

      {/* Flashcard Display */}
      {flashcard && (
        <Card elevation={3} sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
              Question
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem" }}>
              {flashcard.question}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">
                <Typography variant="h6" gutterBottom>
                  Select your answer:
                </Typography>
              </FormLabel>
              <RadioGroup
                value={selectedAnswer}
                onChange={(e) => handleAnswerSelect(e.target.value)}
              >
                {Object.entries(flashcard.choices).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={
                      <Typography variant="body1" sx={{ fontSize: "1rem" }}>
                        <strong>{key}.</strong> {value}
                      </Typography>
                    }
                    sx={{
                      mb: 2,
                      p: 2,
                      border: "1px solid",
                      borderColor: selectedAnswer === key ? "primary.main" : "divider",
                      borderRadius: 1,
                      backgroundColor: selectedAnswer === key ? "primary.50" : "transparent",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {selectedAnswer && (
              <Box sx={{ mt: 4, textAlign: "center" }}>
                {!showAnswer ? (
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={handleShowAnswer}
                    sx={{ px: 4 }}
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Alert
                    severity={isCorrect ? "success" : "error"}
                    sx={{ mb: 2 }}
                  >
                    <Typography variant="h6">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </Typography>
                    <Typography>
                      The correct answer is: <strong>{flashcard.answer}. {flashcard.choices[flashcard.answer as keyof typeof flashcard.choices]}</strong>
                    </Typography>
                  </Alert>
                )}
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {/* Generate New Card Button */}
      {flashcard && (
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleGenerate}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Lightbulb />}
            sx={{ px: 4, py: 1.5 }}
          >
            {loading ? "Generating..." : "Generate New Card"}
          </Button>
        </Box>
      )}
    </Container>
  );
}
