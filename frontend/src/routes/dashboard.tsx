import {
    createServerAction$,
    createServerData$,
    redirect
  } from 'solid-start/server'
import axios from 'axios';
import { createSignal } from "solid-js";
import userSignal from "../lib/user";

export function routeData() {
    const user = createServerData$(async (_, { request }) => {
      const user = await getUser(request)
  
      if (!user) {
        throw redirect('/login')
      }
      return user
    })
  
    const [todos, { refetch }] = createResource<Todo[]>(async () => {
      const { data } = await urqlClient().query(TODOS, {}).toPromise()
      return data.todos
    })
  
    return { user, todos, refetchTodos: refetch }
  }

export default function dashboard() {
    const { user, setUser } = userSignal;
    const [items,setItems] = createSignal([])
    console.log(user())
    function loadObjects() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Token'
            }
        };
        const data = createRouteData(async () => {
            axios.get(`http://127.0.0.1:8000/objects/`)
                    .then((response) => setItems(response.data))
            }
        );
     
      data() // null, data is not yet loaded, triggers Suspense
      data.loading // true, data is loading
      data.latest // null, data is not yet loaded
    }

    return(
        <div class="flex flex-row h-[calc(100vh-5rem)]">
            <aside class="w-48 border-x border-black bg-gray-400">
                <h2 class="font-bold text-lg text-center bg-amber-400 border-b border-black">Assets</h2>
                
                <div class="">
                    <div class="py-1 px-2 flex flex-row items-center justify-between font-bold bg-orange-300 border-y border-black">
                        <h3 class="text-lg">Services</h3>
                        <button class="rounded p-1 px-2 bg-teal-700 text-gray-300 border border-black">Add</button>
                    </div>
                    <ul class="ml-2 border-l border-black font-bold">
                        <li class="py-1 px-2 border-b border-black bg-amber-200">Commencal 1</li>
                        <li class="py-1 px-2 bg-amber-200">Commencal 2</li>
                    </ul>
                </div>
                <div class="">
                    <div class="py-1 px-2 flex flex-row items-center justify-between font-bold bg-orange-300 border-y border-black">
                        <h3 class="text-lg">Stock</h3>
                        <button class="rounded p-1 px-2 bg-teal-700 text-gray-300 border border-black">Add</button>
                    </div>
                    <ul class="ml-2 border-l border-black font-bold">
                        <li class="py-1 px-2 border-b border-black bg-amber-200">Commencal 1</li>
                        <li class="py-1 px-2 border-b border-black bg-amber-200">Commencal 2</li>
                    </ul>
                </div>
            </aside>
            <div class="w-full p-4 bg-gray-500">
                <p>Add a asset to get started</p>
            </div>
        </div>
    );
}
