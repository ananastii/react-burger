import styles from './two-columns.module.css'

const TwoColumns = ({ children }) => {

  return (
    <>
      <main className={styles.layout}>
        {children}
      </main>
    </>
  )
};

export default TwoColumns;
