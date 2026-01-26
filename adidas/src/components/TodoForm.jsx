import { useState } from 'react';

function TodoForm({ onAdd }) {
   const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault(); 
if ( inputValue.trim() == "") return
  onAdd(inputValue)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="Введите новую задачу..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className="btn btn-add">
        Добавить
      </button>
    </form>
  );
}

export default TodoForm;