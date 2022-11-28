import { For } from 'solid-js';

export default function AssetGroup(props) {
    return(
        <div>
            <div class="py-1 px-2 flex flex-row items-center justify-between font-bold bg-orange-300 border-y border-black">
                <h3 class="text-lg">{props.title}</h3>
                <button class="rounded p-1 px-2 bg-teal-700 text-gray-300 border border-black">Add</button>
            </div>
            <ul class="ml-2 border-l border-black font-bold">
                <For each={props.objects}>
                    {(object: object) => <li class="py-1 px-2 border-b border-black bg-amber-200">Test</li>}
                </For>
            </ul>
        </div>
    )
}