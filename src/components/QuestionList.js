import React, { useEffect, useState } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestions() {
      const response = await fetch("http://localhost:4000/questions");
      const data = await response.json();
      setQuestions(data);
    }

    fetchQuestions();
  }, []);

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions(questions.filter(question => question.id !== id));
  };

  const updateCorrectIndex = async (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex }),
    });

    // Update state to reflect the change
    setQuestions(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, correctIndex: newCorrectIndex } : q
      )
    );
  };

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <li key={question.id}>
            <p>{question.prompt}</p>
            <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) => updateCorrectIndex(question.id, parseInt(e.target.value, 10))}
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
