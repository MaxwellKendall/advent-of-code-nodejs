import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FILE = 'input.txt'

const map = {
    'A': 'rock',
    'B': 'paper',
    'C': 'sissors',
    'X': 'rock',
    'Y': 'paper',
    'Z': 'sissors'
}

const losingPlaysByPlay = {
    'rock': ['sissors'],
    'paper': ['rock'],
    'sissors': ['paper']
};

const winnerBonusByPlay = {
    'rock': 1,
    'paper': 2,
    'sissors': 3,
};

const desiredOutcome = {
    'X': 'lose',
    'Y': 'draw',
    'Z': 'win'
};

const calculateWinner = (play1, play2) => {
    const first = Object.keys(map).includes(play1) ? map[play1] : play1;
    const second = Object.keys(map).includes(play2) ? map[play2] : play2;
    if (losingPlaysByPlay[first].includes(second)) {
        return [6, 0];
    }
    if (losingPlaysByPlay[second].includes(first)) {
        return [0, 6];
    }
    if (first === second) {
        return [3, 3];
    }
}

const calculateShapeBonus = (winnerPlay) => {
    const play = Object.keys(map).includes(winnerPlay) ? map[winnerPlay]: winnerPlay;
    return winnerBonusByPlay[play];
}

const part1 = () => {
    let input = fs.readFileSync(path.resolve(__dirname, FILE), 'utf-8');
    input = input.split('\n').map(s => s.split(' '))
    // console.log(input);
    const player2Score = input.reduce((acc, [play1, play2]) => {
        const [player1Score, player2Score] = calculateWinner(play1, play2);
        // console.log(`scoreForGame ${play1}, ${play2}`, player2Score);
        if (player2Score) {
            return acc + player2Score + calculateShapeBonus(play2);
        }
        return acc + calculateShapeBonus(play2);
    }, 0)
    
    console.log(player2Score)
}


const getPlayByOutcome = (outcome, input) => {
    const play = map[input];
    const loser = losingPlaysByPlay[play][0];
    if (outcome === 'lose') {
        return loser;
    }
    if (outcome === 'draw') {
        return play;
    }
    const winner = Object
        .keys(losingPlaysByPlay)
        .find((p) => {
            return (
                p !== play &&
                p !== loser
            )
        });
    return winner;
}

const part2 = () => {
    let input = fs.readFileSync(path.resolve(__dirname, FILE), 'utf-8');
    input = input.split('\n').map(s => s.split(' '))
    const player2Score = input.reduce((acc, [play1, result]) => {
        const outcome = desiredOutcome[result];
        const play2 = getPlayByOutcome(outcome, play1);
        const [player1Score, player2Score] = calculateWinner(play1, play2);
        console.log(`scoreForGame ${play1}, ${play2}`, player2Score);
        if (player2Score) {
            return acc + player2Score + calculateShapeBonus(play2);
        }
        return acc + calculateShapeBonus(play2);
    }, 0)
    
    console.log(player2Score)
}

part2();