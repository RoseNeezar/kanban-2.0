import { useRemoteStore } from "@store/useRemoteStore";
import { useMount } from "game/Game";
import * as React from "react";

const Game = () => {
  const ref = React.useRef<any>(null);
  // console.log("exp--", useMount);
  const { showSidebar } = useRemoteStore();
  React.useEffect(() => {
    if (!ref.current) return;
    // console.log(ref.current, useMount)
    useMount(ref.current, "app", showSidebar);
  }, []);

  return <div ref={ref} />;
};

export default Game;
