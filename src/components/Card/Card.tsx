import React from 'react'
import { ListItem } from '../../types/types'
import { useNavigate } from 'react-router-dom'

type Props = {
    item: ListItem
}

const Card = ({item}: Props) => {

    const navigate = useNavigate();

    const imageURL = () => {
        return 'https://image.tmdb.org/t/p/w500/' + item.poster_path;
    }

    return (
        (
            <div className='single__item' key={item.id} onClick={() => navigate('details/' + item.id)}>
                <div className='cover__image__wrapper'>
                    <div className='cover__image' style={{ backgroundImage: `url(${imageURL()})` }}></div>
                </div>

                <h4>
                    {item.name ? item.name : item.title}
                </h4>
            </div>
        )
    )
}

export default Card