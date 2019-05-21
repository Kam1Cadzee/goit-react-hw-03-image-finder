import React from 'react';
import PropTypes from 'prop-types';
import GalleryItem from './GalleryItem/GalleryItem';

const Gallery = ({ items }) => {
  return items.length > 0 ? (
    <div className="gallery">
      {items.map(item => (
        <GalleryItem key={item.id} {...item} />
      ))}
    </div>
  ) : (
    <p>No images</p>
  );
};
Gallery.defaultProps = {
  items: [],
};
Gallery.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};
export default Gallery;
