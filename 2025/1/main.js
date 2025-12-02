import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.split('\n')

let part2 = 0;
function main() {
	let part1 = 0;
	const mippladData = [];
	for (const inputstring of inputData) {
		if (inputstring === '') continue;
		mippladData.push(splitActionAndSteps(inputstring));
	}

	let dial = 50;
	for (const instruction of mippladData) {
		switch (instruction.action) {
			case 'L':
				dial = moveLeft(dial, instruction.times);
				break;
			case 'R':
				dial = moveRight(dial, instruction.times);
				break;
		}
		if (dial === 0) {
			part1++
		}
	}
	console.log("result part 1:", part1);
	console.log("result part 2:", part2);
}

function moveLeft(dial, times) {
	let counter = dial;
	for (let i = 0; i < times; i++) {
		if (counter === 0) {
			part2++;
			counter = 99;
			continue;
		}
		counter--;
	}

	return counter;
}


function moveRight(dial, times) {
	for (let i = 0; i < times; i++) {
		if (dial === 99) {
			part2++;
			dial = 0;
			continue;
		}
		dial++;
	}
	return dial;
}



const actionRegex = /(\w)(\d+)/
function splitActionAndSteps(s) {
	const res = s.match(actionRegex);

	return { action: res[1], times: parseInt(res[2]) };
}

main();
