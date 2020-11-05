import React from 'react';
import testImgScr from '../images/camera.svg';
import useFirestore from './useFirestore';

function useGallery(page, setSelectedImg) {
  const { data } = useFirestore(page);
  const images = data.images;
  let imgRow1 = [];
  let imgRow2 = [];
  if (images) {
    images.forEach((item, idx) => {
      const row = idx % 2 ? imgRow2 : imgRow1;
      row.push(
        <img
          onClick={() => setSelectedImg(item)}
          className="picture"
          src={item['thumbUrl@512'] || testImgScr}
          key={idx}
          alt={item.name}
        />
      );
    });
  }

  return { imgRow1, imgRow2 };
}

export default useGallery;
