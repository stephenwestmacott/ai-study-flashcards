"use client";
import styles from "./page.module.css";
import { z } from "zod";
import { useState } from "react";
import { Flashcard } from "@/app/lib/types";


export default function Home() {
  const [topic, setTopic] = useState("flow control");
  const [difficulty, setDifficulty] = useState("hard");
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null);

  const handleGenerate = async () => {
    const response = await fetch(`/api/generate/${topic}/${difficulty}`);
    const data = await response.json();
    setFlashcard(data);
  };

  return (
    <div className={styles.page}>
      <h1>{topic}</h1>
      <h1>{difficulty}</h1>
      <button onClick={handleGenerate}>Generate</button>
      {flashcard?.question && <h2>{flashcard.question}</h2>}
      {flashcard?.choices && <h2>{flashcard.choices.A}</h2>}
      {flashcard?.choices && <h2>{flashcard.choices.B}</h2>}
      {flashcard?.choices && <h2>{flashcard.choices.C}</h2>}
      {flashcard?.choices && <h2>{flashcard.choices.D}</h2>}
      {flashcard?.answer && <h2>{flashcard.answer}</h2>}
    </div>
  );
}
