import PropTypes from 'prop-types';
import styles from '../utils/common.module.css';
import css from './Contacts.module.css'

const Contacts = ({ contacts, ondeleteContact }) => {
  return (
    <div>
      <h1 className={styles.titel}>Contacts</h1>
      <ol className={ css.list}>
        {contacts.map(({id, name, number}) => (
          <li key={id} className={css.listItem}>
            {name}: {number}
            <button type="button" onClick={() => ondeleteContact(id)} className={ styles.button}>Delete</button>
          </li>
        ))}
      </ol>
      

    </div>
  )
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),).isRequired,
  ondeleteContact: PropTypes.func.isRequired,
}

export default Contacts
