"use client";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps{
    type: string;
    placeholder: string;
    name: string;
    register: UseFormRegister<any>;
    error?: string;
    rules?: RegisterOptions;
}

export function Input({type, placeholder, name, register, error, rules}: InputProps){

    return(
        <>
           <input
           className="border-2 border-gray-300 rounded px-3 h-11 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
             type={type}
             placeholder={placeholder}
             {...register(name, rules)}
             id={name}         
           />
           {error && <p className="text-red-600 my-1">{error}</p>}     
        </>
    )
}