import { SignIn } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata:Metadata = {
    title:"Flowbrain - Sign In",
};

const SignInPage=()=>{
    return <div className="flex h-screen items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
        <SignIn appearance={{variables:{colorPrimary:"#0F172A"}}}/>
    </div>
}

export default SignInPage