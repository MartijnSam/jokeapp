const express = require("express");
const rhymes = require('rhymes')


function rhyming(name){return rhymes(name)}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

const app = express()
const port = 3000
function onListen(){
    console.log(`Listening on :${port}`)
}

const jokes = {joke1: 'joke1', joke2: 'joke2', joke3:'joke3', joke4:'joke4', joke5:'joke5'}

console.log(jokes)

app.get('/joke/:name/:conf/:humor', (request, response) => {console.log('jokepage working');
const rhymnow = rhyming(request.params.name)
const rhymewords = rhymnow.map(function(word){
    return word.word
})
console.log(rhymewords)

const rhymeblock = function(rhymewords){
if (rhymewords.length <= 0) 
    return `doesnt seem to rhyme with any English words...` 
else return `rhymes with:</p>
<p><dev id=rhymewords><ul><li>${rhymewords.join('</li><li>')}</li></ul>`}
const rhymetext = rhymeblock(rhymewords)
console.log(rhymetext)

response.send(`<html><head><title>Jokester Pro 6000</title></head><body><h1>Welcome</h1><body>
<p>Hello ${capitalize(request.params.name)},</p>
<dev id=rhyme><p>In case you didn't knew, your name ${capitalize(request.params.name)}, ${rhymetext}</p></dev></dev>
</body></html>`)})


const testPage = `<html><head><title>TestPage</title></head><body><h1>TestPage works</h1></body></html>`
app.get('/test', (request, response) =>
{console.log(request.path);
    console.log(request.method);
response.send(testPage)})

// function render (name) {
//     const document = `<html><head><title>TestPage</title></head><body><h1>Welcome you sexy cuntsucker:</h1><h1>${name}</h1></body></html>`;
//     return document
// }

// app.get('/mess/:name', (request, response) =>

//     {const page = render(request.params.name);
//     response.send(page)})

// app.get('/user/:name',(request, response) => {
//     response.send(`Hello you sexy bitch who is called: ${request.params.name}`)
// })

app.listen(port, onListen)
