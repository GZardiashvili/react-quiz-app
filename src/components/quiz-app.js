import React, { useState, useEffect } from 'react';
import Quiz from './quiz';
import ErrorMessage from '../utils/error-message';
import LoadingSpinner from '../utils/loading';
import useGetTriviaData from '../hooks/get-trivia-data';
import '../css/start.css';

function QuizApp() {
  const [start, setStart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(9);
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [isLoading, errorMessage, data] = useGetTriviaData(
    selectedCategory,
    selectedDifficulty
  );
  const [categoryFetch, setCategoryFetch] = useState({
    cats: null,
  });
  const { cats } = categoryFetch;
  useEffect(() => {
    async function getCategories() {
      try {
        const url = 'https://opentdb.com/api_category.php';
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(
            `Something went wrong, status code ${response.status}.`
          );
        }
        const json = await response.json();
        const { response_code, trivia_categories } = json;

        if (response_code === 1) {
          throw new Error('Bad API request - no results!');
        } else if (response_code === 2) {
          throw new Error('Bad API request - invalid parameter!');
        }

        setCategoryFetch({ cats: trivia_categories });
      } catch (err) {
        setCategoryFetch({ cats: null });
      }
    }
    getCategories();
  }, []);

  let contents;
  if (isLoading) {
    contents = <LoadingSpinner />;
  } else if (errorMessage !== '') {
    contents = <ErrorMessage> {errorMessage} </ErrorMessage>;
  } else if (!start) {
    const allCategory = [...cats];
    contents = (
      <div>
        <div>
          <select
            className="option__button"
            name="categories"
            onChange={(e) => {
              const cat = e.target.value;
              setSelectedCategory(cat);
              console.log(cat);
            }}
          >
            {allCategory.map((category, i) => {
              return (
                <option key={i} value={category.id}>
                  {category.name}
                </option>
              );
            })}
          </select>

          <select
            name="difficulties"
            className="option__button"
            onChange={(e) => {
              const diff = e.target.value;
              setSelectedDifficulty(diff);
              console.log(diff);
            }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button
          className="start__button"
          onClick={() => {
            setStart(true);
          }}
        >
          Start
        </button>
      </div>
    );
  } else {
    contents = <Quiz triviaData={data} />;
  }

  return <div>{contents}</div>;
}

export default QuizApp;
