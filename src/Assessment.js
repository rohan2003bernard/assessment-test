import React, { useState, useEffect } from 'react';

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    fetch('/questions.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching the questions:', error));
  }, []);

  const handleChange = (question, option) => {
    setAnswers({
      ...answers,
      [question]: option
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      if (answers[q.question] === q.correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  return (
    <div>
      <h1>Assessment</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <h2>{q.question}</h2>
          {q.options.map((option, i) => (
            <div key={i}>
              <input
                type="radio"
                name={q.question}
                value={option}
                onChange={() => handleChange(q.question, option)}
              />
              {option}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {score !== null && <h2>Your score: {score}/{questions.length}</h2>}
    </div>
  );
};

export default Assessment;