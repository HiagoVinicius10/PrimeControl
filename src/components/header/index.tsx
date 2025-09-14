"use client"
import Link from "next/link";
import { User,LogIn,Loader,UserLock } from "lucide-react";
import { signIn, signOut, useSession} from "next-auth/react"


export function Header (){

   const { status, data } = useSession()


async function handleLogin(){
   await signIn()
}

async function handleLogout(){
   await signOut()
}

    return(
        <header className="w-full flex items-center bg-white h-20 shadow-md ">
           <section className="w-full flex items-center justify-between max-w-7xl mx-auto px-4">
                   <article>
                        <Link href="/">
                          <h1 className="font-bold text-2xl hover:tracking-wider transition-all duration-300 text-black">
                           <span className="text-blue-600">
                                Prime
                           </span> Control
                           </h1>   
                        </Link>
                   </article>

                   {status === "loading" && (
                    <button className="cursor-pointer">
                      <Loader size={28} className="animate-spin" color="#6c6969" />
                    </button>
                   )}

                   {status === "unauthenticated" &&(
                     <button onClick={handleLogin} className="cursor-pointer">
                        <UserLock size={28} color="#6c6969" />
                     </button>
                   )}

                   {status === "authenticated" && (
                     <div className="flex items-center gap-2.5">
                     <Link href="/dashboard">
                        <User size={28} color="#6c6969" />
                     </Link>
                  
                     <button  onClick={handleLogout} className="cursor-pointer">
                        <LogIn size={28} color="#6c6969" />
                     </button>
                   </div>
                   )}
           </section>
        </header>
    )
}