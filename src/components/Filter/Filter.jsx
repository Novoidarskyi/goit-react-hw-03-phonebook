import PropTypes from 'prop-types';
import styles from '../utils/common.module.css';
import css from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.container} >
          Find contacts by name
          <input
        type="text"
        value={value}
        onChange={onChange}
        className={css.input}
          />
        </label>
  
  )
}

Filter.propTypes = {
 value: PropTypes.string.isRequired,
 onChange: PropTypes.func.isRequired, 
}

export default Filter
