import React, { useState } from 'react';
import Stats from './stats';
import Question from './question';
import Completed from './completed';

function Quiz({ triviaData }) {
  const [quizState, setQuizzState] = useState({
    score: 0,
    questionIndex: 0,
    isQuizOver: false,
  });

  const { score, questionIndex, isQuizOver } = quizState;

  const RestartQuiz = () => {
    setQuizzState({
      score: 0,
      questionIndex: 0,
      isQuizOver: false,
    });
  };

  const NextQuestion = () => {
    if (questionIndex >= triviaData.length - 1) {
      setQuizzState({ ...quizState, isQuizOver: true });
    } else {
      setQuizzState({
        ...quizState,
        questionIndex: questionIndex + 1,
      });
    }
  };

  const updatingScore = (wasAnswerCorrect) => {
    if (wasAnswerCorrect) {
      setQuizzState({
        ...quizState,
        score: score + 1,
      });
    }
  };

  let pageContent;
  if (isQuizOver) {
    pageContent = <Completed score={score} onRetryClick={RestartQuiz} />;
  } else {
    const triviaQuestion = triviaData[questionIndex];
    // console.log(triviaQuestion);
    const { correct_answer, incorrect_answers, question } = triviaQuestion;
    pageContent = (
      <>
        <Stats
          score={score}
          questionNumber={questionIndex + 1}
          totalQuestions={triviaData.length}
        />
        <Question
          key={questionIndex}
          question={question}
          correctAnswer={correct_answer}
          incorrectAnswers={incorrect_answers}
          onNextClick={NextQuestion}
          updatingScore={updatingScore}
        />
      </>
    );
  }

  return <>{pageContent}</>;
}

export default Quiz;
