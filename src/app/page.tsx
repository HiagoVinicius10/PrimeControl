import Image from "next/image";


export default function Home() {
  return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
        <h2 className="font-medium text-xl mb-2">Gerencie sua empresa</h2>
        <h1 className="text-3xl lg:text-4xl text-blue-600 font-medium mb-8">Atendimentos, Clientes</h1>

        <div>
          <Image
          src={"/ImgHome.png"}
          alt="Imagem de gerenciamento"
          priority={true}
          quality={100}
          width={500}
          height={400}
          className="max-w-sm md:max-w-lg object-cover"
          />
        </div>
      </main>
  );
}
