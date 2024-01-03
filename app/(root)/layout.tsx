import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
          </ThemeProvider>

    </div>
  );
}
