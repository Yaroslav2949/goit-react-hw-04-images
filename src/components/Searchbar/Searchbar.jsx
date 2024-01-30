// import { Component } from 'react';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi'; // іконка пошуку
import css from './Searchbar.module.css'; // стилізація
import { useState } from 'react';
import PropTypes from 'prop-types';
// Компонент пошуку
export const Searchbar = ({ handleSubmit }) => {
  const [search, setSearch] = useState('');

  const onChangeInput = evt => {
    setSearch(evt.currentTarget.value);
  };
  
  // функція для очищення поля вводу
  const resetForm = () => {
    setSearch('');
  };

  return (
    <header className={css.searchbar}>
      <form
        // функція для відправки запиту
        onSubmit={evt => {
          evt.preventDefault(); // відміна стандартної поведінки браузера інлайново

          // перевірка на пустий запит
          if (!search) {
            return toast.warn('Enter word for search.'); // повідомлення про помилку
          }

          // виклик функції з App.jsx для відправки запиту
          handleSubmit(search);
          resetForm();
        }}
        className={css.Form}
      >
        {/* іконка пошуку */}
        <button type="submit" className={css.Button}>
          <BiSearch size="20" />
        </button>

        {/* поле вводу */}
        <input
          value={search}
          onChange={onChangeInput} // виклик функції для зміни стану
          className={css.Input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus // автофокус на полі вводу
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};