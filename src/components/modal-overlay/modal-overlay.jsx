//import PropTypes from 'prop-types';

import styles from './modal-overlay.module.css';
//import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const ModalOverlay = ({onClick}) =>  {

    return (
        <div className={styles.overlay} onClick={onClick} />
    );
};

export default ModalOverlay;
