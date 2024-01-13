import { NextPage } from "next";
import Head from "next/head";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Login: NextPage = () => {

    const router = useRouter();

    useEffect(() => {
        const { success } = router.query;

        if (success) {
            toast.success(success as string, {
                duration: 3000,
                id: 'register-success'
            });
        }
    }, [router.query]);

    return (
        <div className="auth-bg flex items-center justify-center">
            <Head>
                <title>Login | Website AI</title>
            </Head>

            <div className="flex flex-col items-start max-w-md rounded-[10px] py-[73px] px-[60px] bg-black bg-opacity-85">
                <h1 className="font-medium text-3xl text-white font-poppins">Sign In</h1>

                <form className="mt-7 w-full">
                    {/* Email Address Input */}
                    <div className="w-full">
                        <div className="bg-[#333333] rounded-[5px] border-b-2 border-b-orange-600 border-solid">
                            <input type="email" className="flex-grow p-4 font-poppins placeholder:text-[#8C8C8C] text-base bg-transparent h-full w-full text-white focus:outline-none" placeholder="Email address" />
                        </div>
                        <span className="text-amber-600 text-sm w-full mt-2">
                            Please enter a valid email address.
                        </span>
                    </div>

                    {/* Password Input */}
                    <div className="mt-4 w-full">
                        <div className="bg-[#333333] rounded-[5px] border-b-2 border-b-orange-600 border-solid">
                            <input type="password" className="flex-grow p-4 font-poppins placeholder:text-[#8C8C8C] text-base bg-transparent h-full w-full text-white focus:outline-none" placeholder="Password" />
                        </div>
                        <span className="text-amber-600 text-sm w-full mt-2">
                            Please enter a valid password.
                        </span>
                    </div>

                    <button type="submit" className="mt-10 w-full h-[58px] bg-[#E50815] text-white rounded-[5px]">
                        Sign In
                    </button>

                    <p className="mt-[29px] text-sm text-[#727272]">
                        New to Flixnet? <Link href="/register" className="text-white">Sign up now.</Link>
                    </p>

                    <p className="text-[#818080] text-sm mt-1">
                        This page is protected by Google reCAPTCHA to ensure you are not a bot. Learn more.
                    </p>

                </form>

            </div>

        </div>
    )

}

export default Login;