"use client"

import { api } from '@/lib/api';
import { CustomerProps } from '@/utils/customer.type';
import { TicketProps } from '@/utils/tickes.type';
import { BookmarkCheck, FileText } from 'lucide-react';
import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { ModalContext } from '@/providers/modal';

interface TicketItemProps {
    ticket: TicketProps
    customer: CustomerProps | null
}

export function Tickets({ customer, ticket}: TicketItemProps){
    const {handleModalVisible, setDetailTicket} = useContext(ModalContext)
    const router = useRouter()

    async function handleChangeStatus(){
        try{
            const response = await api.patch("/api/ticket",{
               id: ticket.id,
            })
            
            router.refresh()
        }catch(err){
            return NextResponse.json({ error: "NOT AUTHORIZED"}, { status: 401})
        }
    }

    function handleOpenModal(){
       handleModalVisible()
       setDetailTicket({
        customer: customer,
        ticket: ticket
       })
    }

    return(
        <>
            <tr className='border-b border-b-slate-300 h-16 last:border-0 hover:bg-zinc-200 duration-300'>
                <td className='text-left pl-2'>{customer?.name}</td>
                <td className='text-left hidden sm:table-cell'>{ticket.createdAt?.toLocaleString("pt-BR")}</td>
                <td className='text-left'> <span className='bg-green-400 p-1.5 rounded'> {ticket.status} </span> </td>
                <td className='text-left'> 
                    <button 
                    className='hover:scale-105 duration-300 mr-2 cursor-pointer' 
                    onClick={handleChangeStatus}> 
                        <BookmarkCheck size={22} color='#51f306'/> 
                    </button>
                    <button className="cursor-pointer" onClick={handleOpenModal}>
                         <FileText size={22} color='#1876e0'/> 
                    </button>
                </td>
            </tr>
        </>
    )
}