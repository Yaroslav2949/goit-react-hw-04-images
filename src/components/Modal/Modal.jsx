// import { Component } from 'react'; // для класового компонента
import { createPortal } from 'react-dom'; // для рендеринга в іншому місці
import css from './Modal.module.css'; // стилізація
import { useEffect } from 'react';
import PropTypes from 'prop-types'; 
// Пошук модалки щоб динамічно додати до DOM-дерева сторінки
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onToggleModal, largeImageURL }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onToggleModal(); // закриття модалки
      }
    };
    window.addEventListener('keydown', keyDown); //слухач на клавіатуру
    return () => {
      window.removeEventListener('keydown', keyDown); // прибираємо слухач
    };
  }, [onToggleModal]);

  // закриття модалки по кліку на бекдроп
  const handleClose = e => {
    // перевірка чи клік був по бекдропу
    if (e.currentTarget === e.target) {
      onToggleModal(); // закриття модалки
    }
  };

  return createPortal(
    <div onClick={handleClose} className={css.Overlay}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};