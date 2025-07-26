export interface Flashcard {
    question: string;
    choices: {
      A: string;
      B: string;
      C: string;
      D: string;
    };
    answer: 'A' | 'B' | 'C' | 'D';
  }