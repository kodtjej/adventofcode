import { promises as fs } from 'fs';
const input = await fs.readFile('input', 'utf-8');
const inputData = input.split('\r\n');
const regex = /\d+/g

function part1() {
    let plerk = inputData.map(d => d.split(':'))
    let idsum = 0;
    plerk.forEach(game => {
        const gameID = parseInt(game[0].match(regex));
        const sets = game[1].split(";")
        
        let possible = isGamePossible(sets);
        if(possible){
            idsum += gameID
        }

    })
    console.log(idsum)
}

function isGamePossible(sets) {
    const greenregex = /\d+ green/g
    const redregex = /\d+ red/g
    const blueregex = /\d+ blue/g
    let result = true;
    sets.forEach(g => {
        let greenres = g.match(greenregex)
        if (greenres){
            if(parseInt(greenres[0].match(regex)[0]) > 13){
                result = false;
            }
        } 
        let redres = g.match(redregex)
        if (redres){
            if(parseInt(redres[0].match(regex)[0]) > 12){
                result = false;

            }
        } 
        let blueres = g.match(blueregex)
        if (blueres){
            if(parseInt(blueres[0].match(regex)[0]) > 14){
                result = false;

            }
        } 
    })

    return result
}

part1()