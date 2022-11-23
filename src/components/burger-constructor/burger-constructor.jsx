import React from 'react';

import styles from './burger-constructor.module.css';
import {ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({data}) =>  {

  const buns = data.filter(item => item.type === 'bun');
  const fillings = data.filter(item => item.type !== 'bun');

  const bunTop = buns[Math.floor(Math.random()*buns.length)];
  const bunBottom = buns[Math.floor(Math.random()*buns.length)];

  return (
    <section className={`${styles.section} pl-5 pr-5`}>
      <div className={`${styles.list} mt-25 mb-13`}>
        <div className={`${styles.list__item} ml-8`}>
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
            <li className={`${styles.list__item}`}>
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
        <div className={`${styles.list__item} ml-8`}>
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
    </section>
  )
}

export default BurgerConstructor;
