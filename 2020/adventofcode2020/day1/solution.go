package main

import (
	"encoding/json"
	"io/ioutil"

	"github.com/davecgh/go-spew/spew"
)

func main() {
	input, _ := ioutil.ReadFile("input")
	var jsonInput []int
	json.Unmarshal([]byte(input), &jsonInput)
	e1, e2, e3 := FindEntries(2020, jsonInput)
	spew.Dump(e1 * e2 * e3)
}

func FindEntries(wantedResult int, input []int) (int, int, int) {
	for _, i := range input {
		for _, d := range input {
			for _, e := range input {
				if i+d+e == wantedResult {
					return i, d, e
				}
			}
		}
	}
	return 0, 0, 0
}
