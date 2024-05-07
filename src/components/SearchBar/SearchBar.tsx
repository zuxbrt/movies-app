import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce';
import { appActions } from '../../store/app';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const SearchBar = () => {

  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const searchInput = useRef<HTMLInputElement>(null)
  const searchQuery = useSelector((state: RootState) => state.app.searchQuery);
  const debouncedSearch = useDebounce(searchTerm, 1000);
  const dispatch = useDispatch();


  const cancelSearch = () => {
    setSearchTerm(null);
    dispatch(appActions.setSearchQuery(null));
    if (searchInput.current) searchInput.current.value = '';
  }
  

  useEffect(() => {
    if (debouncedSearch) {
      if (debouncedSearch.length >= 3) {
        dispatch(appActions.setSearchQuery(debouncedSearch));
      } else {
        dispatch(appActions.setSearchQuery(null));
      }
    }
  }, [debouncedSearch, dispatch]);

  useEffect(() => {
    if(searchInput.current){
      if(searchQuery){
        if(searchInput.current.value === "") searchInput.current.value = searchQuery;
        setSearchTerm(searchQuery);
      }
    }
  }, [searchQuery])

  return (
    <div className='search__wrapper'>
      <input
        className="searchInput"
        type='text'
        ref={searchInput}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search' />

      {((searchTerm && searchTerm.length > 0)) ? <span className='cancel__search' onClick={() => cancelSearch()}>&#x2715;</span> : <></>}

    </div>
  )
}

export default SearchBar