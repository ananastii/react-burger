import styles from './preview.module.css';
import PropTypes from 'prop-types';

const Preview = ({image, residue}) => {

  const imgBack = {
    backgroundImage: `url(${image})`,
    opacity: residue > 0 ? 0.6 : 1,
  };

  return (
    <div className={`${styles.container}`}>
      <div style={imgBack} className={styles.image}></div>
      { residue > 0 && (
        <div className={`${styles.last_shown} text text_type_main-default`}>
          {`+${residue}`}
        </div>
      )}
    </div>
  )
};

Preview.propTypes = {
  image: PropTypes.string.isRequired,
  residue: PropTypes.number
};

export default Preview;
