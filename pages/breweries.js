import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import styled from 'styled-components';
import axios from 'axios';

const api = axios.create({
  baseURL: `https://api.openbrewerydb.org/breweries`,
});

const SortSelect = styled.select`
  width: 120px;
  height: 30px;
`;

const BrewList = styled.div`
  display: flex;
  width: auto;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
  text-align: center;
  margin: auto;
`;

const Brewery = styled.div`
  width: 300px;
  height: 300px;
`;

const Breweries = () => {
  const [brew, setBrew] = useState();
  const [brewSorted, setBrewSorted] = useState([]);

  useEffect(() => {
    api.get('/').then((res) => {
      setBrew(res.data);
    });
  }, []);

  const sortBreweries = (a) => {
    a === 'name' &&
      setBrewSorted(
        brew.sort((a, b) => (a.name < b.name ? -1 : a.name === b.name ? 0 : 1))
      );
    a === 'id' && setBrewSorted(brew);
    a === 'state' && setBrewSorted(
      brew.sort((a, b) => (a.state < b.state ? -1 : a.state === b.state ? 0 : 1))
    );
  };

  return (
    <>
      <Head>
        <title>Breweries</title>
        <meta name="description" content="Breweries from public API" />
      </Head>
      <main>
        <Header />
        <h3>
          API url:{' '}
          <a
            href="https://api.openbrewerydb.org/breweries"
            target="_blank"
            rel="noopener noreferrer"
          >
            'https://api.openbrewerydb.org/breweries'
          </a>
        </h3>
        <div>Sort:</div>
        <SortSelect id="selectSort" onChange={(e) => sortBreweries(e.target.value)}>
          <option value="id">Default</option>
          <option value="name">Name</option>
          <option value="state">State</option>
        </SortSelect>
        <BrewList>
          {brewSorted.length > 0 ? brewSorted.map((b) => (
            <Brewery>
              <h2>{b.name}</h2>
              {b.website_url && <p>
                <a
                  href={b.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.website_url}
                </a>
              </p>}
              <p>{`${b.state}, ${b.country}`}</p>
              <p>{`${b.street}`}</p>
            </Brewery>
          )) :
          brew && brew.map((b) => (
            <Brewery>
              <h2>{b.name}</h2>
              {b.website_url && <p>
                <a
                  href={b.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {b.website_url}
                </a>
              </p>}
              <p>{`${b.state}, ${b.country}`}</p>
              <p>{`${b.street}`}</p>
            </Brewery>
          ))
          }
        </BrewList>
      </main>
    </>
  );
};

export default Breweries;
