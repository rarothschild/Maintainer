import { createSignal, createEffect, createRoot } from "solid-js";

function userSignal() {
  const [user, setUser] = createSignal({
    user: null,
    token: "",
  });
  createEffect(() => console.log(user()))
  return { user, setUser};
}

export default createRoot(userSignal);