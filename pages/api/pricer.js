import axios from 'axios'

const BACKEND = process.env.YGO_BACKEND

const pricer = async (req, res) => {
    try {
        if(req.method !== 'POST') throw new Error('Not supported method')

        const data = validateData(req.body['data'])

        const request = await axios.post(BACKEND, { data }, {
            headers: {'Content-Type':'application/json'}
        })

        if(request.data['data']) throw new Error(request.data['data'])

        res.status(200).json({
            ydk: request.data['ydk'],
            errors: request.data['errors'] || []
        })
    } catch (error) {
        res.status(400).json({
            data: error.message
        })
    }  
}

function validateData(data) {
    const newData = data.filter(line => line.match(/^[0-9]{6,8}$/g))

    if((newData.length === 0) || (newData.length > 90)) throw new Error("YdkError: Deck has an invalid amount of cards.")

    return newData
}

export default pricer