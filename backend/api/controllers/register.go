package controllers

import (
	"backend/api/errors"
	"backend/api/models"
	"backend/api/utils"
	"database/sql"
	"encoding/json"
	"net/http"
)

type Controller struct{}

func (c Controller) Register(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var resp = map[string]interface{}{"status": "Success", "message": "Signed in successfully"}

		user := &models.User{}

		json.NewDecoder(r.Body).Decode(&user)

		// Check if user already exists in DB.
		// If user exists, return 422
		usr, _ := user.GetUser(db)
		if usr != nil {
			resp["status"] = "Failed"
			resp["message"] = "Email or username already exists"
			utils.JSONresp(w, http.StatusBadRequest, resp)
			return
		}

		// User data validation
		err := user.ValidateUser("register")
		if err != nil {
			resp["status"] = "Failed"
			resp["message"] = "User credentials are invalid or already exist"
			utils.JSONresp(w, http.StatusBadRequest, resp)
			return
		}

		// Hash password
		hashedPassword, err := utils.HashPassword([]byte(user.Password))
		if err != nil {
			errors.ErrInternalServer(w, err)
			return
		}

		// Replace user password with its hashed form
		user.Password = hashedPassword

		// Insert user data into db
		regData, err := user.SaveUser(db)
		if err != nil {
			errors.ErrInternalServer(w, err)
			return
		}

		resp["user"] = regData
		utils.JSONresp(w, http.StatusOK, resp)
	}
}
