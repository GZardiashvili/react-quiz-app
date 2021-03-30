import { useState, useEffect } from 'react';

function useGetTriviaData(category, difficulty = '') {
  const [quizFetch, setQuizFetch] = useState({
    isLoading: true,
    errorMessage: '',
    data: null,
  });

  const { isLoading, errorMessage, data } = quizFetch;

  useEffect(() => {
    async function getQuiz() {
      try {
        const params = new URLSearchParams({ category });
        if (difficulty !== '') params.append('difficulty', difficulty);
        const API_URL = `https://opentdb.com/api.php?amount=10&${params.toString()}`;
        const response = await fetch(API_URL);
        console.log(API_URL);
        if (!response.ok) {
          throw new Error(
            `Something went wrong, status code ${response.status}.`
          );
        }
        const json = await response.json();
        const { response_code, results } = json;
        if (response_code === 1) {
          throw new Error('Bad API request - no results!');
        } else if (response_code === 2) {
          throw new Error('Bad API request - invalid parameter!');
        }

        setQuizFetch({
          isLoading: false,
          errorMessage: '',
          data: results,
        });
      } catch (err) {
        setQuizFetch({
          isLoading: false,
          errorMessage: 'Something went wrong. Try again later',
          data: null,
        });
        console.error(err);
      }
    }
    getQuiz();
  }, [category, difficulty]);

  return [isLoading, errorMessage, data];
}

export default useGetTriviaData;
