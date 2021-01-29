import styled from 'styled-components';

const FullScreen = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  display: flex;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 190;
`;

const Container = styled.div`
  position: relative;
  width: 50%;
  height: 30%;
  min-width: 200px;
  margin: auto;
  z-index: 195;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const CloseButton = styled.div`
  position: relative;
  float: right;
  width: 30px;
  height: 30px;
  text-align: center;
  background-color: black;
  color: white;
  font-size: 20px;
  margin: auto;
  cursor: pointer;
  border-radius: 3px 3px 0 0;
`;

const Video = styled.video`
  width: 100%;
  z-index: 200;
  outline: none;
`;

const Name = styled.div`
  background-color:white;
  font-weight: bold;
  padding: 5px 5px 5px;
  margin-top: -5px;
`;

const Description = styled.div`
  background-color:white;
  padding: 5px 5px 5px;
  margin-top: -5px;
`;

const VideoOverlay = (props) => {
  return (
    <FullScreen>
      <Container>
        <CloseButton onClick={() => props.hideVideo()}>X</CloseButton>
        <Video src={props.url.video_url} controls />
        <Name>{props.url.name}</Name>
        <Description>{props.url.description}</Description>
      </Container>
    </FullScreen>
  );
};

export default VideoOverlay;
