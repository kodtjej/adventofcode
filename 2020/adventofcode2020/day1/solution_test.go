package main

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestSomethign(t *testing.T) {
	testInput := []int{
		1721,
		979,
		366,
		299,
		675,
		1456,
	}
	e1, e2 := FindEntries(2020, testInput)

	assert.Equal(t, 1721, e1)
	assert.Equal(t, 299, e2)
}
