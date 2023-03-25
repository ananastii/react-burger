import styles from './two-columns.module.css';
import { FC, ReactNode, } from 'react';

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

export default TwoColumns;
