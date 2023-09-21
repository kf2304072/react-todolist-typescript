import React from 'react';
import TaskType from '../TaskType';
import { Checkbox, IconButton, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';



type TaskItemProps = {
  task:TaskType;
  deleteTask:(id:string) =>void;
  startEdit:(id:string) =>void;
  toggleComplete:(id:string) =>void;
};

const TaskItem:React.FC<TaskItemProps> = ({ task, deleteTask, startEdit, toggleComplete}) => {
  /* transparentは透明 */
  const completedStyle = {
    backgroundColor: task.completed ? '#effff7' : 'transparent',
  };
  return (
    <ListItem style={completedStyle}>
      {/* checkboxを表示 */}
      <Checkbox 
      checked={task.completed}
      onChange={() => toggleComplete(task.id)}
      />
      {/* 一覧に表示させる */}
      {/* primary:テキストを表示するプロパティ */}
      {/* secondary:2次的なテキストを表示するプロパティ。通常、詳細や補足情報を表示する */}
      <ListItemText 
      primary={task.value} 
      secondary={`作成日:${task.createAt.toLocaleDateString()}| 更新日:${task.updateAt.toLocaleDateString()}`}/>
      {/* 編集ボタン */}
      {/* task.completedがtrue（タスクが完了している）場合、ボタンは無効化され（disabledがtrueになる）、クリック不可。逆に、task.completedがfalse（タスクが未完了）場合、ボタンは有効化され、クリック可 */}
      <IconButton
      onClick={() =>startEdit(task.id)}
      disabled={!task.completed}
      >
        <EditIcon />
      </IconButton>
      {/* ゴミ箱icon押下したら削除 */}
      <IconButton 
      onClick={() => deleteTask(task.id)} 
      color="secondary">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;



