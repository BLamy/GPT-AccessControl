import "./globals.css";
import styles from "./page.module.css";
import Link from "next/link";

export const metadata = {
  title: "Create Next AI App",
  description: "Generated by create next ai app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-gray-100">
      <body>
        <header className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto flex justify-between items-center">
            <div>
              <Link className="text-white font-bold text-lg" href="/">
                <svg
                  className="fill-current h-8 w-8 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  height={48}
                  viewBox="0 96 960 960"
                  width={48}
                >
                  <path d="M220 876h150V626h220v250h150V486L480 291 220 486v390zm-60 60V456l320-240 320 240v480H530V686H430v250H160zm320-353z" />
                </svg>
              </Link>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-center">
                NextJS AI Starter
              </h1>
            </div>
            <div></div>
          </div>
        </header>
        <main className={`mt-10 flex-grow ${styles["min-h-screen-wrapper"]}`}>
          {children}
        </main>
        <footer className="py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="container mx-auto text-center">
            <p>
              <a href="https://github.com/BLamy/nextjs-ai-starter/blob/main/LICENSE">
                LICENSE - MIT
              </a>{" "}
              - Not affiliated with Vercel.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
