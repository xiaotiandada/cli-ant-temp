import type { AppProps } from 'next/app';
import Providers from '../providers/index'
import '../styles/globals.css'

const APP = ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}

export default APP