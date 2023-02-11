import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './burger-ingredients.module.css';
import IngredientsTab from '../ingredients-tab/ingredients-tab';
import IngredientsList from '../ingredients-list/ingredients-list';
import { getAllIngredients } from '../../utils/store';

const BurgerIngredients = () => {

  const { ingredients } = useSelector(getAllIngredients);
  const buns = ingredients.filter((item) => item.info.type === 'bun');
  const sauces = ingredients.filter((item) => item.info.type === 'sauce');
  const mains = ingredients.filter((item) => item.info.type === 'main');

  // Navigation through tabs
  const [currentTab, setCurrentTab] = useState('buns');
  const [scrollEdge, setScrollEdge] = useState();

  const handleTabClick = (id) => {
    setCurrentTab(id);
    document.querySelector(`#${id}`).scrollIntoView({behavior: 'smooth'});
  }

  const refTab = useRef();
  const refBunsHeader = useRef();
  const refSaucesHeader = useRef();
  const refMainsHeader = useRef();

  useEffect(() => {
    setScrollEdge(refTab.current.getBoundingClientRect().bottom);
  }, []);


  const handleTabScroll = () => {
    // for the perfect precision can use half of header's in calculations
    let bunsHeaderDist = Math.abs(scrollEdge - refBunsHeader.current.getBoundingClientRect().top);
    let saucesHeaderDist = Math.abs(scrollEdge - refSaucesHeader.current.getBoundingClientRect().top);
    let mainsHeaderDist = Math.abs(scrollEdge - refMainsHeader.current.getBoundingClientRect().top);

    const distancesAll = {
      'buns': bunsHeaderDist,
      'sauces': saucesHeaderDist,
      'mains': mainsHeaderDist
    };

    const closestPos = Math.min(bunsHeaderDist, saucesHeaderDist, mainsHeaderDist);
    const activeTabId = Object.keys(distancesAll).find(key => distancesAll[key] === closestPos);

    setCurrentTab(activeTabId);
  }

  return (

  <section className={`${styles.list} pl-5 pr-5`}>
    <h1 className={`pt-10 text text_type_main-large`}>Соберите бургер</h1>
    <IngredientsTab setCurrent={handleTabClick} currentTab={currentTab} refTab={refTab}/>
    <div className={`${styles.list__scroll} custom-scroll`} onScroll={handleTabScroll}>
      <IngredientsList title={'Булки'} data={buns} id={'buns'} refHeader={refBunsHeader}/>
      <IngredientsList title={'Соусы'} data={sauces} id={'sauces'} refHeader={refSaucesHeader}/>
      <IngredientsList title={'Начинки'} data={mains} id={'mains'} refHeader={refMainsHeader}/>
    </div>
  </section>

  )
}

export default BurgerIngredients;
