import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../store/app';
import { RootState } from '../../store/index';

import { MovieDBAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Search from '../../components/Search/Search';
import { ItemsList, ListItem } from '../../types/types';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTab = useSelector((state: RootState) => state.app.currentTab);

  const [data, setData] = useState<ItemsList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const setTab = (tab: string) => {
    dispatch(appActions.selectTab(tab));
  }

  const loadData = (category: string) => {
    MovieDBAPI.getByCategory(category).then((response) => {
      setData(response);
      setIsLoading(false);
    })
  }

  const getImagePath = (poster_path: string) => {
    return 'https://image.tmdb.org/t/p/w500/' + poster_path;
  }

  useEffect(() => {
    loadData(currentTab);
  }, [currentTab])


  return (
    <div className='home__container'>
      <div className='tabs__container'>
        <div className={`tab${currentTab === 'movie' ? ' active' : ''}`} onClick={() => setTab('movie')}>Movies</div>
        <div className={`tab${currentTab === 'tv' ? ' active' : ''}`} onClick={() => setTab('tv')}>TV Shows</div>      
      </div>
      
      <Search />

      <div className='items__list'>

        {isLoading ? (
            <Loader/>
          ) : (<></>)
        }

        {!data ? (
          <h3>No results.</h3>
        ) : (
          data.map((item: ListItem) => (
            <div className='single__item' key={item.id} onClick={() => navigate('details/' + item.id)}>
              <div className='cover__image__wrapper'>
                <div className='cover__image' style={{backgroundImage: `url(${getImagePath(item.poster_path)})`}}></div>
              </div>
                
              <h4>
                {item.name ? item.name : item.title}
              </h4>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home