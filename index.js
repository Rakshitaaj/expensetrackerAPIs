const express = require('express')
const app = express()
const mongoose=require('mongoose')
const port = process.env.PORT||3000
const Expense=require('./expense');

mongoose.connect('mongodb+srv://rakshitaaj:jaya3108@cluster0.jjs4sic.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology:true
});
app.use(express.json());
app.get('/phone',async(req,res)=>{

    const expenses=await Expense.find();
    res.send(expenses)
})
app.get('/phone/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    const result = await Expense.findById(id);
    //const expenses=await Expense.find();
    if(result)
    res.send(result);
    else
    res.send("No expense found with that id");}
    catch(err){
       res.send(err);
    }
})

app.delete('/phone/:id',async(req,res)=>{
  try{
  const id = req.params.id;
  const result = await Expense.findByIdAndDelete(id);
  //const expenses=await Expense.find();
  if(result)
  res.send(result);
  else
  res.send("No expense found with that id");}
  catch(err){
     res.send(err);
  }
})

app.post('/phone', async(req, res) => {
  const newExpense= req.body;
  await Expense.create(newExpense);
  res.send('created!');
})
app.put('/phone/:id',async(req,res)=>{
  try{
  const id = req.params.id;
  const updateObject=req.body;
  const result = await Expense.findByIdAndUpdate(id,{$set:updateObject});
  //const expenses=await Expense.find();
  if(result)
  res.send(result);
  else
  res.send("No expense found with that id");}
  catch(err){
     res.send(err);
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})