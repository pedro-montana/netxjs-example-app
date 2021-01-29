import Head from 'next/head';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import VideoOverlay from '../components/VideoOverlay';
import styled from 'styled-components';
import axios from 'axios';

const api = axios.create({
  baseURL: `https://orangevalleycaa.org/api/videos`,
});

const Videos = styled.div`
  display: flex;
  width: auto;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  padding: 10px;
`;

const SortSelect = styled.select`
  width: 120px;
  height: 30px;
`;

const OneVideo = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const PlayButton = styled.div`
  position: relative;
  text-align: center;
  bottom: 50%;
  z-index: 100;
  font-size: 50px;
  color: ${(props) => props.color || 'black'};
`;

const Name = styled.div`
  margin-top: -60px;
`;

const VideoSection = () => {
  const [videos, setVideos] = useState();
  const [sortedVideos, setSortedVideos] = useState();
  const [overlay, setOverlay] = useState(false);
  const [myVideo, setMyVideo] = useState();
  const [active, setActive] = useState(-1);

  useEffect(() => {
    api.get('/').then((res) => {
      setVideos(res.data);
    });
  }, []);

  const sortVideos = (a) => {
    a === 'asc' &&
      setSortedVideos(
        videos.sort((a, b) =>
          a.name < b.name ? -1 : a.name === b.name ? 0 : 1
        )
      );
    a === 'id' &&
      setSortedVideos(
        videos.sort((a, b) => (a.id < b.id ? -1 : a.id === b.id ? 0 : 1))
      );
  };

  const showVideo = (i) => {
    setMyVideo(videos[i]);
    setOverlay(true);
  };

  const hideVideo = () => {
    setOverlay(false);
  };

  const activeVideo = (id) => {
    setActive(id);
  };

  return (
    <>
      <Head>
        <title>Videos Page</title>
        <meta name="description" content="Videos from public API" />
      </Head>
      <main>
        <Header />
        <h3>
          API url:{' '}
          <a
            href="https://orangevalleycaa.org/api/videos"
            target="_blank"
            rel="noopener noreferrer"
          >
            'https://orangevalleycaa.org/api/videos'
          </a>
        </h3>
        <div>Sort:</div>
        <SortSelect
          id="selectSort"
          onChange={(e) => sortVideos(e.target.value)}
        >
          <option value="id">Normal</option>
          <option value="asc">Alphabetically</option>
        </SortSelect>
        <Videos>
          {videos &&
            videos.map((data, i) => (
              <OneVideo key={i}>
                <Img
                  src={data.thumbnail}
                  alt={data.name}
                  title={`Play video ${data.name}`}
                  key={i}
                  onClick={() => showVideo(i)}
                  onMouseEnter={() => activeVideo(i)}
                  onMouseLeave={() => activeVideo('')}
                />
                <PlayButton
                  color={
                    active !== -1 && active === i
                      ? '#3399ff'
                      : 'rgba(0, 0, 0, 0)'
                  }
                  title={`Play video ${data.name}`}
                  onClick={() => showVideo(i)}
                  onMouseEnter={() => activeVideo(i)}
                >
                  &#9654;
                </PlayButton>
                <Name>{data.name}</Name>
              </OneVideo>
            ))}
          {overlay && <VideoOverlay url={myVideo} hideVideo={hideVideo} />}
        </Videos>
      </main>
    </>
  );
};

export default VideoSection;
