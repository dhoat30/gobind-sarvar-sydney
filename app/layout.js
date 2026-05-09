//import css file 
import './globals.scss'
import './tokens.css'
// Import slick css files
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import {Prompt, Work_Sans } from 'next/font/google'
// import {AppRouterCacheProvider} from "@mui/material-nextjs/v15-appRouter"
import ClientProvider from '@/Providers/ClientProvider';
import Script from 'next/script'

// fonts settings

const prompt = Prompt({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-prompt',
  weight: ['400', '500', '600', '700', '800', '900'],
  preload: true
})

const workSans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work-sans',
  weight: ['200', '300', '400', '500', '600', '700'],
  preload: true
})


export default function RootLayout({ children }) {


  return (
    <html lang="en" >

              <body className={`${prompt.variable} ${workSans.variable}`}>
                  {/* 3) GTM noscript fallback */}
 
        {/* <AppRouterCacheProvider> */}
      <ClientProvider>
          {children}
        </ClientProvider>
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  )
}