import styles from './wrapper.module.css';
import { FC, ReactNode } from 'react';

type TWrapper = {
    children: ReactNode,
}

const Wrapper: FC<TWrapper> = ({children}) => {

  return (
    <main className={`${styles.wrapper} pt-30`}>
      {children}
    </main>
  )
};

export default Wrapper;
