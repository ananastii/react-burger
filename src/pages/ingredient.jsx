import styles from './ingredient.module.css';
import IngredientDetails from "../components/ingredient-details/ingredient-details";

export const IngredientPage = () => {

  return (
    <div className={`${styles.wrapper} pt-30`}>
      <IngredientDetails />
    </div>
  )
}
