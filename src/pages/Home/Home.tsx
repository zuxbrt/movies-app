import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app';
import { RootState } from '../../store/index';

import { MovieDBAPI } from '../../api/api';
import Loader from '../../components/Loader/Loader';
import { ItemsList, ListItem } from '../../types/types';
import Card from '../../components/Card/Card';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {

  const currentTab = useSelector((state: RootState) => state.app.currentTab);
  const searchQuery = useSelector((state: RootState) => state.app.searchQuery);

  const [data, setData] = useState<ItemsList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();

  const setTab = (tab: string) => {
    dispatch(appActions.selectTab(tab));
  }

  const loadData = (category: string) => {
    setData(null);
    setIsLoading(true);
    MovieDBAPI.getByCategory(category).then((response) => {
      setData(response);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    if(searchQuery){
      setIsLoading(true);
      MovieDBAPI.search(currentTab, searchQuery).then((results) => {
        setData(results);
        setIsLoading(false);
      })
    } else {
      loadData(currentTab);
    }
  }, [searchQuery, currentTab])

  return (
    <div className='home__container'>
      <div className='tabs__container'>
        <div className={`tab${currentTab === 'movie' ? ' active' : ''}`} onClick={() => setTab('movie')}>Movies</div>
        <div className={`tab${currentTab === 'tv' ? ' active' : ''}`} onClick={() => setTab('tv')}>TV Shows</div>
      </div>

      <SearchBar />

      <div className='items__list'>

        {isLoading ? ( <Loader />) : (<></>) }

        {data ?
          data.length > 0 ?
          data.map((item: ListItem) => <Card item={item} key={item.id} />)
          : <h3 className='no__results'>
            Sorry, we could not find any results containing <br/><strong><i><b>"{searchQuery}"</b></i></strong>.
            </h3>
        : <></>}
      </div>
    </div>
  )
}

export default Home