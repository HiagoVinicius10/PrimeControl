import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";


export async function GET(request: Request){
    const {searchParams} = new URL(request.url);
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({ error: " CUSTOMER NOT FOUND"}, { status: 401})
    }

    try{
        const findCustomer = await prisma.customer.findFirst({
        where:{
            email: customerEmail
        }
    })

    return NextResponse.json(findCustomer)

    }catch(err){
        return NextResponse.json({ error: " CUSTOMER NOT FOUND"}, { status: 401})
    }
}

export async function DELETE(request: Request) {
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
         return NextResponse.json({ error: "ERROR DELETE THE USER"}, { status: 401})
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id")

    if(!userId){
         return NextResponse.json({ error: "Failed delete customer"}, { status: 400})
    }

    const findTicket = await prisma.ticket.findFirst({
        where:{
            customerId: userId
        }
    })

    if(findTicket){
        return NextResponse.json({ error: "Failed delete customer"}, { status: 400})
    }
    
    try{
        await prisma.customer.delete({
            where:{
                id: userId as string
            }
        })

        return NextResponse.json({message: "User deleted with succefull"})

    }catch(err){
        return NextResponse.json({ error: "Failed delete customer"}, { status: 401})
    }
}

// Rota para cadastrar cliente 
export async function POST(request: Request) {

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({ error: "NOT AUTHORIZED"}, { status: 401})
    }

    const {name, email, phone, address, userId} = await request.json()

    try{
        await prisma.customer.create({
            data:{
                name,
                email,
                phone,
                address: address ? address : "",
                userId: userId
            }
        })

         return NextResponse.json({ message: "User successfully registered"})

    }catch(err){
        return NextResponse.json({ error: "Failed create new customer"}, { status: 400})
    }
}