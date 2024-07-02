import express from "express";
import 'dotenv/config';
const app=express();
app.use(express.json());
const port=process.env.PORT || 8080;
let teaData=[];
let nextId=1;

app.post('/teas',(req,res)=>{
    try {
        const {name,price}=req.body;
    const newTea={id:nextId++,name,price};
    teaData.push(newTea);
    res.status(201).send(newTea);
    } catch (error) {
        console.log(error);
    }
    
    
})
app.get('/teas',(req,res)=>{
    res.status(200).send(teaData);
})

app.get('/teas/:id',(req,res)=>{
   const tea= teaData.find(t=>t.id===parseInt(req.params.id));
    if(!tea){
        res.status(404).send('tea not found');
    }
    res.status(200).send(tea);
})

app.put('/teas/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const tea= teaData.find(t=>t.id===id);
    if(!tea){
        res.status(404).send('tea not found');
    }
    const {name,price}=req.body;
    tea.name=name;
    tea.price=price;
    res.status(200).send(tea);
})

app.delete('/teas/:id',(req,res)=>{
    const index=teaData.findIndex(t=>t.id===parseInt(req.params.id));
    if(index===-1){
        return res.status(404).send('tea not found');

    }
    teaData.splice(index,1);
    return res.status(204).send("deleted");
})



app.listen(port,()=>{
    console.log("server is running on port 3000");
})
