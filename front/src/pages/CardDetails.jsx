import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import BookService from '../services/BookService'
import Gogol from '../assets/optimize.jpg'
import '../css/card.css';

const CardDetails = ({ idCard, userId }) => {
  const [Data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responce = await BookService.getBook(id);
      setData([responce.data]);
      if (responce.data === null) {
        console.log("Ашипка");
      }
    }
    fetchData();
  }, [id])

  console.log(userId);
  return (
    <div>
      <Sidebar />
      <Link to={`/book/reader`}>
        <Button variant='primary'>Начать читать</Button>
      </Link>
      {Data.map((el) => (
        <div key={el.id_book}>
          <p>{el.title}</p>
          <img src={Gogol} alt='' className="card__image"></img>
          <p>{el.author}</p>
          <p>{el.genre}</p>
          <p>{el.description}</p>
        </div>
      ))}
      <Comments userId={userId} idCard={idCard}/>
    </div>
  )
}

export default CardDetails