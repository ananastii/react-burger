import styles from './price.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Price = ({price, count}) => {

  return (
    <div className={`${styles.price} mb-1 text text_type_main-default`}>
      {count ?
       (<span className="mr-2 text text_type_digits-default">{`${count} x ${price}`}</span>) :
       (<span className="mr-2 text text_type_digits-default">{price}</span>)
      }
      <CurrencyIcon type="primary" />
    </div>
  )
}

export default Price;
