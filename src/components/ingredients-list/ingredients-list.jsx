import styles from './ingredients-list.module.css';
import Ingredient from '../ingredient/ingredient';
import PropTypes from 'prop-types';

const IngredientsList = ({title, data, id, refHeader}) => (
  <div className={`pt-10`} id={id}>
    <h2 className={`text text_type_main-medium`}  ref={refHeader}>{title}</h2>
    <ul className={`${styles.grid} pt-6 pl-4 pr-4`}>
      { data.map(item => (<Ingredient data={item.info} key={item.info._id}/>))}
    </ul>
  </div>
);

IngredientsList.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired
};

export default IngredientsList;
