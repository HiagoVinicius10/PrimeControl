"use client"
import { RefreshCcw } from 'lucide-react';
import {useRouter} from "next/navigation"

export function ButtonReflesh(){

    const router = useRouter()

    return(
        <button
        onClick={() => router.refresh()}
         className="bg-gray-700 py-1 px-2.5 rounded cursor-pointer ">
            <RefreshCcw className="hover:rotate-180 duration-300" size={23} color="#fff"/>
        </button>
    )
}