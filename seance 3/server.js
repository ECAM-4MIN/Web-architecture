// Import express
let express = require('express');
// Initialize the app
let app = express();

app.use(express.static('public'));

let todo = ["Faire les courses","Nourir le chat"];


app.set('view engine', 'ejs');
// Send message for default URL

app.get('/', (request, response) => response.send('Hello World !'));

app.get('/todo', (req, res) => {
    res.render('pages/todo',{
        todo: todo
    })
    
})
app.get('/add_item', (req, res)=> {
    let item = req.query.item
    todo.push(item)
    res.render('pages/todo',{
        todo: todo
    })
})
app.get('/del_item', (req, res)=> {
    let item = req.query.item

    for( var i = 0; i < todo.length; i++){ 
        if ( todo[i] === item) { 
            todo.splice(i, 1);
        }
    
    }
    res.render('pages/todo',{
        todo: todo
    })
})


// Setup server port
let port = 3000;
// Launch app to listen to specified port
app.listen(port, function () {
console.log('Server running on port' + port);
});