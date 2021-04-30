package controllers

import (
	"backend/api/auth"
	"backend/api/errors"
	"backend/api/models"
	"backend/api/utils"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func (c Controller) Login(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var resp = map[string]interface{}{"status": "Success", "message": "Signed in successfully"}

		user := models.User{}

		json.NewDecoder(r.Body).Decode(&user)

		// Validate user data
		err := user.ValidateUser("login")
		if err != nil {
			fmt.Println(err)

			resp["status"] = "Failed"
			resp["message"] = "Wrong email or password"
			utils.JSONresp(w, http.StatusForbidden, resp)
			return
		}

		result := db.QueryRow("SELECT id, password FROM users WHERE email = $1", user.Email)

		storedData := &models.User{}

		err = result.Scan(&storedData.ID, &storedData.Password)
		if err != nil {
			fmt.Println(err)

			if err == sql.ErrNoRows {
				fmt.Println(err)

				resp["status"] = "Failed"
				resp["message"] = "Wrong email or password"
				utils.JSONresp(w, http.StatusForbidden, resp)
				return
			}
			errors.ErrInternalServer(w, err)
			return
		}

		err = utils.CheckPasswordHash(storedData.Password, user.Password)
		if err != nil {
			fmt.Println(err)

			resp["status"] = "Failed"
			resp["message"] = "Wrong email or password"
			utils.JSONresp(w, http.StatusForbidden, resp)
			return
		}

		token, err := auth.CreateToken(uint32(storedData.ID))
		if err != nil {
			fmt.Println(err)
			errors.ErrInvalidRequest(w, err)
			return
		}

		resp["token"] = token
		utils.JSONresp(w, http.StatusOK, resp)

	}
}

func (c Controller) Hello(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Hello")
	}
}
