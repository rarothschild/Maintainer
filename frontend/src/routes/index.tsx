import { A } from "solid-start";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="text-6xl text-sky-700 font-thin uppercase my-4">
        Welcome to Assetium
      </h1>
      <h2 class="text-2xl">Keep track of the equipment, assets, and maintenence in your life</h2>
      <p class="py-8 text-lg max-w-2xl mx-auto">Use Assetium to keep a catalouge of the assets in your life. 
      If you have a bike or rack of bikes, you can stay in touch with the maintence schedule of the components. 
      Thinking about swapping some components out? See what's compatable from a database of parts.</p>
      <div class="mb-4 grid h-72 w-96 mx-auto bg-slate-300">
        <p class="place-self-center text-lg font-bold">Video Placeholder</p>
      </div>
      <Counter />
    </main>
  );
}
