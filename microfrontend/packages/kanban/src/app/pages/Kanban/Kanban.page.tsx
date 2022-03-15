import styled from "@emotion/styled";
import { useKanbanStore } from "@store/useKanbanStore";
import useSocket from "@store/websockets/websockets";
import React, { FC } from "react";
import { DragDropContext, DragUpdate, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import KanbanCreateList from "./components/KanbanCreateBtn";
import KanbanList from "./components/KanbanList";
import { useGetBoardList } from "./hooks/useList";
const Container = styled.div`
  display: flex;
`;
const Kanban: FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  useSocket(boardId as string);
  const { currentBoard, allTask, isLoading } = useGetBoardList(
    boardId as string
  );

  console.log("currentboard-", currentBoard);
  console.log("Tasks-", allTask);
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
    <div tw="flex flex-row justify-center h-screen pt-12 overflow-scroll bg-dark-main ">
      !isLoading ? (
      <div tw="">
        <div tw="text-white text-center">
          <h1>{currentBoard?.board.title}</h1>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="list"
          >
            {(provided) => (
              <div
                tw="grid justify-start w-full h-full grid-flow-col gap-2 p-10 overflow-auto grid-rows-min "
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {kanbanListsOrder.map((columnId, index) => {
                  //@ts-ignore
                  const column = kanbanLists[columnId];

                  const tasks = column.taskIds.map(
                    //@ts-ignore
                    (taskId: any) => kanbanTask[taskId]
                  );

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
                <KanbanCreateList boardId={boardId as string} action="list" />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      ) : (<h1>Loading....</h1>
      );
    </div>
  );
};

export default Kanban;
