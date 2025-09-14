import { DashboardHeader } from "./components/header/header"

interface LayoutProps{
    children: React.ReactNode
}

export default function Layout({children}: LayoutProps){
    return(
        <>
            <DashboardHeader/>
            {children}
        </>
    )
}