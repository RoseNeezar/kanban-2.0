import styled from "@emotion/styled";
import { IKanbanList, IKanbanTask } from "@store/types/kanban.types";
import { FC } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import KanbanTask from "./KanbanTask";

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div<{ isDraggingOver: boolean }>`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "lightgrey" : "inherit"};
  flex-grow: 1;
  min-height: 100px;
`;

interface IKanbanListComp {
  list: IKanbanList;
  tasks: IKanbanTask[];
  index: number;
}

const KanbanList: FC<IKanbanListComp> = ({ list, index, tasks }) => {
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <Container {...provided.draggableProps} ref={provided.innerRef}>
          <Title {...provided.dragHandleProps}>{list.title}</Title>
          <Droppable droppableId={list.id} type="task">
            {(provided, snapshot) => (
              <TaskList
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
              >
                {tasks.map((task, index) => (
                  <KanbanTask key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default KanbanList;
