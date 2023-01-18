import { useMemo } from 'react';
import { useDrop } from "react-dnd";
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { urlOrder } from '../../utils/constants';
import { addIngredient, resetOrderIngredients } from '../../services/actions/burger-constructor';
import { checkoutOrder, resetOrderId } from '../../services/actions/order';
import { increaseCount, setCount } from '../../services/actions/ingredients';

const BurgerConstructor = () =>  {

  const { fillings, bun } = useSelector(store => store.burgerConstructor);
  const { ingredients } = useSelector(store => store.ingredients);

  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
      ingredient.type !== 'bun' ?
        dispatch(increaseCount(ingredient._id, 1)) :
        dispatch(setCount(ingredient._id, 2)) &&
          ingredients.forEach(item =>
            item.info.type === 'bun' &&
            item.info._id !== ingredient._id &&
            dispatch(setCount(item.info._id, 0))
          );
    }
  });

  // оформление заказа
  const { orderId, openModal, orderFailed } = useSelector(store => store.order);

  const handleOrderClick = () => {
    const orderIngredients = [
      bun.info._id,
      ...fillings?.map(item => item.info._id),
      bun.info._id,
    ]
    dispatch(checkoutOrder(urlOrder, orderIngredients));
  };

  const closeOrderModal = (orderFailed) => {
    dispatch(resetOrderId());
    !orderFailed && dispatch(resetOrderIngredients());
  };

  let totalPrice = useMemo(() => fillings.reduce(
      (price, item) => (price += item.info.price),
      bun?.info.price *2),
      [bun, fillings]);

  return (
    <>
      <section className={`${styles.section} pl-5 pr-5`} ref={dropTarget}>
        <div className={`${styles.list} mt-25 mb-13`}>
          { bun && <div className={`ml-8 pl-4 pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.info.name} (верх)`}
              price={bun.info.price}
              index={bun.info._id}
              thumbnail={bun.info.image}
            />
          </div>}
          { fillings.length ?
            <ul className={`${styles.list__scroll} custom-scroll`}>
              { fillings.map(item => (
                  <BurgerIngredient data={item} key={item.id}/>
                ))}
            </ul> :
            <p>Выберите начинки и соусы</p>
          }
          { bun && <div className={`${styles.list__bun} ml-8 pl-4 pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.info.name} (верх)`}
              price={bun.info.price}
              index={bun.info._id}
              thumbnail={bun.info.image}
            />
          </div>}
        </div>
        <div className={`${styles.order} pt-10 pb-3`}>
          <div className={`${styles.price} mr-10`} >
            {<span className='mr-2 text text_type_digits-medium'>{totalPrice ? totalPrice : 0}</span>}
            <span className={styles.price__icon}><CurrencyIcon type="primary"/></span>
          </div>
          <Button type="primary" size="large" htmlType="button" onClick={handleOrderClick}>Оформить заказ</Button>
        </div>
      </section>
      {openModal &&
        <Modal onClose={() => closeOrderModal(orderFailed)}>
          <OrderDetails orderId={orderId}/>
        </Modal>
      }
    </>
  )
}

export default BurgerConstructor;
