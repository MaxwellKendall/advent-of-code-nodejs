import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const main = () => {
    const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf-8');
    
    console.log(input);
}

main();