//import { } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

const modalContainer = document.querySelector('#modal');

const Modal = ({onOverlayClick, children}) => {

  return ReactDOM.createPortal (
    <>
      <section className={styles.modal}>
        {children}
      </section>
      <ModalOverlay onClick={onOverlayClick} />
    </>
    , modalContainer
  )

};

export default Modal;
