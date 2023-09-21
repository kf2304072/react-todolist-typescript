import React from 'react';
import { TextField, Button } from '@mui/material';

type TaskInputProps ={
  task:string;
  addTask:() =>void;
  setTask:(task:string) =>void;
  editTask:() =>void;
  editId: string | null;
};

const TaskInput:React.FC<TaskInputProps> = ({task, addTask, setTask, editTask, editId }) => {
  return (
    <>
      <TextField 
      value={task} 
      onChange={(e:React.ChangeEvent<HTMLInputElement>) =>setTask(e.target.value)}
      placeholder='入力してください'
      fullWidth
      />
      {editId === null ? (
        <Button 
        variant="contained" 
        color="primary" 
        onClick={addTask}>
          追加
        </Button>
      ):(
        <Button 
        variant="contained" 
        color="secondary" 
        onClick={editTask}>
          更新
        </Button>
      )}
    
    </>
  );
};



export default TaskInput;

