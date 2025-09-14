import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket(){
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    const customers = await prisma.customer.findMany({
        where:{
            userId: session.user.id
        }
    })

   

    async function handleRegisterTicket(formData: FormData){
    "use server"

    const name = formData.get("name")
    const description = formData.get("description")
    const customerId = formData.get("customer")

    if(!name || !description || !customerId){
        return;
    }


    await prisma.ticket.create({
    data:{
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: "ABERTO",
        userId: session?.user.id
    }
})
 redirect("/dashboard")
}



    return(
        <Container>
            <main className="mt-9">
                <div className="flex items-center gap-4 mb-12">
                    <Link 
                    href={"/dashboard"}
                    className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded items-center"
                    >
                        Voltar                   
                    </Link>
                <h1 className="text-2xl font-black"> Novo chamado </h1>
                </div>

                <form className="flex flex-col gap-3" action={handleRegisterTicket}>
                    <label className="font-medium"> Nome do Chamado</label>
                    <input
                    name="name"
                    type="text"
                    placeholder="Digite seu nome..."
                    required
                    className="border-2 border-gray-300 rounded px-3 h-11 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="font-medium"> Descreva o problema </label>
                    <textarea
                    className="border-2 border-gray-300 rounded px-3 h-24 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Descreve o problema que está ocorrendo..."
                    required
                    name="description"
                    ></textarea>

                    {customers.length !== 0 && (
                        <>
                        <label className="mb-1 font-medium"> 
                            Selecione seu cliente 
                        </label>
                    <select 
                    name="customer"
                    className="border-2 border-gray-300 rounded px-3 h-11 w-full">
                        {customers.map((customer) => (
                            <option
                             key={customer.id}
                             value={customer.id}> 
                            {customer.name}
                        </option>
                        ))}
                    </select>
                        </>
                    )}
                    
                    {customers.length === 0 && (
                        <p>Você ainda não tem nenhum cliente, <Link 
                        className="text-blue-600 font-medium"
                        href={"/dashboard/customer/new"}>Cadastrar</Link> </p>
                    )}

                    <button
                    className="w-full bg-blue-600 hover:bg-blue-700 duration-200 text-white font-medium h-11 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed my-6 "
                    disabled={customers.length === 0}
                    type="submit"
                    >
                        Cadastrar
                    </button>
                    
                </form>
                

            </main>
        </Container>
    )
}    