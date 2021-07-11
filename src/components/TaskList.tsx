import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Função para gerar os id
  function generateId() {
    let id = Math.random() * 100;

    const taskWithSameId = tasks.find((task) => task.id === id)

    // Gerar outro id caso algum ja tenha o mesmo id, asegurar para que nenhuma tarefa tenha o mesmo id.
    if (taskWithSameId) {
      id = generateId();
    }

    return id;
  }

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.

    // Esse if garante que se o input estiver o valor vazio, ele não ira adicionar uma tarefa.
    if (newTaskTitle) {
      setTasks((createTaks) => [...createTaks,
        {
          id: generateId(),
          title: newTaskTitle,
          isComplete: false,
        },
      ]);

      // assim que adicionado a tarefa ele limpa o valor do imput.
      setNewTaskTitle('');
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const allTasks = [...tasks];

    // Varrer todas as tarefas e vou procurar dentro das taks o isComplete se tiver true muda para false, e se tiver false mude para true.
    allTasks.forEach( (task) => {
      if(task.id === id){
        task.isComplete === true ? (task.isComplete = false) : (task.isComplete = true);
      }
    });
    // por fim apenas setar essa task com o isComplete alterado.
    setTasks( [...allTasks] );
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const taskDeleted = tasks.filter( (task) => task.id !== id);

    setTasks([...taskDeleted]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}