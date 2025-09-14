"use client"

import { ModalContext } from "@/providers/modal"
import { MouseEvent, useContext, useRef } from "react"

export function ModalTicket() {
    const { handleModalVisible, ticket} = useContext(ModalContext)
    const modalRef = useRef<HTMLDivElement | null>(null)

    const handleModalClick = (event: MouseEvent<HTMLSelectElement>) =>{
        
        if(modalRef.current && !modalRef.current.contains(event.target as Node)){
            handleModalVisible()
        }
    }

return(
   <section className="absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalClick}>
        <div className="absolute inset-0 flex items-center justify-center">

            <div ref={modalRef} className="bg-white shadow-lg p-4 w-4/5 md:w-1/2 rounded flex flex-col gap-1">

            <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg md:text-2xl"> Detalhes do Chamado 
                </h2>
                <button className="bg-red-500 p-2 rounded text-white cursor-pointer" onClick={handleModalVisible}>Fechar
                </button>
            </div>
   
            <div className="flex flex-wrap gap-1 mb-2">
                <h3 className="font-bold">Nome</h3>
                <p> {ticket?.ticket.name}</p>
            </div>

            <div className="flex flex-wrap flex-col gap-1 mb-2">
                <h3 className="font-bold">Descrição:</h3>
                <p> {ticket?.ticket.description}</p>
            </div>
        
             <div className="w-full border-b-[1.5px] my-4">
                <h2 className="font-bold text-lg"> Detalhes do cliente  </h2>
            </div>

            <div className="flex flex-wrap gap-1 mb-2">
                <h3 className="font-bold">Nome:</h3>
                <p> {ticket?.customer?.name} </p>
            </div>

             <div className="flex flex-wrap gap-1 mb-2">
                <h3 className="font-bold">Email:</h3>
                <p> {ticket?.customer?.email}</p>
            </div>

             <div className="flex flex-wrap gap-1 mb-2">
                <h3 className="font-bold">Telefone:</h3>
                <p> {ticket?.customer?.phone}</p>
            </div>

            {ticket?.customer?.address && (
            <div className="flex flex-wrap gap-1 mb-2">
                <h3 className="font-bold">Endereço:</h3>
                <p> {ticket?.customer?.address}</p>
            </div>
            )}
            
            </div>

        </div>
   </section>
)
}
                