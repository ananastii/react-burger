import styles from './preview.module.css';

const Preview = ({image}) => {

  const imgBack = {
    backgroundImage: `url(${image})`,
  }

  return (
    <li className={`${styles.container}`}>
      <div style={imgBack} className={styles.image}></div>
    </li>
  )
}

export default Preview;
