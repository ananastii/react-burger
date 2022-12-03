import PropTypes from 'prop-types';

const ingredientPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
});

export { ingredientPropTypes };
