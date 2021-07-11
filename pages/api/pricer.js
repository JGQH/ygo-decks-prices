import axios from 'axios'

const BACKEND = process.env.YGO_BACKEND

export default async (req, res) => {
    try {
        if(req.method !== 'POST') throw new Error('Not supported method')

        const data = req.body

        const request = await axios.post(BACKEND, data, {
            headers: {'Content-Type':'application/json'}
        })

        if(request.data['error']) throw new Error(request.data['error'])

        res.status(200).json({
            data: request.data['data']
        })
    } catch (error) {
        res.status(400).json({
            data: error.message
        })
    }  
}
