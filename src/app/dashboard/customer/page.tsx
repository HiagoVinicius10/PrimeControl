import { Container } from "@/components/container";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Card } from "./components/card";
import prisma from "@/lib/prisma";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const customers = await prisma.customer.findMany({
    where:{
      userId: session.user.id
    }
  })


  return (
    <Container>
      <main>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black"> 
            Meus Clientes 
          </h1>
          <Link
            href={"/dashboard/customer/new"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded items-center"
          >
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {customers.map(customer => (
              <Card 
              key={customer.id}
              customer={customer}
              />
            ))}
        </section>

        {customers.length == 0 && (
          <h1 className="text-gray-500 flex items-center justify-center">Nenhum cliente cadastrado!</h1>
        )}
      </main>
    </Container>
  );
}
