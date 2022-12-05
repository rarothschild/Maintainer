import { createStore } from "solid-js/store";
import { redirect } from "solid-start";
import { login } from "~/session";
import { createServerAction$ } from "solid-start/server";

export default function Login() {
    const [_, { Form }] = createServerAction$(async (formData: FormData) => {
        const email     = formData.get('email') as string
        const password  = formData.get('password') as string
        const headers = await login({email, password})
        return redirect('/dashboard')
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