export interface Task {
  id: number;
  name: string;
  description: string;
  status: string;
  tags: Array<string>;
  position: number;
  taskListName: string;
  taskListId: number;
}
