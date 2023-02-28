import styles from './two-columns.module.css';
import PropTypes from 'prop-types';

const TwoColumns = ({ children }) => {

  return (
    <>
      <main className={styles.layout}>
        {children}
      </main>
    </>
  )
};

TwoColumns.propTypes = {
  children: PropTypes.node.isRequired
};

export default TwoColumns;
