import { IKanbanTask } from "@store/types/kanban.types";
import { FC } from "react";
import styled from "@emotion/styled";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div<{ isDragging: boolean }>`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
`;

interface IKanbanTaskComp {
  task: IKanbanTask;
  index: number;
}

const KanbanTask: FC<IKanbanTaskComp> = ({ index, task }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.title}
        </Container>
      )}
    </Draggable>
  );
};

export default KanbanTask;
