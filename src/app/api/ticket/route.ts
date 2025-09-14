import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function PATCH(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user.id){
        return NextResponse.json({ error: "NOT AUTHORIZED"}, { status: 401})
    }

    const { id } = await request.json();

    const findTicket = await prisma.ticket.findFirst({
        where:{
            id: id as string,
        }
    })

    if(!findTicket){
        return NextResponse.json({error: "Failed update ticket"}, {status: 400})
    }

  try{
    await prisma.ticket.update({
        where:{
            id: id as string
        }, 
        data:{
            status: "FECHADO"
        }
    })
   
    return NextResponse.json({message: "Chamado atualizado com sucesso!"})
  }catch(err){
        return NextResponse.json({ error: "Failed update ticket"}, { status: 400})
  }
}
export async function POST(request: Request) {
    const {customerId, name, description} = await request.json();

    try{
        const createTicket = await prisma.ticket.create({
            data: {
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
            }
        })
    return NextResponse.json({ message: "Ticket successfully registered"})

    }catch(err){
        return NextResponse.json({ message: "Failed create new ticket"}, { status: 400})
    }
}


