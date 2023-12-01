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
		i = math.Floor(i/3) - 2
		result += int64(i)
	}

	fmt.Println(result)
}
