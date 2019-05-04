const express = require('express');
const cors = require('cors');
let wordList = require('./words').words();

const app = express();

app.use(express.json());
app.use(cors());


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


app.get('/api/:count', (req, res) => {
    shuffleList = shuffle(wordList);
    let count = req.params.count;
    count = parseInt(count, 10);
    if (count === parseInt(count, 10)) {
        if (count > shuffleList.length) {
            count = shuffleList.length;
        }
        result = {
            words: shuffleList.slice(0, count)
        };
        return res.json(result);
    } else {
        return res.status(400).json({ msg: 'The parameter should be an interger value' });
    }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
