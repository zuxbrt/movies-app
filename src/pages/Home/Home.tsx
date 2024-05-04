import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { tabActions } from '../../store/app';
import { RootState } from '../../store/index';

import { MovieDBAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';

const DELAY = 1000;

interface ListItem {
  id: number; 
  name: string;
  key: string; 
  poster_path: string; 
  title: string;
}

interface ItemsList extends Array<ListItem>{}

type SearchFunction = () => void;


const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentTab = useSelector((state: RootState) => state.app.currentTab);
  const searchQuery = useSelector((state: RootState) => state.app.searchQuery);

  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<ItemsList>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const searchInput = React.useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");


  const setTab = (tab: string) => {
    dispatch(tabActions.selectTab(tab));
  }

  const loadData = (category: string) => {
    MovieDBAPI.getByCategory(category).then((response) => {
      setData(response);
      setIsLoading(false);
    })
  }

  const search = () => {
    MovieDBAPI.search(currentTab, searchTerm).then((response) => {
      setData(response);
      dispatch(tabActions.setSearchQuery(searchTerm));
      setIsLoading(false);
    })
  }

  function debounce(func: SearchFunction, delay: number) {
    return function (...args: []) {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        func(...args);
        debounceTimeout.current = null;
      }, delay);
    };
  }

  const debouncedSearch = debounce(search, DELAY)

  const handleSearch = () => {
    if(searchInput.current){
      const term = searchInput.current.value.trim();
      if(term.length > 3){
        setIsLoading(true);
        setSearchTerm(term);
        debouncedSearch();
      } else {
        setSearchTerm("");
        loadData(currentTab);
      }
    }
  }

  const toDetailsPage = (id: number) => {
    navigate('details/' + id);
  }

  const getImagePath = (poster_path: string) => {
    return 'https://image.tmdb.org/t/p/w500/' + poster_path;
  }

  useEffect(() => {
    if(searchQuery){
      if(searchInput.current){
        searchInput.current.value = searchQuery;
        handleSearch();
      }
    }
  }, [])


  useEffect(() => {
    if(searchTerm){
      handleSearch();
    } else {
      loadData(currentTab);
      dispatch(tabActions.setSearchQuery(null));
    }
  }, [currentTab, searchTerm])

  return (
    <div className='home__container'>
      <div className='tabs__container'>
        <div className={`tab${currentTab === 'movie' ? ' active' : ''}`} onClick={() => setTab('movie')}>Movies</div>
        <div className={`tab${currentTab === 'tv' ? ' active' : ''}`} onClick={() => setTab('tv')}>TV Shows</div>      
      </div>
      
      <input ref={searchInput} className='searchInput' type='text' onChange={() => handleSearch()} placeholder='Search' />

      <div className='items__list'>

        {isLoading ? (
            <Loader/>
          ) : (<></>)
        }

        {!data ? (
          <h3>No results.</h3>
        ) : (
          data.map((item: ListItem) => (
            <div className='single__item' key={item.id} onClick={() => toDetailsPage(item.id)}>
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