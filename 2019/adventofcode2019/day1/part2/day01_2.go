package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"math"
	"strconv"
	"strings"
)

func main() {
	bytes, err := ioutil.ReadFile("../input")
	if err != nil {
		log.Fatal(fmt.Errorf("No input file: %w", err))
		return
	}

	contents := strings.Split(string(bytes), "\n")

	result := int64(0)

	for _, s := range contents {
		i, err := strconv.ParseFloat(s, 64)
		if err != nil {
			panic(err)
		}
		i = calculateFuelForModule(i)
		result += int64(i)
	}

	fmt.Println(result)
}

func calculateFuelForModule(input float64) float64 {
	result := 0.0
	for {
		input = math.Floor(input/3) - 2
		if input <= 0 {
			return result
		}
		result += input
	}
}
