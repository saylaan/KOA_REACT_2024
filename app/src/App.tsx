/* Third-party */
import { useState, useEffect, useRef } from 'react';
/* Components */
import { Kanban } from './_components/features/kanban/kanban';
/* Types */
import { KanbanItem } from '@models/todos';
/* CSS */
import './App.css';

function App() {
  const [todos, setTodos] = useState<KanbanItem[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedOnce = useRef(false);

  useEffect(() => {
    const cachedTodos = localStorage.getItem('todos');
    if (cachedTodos) {
      const parsedTodos: KanbanItem[] = JSON.parse(cachedTodos);
      setTodos(parsedTodos);
      setLoading(false);
      fetchedOnce.current = true;
    } else if (!fetchedOnce.current) {
      fetchedOnce.current = true;
      (async () => {
        try {
          const response = await fetch('http://localhost:8080/todos');
          if (!response.ok) {
            throw new Error('Network response was not ok.');
          }
          const data = await response.json();
          const filteredData = data.filter(
            (value: KanbanItem) => value.status === 'todo',
          );

          setTodos(filteredData);
          localStorage.setItem('todos', JSON.stringify(filteredData));
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  return (
    <Kanban loading={loading} error={error} todos={todos} setTodos={setTodos} />
  );
}

export default App;
