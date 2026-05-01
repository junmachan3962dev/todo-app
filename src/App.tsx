import { useState } from 'react';
import type { Todo } from './types/types'; // 型だけ外から持ってくる

export const App = () => {
  // --- A. 状態（State）の定義 ---
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  // --- B. ロジック（関数） ---
  // 文字が入力された時の処理の関数
  const handleAddTodo = () => {
    // 空入力または空白のみの場合は処理を中断（ガード）
    //trim()は前後の空白を取り除くメゾット
    if (!inputValue.trim()) return; 
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    //入力されたら（状態が変わったら）todosに新しいテキストを追加する
    setTodos([...todos, newTodo]);
    //入力欄に残っているテキストを削除する
    setInputValue("");
  };
  
  //todoリストの「完了」「未完了」を切り替える（チェックをつけ外し）処理の関数
  const toggleTodo = (id: number) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }; 

  // デリートボタンが押された時の処理の関数
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  // --- C. 見た目（JSX） ---
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My ToDo App</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text" 
          value={inputValue} //state
          //onChangeでstateが変わった時の処理
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder='何をする？'
        />
        {/*ボタンを押した時にhandleAddToto関数で処理をする*/}
        <button onClick={handleAddTodo}>追加</button>
      </div>

      <ul style={{ padding: 0 }}>
        {/* 配列のリストを一つ一つliに流し入れる作業 */}
        {todos.map((todo) => (
          //keyはどの項目がどれかを識別するための背番号
          <li key={todo.id} style={{ listStyle: 'none', marginBottom: '8px' }}>
            //チェックボックスの作成と処理
            <input 
              type="checkbox" 
              checked={todo.completed} 
              onChange={() => toggleTodo(todo.id)} 
            />
            //リスト表示部分の作成と処理
            <span style={{ 
              marginLeft: '8px', 
              //todo.completedがtrueの時とfalseの時の表示の仕方（line-throughは打ち消し線）
              textDecoration: todo.completed ? 'line-through' : 'none' 
            }}>
              {todo.text}
            </span>
            //削除ボタンの作成と処理
            <button 
              //削除ボタンが押された時にdeleteTodo関数を実行する
              onClick={() => deleteTodo(todo.id)} 
              style={{ marginLeft: '10px', fontSize: '12px' }}
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};