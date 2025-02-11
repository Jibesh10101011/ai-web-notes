"use client";

import { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus  } from "lucide-react";
import AddEditNoteDialog from "./AddEditNoteDialog";
import ThemeToggleButton from "./ThemeToggleButton";

interface NavbarProps {}

const Navbar:FC<NavbarProps>=({})=>{

    const [showAddEditNoteDialog,setshowAddEditNoteDialog]=useState<boolean>(false);
    
    return <>
    <div className="p-4 shadow">
        <div className="max-w-7xl m-auto flex flex-wrap gap-3 items-center justify-between">
            <Link href="/notes" className="flex items-center gap-1">
                <Image src={logo} alt="Flowbrain logo" width={40} height={40} />
                <span className="font-bold">Notes-student</span>
            </Link>
            <div className="flex items-center gap-2">
                <UserButton afterSignOutUrl="/" appearance={{
                    elements:{avatarBox:{width:"2.5rem",height:"2.5rem"}}
                }}/>
                <ThemeToggleButton/>
                <Button 
                    onClick={()=>setshowAddEditNoteDialog(true)}
                >
                    <Plus size={20} className="mr-2" />
                    Add note
                </Button>
            </div>
        </div>
    </div>
    {showAddEditNoteDialog && <AddEditNoteDialog open={showAddEditNoteDialog} setOpen={setshowAddEditNoteDialog} />}
    </>
}
export default Navbar