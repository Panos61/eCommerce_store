package routes

import (
	"backend/api/controllers"
	"backend/api/database"
	"backend/api/middleware"
	"database/sql"
	"net/http"

	"github.com/gorilla/mux"
)

var db *sql.DB

func Routes() http.Handler {
	r := mux.NewRouter()

	db = database.DB()
	controller := controllers.Controller{}

	// CORS && basic middleware
	r.Use(mux.CORSMethodMiddleware(r))
	r.Use(middleware.ServeHTTP)

	// Routes
	r.HandleFunc("/register", controller.Register(db)).Methods("POST")
	r.HandleFunc("/login", controller.Login(db)).Methods("POST")

	// Auth API routes
	s := r.PathPrefix("/api/v1").Subrouter()

	s.HandleFunc("/get-me", middleware.TokenAuthMiddleware(controller.GetMe(db))).Methods("GET", "OPTIONS")

	return r
}
