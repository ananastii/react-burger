import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired
});

const orderPropTypes = PropTypes.shape({
  ingredients: PropTypes.arrayOf(PropTypes.string),
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
});

export { ingredientPropTypes, orderPropTypes };
