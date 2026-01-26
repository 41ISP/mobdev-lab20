function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>

      <button 
        className="btn btn-delete"
        onClick={() => onDelete(todo.id)}
      >
        Удалить
      </button>
    </li>
  );
}

export default TodoItem;