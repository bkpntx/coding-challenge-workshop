const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; // May need to change PORT to something else if 3000 is already in use
const fs = require("fs");
const { parse } = require("csv-parse");
const { randomBytes } = require('crypto');
let count =0;
let allWords = [];
let current = "";
let currentFirst = "";
let scrambled ="";
let plays = 0;
let prevWord = "";
let score =0;

fs.createReadStream("./english-words.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    allWords.push(row);
    count++;
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });

  function scramble(word){
    strArr = [];
    copy = word[0];
    final = "";
    for(i=0;i<copy.length;i++){
      strArr.push(copy[i]);
    }
    for(i=0;i<copy.length;i++){
      rand = Math.floor(Math.random()*copy.length);
      hold = strArr[i];
      strArr[i]=strArr[rand];
      strArr[rand]= hold;
    }
    for(i=0;i<copy.length;i++){
      final = final + strArr[i];
    }
    return final;
  }
app.use(cors());


app.get('/score', (req, res) => {
    res.send(`${score}`);
});

app.get('/current', (req, res) => {
  res.send(`${current}`);
});

app.get('/plays', (req, res) => {
  res.send(`${plays}`);
});

app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(200).send(`${score}`);
})

app.get('/getWord', (req, res) => {
  prevWord = current;
    let rand = Math.random() * count;
    rand = Math.floor(rand);
    current = allWords[rand];
    scrambled = scramble(current);;
    res.status(200).send(scrambled);
})

app.patch('/guessWord', (req, res) => {
    plays++;
    console.log("word:" + prevWord);
    if(req.query.word == prevWord) {
        res.status(200).send('true');
        score++;
    } else {
        res.status(200).send('false');
    }
})

app.listen(PORT, () => {
    console.log(`Backend is running on http://localhost:${PORT}`);
});