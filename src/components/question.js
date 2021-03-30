import React, { useState } from 'react';
import shuffle from '../utils/shuffle';
import '../css/question.css';

function Question({
  correctAnswer,
  incorrectAnswers,
  question,
  onNextClick,
  updatingScore,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const answerIsPicked = selectedAnswer !== null;

  const allAnswers = [correctAnswer, ...incorrectAnswers];
  const [shuffledAnswers] = useState(() => shuffle(allAnswers));

  let nextButtonClassName = 'quiz__next-button quiz__button';
  if (!answerIsPicked) nextButtonClassName += ' quiz__button--disabled';

  const onAnswerClick = (event) => {
    setSelectedAnswer(event.target.innerHTML);
    const isCorrect = event.target.innerHTML === correctAnswer;
    updatingScore(isCorrect);
  };

  return (
    <div>
      <p
        className="quiz__question"
        dangerouslySetInnerHTML={{ __html: question }}
      />
      <ul className="quiz__answers">
        {shuffledAnswers.map((answer, i) => {
          let answersClassName = 'quiz__button';

          if (answerIsPicked) {
            const pickedAnswer = answer === selectedAnswer;
            const isAnswerCorrect = answer === correctAnswer;

            if (pickedAnswer && isAnswerCorrect) {
              answersClassName += ' quiz__button--correct';
            } else if (pickedAnswer && !isAnswerCorrect) {
              answersClassName += ' quiz__button--incorrect';
            } else {
              answersClassName += ' quiz__button--disabled';
            }
          }

          return (
            <li key={answer}>
              <button
                className={answersClassName}
                onClick={onAnswerClick}
                disabled={answerIsPicked}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className={nextButtonClassName}
        onClick={onNextClick}
        disabled={!answerIsPicked}
      >
        Next
      </button>
    </div>
  );
}

export default Question;
