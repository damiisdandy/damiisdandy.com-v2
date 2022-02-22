import React, { useEffect } from 'react';
import { useGlobalStoreContext } from '../../context';

const Spotify = () => {
  const { state } = useGlobalStoreContext();
  useEffect(() => {
    console.log(document.querySelector('[title="Play"]'));
  }, []);
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/2V3yMxk0NC66iA3p2aM38R?utm_source=generator${
        !state.isLightmode ? '&theme=0' : ''
      }`}
      width="100%"
      height="380"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    ></iframe>
  );
};

export default Spotify;
