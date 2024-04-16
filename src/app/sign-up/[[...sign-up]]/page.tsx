import { SignUp } from "@clerk/nextjs"
import { Metadata } from "next"

export const metadata:Metadata = {
    title:"Notes-studnet Sign Up",
}
const SignUpPage=()=>{
    return <div className="flex h-screen items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500">
        <SignUp appearance={{variables:{colorPrimary:"#0F172A"}}}/>
    </div>
}

export default SignUpPage