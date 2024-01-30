// import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppStyle } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getapiService } from 'services/Api'; // отримання даних пошуку
import { Searchbar } from './Searchbar/Searchbar'; // рядок пошуку
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader'; // індикатор завантаження
import { Modal } from './Modal/Modal';
import { useEffect, useState } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    showModal: false,
    largeImageURL: '',
  });
  const [emptyResult, setEmptyResult] = useState(false);

  const toggleModal = () => {
    setModal(PrevSt => ({ ...PrevSt, showModal: !PrevSt.showModal }));
  };

  const handleSubmit = query => {
    // Очищаємо масив з картинками, а також ставимо початкові значення для сторінки,
    // загальної кількості картинок, флагів і помилок.
    setQuery(query);
    setImages([]);
    setPage(1);
    setLoading(false);
    setError(null);
    setEmptyResult(false);
  };
  const handleClickImageModal = largeImageURL => {
    setModal(prevSt => ({ ...prevSt, largeImageURL }));
    toggleModal();
  };
  const clickLoadMore = () => {
    setPage(prevSt => prevSt + 1);
  };

  useEffect(() => {
    if (!query) return;
    const fatchImages = async () => {
      setLoading(true); // показуємо loader
      setError(null);
      try {
        const response = await getapiService(query, page);

        setImages(prevImages => [...prevImages, ...response.hits]);

        // Перевіряємо, чи є результати пошуку порожніми.
        if (response.totalHits === 0) {
          setEmptyResult(true);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fatchImages();
  }, [page, query]);

  return (
    <div>
      {/*текстове поле для введення запиту */}
      <Searchbar handleSubmit={handleSubmit} />

      {/* Перевіряємо, чи є помилка */}
      {error && (
        <h2 style={{ textAlign: 'center' }}>
          Something went wrong: ({error.message})!
        </h2>
      )}

      {/* відображення списку зображень */}

      {images.length > 0 && !error && (
        <AppStyle>
          <ImageGallery onImageClick={handleClickImageModal} images={images} />
        </AppStyle>
      )}

      {/* Перевіряємо, чи відбувається завантаження */}
      {loading && <Loader />}

      {/* Перевіряємо, чи є результати пошуку порожніми */}
      {emptyResult && (
        <h2 style={{ textAlign: 'center' }}>
          Sorry. There are no images ...try againe
        </h2>
      )}

      {/* Перевіряємо, чи потрібно відображати кнопку "Load more" */}
      {!loading && images.length >= 12 && !error && (
        <Button clickLoad={clickLoadMore} />
      )}

      {/* Перевіряємо, чи потрібно відображати модальне вікно */}
      {modal.showModal && (
        <Modal
          onToggleModal={toggleModal}
          largeImageURL={modal.largeImageURL}
        />
      )}
      {/* Спливаюче повідомлення */}
      <ToastContainer autoClose={1500} theme="dark" />
    </div>
  );
};
