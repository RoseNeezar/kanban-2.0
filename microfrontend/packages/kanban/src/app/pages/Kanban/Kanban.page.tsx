import { useKanbanStore } from "@store/useKanbanStore";
import React, { FC } from "react";
import { DragDropContext, DragUpdate, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import KanbanList from "./components/KanbanList";
const Container = styled.div`
  display: flex;
`;
const Kanban: FC = () => {
  const { sortKanban, kanbanListsOrder, kanbanLists, kanbanTask } =
    useKanbanStore();

  const onDragEnd = (result: DragUpdate) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    sortKanban({
      type: type as "task" | "list",
      dragIndexStart: source.index,
      dragIndexEnd: destination.index,
      dragableID: draggableId,
      dropIdStart: source.droppableId,
      dropIdEnd: destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="list">
        {(provided) => (
          <Container {...provided.droppableProps} ref={provided.innerRef}>
            {kanbanListsOrder.map((columnId, index) => {
              //@ts-ignore
              const column = kanbanLists[columnId];
              //@ts-ignore
              const tasks = column.taskIds.map((taskId) => kanbanTask[taskId]);
              return (
                <KanbanList
                  key={column.id}
                  list={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Kanban;
