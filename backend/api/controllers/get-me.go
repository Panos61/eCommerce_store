package controllers

import (
	"backend/api/auth"
	"backend/api/models"
	"backend/api/utils"
	"database/sql"
	"log"
	"net/http"
)

func (c Controller) GetMe(db *sql.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var resp = map[string]interface{}{"status": "Success", "message": "Fetched current user"}

		uid, err := auth.ExtractTokenID(r)
		if err != nil {
			resp["status"] = "Failed"
			resp["message"] = "Could not extract id"
			utils.JSONresp(w, http.StatusBadRequest, resp)
			return
		}

		user := models.User{}

		currentUser, err := user.GetUserByID(db, uint32(uid))
		log.Printf("Current user -> %v", currentUser)
		if err != nil {
			resp["status"] = "Failed"
			resp["message"] = "Could not fetch user"
			utils.JSONresp(w, http.StatusBadRequest, resp)
			return
		}

		resp["user"] = currentUser
		utils.JSONresp(w, http.StatusOK, resp)

	}
}
