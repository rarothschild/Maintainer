import { createStore } from "solid-js/store";
import { createRouteAction } from "solid-start/data";
import axios from 'axios';
import { redirect } from "solid-start";
import { setUser } from "~/root";

export default function Login() {

    const [_, { Form }] = createRouteAction(async (formData: FormData) => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        const email = formData.get("email");
        const password = formData.get("password");
        const body = JSON.stringify({ email, password });
        const p = await new Promise( (resolve, reject) => {
            axios.post(`http://127.0.0.1:8000/login/`, body, config)
                .then((response) => response.data)
                .then((resp) => setUser({user: resp.user, token: resp.token}))
        })
        return redirect("/dashboard/")
      });

    return (
        <main class="grid h-[calc(100vh-5rem)] justify-items-center">
            <div class="h-fit mt-8 p-4 border border-black">
                <Form class="flex flex-col gap-4">
                    <label class="text-center text-xl font-bold">Login</label>
                    <input type="text" name="email" class="border border-black">email</input>
                    <input type="password" name="password" class="border border-black">password</input>
                    <button type="submit" class=""><span class="p-2 bg-gray-200 border border-black">Submit</span></button>
                </Form>
            </div>
        </main>
    );
}