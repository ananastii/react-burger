import styles from './preview.module.css';
import { FC } from 'react';

type TPreview = {
  image: string,
  residue?: number
}

const Preview: FC<TPreview> = ({image, residue = 0 }) => {

  const imgBack = {
    backgroundImage: `url(${image})`,
    opacity: residue ? 0.6 : 1,
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

export default Preview;
