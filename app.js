const express = require('express')
const fs = require('fs')


const app = express()

app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))


//get all tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

//get single tours
app.get('/api/v1/tours/:id', (req, res) => {
    
    const id = req.params.id * 1
    
    if(id > tours.length){
        return res.status(404).json({
            status: "fail",
            msg: "Invalid Id"
        })
    }
    const tour = tours.find(el => el.id === id)
    if(!tour){
        return res.status(404).json({
            status: "fail",
            msg: "No tour found"
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            tour
        }
    })
})

// post tours
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({ id: newId }, req.body)

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "success",
            data: {
                tour: newTour
            }
        })
    })

})

app.patch('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id * 1 > tours.length){
       return res.status(404).json({
            status: "Fail",
            msg: "Invalid Id"
        })
    }
    res.status(200).json({
        status: "success",
        data:{
            tour: "Update tour here"
        }
    })
})

app.delete('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id * 1 > tours.length){
       return res.status(404).json({
            status: "Fail",
            msg: "Invalid Id"
        })
    }
    res.status(204).json({
        status: "success",
        data: null
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`App running on port ${port}......`)
})