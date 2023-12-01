package main

import (
	"encoding/json"
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"

	"github.com/davecgh/go-spew/spew"
)

func main() {
	input, _ := ioutil.ReadFile("input")
	var jsonInput []string
	json.Unmarshal([]byte(input), &jsonInput)
	validPasswords := 0
	for _, in := range jsonInput {
		mi, ma, letter, password := getParams(in)
		min, _ := strconv.Atoi(mi)
		max, _ := strconv.Atoi(ma)
		if checkPassword(min, max, letter, password) {
			validPasswords++
		}
	}

	spew.Dump(validPasswords)
}

func getParams(input string) (string, string, string, string) {
	pattern := regexp.MustCompile(`^(\d+)-(\d+) ([a-z]): (\w+)$`)
	re := pattern.FindAllStringSubmatch(input, -1)
	if re != nil {
		return re[0][1], re[0][2], re[0][3], re[0][4]
	}
	return "", "", "", ""
}

func checkPassword(min, max int, letter, password string) bool {
	letters := string(password[min-1]) + string(password[max-1])
	if strings.Count(letters, letter) == 1 {
		return true
	}
	/*
		for i := 0; i < len(password); i++ {
			occurances := strings.Count(password, letter)
			if occurances >= min && occurances <= max {
				return true
			}
		}
	*/
	return false
}
