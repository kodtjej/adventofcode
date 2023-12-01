package main

import (
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	bytes, err := ioutil.ReadFile("../input")
	if err != nil {
		panic(fmt.Errorf("Cant open file %w", err))
	}
	contents := string(bytes)

	inputList := strings.Split(contents, ",")
	inputListAsInts := []int64{}

	for _, v := range inputList {
		b, _ := strconv.Atoi(v)
		inputListAsInts = append(inputListAsInts, int64(b))
	}

	for i := 0; i < len(inputListAsInts); i += 4 {
		opCode := inputListAsInts[i]

		switch opCode {
		case 99:
			break
		case 1:
			inputAposition, inputBposition, inputSumPosition := getPositions(int64(i), inputListAsInts)
			inputListAsInts[inputSumPosition] = inputListAsInts[inputAposition] + inputListAsInts[inputBposition]
		case 2:
			inputAposition, inputBposition, inputSumPosition := getPositions(int64(i), inputListAsInts)
			inputListAsInts[inputSumPosition] = inputListAsInts[inputAposition] * inputListAsInts[inputBposition]
		default:
			fmt.Println(inputListAsInts)
			fmt.Println(i)
			fmt.Println(opCode)
			panic(fmt.Errorf("OPCODE NOT FOUND: %d", opCode))

		}

	}

	fmt.Println(inputListAsInts)
}

func getPositions(position int64, inputList []int64) (int64, int64, int64) {
	inputAposition := inputList[position+1]
	inputBposition := inputList[position+2]
	inputSumPosition := inputList[position+3]

	return inputAposition, inputBposition, inputSumPosition
}
