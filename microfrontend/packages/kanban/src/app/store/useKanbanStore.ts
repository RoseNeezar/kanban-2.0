import initialData from "@pages/Home/components/initial-data";
import create from "zustand";
import { combineAndImmer } from "./types/combine-Immer";
import { ISortKanban } from "./types/kanban.types";

export const useKanbanStore = create(
  combineAndImmer(
    {
      kanbanTask: initialData.tasks,
      kanbanLists: initialData.columns,
      kanbanListsOrder: initialData.columnOrder,
    },
    (set, get) => ({
      sortKanban: (data: ISortKanban) => {
        const {
          dragableID,
          dropIdEnd,
          dropIdStart,
          dragIndexEnd,
          dragIndexStart,
          type,
        } = data;
        //move list
        if (type === "list") {
          const newColumnOrder = Array.from(get().kanbanListsOrder);
          newColumnOrder.splice(dragIndexStart, 1);
          newColumnOrder.splice(dragIndexEnd, 0, dragableID);

          set((s) => {
            s.kanbanListsOrder = newColumnOrder;
          });

          return;
        }

        //@ts-ignore
        const listStart = get().kanbanLists[dropIdStart];
        //@ts-ignore
        const listEnd = get().kanbanLists[dropIdEnd];
        //move task in same list
        if (dropIdStart === dropIdEnd) {
          const newTaskIds = Array.from(listStart.taskIds);
          newTaskIds.splice(dragIndexStart, 1);
          newTaskIds.splice(dragIndexEnd, 0, dragableID);

          set((s) => {
            //@ts-ignore
            s.kanbanLists[dropIdStart].taskIds = newTaskIds;
          });

          return;
        }

        // move task from one list to another
        const homeTaskIds = Array.from(listStart.taskIds);

        homeTaskIds.splice(dragIndexStart, 1);

        const foreignTaskIds = Array.from(listEnd.taskIds);

        foreignTaskIds.splice(dragIndexEnd, 0, dragableID);

        set((s) => {
          //@ts-ignore
          s.kanbanLists[dropIdStart].taskIds = homeTaskIds;
          //@ts-ignore
          s.kanbanLists[dropIdEnd].taskIds = foreignTaskIds;
        });
      },
    })
  )
);
