import styles from './wrapper.module.css';
import PropTypes from 'prop-types';

const Wrapper = ({children}) => {

  return (
    <main className={`${styles.wrapper} pt-30`}>
      {children}
    </main>
  )
};

Wrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default Wrapper;
