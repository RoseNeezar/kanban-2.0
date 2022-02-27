import { useKanbanStore } from "@store/useKanbanStore";
import React, { FC, useEffect } from "react";
import { DragDropContext, DragUpdate, Droppable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import KanbanList from "./components/KanbanList";
import { useParams } from "react-router-dom";
import { first } from "rxjs";
import { useAppDispatch } from "@store/hooks/hooks";
import { getBoard } from "@store/module/kanban/kanban.slice";
const Container = styled.div`
  display: flex;
`;
const Kanban: FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useAppDispatch();

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
  const HandleGetBoard = () => {
    dispatch(
      getBoard({
        id: boardId as string,
      })
    );
  };
  useEffect(() => {
    HandleGetBoard();
  }, []);

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
