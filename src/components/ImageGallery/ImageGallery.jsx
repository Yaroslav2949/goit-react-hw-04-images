import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'; // елемент галереї
import PropTypes from 'prop-types'; // типизація пропсів
import css from './ImageGallery.module.css'; // імпортуємо стилі

// Функціональний компонент, який відповідає за галерею.
export const ImageGallery = ({ images,onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {images.map(({ webformatURL, tags, id, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          onImageClick={onImageClick}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
        />
      ))}
    </ul>
  );
};

// типизація пропсів
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired, // масив об'єктів
  onImageClick: PropTypes.func.isRequired, // функція
};
