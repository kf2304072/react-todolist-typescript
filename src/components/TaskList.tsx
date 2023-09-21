import React from 'react';
import TaskType from '../TaskType';
import TaskItem from './TaskItem';
import { List } from '@mui/material';

/* tasks:TaskType[];App.tsxにある、filterTasksの関数内で taskListはTaskTypeの型を持つオブジェクトの配列。.filterメソッドを使うことで、この配列内の特定の要素をフィルタリングして新しい配列を生成。なのでfilterTasksもTaskType[]型となります*/
type TaskListProps = {
  deleteTask:(id:string) =>void;
  startEdit:(id:string) =>void;
  toggleComplete:(id:string) =>void;
  tasks:TaskType[];
};

const TaskList:React.FC<TaskListProps> = ({deleteTask, startEdit, toggleComplete, tasks}) => {
  return (
    /* task={t} は、TaskItem コンポーネントに t という1つのタスクを task という名前のプロップとして渡している */
    <List>
      {tasks.map((t) =>(
        <TaskItem 
        key={t.id} 
        task={t}
        deleteTask={deleteTask} 
        startEdit={startEdit} 
        toggleComplete={toggleComplete}
        />
      ))}
    </List>
  );
};



export default TaskList;
