"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/input"
import { api } from "@/lib/api"
import { useRouter } from "next/navigation"

export function Formulario ({userId}: {userId: string}){

    const schema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("enter your email address").min(1, "Email is required"),
        phone: z.string().refine((value) => {
            return /^(?:\(\d{2}\)\s?)?\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value);
        },{
            message: "The phone number  should be in the format (XX) XXXXX-XXXX",
        }),
        address: z.string(),
    })

    type FormData = z.infer<typeof schema>

    const {register, handleSubmit, formState:{ errors }} = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    const router = useRouter()

   async function handleRegister(data: FormData){
        const response = await api.post("/api/customer", {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            userId: userId
        })

        router.refresh()
        router.replace("/dashboard/customer")
    }

    return(
        <form className="flex flex-col gap-2 " onSubmit={handleSubmit(handleRegister)}>
            <label className="font-medium"> 
                Nome completo 
            </label>
            <Input
            type="text"
            placeholder="Digite seu nome completo..."
            name="name"
            register={register}
            error={errors.name?.message}
            />

        <section className=" flex flex-col sm:flex-row gap-2 mt-2">
           <div className="flex-1 ">
             <label className="font-medium"> 
                Email
            </label>
            <Input
            type="email"
            placeholder="Digite seu email..."
            name="email"
            register={register}
            error={errors.email?.message}
            />
           </div>

           <div className="flex-1">
             <label className="font-medium"> 
                Telefone
            </label>
            <Input
            type="number"
            placeholder="Digite seu numero de telefone..."
            name="phone"
            register={register}
            error={errors.phone?.message}
            />
           </div>
        </section>

         <label className="font-medium"> 
                Endereço
            </label>
            <Input
            type="text"
            placeholder="Digite seu endereço..."
            name="address"
            register={register}
            error={errors.address?.message}
            />

        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full cursor-pointer"
        type="submit"
        >
            Salvar
        </button>
        </form> 
    )
}