package main

import (
	"log"
	"net/http"
)

func main() {
	log.Println("Server up and running")
	http.ListenAndServe(":8000", nil)
}
