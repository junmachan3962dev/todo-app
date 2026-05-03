import { useState, useEffect } from "react";
//todo配列の型定義
import type { Todo } from "./types/types";

export const App = () => {
  // ===A. 状態（state）の定義===
  // ---データの保存（localStorage)---
  // 1. 初期値の読み込み
  // useStateの初期値に関数を渡すと、初回起動時に一度だけLocalStorageを見に行きます
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saveTodos = localStorage.getItem("todo-app-data");
    //ローカルストレージにデータが入っていれば配列データとして取り出して、なければ空の配列を返す
    return saveTodos ? JSON.parse(saveTodos) : [];
  });
  // 2. 自動保存
  // todosの中身がわかるたびに、LocalStorageに中身を書き込む
  useEffect(() => {
    localStorage.setItem("todo-app-data", JSON.stringify(todos));
  }, [todos]);
  const [inputValue, setInputValue] = useState("");

  // === B/ロジック（関数）===
  //文字が入力された時の処理の関数
  const handleAddTodo = () => {
    //空文字や空白はガードする（早期リターン）
    if (!inputValue.trim()) return;
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text: inputValue,
      completed: false,
    };
    //入力されたら（状態が変わったら）todosに追加する
    setTodos([...todos, newTodo]);
    //入力欄に残っているテキストを削除する
    setInputValue("");
  };
  //完了フラグの切り替えの関数(チェックボックスの完了、未完了の切り替え)
  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  //deleteボタンが押された時の処理関数
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // ===UI（JSX)===
  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>My ToDo App</h1>

      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="入力してください"
        />
        <button onClick={handleAddTodo}>追加</button>
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
