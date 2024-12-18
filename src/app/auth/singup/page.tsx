"use client"
import { trpc } from '@/app/_trpc/client'
import Image from 'next/image'
import React from 'react'

function Login() {

    // Use the mutation hook at the top level
    const mutation = trpc.authRoutes.signup.useMutation();
    const handelSignin = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;

        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        console.log("Form Data:", { email, password, });

        try {
            await mutation.mutateAsync({
                email,
                password,
            });

            if (mutation.isSuccess) {
                console.log("Sign-in successful:", mutation.data);
            } else if (mutation.isError) {
                console.error("Sign-in failed:", mutation.error);
            }
        } catch (error) {
            console.error("Unexpected error signing in:", error);
        }
    };




    return (
        <div className='flex flex-col lg:flex-row items-center justify-center lg:justify-evenly h-[100vh] w-[100vw]  bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]'>
            <div className='w-[70%] lg:w-[50%] flex items-center justify-center'>
                <Image src={'/greenearth.svg'} width={500} height={500} alt='logo' />
            </div>
            <div className='w-[90%] w-[50%] flex justify-center items-center flex-col'>
                <form action="" onSubmit={handelSignin} className="w-full max-w-sm mx-auto bg-blur p-6 rounded-lg shadow-md">
                    <h1 className='text-blue font-bold text-3xl'>Login</h1>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Ravi gangwar"
                            name="name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            placeholder="ravigangwar7465@gmail.com"
                            name="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            placeholder="jaishreeram"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Login"
                            name="submit"
                            className="w-full bg-blue-500 cursor-pointer bg-blue font-bold text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login