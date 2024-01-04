import { ThemeProvider } from "@/components/theme-provider";

// render children ie signup, signin, login, forgot password, etc
const Layout = ({children}: {children: React.ReactNode}) =>{
    return(
        <div className="flex-center min-h-screen w-full  bg-dotted-pattern bg-cover bg-fixed bg-center">
            <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>

                 {children}
            </ThemeProvider>
        </div>)

}

export default Layout;