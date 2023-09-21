import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskInput from './components/TaskInput';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskType from './TaskType';
import { InputArea, StyledContainer } from './style';

const App = () => {
  /* inputにテキストを入力 */
  const [task, setTask] =useState<string>("");
    /* toDoリストの一覧を保持
  新しいタスクを追加すると、そのタスクがtasksの一覧に追加され、ToDoリストの表示も更新される */
  const [taskList , setTaskList] = useState<TaskType[]>([]);
  /* 編集中かどうか。初期値は編集してないので、null */
  const [editId, setEditId] =useState<string | null>(null);
  /* Filterの切り替え。初期値は全て */
  const [filter, setFilter] =useState<"全て" | "完了" | "未完了">("全て");

  /* taskが存在する （空文字やnullやundefinedなど"偽"の値でない）場合のみ以下の処理を行うという条件*/
  /* completed: falseは「新しいタスクを作成したとき、そのタスクはデフォルトで未完了ということ */
  const addTask = () =>{
    if(task){
      const newTask = {
        id:uuidv4(),
        value:task,
        createAt:new Date(),
        updateAt:new Date(),
        completed:false,
      };
      console.log(newTask);
      setTaskList([...taskList,newTask]);
      setTask("");
    };
  };
  

/* t.id !== id: 現在のタスク（t）のIDが、削除するタスクのID（id）と異なる場合にtrueを返す */
/* true を返す要素、つまり t.id が id と異なるタスクだけが新しい配列に取り込まれます */
// const deleteTask = (id:string) =>{
//   setTaskList(taskList.filter(t =>t.id !== id));
// };

const deleteTask= (id:string)=>{
  setTaskList(taskList.filter(t => t.id !== id))
}

/* 編集を開始するタスクを設定する。 */
/* id: 編集を開始したいid */
/* IDが指定されたIDと一致する唯一のタスクを見つけて返す */
/* taskToEdit: タスクが存在するかどうかを確認。taskToEdit.completed: そのタスクが完了状態(completed)であるかを確認。 */
/* 指定されたIDを持つタスク(taskToEdit)が存在し、かつ、そのタスクが完了(completed)状態である場合
taskToEdit の completed プロパティが true であるかどうかをチェック、タスクが完了状態かどうかを表示。true なら完了、false なら未完了 */
/* setEditId(id): 現在編集中のタスクのIDとして、指定されたIDをセット */
/* setTask(taskToEdit.value): 編集するタスクの内容を、編集用のステートにセット */
/* 結論として、startEdit関数は指定されたIDのタスクが完了状態である場合に、そのタスクを編集モードにするための準備  */
const startEdit = (id:string) =>{
  const taskToEdit = taskList.find(t =>t.id === id);
  if(taskToEdit && taskToEdit.completed){
    setEditId(id);
    // console.log(taskToEdit.completed);
    setTask(taskToEdit.value);
  };
};

/* 現在編集中のタスクを更新する。editIdがnullでなく、taskが存在する場合に、taskList.mapを使用して該当のタスクの内容を更新。
   更新ボタンを押下したら、値と更新日が更新される */
/* setEditId(null): 編集中のタスクのIDをnullに設定し、編集モードを終了 */
/* setTask(""): taskの内容を空文字に設定して、リセット */
const editTask = () =>{
  if(editId !== null && task){
    setTaskList(taskList.map(t => t.id === editId ? {...t,value:task, updateAt: new Date()}: t));
    setEditId(null);
    setTask("");
  };
};


/* 特定のIDを持つタスクが完了としてマークされていた場合、その状態を未完了に変更し、もし未完了だった場合は完了としてマーク */
/* t.id === id 現在のタスクtのidが関数toggleCompleteに渡されたidと一致するかどうかを確認 */
/* !t.completedは、completedプロパティの値を現在の反対の値に変更 */
/* もしタスクが未完了（completed: false）の状態であった場合、ユーザーがそれをチェックオフすることで、そのタスクを完了の状態（completed: true）に変更 */
/* 逆に、もしタスクが完了（completed: true）の状態であった場合、ユーザーがそれをアンチェックすることで、そのタスクを未完了の状態（completed: false）に戻す */
/* まとめると、ユーザーはタスクの完了/未完了の状態を簡単にトグル（切り替え）することができます。 */
const toggleComplete = (id:string) =>{
  setTaskList(taskList.map(t => t.id ===id ? {...t, completed: !t.completed, updateAt: new Date()}:t));
};

/* filter === 'completed'の場合:t.completedがtrueの場合に filter === 'incomplete'の場合:!t.completedがtrueの場合に、 */
/* filter変数の値に基づいて、タスクをフィルタリングしてfilterTasks配列を作成。完了の場合、完了したタスクのみ、未完了の場合、未完了のタスクのみを取得、それ以外の場合はすべてのタスクを取得します。 */
/* filterの値に応じて、filterTasksには完了したタスクのみ、未完了のタスクのみ、またはすべてのタスクが含まれる*/
const filterTasks = taskList.filter(t =>{
  if(filter === "完了") return t.completed;
  if(filter === "未完了") return !t.completed;
  return true;
});


  return (
    <StyledContainer maxWidth="sm">
      <InputArea>
        <TaskInput 
        addTask={addTask} 
        task={task} 
        setTask={setTask} 
        editTask={editTask} 
        editId={editId}
        />
      </InputArea>
        
        <TaskFilter 
        filter={filter}
        setFilter={setFilter}
        />
        
        <TaskList 
        deleteTask={deleteTask} 
        startEdit={startEdit} 
        toggleComplete={toggleComplete}
        tasks={filterTasks}
        />
    </StyledContainer>
  /* taskListという名前のpropsとして、App.tsx内で定義。taskList変数のデータをTaskListコンポーネントに渡している
   {taskList}: この部分がApp.tsx内で宣言または取得されているtaskList変数*/
  );
  };

export default App;

