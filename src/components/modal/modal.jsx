import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Modal = ({onOverlayClick, onEscKeydown, children}) => {

  const modalContainer = document.querySelector('#modal');

  useEffect(() => {
    document.addEventListener('keydown', onEscKeydown);

    return () => {
      document.removeEventListener('keydown', onEscKeydown);
    };
  }, []);


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

Modal.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  onEscKeydown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Modal;
