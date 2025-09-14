"use client"

import { Input } from "@/components/input"
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { CustomerPropsInfo } from "../../page";

interface FormTicketProps {
  customer: CustomerPropsInfo;
}

 const schema = z.object({
        name: z.string().min(1, "Digite o nome do chamado para conseguimos abrir um chamado para você"),
        description: z.string().min(1, "Digite o problema do seu chamado para que podemos lhe ajudar"),
      });

       type FormData = z.infer<typeof schema>

export function FormTicket({customer}: FormTicketProps){
      const {
          register,
          handleSubmit,
          setValue,
          formState: { errors },
        } = useForm<FormData>({
          resolver: zodResolver(schema)
        });

    async function handleRegisterTicket(data: FormData){
      const response = await api.post("/api/ticket", {
        name: data.name,
        description: data.description,
        customerId: customer.id
      })

    setValue("name", "");
    setValue("description", "");
    }


    return(
        <form 
        onSubmit={handleSubmit(handleRegisterTicket)}
        className="flex flex-col gap-3 w-full bg-slate-100 border-2-solid border-gray-300 py-6 px-3 rounded">
              <label className="font-medium"> Nome do Chamado</label>
              <Input
                name="name"
                type="text"
                placeholder="Digite o chamado..."
                register={register}
                error={errors.name?.message}
              />

              <label className="font-medium"> Descreva o problema </label>
              <textarea
                className="border-2 border-gray-300 rounded px-3 py-2 h-24 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Descreve o problema que está ocorrendo..."
                {...register("description")}
                id="description"
              ></textarea>
              {errors.description?.message && <p className="text-red-600">{errors.description?.message }</p>}

              <button
                className="w-full bg-blue-500 hover:bg-blue-700 duration-200 text-white font-medium h-11 rounded cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed my-6 "
                type="submit"
              >
                Cadastrar
              </button>
            </form>
    )
}