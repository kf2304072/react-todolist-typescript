import { MenuItem, Select } from '@mui/material';
import React from 'react';

type TaskFilterProps ={
  filter:"全て" | "完了" | "未完了";
  setFilter:(filter:"全て" | "完了" | "未完了") =>void;
};

const TaskFilter:React.FC<TaskFilterProps> = ({filter, setFilter}) => {
  return (
    <Select
    value={filter}
    /* as キーワードは、値や変数がこの特定の型であることを知っている」とTypeScriptに伝えるためのもの。 */
    /* e.target.value as "全て" | "完了" | "未完了" は、ドロップダウンリストから選択された値 (e.target.value) が、これら3つの文字列のいずれかであることをTypeScriptに伝えるために使用 */
    onChange={(e) => setFilter(e.target.value as "全て" | "完了" | "未完了")}
    >
      <MenuItem value="全て">全て</MenuItem>
      <MenuItem value="完了">完了</MenuItem>
      <MenuItem value="未完了">未完了</MenuItem>
    </Select>
  );
};

export default TaskFilter;

