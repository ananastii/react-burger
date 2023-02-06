import styles from './form.module.css';

const Form = ({title, children}) => {

  return (
    <div className={styles.form}>
      <h1 className='text text_type_main-medium text_color_primary mb-6'>
        {title}
      </h1>
      {children}
    </div>
  )
};

export default Form;
