import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Formulario } from "../components/form/intex";


export default async function NewCustomer(){

    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/");
    }

    return(
        <Container>
            <main>
               <div className="flex items-center gap-2 mb-8">
                 <Link href={"/dashboard/customer"} className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded items-center">
                    Voltar
                  </Link>
                  <h1 className="text-2xl font-black"> Novo Cliente </h1>
                </div> 

                <Formulario userId={session.user.id} /> 
            </main>
        </Container>
    )
}