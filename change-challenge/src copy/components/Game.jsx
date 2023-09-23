import { useState, useEffect } from 'react';
import { Input, Button, notification } from 'antd';
import axios from 'axios';

function Game () {
9
    const [word, setWord] = useState("");
    const [score, setScore] = useState(0);
    const [guess, setGuess] = useState("");
    const [plays, setPlays] = useState(0);
    const [hint, setHint]= useState("");
    const [current, setCurrent]= useState("_");
    
    useEffect(() => { 
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/getWord',
            headers: { }
          };
          
          axios.request(config)
            .then((response) => {
                setWord(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleSubmit = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/getWord',
            headers: { }
          };
        
          axios.request(config)
            .then((response) => {
                setWord(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        let config2 = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: `http://localhost:3000/guessWord?word=${guess}`,
        headers: { }
        };
        
        axios.request(config2)
            .then((response) => {
                setScore;
                if(response.data === true) {
                    notification.success({
                        message: "Correct!",
                        description: "You guessed the word correctly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                } else {
                    notification.error({
                        message: "Inorrect!",
                        description: "You guessed the word incorrectly!",
                        placement: "bottomRight",
                        duration: 2
                    });
                }
                setGuess("");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit2 = () => {
        let config3 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/score',
            headers: { }
        };
    
        axios.request(config3)
            .then((response) => {
                setScore(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        let config4 = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/plays',
            headers: { }
        };
    
        axios.request(config4)
            .then((response) => {
                setPlays(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const handleHint = () => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/current',
            headers: { }
        };
    
        axios.request(config)
            .then((response) => {
                setCurrent(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className="card">
            <h2> Current Word: {word} </h2>
            <Input size="large" placeholder="Enter your guess"
                onChange={(input) => {setGuess(input.target.value); }}
                value={guess} />
            <br /> <br />
            <Button type="primary" size="large" onClick={handleSubmit}>Submit</Button>
            <br /> <br />
            <Button type="primary" size="large" onClick={handleSubmit2}>Update Score</Button>
            <br /> <br />
            <Button type="primary" size="large" onClick={handleHint}>Update Hint</Button>
            <p> Score: {score} </p>
            <p> Rounds Played: {plays} </p>
            <p> Hint Prompt: The first letter of the word is {current.charAt(0)} </p>
        </div>
    )
    
    
}

export default Game;