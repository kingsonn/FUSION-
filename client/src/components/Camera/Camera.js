import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';

import { detectFaces, drawResults } from '../../helpers/faceApi';

// import Button from '../Button/Button';
import Webcam from 'react-webcam';
import SelectedImage from "../SelectedImage/SelectedImage";

import './Camera.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Camera = ({ photoMode }) => {
  const camera = useRef();
  const cameraCanvas = useRef();

  const [photo, setPhoto] = useState(undefined);
  const [showGallery, setShowGallery] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [results, setResults] = useState([]);

  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      await drawResults(camera.current.video, cameraCanvas.current, faces, 'boxLandmarks');
      setResults(faces);
    }
  };

  const clearOverlay = (canvas) => {
    canvas.current.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 80);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }, [photoMode]);

  const toggleGallery = () => setShowGallery(!showGallery);

  const capture = () => {
    const imgSrc = camera.current.getScreenshot();
    const newPhotos = [...photos, imgSrc];
    setPhotos(newPhotos);
    setPhoto(imgSrc);
    setShowGallery(true);
  };
  const reset = () => {
    setPhoto(undefined);
    setPhotos([]);
    setShowGallery(false);
  };
  

  return (
    <div className="camera">
      {/* <p className="text-orange-600 text-[2rem] lg:text-[5rem]">Mood Based Recommendations</p> */}
      <p className='text-orange-600 text-[1.75rem] lg:text-[4.5rem]  tracking-wide text-headingColor'>Mood Based</p>
      <p className='text-orange-600 text-[1.75rem] lg:text-[4.5rem]  tracking-wide text-headingColor'>Recommendations</p>
      <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Confused about what to eat today? Try this mood based recommender. Look into the camera under good lighting and click to recieve recommendations. We do not save any pictures.
        </p>
        <br/>
      <div className="camera__wrapper">
        <Webcam  audio={false} ref={camera} width="100%" height="auto" />
        <canvas className={classnames('webcam-overlay', photoMode && 'webcam-overlay--hidden')} ref={cameraCanvas} />
      </div>

      {photoMode ? (
        <>
          <div className="camera__button-container">
            <button onClick={capture} className="camera__button--snap">
              <FontAwesomeIcon icon="camera" size="lg" />
            </button>
          </div>

          {photos.length > 0 && <SelectedImage img={photo}/>}
        </>
      ) : (
        <>
          {/* <div className="results__container">
            <Results results={results} />
          </div> */}
        </>
      )}
    </div>
  );
};

export default Camera;
