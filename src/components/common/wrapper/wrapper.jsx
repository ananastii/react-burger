import styles from './wrapper.module.css'

const Wrapper = ({children}) => {

  return (
    <main className={`${styles.wrapper} pt-30`}>
      {children}
    </main>
  )
};

export default Wrapper;
