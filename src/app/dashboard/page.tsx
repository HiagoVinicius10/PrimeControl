import { Container } from "@/components/container"
import {getServerSession} from "next-auth"
import { authOptions} from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Tickets } from "./components/ticket"
import prisma from "@/lib/prisma"
import { ButtonReflesh } from "./components/buttonReflesh"


export default async function Dashboard(){
 const session = await getServerSession(authOptions)

 if(!session || !session.user){
    redirect("/")
 }

 const tickets = await prisma.ticket.findMany({
  where:{
    status: "ABERTO",
    customer:{
      userId: session.user.id,
    }
  },
  include:{
    customer: true,
  },
  orderBy:{
    createdAt: "desc"
  }
 })


    return(
       <Container>
           <main>
                <div className="flex items-center justify-between mb-8">
                  <h1 className="text-2xl font-black"> Chamados </h1>
                  
                  <div className="flex items-center gap-3">
                  <ButtonReflesh />
                      <Link href={"/dashboard/new"} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded items-center">
                      Abrir chamado
                    </Link>
                  </div>
                </div>

              <table className="min-w-full my-2 ">
                <thead>
                    <tr>
                        <th className="font-medium text-left pl-2">CLIENTE</th>
                        <th className="font-medium text-left hidden sm:block">DATA CADASTRO</th>
                        <th className="font-medium text-left">STATUS</th>
                        <th className="font-medium text-left">#</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <Tickets 
                        key={ticket.id}
                        customer={ticket.customer}
                        ticket={ticket}
                        />
                    ))}
                </tbody>
              </table>

              {tickets.length === 0 && (
                  <h2 className="text-center font-medium text-gray-600 mt-8">
                        Nenhum chamado encontrado
                  </h2>
                    )}
           </main>
        </Container>
    )
}