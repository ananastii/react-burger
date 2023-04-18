import { FC } from 'react';
import styles from './modal-overlay.module.css';

type TModalOverlay = {
  onClick: () => void,
}

const ModalOverlay: FC<TModalOverlay> = ({onClick}) =>  {

  return (
    <div className={styles.overlay} onClick={onClick} />
  );
};

export default ModalOverlay;
