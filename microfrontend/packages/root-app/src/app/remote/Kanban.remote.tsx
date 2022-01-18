import { useAuthStore } from "@store/useAuth.store";
import { useMount } from "kanban/Kanban";
import * as React from "react";

const Kanban = () => {
  const ref = React.useRef<any>(null);
  // console.log('exp')
  React.useEffect(() => {
    if (!ref.current) return;
    // console.log(ref.current, useMount)
    useMount(ref.current, "app", useAuthStore);
  }, []);

  return <div ref={ref} />;
};

export default Kanban;
