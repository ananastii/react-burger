import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalContainer = document.querySelector('#modal');

const Modal = ({onOverlayClick, children}) => {

  return ReactDOM.createPortal (
    <>
      <section className={styles.modal}>
        <button type="button"
                onClick={onOverlayClick}
                className={styles.closeBtn}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </section>
      <ModalOverlay onClick={onOverlayClick} />
    </>
    , modalContainer
  )

};

export default Modal;
