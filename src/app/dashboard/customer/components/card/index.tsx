"use client"

import { api } from "@/lib/api"
import { CustomerProps } from "@/utils/customer.type"
import { useRouter } from "next/navigation"

export function Card({customer}: {customer: CustomerProps} ){
    const router = useRouter()

    async function handleDelete(){
        
        try{
             await api.delete("/api/customer",{
                params:{
                    id: customer.id
                }
            })
            
            router.refresh()
        }catch(err){
            console.log(err)
        }
    }

    return(
        <article className="flex flex-col border-gray-200 border-8 p-2 rounded gap-2 hover:scale-105 duration-300">
            <h1> <span className="font-bold">Name:</span> {customer.name}</h1>
            <h1> <span className="font-bold">Email:</span> {customer.email} </h1>
            <h1> <span className="font-bold">Cell:</span> {customer.phone}</h1>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded self-start  cursor-pointer"
            onClick={handleDelete}
            >
                Delete
            </button>
        </article>
    )
}