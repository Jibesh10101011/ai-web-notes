import Navbar from "@/components/Navbar"
import { ReactNode } from "react"

interface LayoutProps {
    children:ReactNode,
}

const Layout=({children}:LayoutProps)=>{
    return <>
        <Navbar/>
        <main className="m-auto max-w-7xl p-4">{children}</main>
    </>
}

export default Layout