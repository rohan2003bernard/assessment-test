import React, { useState, useEffect } from 'react';
import './Assessment.css'

const Assessment = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(() =>{
    const initial={}
    questions.forEach(q=>{
      initial[q.question]=null;
    })
    return initial;
  });
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
  const onChange = (question,option)=>{
    if(question ==='clear'){
      const initialAnswer ={};
      questions.forEach(q => {
        initialAnswer[q.question]=null;
      })
      setScore(null)
      setAnswers(initialAnswer);
    }else{
      setAnswers({
        ...answers,[question]:option,
      })
    }
    }


  return (
    <div className='ass'>
      <h1>Assessment</h1>
      {questions.map((q, index) => (
        <div key={index}>
          <h3 className='que'>{q.question}</h3>
          {q.options.map((option, index) => (
            <label key={index}>
               <div className='option'>
                
                 <input
                 type="radio"
                 name={q.question}
                 value={option}
                 checked={answers[q.question]===option}
                 onChange={(e) => handleChange(q.question, option)}
                 />
                 
                
                 {option}
                 
               </div>
            </label>    

            
          ))}
        </div>
      ))}
      <div className='d'>
      <button className='btn' onClick={ () => onChange('clear',null)}>Clear</button><button className='btn' onClick={handleSubmit}>Submit</button> 
      </div>
      {score !== null && <h2>Your score: {score}/{questions.length}</h2>}
    </div>
  );
};

export default Assessment;