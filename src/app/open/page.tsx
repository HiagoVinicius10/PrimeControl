"use client";
import { useState } from "react";
import { Input } from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Search } from "lucide-react";
import { X } from "lucide-react";
import prisma from "@/lib/prisma";
import { api } from "@/lib/api";
import { FormTicket } from "./components/formTicket";

export interface CustomerPropsInfo {
  id: string;
  name: string;
}

const schema = z.object({
    email: z.string().email("Digite o email do cliente para encontralo").min(1,"O campo email é obrigatorio"),
  });

  type FormData = z.infer<typeof schema>;

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerPropsInfo | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  function handleClearCustomer(){
    setCustomer(null)
    setValue("email", "");
  }
   
  async function handleSearchCustomer(data: FormData) {
    const response = await api.get("/api/customer", {
        params:{
            email: data.email
        }
    })

    if(response.data === null){
      setError("email", {type: "custom", message: "Ops! Cliente nao encontrado"});
    }

    setCustomer({
      id: response.data.id,
      name: response.data.name
    })
  }

  
   
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <h1 className="text-center text-2xl md:text-3xl font-bold mt-24 mb-3">
        Abrir chamado
      </h1>

    <main>
        {customer ? (
        <div>
        <section className="bg-slate-100 border-2-solid border-gray-300 py-10 px-3 rounded flex items-center justify-between mb-8">
            <h3>
              <span className="font-bold">Cliente Selecionado:</span>{" "}
              {customer.name}
            </h3>
            <button onClick={handleClearCustomer} className="cursor-pointer">
              <X size={28} color="red" />
            </button>
        </section>
        
    </div>

        ) : (
          <form
            className="bg-slate-100 border-2-solid border-gray-300 py-6 px-3 rounded"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div>
            <Input
              type="text"
              name="email"
              placeholder="Digite o Email do cliente"
              register={register}
              error={errors.email?.message}
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 duration-200 text-white font-bold h-11 w-full mt-3 cursor-pointer rounded flex gap-2 items-center justify-center"
            >
              Procurar cliente
              <Search size={23} />
            </button> 
          </div>  
          </form>
        )}
  
      {customer && <FormTicket customer={customer}/>}

      </main>
    </div>
  );
}
