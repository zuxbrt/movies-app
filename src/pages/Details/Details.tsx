import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDBAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';
import { DetailsResponse, Genre } from '../../types/types';

const Details = () => {

  const {id} = useParams();
  const category = useSelector((state: RootState) => state.app.currentTab);
  const navigate = useNavigate();
  const [data, setData] = useState<DetailsResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(id){
      MovieDBAPI.details(category, id).then((response) => {
        setData(response);
        setIsLoading(false);
      })
    }
   
  }, [category, id])

  const getImagePath = () => {
    if(data) return 'https://image.tmdb.org/t/p/original' + data.backdrop_path;
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className='details__container'>
      <span className='back' onClick={() => navigate('/')}>
        <b>&#8592;</b>
        <p>back</p>
      </span>

      {data ? (
        <>
          <div className='poster__container'>
            <div className='poster' style={
              (data.poster_path ? { backgroundImage: `url(${getImagePath()})` } : { backgroundColor: '#212121' })
            }></div>
            
          </div>

          <div className='headline__genres'>
            <h1 className='detail__headline'>{data.name ? data.name : data.title}</h1>
            <div className='genres__row'>
              {data.genres.map((genre: Genre) => ( <span className='genre' key={genre.id}>{genre.name}</span> ))}
            </div>
          </div>

          {data.tagline ? <p className='detail__tagline'>{data.tagline}</p> : <></>}

          <p className='detail__overview'>{data.overview}</p>
        </>
      ) : (
        <h1 className='detail__not__found'>Not found.</h1>
      )}



    </div>
  )
}

export default Details