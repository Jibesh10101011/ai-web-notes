import { Metadata } from "next";
import { FC } from "react";

interface pageProps {}

export const metadata:Metadata = {
    title:"Flowbrain - Notes",
}

const Page:FC<pageProps>=({})=>{
    return <>
        <h1>All Notes</h1>
    </>
}

export default Page;