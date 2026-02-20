import { useState, useEffect } from 'react';

export default function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Tarefas
        </h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Nova tarefa..."
          />
          <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-bold transition-colors">
            +
          </button>
        </form>

        <div className="space-y-3">
          {todos.map(todo => (
            <div 
              key={todo.id}
              className="flex items-center justify-between bg-slate-800 p-4 rounded-xl border border-slate-700 group"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="w-5 h-5 rounded border-slate-600 bg-slate-700 checked:bg-emerald-500"
                />
                <span className={`${todo.completed ? 'line-through text-slate-500' : ''}`}>
                  {todo.text}
                </span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-slate-500 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Excluir
              </button>
            </div>
          ))}
        </div>

        {todos.length > 0 && (
          <p className="mt-6 text-sm text-slate-500 text-center">
            {todos.filter(t => t.completed).length} de {todos.length} concluídas
          </p>
        )}
      </div>
    </div>
  );
}