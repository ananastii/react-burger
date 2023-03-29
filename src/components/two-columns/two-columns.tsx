import styles from './two-columns.module.css';
import PropTypes from 'prop-types';
import { ReactNode, FC } from 'react';

type TTwoColumns = {
  children: ReactNode,
}

const TwoColumns: FC<TTwoColumns> = ({ children }) => {

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
