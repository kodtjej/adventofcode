package main

import (
	"strconv"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSomethign(t *testing.T) {

	tests := []struct {
		name     string
		input    string
		min      int
		max      int
		letter   string
		password string
		valid    bool
	}{
		{
			name:     "1",
			input:    "1-3 a: abcde",
			min:      1,
			max:      3,
			letter:   "a",
			password: "abcde",
			valid:    true,
		},
		{
			name:     "2",
			input:    "1-3 b: cdefg",
			min:      1,
			max:      3,
			letter:   "b",
			password: "cdefg",
			valid:    false,
		},
		{
			name:     "3",
			input:    "2-9 c: ccccccccc",
			min:      2,
			max:      9,
			letter:   "c",
			password: "ccccccccc",
			valid:    true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			mi, ma, letter, password := getParams(test.input)
			min, _ := strconv.Atoi(mi)
			max, _ := strconv.Atoi(ma)
			assert.Equal(t, test.min, min)
			assert.Equal(t, test.max, max)
			assert.Equal(t, test.letter, letter)
			isValid := checkPassword(min, max, letter, password)
			assert.Equal(t, test.valid, isValid)
		})
	}
}

func TestCheckPassword(t *testing.T) {
	min := 1
	max := 7
	password := "mmmmmmvm"
	letter := "m"

	isValid := checkPassword(min, max, letter, password)
	assert.Equal(t, true, isValid)
}
