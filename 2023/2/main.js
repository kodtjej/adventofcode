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
    console.log("part 1:", idsum)
}

function isGamePossible(sets) {
    let result = true;
    sets.forEach(g => {
        const greenRes = getGreen(g)
        if(greenRes){
            if(greenRes > 13){
                result = false;
            }
        } 
        const redRes = getRed(g)
        if (redRes){
            if(redRes > 12){
                result = false;
            }
        } 
        let blueRes = getBlue(g)
        if (blueRes){
            if(blueRes > 14){
                result = false;
            }
        } 
    })
    return result
}

function getGreen(data){
    const greenregex = /\d+ green/g
    let res = data.match(greenregex)
    if(!res){
        return 0
    }
    return parseInt(res[0].match(regex)[0])
}

function getRed(data){
    const redregex = /\d+ red/g
    let res = data.match(redregex)
    if(!res){
        return 0
    }
    return parseInt(res[0].match(regex)[0])
}
function getBlue(data){
    const blueregex = /\d+ blue/g
    let res = data.match(blueregex)
    if(!res){
        return 0
    }
    return parseInt(res[0].match(regex)[0])
}
part1()

function part2(){
    let plerk = inputData.map(d => d.split(':'))
    let sum = 0;
    plerk.forEach(game => {
        const sets = game[1].split(";")
        let green = 0;
        let red = 0;
        let blue = 0;
        sets.forEach(g => {
            const greeng = getGreen(g);
            if(greeng > green){
                green = greeng
            }
            const blueg = getBlue(g);
            if(blueg > blue){
                blue = blueg
            }
            const redg = getRed(g);
            if(redg > red){
                red = redg
            }
        })

        sum += green * red * blue
    })
    console.log("part 2:",sum)
}

part2()