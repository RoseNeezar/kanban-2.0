export interface IKanbanTask {
  id: string;
  title: string;
}

export interface IKanbanList {
  title: string;
  id: string;
  tasks?: IKanbanTask[];
}

export interface ISortKanban {
  dropIdStart: string;
  dropIdEnd: string;
  dragIndexStart: number;
  dragIndexEnd: number;
  dragableID: string;
  type: "task" | "list";
}
