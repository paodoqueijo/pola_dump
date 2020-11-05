import React from 'react';
import '../styles/gallery.scss';
import HorizontalScroll from 'react-scroll-horizontal';
import useGallery from '../hooks/useGallery';

function Gallery({ pageName, setSelectedImg }) {
  const { imgRow1, imgRow2 } = useGallery(pageName, setSelectedImg);

  return (
    <div className="gallery-container">
      <HorizontalScroll reverseScroll={true}>
        <div className="child">
          <div className="col">
            <div className="row">{imgRow1}</div>
            <div className="row">{imgRow2}</div>
          </div>
        </div>
      </HorizontalScroll>
    </div>
  );
}

export default Gallery;
