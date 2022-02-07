declare module "kanban/Kanban" {
  const useMount: (
    el: ReactDOM.Container,
    routePrefix: string,
    authStore: any
  ) => void;

  export { useMount };
}

declare module "game/Game" {
  const useMount: (
    el: ReactDOM.Container,
    routePrefix: string,
    authStore: any
  ) => void;

  export { useMount };
}
