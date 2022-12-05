import { createStore } from "solid-js/store";
import { createRouteAction } from "solid-start/data";
import { redirect } from "solid-start";



export default function Register() {
    const [_, { Form }] = createRouteAction(async (formData: FormData) => {
        console.log(formData);
        //axiosInstance
		//	.post(`user/`, {
		//		email: formData.get("email"),
		//		user_name: formData.get("user_name"),
		//		password: formData.get("password")
		//	})
		//	.then((res) => {
		//		console.log(res);
		//		console.log(res.data);
		//	});
        return redirect('/dashboard')
      });

    return (
        <main class="grid h-[calc(100vh-5rem)] justify-items-center">
            <div class="h-fit mt-8 p-4 border border-black">
                <Form class="flex flex-col gap-4">
                    <label class="text-center text-xl font-bold">Register</label>
                    <input type="text" name="email" class="border border-black">Email</input>
                    <input type="password" name="password" class="border border-black">Password</input>
                    <button type="submit" class=""><span class="p-2 bg-gray-200 border border-black">Submit</span></button>
                </Form>
            </div>
        </main>
    );
}