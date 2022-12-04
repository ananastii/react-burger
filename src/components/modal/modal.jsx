//import { } from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal';

const modalContainer = document.querySelector('#modal');

const Modal = ({onOverlayClick}) => {

  return ReactDOM.createPortal (
    <>
    <ModalOverlay onClick={onOverlayClick} />
    </>, modalContainer
  )

};

export default Modal;
