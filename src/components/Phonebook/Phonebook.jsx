import React, { Component } from 'react';
import styles from '../utils/common.module.css';
import css from './Phonebook.module.css';

export default class Phonebook extends Component {
  state = {
    name: '',
    number: "",
  };

  // Метод для записи в state значений, введенных в input

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Метод для отправки state формы в state App и очистки input

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: ''});
  };

  render() {
    return (
      <div >
        <h1 className={ styles.titel}>Phonebook</h1>
        <form onSubmit={this.handleSubmit} className={styles.container}>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            value={this.state.name}
            onChange={this.handleChange}
            className={ css.input}
          />
           <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            value={this.state.number}
            onChange={this.handleChange}
             className={ css.input}
          />
          <button type="submit" className={ styles.button}>Add contact</button>
        </form>         
        
      </div>
    );
  }
}
