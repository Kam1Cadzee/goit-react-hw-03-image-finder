import React from 'react';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';
import Modal from '../../Modal';
import css from './GalleryItem.module.css';
import Togglable from '../../Togglable';

const GalleryItem = ({
  thumb,
  largeImage,
  likes,
  views,
  comments,
  downloads,
}) => {
  return (
    <div className={css.galleryItem}>
      <LazyLoad debounce={false} height={260}>
        <img className={css.img} src={thumb} alt="" />
      </LazyLoad>

      <div className={css.stats}>
        <p className={css.statsItem}>
          <i className="material-icons">thumb_up</i>
          {likes}
        </p>
        <p className={css.statsItem}>
          <i className="material-icons">visibility</i>
          {views}
        </p>
        <p className={css.statsItem}>
          <i className="material-icons">comment</i>
          {comments}
        </p>
        <p className={css.statsItem}>
          <i className="material-icons">cloud_download</i>
          {downloads}
        </p>
      </div>
      <Togglable>
        {({ isToggle, handleToggle }) => (
          <>
            <button
              type="button"
              className={css.fullscreenButton}
              onClick={handleToggle}
            >
              <i className="material-icons">zoom_out_map</i>
            </button>
            {isToggle && (
              <Modal onClose={handleToggle}>
                <LazyLoad>
                  <img src={largeImage} alt="" />
                </LazyLoad>
              </Modal>
            )}
          </>
        )}
      </Togglable>
    </div>
  );
};

GalleryItem.propTypes = {
  thumb: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  views: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  comments: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  downloads: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};
export default GalleryItem;
