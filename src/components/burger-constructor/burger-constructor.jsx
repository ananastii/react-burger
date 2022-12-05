import PropTypes from 'prop-types';
import { useState } from 'react';
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({data}) =>  {

  const buns = data.filter(item => item.type === 'bun');
  const fillings = data.filter(item => item.type !== 'bun');

  const bun = buns[Math.floor(Math.random()*buns.length)];

  const [orderModal, setOrderModal] = useState(null);

  const closeModal = () => {
    setOrderModal(null);
  };

  const handleEscKeydown = (e) => {
    e.key === "Escape" && closeModal();
  };

  return (
    <>
      <section className={`${styles.section} pl-5 pr-5`}>
        <div className={`${styles.list} mt-25 mb-13`}>
          <div className={`${styles.list__item} ml-8 pl-4 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              index={bun._id}
              thumbnail={bun.image}
            />
          </div>
          <ul className={`${styles.list__scroll} custom-scroll`}>
            {fillings.map(item => (
              <li className={`${styles.list__item} pl-4 pr-4`} key={item._id}>
                <DragIcon type="primary"/>
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  index={item._id}
                  thumbnail={item.image}
                />
              </li>
            ))}
          </ul>
          <div className={`${styles.list__item} ml-8 pl-4 pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={bun.name}
              price={bun.price}
              index={bun._id}
              thumbnail={bun.image}
            />
          </div>
        </div>
        <div className={`${styles.order} pt-10 pb-3`}>
          <div className={`${styles.price} mr-10`} >
            <span className='mr-2 text text_type_digits-medium'>{`42`}</span>
            <span className={styles.price__icon}><CurrencyIcon type="primary"/></span>
          </div>
          <Button type="primary" size="large" htmlType="button" onClick={() => setOrderModal(true)}>Оформить заказ</Button>
        </div>
      </section>
      {orderModal &&
        <Modal onOverlayClick={closeModal} onEscKeydown={handleEscKeydown}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;
