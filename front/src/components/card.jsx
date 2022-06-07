import React, { useEffect, useState } from "react";
import '../css/card.css';
import { Link, useNavigate } from 'react-router-dom';
import BookService from "../services/BookService";
import Gogol from '../assets/optimize.jpg'

const CardUi = ({setIdCard }) => {
    const [Data, setData] = useState([])
    

    useEffect(() => {


        const fetchData = async () => {
            const responce = await BookService.getBooks();
            setData(responce.data);
            if (responce === null) {
                console.log("Ашипка");
            }
            console.log(responce)


        }
        fetchData()
    }, [])

    return (
        <>
            {Data.map((book, id) => {
                return (
                <div className="card" key={id}>
                    <div className="card__body">
                        <img src={Gogol} alt='logo' className="card__image" />
                        <h2 className="card__title">{book.title}</h2>
                        <p className="card__description">{book.author}</p>
                    </div>
                    <div className="center">
                        <Link to={`/carddetails/${book.id_book}`}>
                            <button className="card__btn" onClick={() => setIdCard(book.id_book)}>Подробнее</button>
                        </Link>
                    </div>
                </div>
                );
            })}
        </>
    );
}

export default CardUi;