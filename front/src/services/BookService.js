import axios from "axios";
import { useParams } from "react-router-dom";
import $api, { API_URL } from "../http";

export default class BookService {
    static async getBooks() {
        return $api.get('/books')

    }
    static async getBook(id) {
        return $api.get(`/book/${id}`)

    }
}