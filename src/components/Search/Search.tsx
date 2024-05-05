import React, { useEffect, useRef, useState } from 'react'
import useDebounce from '../../hooks/useDebounce';
import { MovieDBAPI } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { appActions } from '../../store/app';
import { SearchResult } from '../../types/types';

const Search = () => {

    const [data, setData] = useState<Array<SearchResult> | null>(null);
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchInput = useRef<HTMLInputElement>(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const currentTab = useSelector((state: RootState) => state.app.currentTab);
    const searchQuery = useSelector((state: RootState) => state.app.searchQuery);

    const debouncedSearch = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearch) {
            if (debouncedSearch.length > 3 && !isLoading) {
                dispatch(appActions.setSearchQuery(debouncedSearch));
            }
        }
    }, [debouncedSearch, isLoading, dispatch]);

    useEffect(() => {
        if (currentTab && searchQuery !== null) {
            setIsLoading(true);
            MovieDBAPI.search(currentTab, searchQuery).then((response) => {
                setData(response);
                setIsLoading(false);
            })
        }
    }, [currentTab, searchQuery, setIsLoading]);

    useEffect(() => {
        if (searchQuery) {
            if (searchInput.current) {
                if (!searchInput.current.value) searchInput.current.value = searchQuery;
            }
        }
    }, [searchQuery])

    const cancelSearch = () => {
        setSearchTerm(null);
        dispatch(appActions.setSearchQuery(null));
        if (searchInput.current) searchInput.current.value = '';
        setIsLoading(false);
        setData(null);
    }

    const getImagePath = (poster_path: string) => {
        return 'https://image.tmdb.org/t/p/w500/' + poster_path;
    }

    return (
        <div className='search__wrapper'>
            <input
                className={`searchInput${(data && data.length > 0) ? ' no-bottom-radius' : ''}`}
                type='text'
                ref={searchInput}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search' />

            {isLoading ? <div className="search__loader"><Loader className='search__input' /></div> : <></>}

            {((searchTerm && searchTerm.length > 0) || (searchQuery)) ? <span className='cancel__search' onClick={() => cancelSearch()}>&#x2715;</span> : <></>}

            <div className='search__results'>

                {data ?
                    data.length === 0
                        ?
                        <div className='no__results'><h3>We are sorry, we could not find anything related to "{searchTerm}"</h3></div>
                        :
                        data.map((item: SearchResult) => (
                            <div className='single__result' key={item.id} onClick={() => navigate('details/' + item.id)}>

                                <div className='result__left'>

                                    <h4 className='result__name'>{item.name ? item.name : item.title}</h4>

                                    <div className='ratings__popularity'>

                                        {item.vote_average > 0 && item.vote_count > 0
                                            ?
                                            <div className='vote'>
                                                <span className='average'>&#9734;&nbsp;{Math.round(item.vote_average)}</span>
                                                <span className='count'>({item.vote_count})</span>
                                            </div>
                                            : <>&nbsp;</>}

                                        <span className='popularity'>
                                            &#10548;&nbsp;{item.popularity}
                                        </span>

                                    </div>

                                </div>

                                <div className='result__right'>
                                    <div
                                        className='search__result__cover'
                                        style={
                                            item.poster_path ? { backgroundImage: `url(${getImagePath(item.poster_path)})` } : { backgroundColor: '#212121' }
                                        }>
                                    </div>

                                </div>

                            </div>
                        ))
                    : <></>
                }

            </div>
        </div>
    )
}

export default Search