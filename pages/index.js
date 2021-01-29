import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components';
import Header from '../components/Header';

const Crossroad = styled.div`
  display: flex;
  margin: auto;
`;

export default function Home() {
  return (
    <>
    <Head>
      <title>My new app</title>
      <meta name="description" content="Next is great" />
    </Head>
    <main>
      <Header />
      <Crossroad>
        <h2>Offered content</h2>
        <Link href='/videos'>
          <a>Videos</a>
        </Link>
      </Crossroad>
    </main>
    </>
  )
}
