import axios from 'axios'

export default axios.create({
    baseURL: 'http://localhost:5002',
    headers: {
        'Content-Type': 'application/json'
    }
});