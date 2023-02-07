import { useDispatch, useSelector } from 'react-redux';
import { useDrag, useDrop } from 'react-dnd'
import { useRef} from 'react';
import PropTypes from 'prop-types';
import styles from './constructor-ingredient.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient, moveIngredient } from '../../services/actions/burger-constructor';
import { decreaseCount } from '../../services/actions/ingredients';
import { ingredientPropTypes } from '../../utils/types';
import { getFillings } from '../../utils/store';

const ConstructorIngredient = ({data, index}) => {

  const {_id, name, price, image } = data.info;

  const fillings = useSelector(getFillings);

  const dispatch = useDispatch();

  const handleDelete = (constructorId, ingredientId) => {
    dispatch(deleteIngredient(constructorId));
    dispatch(decreaseCount(ingredientId, 1));
  }

  const ref = useRef(null);
  const id = data.id;

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });

  const [spec, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
        const dragIndex = item.index
        const hoverIndex = index
        const hoverBoundingRect = ref.current?.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top

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
        index={_id}
        thumbnail={image}
        handleClose={() => handleDelete(data.id, _id)}
      />
    </li>
  )
};

ConstructorIngredient.propTypes = {
  data: PropTypes.shape({
    info: ingredientPropTypes.isRequired,
    id: PropTypes.string.isRequired
  }),
  index: PropTypes.number.isRequired
};

export default ConstructorIngredient;
