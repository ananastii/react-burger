import styles from './ingredient-details.module.css';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllIngredients } from '../../utils/store';
import { getIngredients } from '../../services/actions/ingredients';

const IngredientDetails = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  const ingredient = location.state?.ingredient;
  console.log(ingredient);
  const { ingredients } = useSelector(getAllIngredients);
  console.log(ingredients);
  const { id } = useParams();
  const [ingredientData, setIngredientData] = useState(ingredient);

  useEffect(() => {
    if (ingredient) {
      setIngredientData(ingredient);
    } else if (ingredients.length) {
       setIngredientData(ingredients.find(item => item.info._id === id).info)
    } else {
      dispatch(getIngredients());
    }
  }, [dispatch, id, ingredient, ingredients]);


  return (
    ingredientData &&
    (<div>
      <h2 className="mt-10 pt-3 pl-10 pr-10 text text_type_main-large">Детали ингредиента</h2>
      <div className={`${styles.properties} ml-25 mr-25 pb-15`}>
        <img className={`${styles.img} ml-5 mr-5`} src={ingredientData.image} alt={ingredientData.name}></img>
        <p className={`text text_type_main-medium pt-4`}>
          {ingredientData.name}
        </p>
        <ul className={`${styles.nutrients} pt-8 text text_type_main-default text_color_inactive`}>
          <li className={`${styles.amount}`}>
            <p>Калории,ккал</p>
            <p className={`text text_type_digits-default pt-2`}>{ingredientData.calories}</p>
          </li>
          <li className={`${styles.amount}`}>
            <p>Белки, г</p>
            <p className={`text text_type_digits-default pt-2`}>{ingredientData.proteins}</p>
          </li>
          <li className={`${styles.amount}`}>
            <p>Жиры, г</p>
            <p className={`text text_type_digits-default pt-2`}>{ingredientData.fat}</p>
          </li>
          <li className={`${styles.amount}`}>
            <p>Углеводы, г</p>
            <p className={`text text_type_digits-default pt-2`}>{ingredientData.carbohydrates}</p>
          </li>
        </ul>
      </div>
    </div>)
  )
};

export default IngredientDetails;
