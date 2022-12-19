import PropTypes from 'prop-types';

import styles from './burger-constructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({data}) =>  {

  const buns = data.filter(item => item.type === 'bun');
  const fillings = data.filter(item => item.type !== 'bun');

  const bunTop = buns[Math.floor(Math.random()*buns.length)];
  const bunBottom = buns[Math.floor(Math.random()*buns.length)];

  return (
    <section className={`${styles.section} pl-5 pr-5`}>
      <div className={`${styles.list} mt-25 mb-13`}>
        <div className={`${styles.list__item} ml-8 pl-4 pr-4`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bunTop.name}
            price={bunTop.price}
            index={bunTop._id}
            thumbnail={bunTop.image}
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
            text={bunBottom.name}
            price={bunBottom.price}
            index={bunBottom._id}
            thumbnail={bunBottom.image}
          />
        </div>
      </div>
      <div className={`${styles.order} pt-10 pb-3`}>
        <div className={`${styles.price} mr-10`} >
          <span className='mr-2 text text_type_digits-medium'>{`42`}</span>
          <span className={styles.price__icon}><CurrencyIcon type="primary"/></span>
        </div>
        <Button type="primary" size="large" htmlType="button">Оформить заказ</Button>
      </div>
    </section>
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
};

export default BurgerConstructor;
