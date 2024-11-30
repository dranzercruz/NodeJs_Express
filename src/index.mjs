import express, { request, response } from "express";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Running on port ${PORT}`);
});

const mockUsers =[        
    {id :1, username: "eniyavan", displayName:"Eni"},
    {id :2, username: "hdv", displayName:"ajaf "},
    {id :3, username: "vdb", displayName:"ghbds"},
    {id :4, username: "nad sv ", displayName:"cbfd"},
    {id :5, username: "madvfk f", displayName:"ndsfvh"},
    {id :6, username: "hjom", displayName:"zrvdf"},
    {id :7, username: "eqsw", displayName:"midfb"},
]

app.get("/", (request, response) =>{
    response.status(201).send({mes: "hello"});
});

app.get("/api/users", (request, response) =>{
    console.log(request.query);
    const{
        query: { filter, value },
    } = request;
    // when filter and value are undefined
    if(!filter && !value)  return response.send(mockUsers);
    if(filter || value) 
        return response.send(
            mockUsers.filter((user) => user[filter]?.indexOf(value) !== -1)
    );
});

app.post("/api/users/:id", (request, response)=>{
    // console.log(request.body);
    const { body } = request;
    const newUser = {id:mockUsers[mockUsers.length -1].id +1, ...body};
    mockUsers.push(newUser); 
    return response.status(201).send(newUser);
});

app.get('/api/users/:id',(request,response)=> {
    const parsedId = parseInt(request.params.id);
    // console.log(parsedId);
    if (isNaN(parsedId)) {
        return response.status(400).send({mes:"Bad Request. Invalid Id"});
    }
    const findUsers = mockUsers.find((user)=>user.id === parsedId)
        if (!findUsers) return response.sendStatus(404);
        return response.send(findUsers); 
});

app.get('/api/products', (requset,response)=>{
    response.send([
        {id :123, name: "chicken", price:12.99},
        {id :124, name: "beef", price:22.99},
        {id :125, name: "beef stew", price:12.49},
        {id :126, name: "noodles", price:9.99},
    ]);
});

app.put("/api/users/:id", (request, response) =>{
    // console.log(request.body);
    const { body, params: {id}} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) response.sendStatus(404);
    mockUsers[findUserIndex] = { id:parsedId, ...body };
    return response.sendStatus(200);
});

app.patch("/api/users/:id", (request,response) =>{
    const { body, params: {id}} = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) response.sendStatus(404);
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return response.sendStatus(200);
});

app.delete("/api/users/:id", (request,response) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findUserIndex === -1) response.sendStatus(404); 
    mockUsers.splice(findUserIndex,1);
    return response.sendStatus(200);
});







