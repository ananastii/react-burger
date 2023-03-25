import ReactDOM from 'react-dom';
import { FC, ReactNode, useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TModal = {
  onClose: () => void,
  children: ReactNode,
}

const Modal: FC<TModal> = ({onClose, children}) => {

  const modalContainer = document.querySelector('#modal');

  useEffect(() => {

    const onEscKeydown = (e: KeyboardEvent) => {
      e.key === "Escape" && onClose();
    };

    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);


  return modalContainer && ReactDOM.createPortal (
    <>
      <section className={styles.modal}>
        <button type="button"
                onClick={onClose}
                className={styles.closeBtn}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </section>
      <ModalOverlay onClick={onClose} />
    </>
    , modalContainer
  )

};

export default Modal;
