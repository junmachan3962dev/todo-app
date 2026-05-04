import { useTodos } from "./hooks/useTodos"; //自作フックを読み込む

export const App = () => {
  //useTodosから必要なものだけを取り出す（分割代入）
  const {
    todos,
    inputValue,
    setInputValue,
    handleAddTodo,
    toggleTodo,
    deleteTodo,
  } = useTodos();

  // ===UI（JSX)===
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My ToDo App</h1>

      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); //ページのリロードを防ぐ（必須）
            handleAddTodo(); //これまでの追加ロジックを実行
          }}
        >
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="入力してください"
          />
          <button>追加</button>
        </form>
      </div>

      <ul style={{ padding: 0 }}>
        {todos.map((todo) => (
          <li key={todo.id} style={{ listStyle: "none", marginBottom: "8px" }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{
                marginLeft: "8px",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={{ marginLeft: "10px", fontSize: "12px" }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
