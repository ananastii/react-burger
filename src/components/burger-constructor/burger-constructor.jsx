import { useMemo } from 'react';
import { useDrop } from "react-dnd";
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';
import OrderConfirm from '../order-confirm/order-confirm';
import ConstructorIngredient from '../constructor-ingredient/constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredient, resetOrderIngredients } from '../../services/actions/burger-constructor';
import { resetOrderId } from '../../services/actions/order';
import { increaseCount, setCount } from '../../services/actions/ingredients';
import { getAllIngredients } from '../../utils/state';
import { getConstructor, getOrder } from '../../utils/state';

const BurgerConstructor = () =>  {

  const { fillings, bun } = useSelector(getConstructor);
  const { ingredients } = useSelector(getAllIngredients);

  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
      if (ingredient.type !== 'bun' ) {
        dispatch(increaseCount(ingredient._id, 1))
      } else {
        dispatch(setCount(ingredient._id, 2));
        ingredients.forEach(item =>
          item.info.type === 'bun' &&
          item.info._id !== ingredient._id &&
          dispatch(setCount(item.info._id, 0))
        );
      }
    }
  });

  // orderCheckout
  const { openModal, orderFailed } = useSelector(getOrder);

  const closeOrderModal = (orderFailed) => {
    dispatch(resetOrderId());
    if (!orderFailed) {
      dispatch(resetOrderIngredients());
      ingredients.filter(item => item.qty > 0)
        .forEach(item => dispatch(setCount(item.info._id, 0)));
    }
  };

  let totalPrice = useMemo(() => fillings.reduce(
      (price, item) => (price += item.info.price),
      bun ? bun.info.price*2 : 0),
      [bun, fillings]);

  return (
    <>
      <section className={`${styles.section} pl-5 pr-5`}>
        <div className={`${styles.list} mt-25 mb-13`} ref={dropTarget}>
          { !bun && !fillings.length &&
            <h2 className={`${styles.hint} text text_type_main-medium text_color_inactive`}>выберите булку</h2>
          }
          { bun &&
            <div className={`ml-8 pl-4 pr-4 mr-3`}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.info.name} (верх)`}
                price={bun.info.price}
                index={bun.info._id}
                thumbnail={bun.info.image}
              />
            </div>
          }
          { fillings.length ?
            <ul className={`${styles.list__scroll} custom-scroll`}>
              { fillings.map((item, index) => (
                  <ConstructorIngredient data={item} key={item.id} index={index}/>
                ))}
            </ul> :
            bun && <h2 className={`${styles.hint} text text_type_main-medium text_color_inactive`}>выберите начинки и соусы</h2>
          }
          { bun && <div className={`ml-8 pl-4 pr-4`}>
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
        <TotalPrice price={totalPrice ? totalPrice : 0}/>
      </section>
      {openModal &&
        <Modal onClose={() => closeOrderModal(orderFailed)}>
          <OrderConfirm />
        </Modal>
      }
    </>
  )
}

export default BurgerConstructor;
