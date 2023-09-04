const express = require('express')
const app = express()


app.get('/api/v1/getTours', (req, res) => {
    res.status(500).json({
        success: true,
        data:{}
    })
})

app.post('/',(req,res)=>{
    res.status(201).send('You can post to this endpoint.....')
})

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})