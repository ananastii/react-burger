// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import TwoColumns from '../components/two-columns/two-columns';

import styles from './feed.module.css';

export const FeedPage = () => {


  return (
    <TwoColumns>
      <section className={`${styles.list} pl-5`}>
      <h1 className={`pt-10 text text_type_main-large`}>Лента заказов</h1>
      <div className={`${styles.list__scroll} custom-scroll mt-5`}>
        <div className={`pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
        <div className={`pt-10 pb-10`}>fdfdf</div>
      </div>
    </section>
    <section className={`${styles.info} pl-15 pr-5 mt-25`}>
      <div className={`${styles.ready} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Готовы:</h3>
        <ul className={`${styles.col}`}>
          <li className={`text text_type_digits-default text_color_success mb-2`}>
            034533
          </li>
          <li className={`text text_type_digits-default text_color_success mb-2`}>
            034533
          </li>
        </ul>
      </div>
      <div className={`${styles.queue} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>В работе:</h3>
        <ul className={`${styles.col}`}>
          <li className={`text text_type_digits-default mb-2`}>
            034533
          </li>
          <li className={`text text_type_digits-default mb-2`}>
            034533
          </li>
        </ul>
      </div>
      <div className={`${styles.overall} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Выполнено за все время:</h3>
        <p  className={`text text_type_digits-large`}>123456</p>
      </div>
      <div className={`${styles.today} mb-15`}>
        <h3 className={`text text_type_main-medium pb-6`}>Выполнено за сегодня:</h3>
        <p  className={`text text_type_digits-large`}>123456</p>
      </div>
    </section>
  </TwoColumns>
  )
}
