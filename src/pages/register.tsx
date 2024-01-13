import { RegisterData, signup } from "@/api";
import { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';

import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const Register: NextPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        // Supaya tidak refresh ketika submit
        event.preventDefault();

        // Ambil data dari form
        const formData = new FormData(event.currentTarget);

        // Buat object data untuk dikirim ke API
        const data: RegisterData = {
            name: formData.get('name')?.toString()!,
            email: formData.get('email')?.toString()!,
            password: formData.get('password')?.toString()!
        }

        try {
            setIsLoading(true);

            await signup(data);

            // Register berhasil
            // Redirect ke halaman login
            await router.replace(`/login?success=${encodeURIComponent('Register berhasil, silahkan login.')}`);
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div className="auth-bg flex items-center justify-center">
            <Head>
                <title>Register | Website AI</title>
            </Head>

            <div className="flex flex-col items-start max-w-md rounded-[10px] py-[73px] px-[60px] bg-black bg-opacity-85">
                <h1 className="font-medium text-3xl text-white font-poppins">Sign Up</h1>

                <form className="mt-7 w-full" onSubmit={onSubmit}>
                    {/* Full Name Input */}
                    <div className="w-full">
                        <div className="bg-[#333333] rounded-[5px] border-b-2 border-b-orange-600 border-solid">
                            <input required name="name" type="text" className="flex-grow p-4 font-poppins placeholder:text-[#8C8C8C] text-base bg-transparent h-full w-full text-white focus:outline-none" placeholder="Full name" />
                        </div>
                        {/* <span className="text-amber-600 text-sm w-full mt-2">
                            Please enter your full name.
                        </span> */}
                    </div>

                    {/* Email Address Input */}
                    <div className="mt-4 w-full">
                        <div className="bg-[#333333] rounded-[5px] border-b-2 border-b-orange-600 border-solid">
                            <input required name="email" type="email" className="flex-grow p-4 font-poppins placeholder:text-[#8C8C8C] text-base bg-transparent h-full w-full text-white focus:outline-none" placeholder="Email address" />
                        </div>
                        {/* <span className="text-amber-600 text-sm w-full mt-2">
                            Please enter a valid email address.
                        </span> */}
                    </div>

                    {/* Password Input */}
                    <div className="mt-4 w-full">
                        <div className="bg-[#333333] rounded-[5px] border-b-2 border-b-orange-600 border-solid">
                            <input required name="password" type="password" className="flex-grow p-4 font-poppins placeholder:text-[#8C8C8C] text-base bg-transparent h-full w-full text-white focus:outline-none" placeholder="Password" />
                        </div>
                        {/* <span className="text-amber-600 text-sm w-full mt-2">
                            Please enter a valid password.
                        </span> */}
                    </div>

                    <button disabled={isLoading} type="submit" className="disabled:opacity-70 mt-10 w-full h-[58px] bg-[#E50815] text-white rounded-[5px]">
                        {isLoading ? 'Loading...' : 'Sign Up'}
                    </button>

                    <p className="mt-[29px] text-sm text-[#727272]">
                        Already have an account? <Link href="/login" className="text-white">Sign in now.</Link>
                    </p>

                    <p className="text-[#818080] text-sm mt-1">
                        This page is protected by Google reCAPTCHA to ensure you are not a bot. Learn more.
                    </p>

                </form>

            </div>

        </div>
    )

}

export default Register;