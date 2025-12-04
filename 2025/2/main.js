import { promises as fs } from 'fs'
const input = await fs.readFile('input', 'utf-8')
const inputData = input.split(',')



function main() {
	const mappedInput = inputData.map(range => range.split('-').map(id => parseInt(id)));
	let sum = 0;
	for (const range of mappedInput) {
		const start = range[0];
		const end = range[1];
		for (let i = start; i <= end; i++) {
			if (!isValidID(i.toString())) {
				sum = sum + i;
			}
		}
	}

	console.log(sum);

}

function isValidID(id) {
	if (id.substring(0, 1) === 0) return false;

	if (id.length % 2 !== 0) {
		return true;
	}
	const firstHalf = id.substring(0, id.length / 2);
	const secondHalf = id.substring(id.length / 2);
	console.log(`first half: ${firstHalf} second half: ${secondHalf}`);
	if (firstHalf === secondHalf) return false;

	return true;

}

main();
