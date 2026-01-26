import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <div className="empty-state">Нет задач. Добавьте новую!</div>;
  }

  return (
    <ul className="todo-list">
           {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={() => onDelete(todo.id)} onDelete ={() => onToggle(todo.id)} />
      ))}
    </ul>
  );
}
export default TodoList