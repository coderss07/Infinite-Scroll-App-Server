import axios from 'axios';

const API_URL = 'http://localhost:8080/api/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getPrivateContent(offset: number) {
        return axios.get(API_URL + 'user', {
            params: {
                offset: offset
            }
        })
        .then(response => {
            return response.data;
        })
    }
}

export default new UserService();