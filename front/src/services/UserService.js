import axios from "axios";
import $api, { API_URL } from "../http";

export default class UserService {
    static async getComments() {
        return $api.get('/comments')

    }
    static async addComment(idCard,
        text,
        parentId,
        userId,
        createdAt) {
        return $api.post('/addcomments', {
            idCard,
            text,
            parentId,
            userId,
            createdAt
        })

    }
    static async deleteComment(commentId) {
        return $api.post('/deletecomments', { commentId })

    }
    static async updateComment(text, commentId) {
        return $api.post('/updatecomments', { text, commentId })

    }

}