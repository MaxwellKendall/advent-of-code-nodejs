import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main = () => {
    const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');
    console.log(typeof input);
    const partI = input
        .split('\n\n')
        .map(str => str.split('\n').map(str => Number(str)))
        .reduce((acc, arr) => {
            const current = arr.reduce((acc, n) => acc + n, 0);
            return Math.max(acc, current);
        }, 0)
    console.log(partI);
    const partII = input
        .split('\n\n')
        .map(str => str.split('\n').map(str => Number(str)))
        .map((arr) => {
            const current = arr.reduce((acc, n) => acc + n, 0);
            return current
        })
        .sort((a, b) => b - a)
        .slice(0, 3);
    console.log(partII);
}

main();