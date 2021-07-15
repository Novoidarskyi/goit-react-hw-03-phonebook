import React, { Component } from 'react';
import shortid from 'shortid';
import toast, { Toaster } from 'react-hot-toast';
import Contacts from 'components/Contacts';
import Phonebook from 'components/Phonebook';
import Filter from 'components/Filter';
import './App.css';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // Метод для записи в localStorage контактов при первом рендере странице

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parseContacts = JSON.parse(contacts);
    if (parseContacts) {
      this.setState({ contacts: parseContacts });
    }
  }

  // Метод для записи в localStorage контактов при изменении массива contacts в state App

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  // Метод для добавления нового контакта

  addContact = ({ name, number }) => {
    const repeatedContact = this.state.contacts.some(item =>
      item.name.includes(name),
    );

    const repeatedNumber = this.state.contacts.some(item =>
      item.number.includes(number),
    );

    if (repeatedContact && repeatedNumber) {
      toast.error(`${name} is already in contacts`);
      return;
    }
    {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [contact, ...prevState.contacts],
      }));
      toast.success(`${name} add to contacts`);
    }
  };

  // Метод для удаления нового контакта

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // Метод для записи в state значения input фильтрации

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  // Метод для оторажения отфильтрованых контактов

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalaizedContact = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalaizedContact),
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              border: '1px solid royalblue',
              height: '50px',
            },
          }}
        />
        <Phonebook onSubmit={this.addContact} />
        <Filter value={filter} onChange={this.changeFilter} />
        <Contacts
          contacts={visibleContact}
          ondeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
