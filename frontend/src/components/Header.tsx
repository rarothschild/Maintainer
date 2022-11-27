import { createSignal } from "solid-js";

export default function Header() {
  const [count, setCount] = createSignal(0);
  return (
    <div class="flex flex-row justify-between h-20 border-b border-black">
        <div class="place-self-end">
            <a href="/"><h1 class="ml-8 text-7xl">Assetium</h1></a>
        </div>
        <div class="grid grid-cols-2 gap-2 mr-8 place-self-end font-bold text-lg text-center">
            <a class="py-1 px-2 bg-teal-700 text-gray-300" href="/login">Login</a>
            <a class="py-1 px-2 bg-teal-700 text-gray-300">Register</a>
        </div>
    </div>
  );
}