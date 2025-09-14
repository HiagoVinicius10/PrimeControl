import { Container } from "@/components/container";
import Link from "next/link";

 export function DashboardHeader(){
    return(
        <Container>
            <header className="bg-zinc-900 w-full p-3 flex gap-4 items-center my-7 rounded">
                <Link href={"/dashboard"} className="text-white hover:font-bold duration-300">
                    Chamados                
                </Link>
                <Link href={"/dashboard/customer"} className="text-white hover:font-bold duration-300">
                    Clientes                
                </Link>
            </header>
        </Container>
    )
 }