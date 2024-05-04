import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDBAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';

export interface DetailsResponse {
  backdrop_path: string,
  name?: string,
  title?: string,
  tagline?: string,
  overview: string,
  video?: boolean
}

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
   
  }, [id])

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
        <p>Back</p>
      </span>

      {data ? (
        <>
          <div className='poster__container'>
            <div className='poster' style={{backgroundImage: `url(${getImagePath()})`}}></div>
          </div>

          <h1 className='detail__headline'>{data.name ? data.name : data.title}</h1>

          {data.tagline ? <p className='detail__tagline'>{data.tagline}</p> : <></>}

          <p className='detail__overview'>{data.overview}</p>
        </>
      ) : (
        <h3>Not found.</h3>
      )}



    </div>
  )
}

export default Details