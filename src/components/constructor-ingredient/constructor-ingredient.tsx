import { useDispatch, useSelector } from '../../services/hooks';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, FC } from 'react';
import styles from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor';
import { decreaseCount } from '../../services/actions/ingredients';
import { getFillings } from '../../utils/state';
import { TIngredientFilling  } from '../../services/types/data';

type TConstructorIngredient = {
  data: TIngredientFilling,
  index: number
}

const ConstructorIngredient: FC<TConstructorIngredient> = ({data, index}) => {

  const {_id, name, price, image } = data.info;

  const fillings = useSelector(getFillings);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteIngredient(fillingId));
    dispatch(decreaseCount(_id, 1));
  }

  const ref = useRef<HTMLLIElement>(null);
  const fillingId = data.id;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: () => {
      return { fillingId, index }
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item: TConstructorIngredient, monitor) => {
        const dragIndex = item.index
        const hoverIndex = index
        const hoverBoundingRect = ref.current!.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset!.y - hoverBoundingRect.top

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

        dispatch(moveIngredient(fillings, dragIndex, hoverIndex));
        item.index = hoverIndex
    },
  })
  dragRef(dropRef(ref));
  const opacity = isDragging ? 0.3 : 1;

  return (
    <li className={`${styles.item} pl-4 pr-4`} ref={ref} style={{ ...styles, opacity}}>
      <DragIcon type="primary"/>
      <ConstructorElement
        isLocked={false}
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleDelete}
      />
    </li>
  )
};

export default ConstructorIngredient;
