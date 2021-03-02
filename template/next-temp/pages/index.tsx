import Link from 'next/link'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'



const IndexPage = () => {
  const router = useRouter()

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
  
    <Link href={`/posts/pre-rendering`}>
      <a>pre-rendering</a>
    </Link>
    <Link href={`/posts/ssg-ssr`}>
      <a>ssg-ssr</a>
    </Link>

    <span onClick={() => router.push(`/pid/${Date.now()}`)}>Click here to read more</span>
    
    </Layout>
  )
}

export default IndexPage
