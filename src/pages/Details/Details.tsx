import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { MovieDBAPI } from '../../api/api';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';
import { DetailsResponse, Genre, Trailer } from '../../types/types';

const Details = () => {

  const { id } = useParams();
  const category = useSelector((state: RootState) => state.app.currentTab);
  const navigate = useNavigate();
  const [details, setDetails] = useState<DetailsResponse>();
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      MovieDBAPI.details(category, id).then((response) => {
        setDetails(response);
        MovieDBAPI.getVideoTrailers(category, id).then((trailers) => {
          if (trailers.length) {
            setTrailer(trailers[0]);
          }
          setIsLoading(false);
        })
      })
    }
  }, [category, id])

  const getImagePath = () => {
    if (details) return 'https://image.tmdb.org/t/p/original' + details.backdrop_path;
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='details__container'>
      <span className='back' onClick={() => navigate('/')}>
        <p>Back</p>
      </span>

      {details ? (
        <>

          {trailer
            ?
            <div className="trailer">
              <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Trailer"
              />
            </div>
            :
            <div className='poster__container'>
              <div className='poster' style={
                (details.poster_path ? { backgroundImage: `url(${getImagePath()})` } : { backgroundColor: '#212121' })
              }></div>
            </div>
          }



          <div className='headline__genres'>
            <h1 className='detail__headline'>{details.name ? details.name : details.title}</h1>
            <div className='genres__row'>
              {details.genres.map((genre: Genre) => (<span className='genre' key={genre.id}>{genre.name}</span>))}
            </div>
          </div>

          {details.tagline ? <p className='detail__tagline'>{details.tagline}</p> : <></>}

          <p className='detail__overview'>{details.overview}</p>
        </>
      ) : (
        <h1 className='detail__not__found'>Not found.</h1>
      )}



    </div>
  )
}

export default Details