import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import Header from '../components/Header';

const Crossroad = styled.div`
  display: flex;
  margin: auto;
  text-align: center;
  justify-content: center;
`;

const Page = styled.div`
  margin: 15px;
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
          <Page>
            <Link href="/videos">
              <a>Videos</a>
            </Link>
          </Page>

          <Page>
            <Link href="/breweries">
              <a>Breweries</a>
            </Link>
          </Page>
        </Crossroad>
      </main>
    </>
  );
}
