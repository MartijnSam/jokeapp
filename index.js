const express = require("express");
const rhymes = require('rhymes')
const app = express()
const port = 3000
function onListen(){
    console.log(`Listening on :${port}`)
}
function jokeBlockGenerator(number) {
    return`<div class="joke">
<p><h3>${jokes[number].joke}</h3> <button onclick="hideShow()"><h4>Give me the answer</h4></button></p>
<div id="answer" style="display:none">
<p><h3>${jokes[number].answer}</h3></p>
<p>${jokes[number].image}</p>
</div>
</div>`
}
const jokeNumberGenerator = function(clean, age){
    if (clean === "yes" || age < 18) return Math.floor(Math.random() * 3);  // returns a random integer from 1 to 3; 
    else return Math.floor(Math.random() * 3) + 3;
}
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
const rhymeBlockGenerator = function(rhymewords){
if (rhymewords.length <= 0) 
        return `does not seem to rhyme with any English words...` 
    else return `rhymes with:
    <ul><li>${rhymewords.join('</li><li>')}</li></ul>`
}
const jokes = [{joke:"What's a Dutch party without bitterballen?", answer: "A worst kaas scenario", image:'<img src="https://www.1limburg.nl/sites/default/files/public/styles/media-paragraph/public/kaasenworst.jpg?itok=eM_geNQr" alt="worst kaas scenario">'},
{joke: 'What’s brown and sticky?', answer: "A stick", image:'<img src="https://pngimage.net/wp-content/uploads/2018/06/tree-stick-png.png" alt="just a brown stick">'},
{joke:'What do you call a sleeping wolf?', answer:"An unawarewolf", image:'<img src="https://cdn.pixabay.com/photo/2019/04/15/00/04/wolf-4128134_960_720.jpg" alt="sleeping wolf">'},
{joke:'Why was the guitar teacher arrested?', answer:"For fingering a minor", image:'<img src="https://pegheadnation.com/files/1815/2467/5217/BaughmanSquare.jpg" alt="guitar teacher">'},
{joke:'What do you call the useless piece of skin on a dick?', answer:"The man", image:'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Justin_Bieber_Miami_Beach_Police_Department_March_04%2C_2014.jpg/800px-Justin_Bieber_Miami_Beach_Police_Department_March_04%2C_2014.jpg" alt="a random man">'},
{joke:'What does a cow have four of, that a woman only has two of?', answer:"Legs", image:'<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cow_udders02.jpg/1280px-Cow_udders02.jpg" alt="a cow udder">'}
]
app.get('/joke/:name/:clean/:age', (request, response) => {
const rhymnow = rhymes(request.params.name)
const rhymewords = rhymnow.map(function(word){
    return capitalize(word.word)})
const rhymeText = rhymeBlockGenerator(rhymewords)
const jokeText = jokeBlockGenerator(jokeNumberGenerator(request.params.clean, request.params.age))
const style = `<style type="text/css">
html {
    font-size: 15px; 
    font-family: 'Comic Neue', cursive;
    background-color: #040238;
  }
h1 {
    font-size: 50px;
    text-align: center;
    color: #f0edee;
    margin: 0;
    padding: 20px 0;
  }
h2 {
    font-size: 30px;
    text-align: center;
    color: #f0edee;
    margin: 0;
    padding: 20px 0;
  }
h3 {
    font-size: 25px;
    text-align: center;
    color: #f0edee;
    margin: 0;
    padding: 20px 0;
  }
h4 {
    font-size: 25px;
    text-align: center;
    color: #07393c;
    margin: 0;
    padding: 20px 0;
  }


.blinking {
    animation:blinkingText 1.2s infinite;
}
@keyframes blinkingText{
    0%{     color: #ffffff;    }
    49%{    color: #ffffff; }
    60%{    color: transparent; }
    99%{    color: transparent;  }
    100%{   color: #ffffff;    }
}

p {
    font-size: 16px;    
    line-height: 2;
    letter-spacing: 1px;
    color: #ffffff;
    text-align: center;
    margin-left: 25px;
    margin-right: 25px;
  }
body {
    width: 1000px;
    margin: 0 auto;
    background-color: #2c666e;
    padding: 0 20px 20px 20px;
    border: 5px solid #07393c;
  }
img {
    object-fit: contain;
    height: 300px;
    border: 5px solid #07393c;
    }

.joke {
    font-size: 25px;    
    line-height: 2;
    letter-spacing: 1px;
    color: #ffffff;
    text-align: center;
    margin-left: 25px;
    margin-right: 25px;
}
.marquee {
    font-size: 25px;
    color: #ffffff;
    
}
.rhyme ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
.rhyme li {
    display: inline-block;
    margin-left: 20px;
    margin-right: 25px;
    padding-top: 25px;
    position: relative;
    font-size: 20px;
    color: #ffffff;
 }

 .rhyme {
    border: 5px solid #07393c;
 }


  </style>`

function render(){
    return `<html><head><title>JokeStar Pro 6000+7</title><script>
function hideShow() {
    var x = document.getElementById("answer");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }</script></head>
  <body>${style}
  <h1>Thank you for using the JokeStar Pro 6000+7</h1>
<p><h2>Hello there <span class="blinking">${capitalize(request.params.name)}</span>!</h2></p>
<p><span class="marquee"><marquee direction="down" width="400" height="40" behavior="alternate" style="border:dotted">
  <marquee behavior="alternate">
    Are you ready for a really funny joke?</marquee></marquee></span></p>
<p>${jokeText}</p>
<div class="rhyme"><p><h3>In case you didn't knew, your name ${capitalize(request.params.name)}, ${rhymeText}</h3></p>
</body></html>`}

response.send(render())
})
app.listen(port, onListen)
