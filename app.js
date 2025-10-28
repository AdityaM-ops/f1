const express=require('express');
const app=express();
const port=3000;
app.use(express.json());


let books=[
    {
        id:1,
        title:'The Great Gatsby',
        author:'F. Scott Fitzgerald'},
        {
        id:2,
        title:'The Great lust',
        author:'F. lusty'}
];  

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/books',(req,res)=>{
    res.status(200).json(books);
});
app.get('/books/:id',(req,res)=>{
    const bookId=parseInt(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);
    if(bookIndex===-1){
        return res.status(404).json({message:'Book not found'});
    }
         res.status(200).json(books[bookIndex]);
});
app.post('/books',(req,res)=>{
    if(!req.body.title || !req.body.author){
        return res.status(400).json({message:'Title and author are required'});
    }
    const newBook={
        id:books.length+1,
        title:req.body.title,
        author:req.body.author
    }
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id',(req,res)=>{
    const bookId=parseInt(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);
    if(bookIndex===-1){
        return res.status(404).json({message:'Book not found'});
    }   
    else{
        books[bookIndex]={...req.body,id:bookId};
        res.status(200).json(books[bookIndex]); 
    }
});
app.patch('/books/:id',(req,res)=>{
    const bookId=parseInt(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);
    if(bookIndex===-1){
        return res.status(404).json({message:'Book not found'});
    }   
    
    else{
        books[bookIndex]={...books[bookIndex],...req.body};
        res.status(200).json(books[bookIndex]); 
    }
});
app.delete('/books/:id',(req,res)=>{
    const bookId=parseInt(req.params.id);
    const bookIndex=books.findIndex(b=>b.id===bookId);  
    if(bookIndex===-1){
        return res.status(404).json({message:'Book not found'});
    } else{
        const deletedbook=books.splice(bookIndex,1);
        res.status(200).json({message:"Book deleted successfully",deletedbook:deletedbook});
    }
});