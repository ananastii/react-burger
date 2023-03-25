import styles from './ingredients-list.module.css';
import Ingredient from '../ingredient/ingredient';
import { TIngredientData } from '../../services/types/data';
import { FC, Ref } from 'react';

type TIngredientsList = {
  title: string,
  data: TIngredientData[],
  id: string,
  refHeader: Ref<HTMLHeadingElement>
}

const IngredientsList: FC<TIngredientsList> = ({title, data, id, refHeader}) => (
  <div className={`pt-10`} id={id}>
    <h2 className={`text text_type_main-medium`} ref={refHeader}>{title}</h2>
    <ul className={`${styles.grid} pt-6 pl-4 pr-4`}>
      { data.map(item => (<Ingredient data={item} key={item.info._id}/>))}
    </ul>
  </div>
);

export default IngredientsList;
