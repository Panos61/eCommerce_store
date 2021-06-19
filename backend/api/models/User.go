package models

import (
	"database/sql"
	"errors"
	"fmt"
	"strings"
)

type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// Insert user in database
func (u *User) SaveUser(db *sql.DB) (*User, error) {
	err := db.QueryRow("INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *;",
		u.Username, u.Email, u.Password).Scan(&u.ID, &u.Username, &u.Email, &u.Password)
	if err != nil {
		return &User{}, err
	}

	return u, nil
}

// Get a user from the database
func (u *User) GetUser(db *sql.DB) (*User, error) {

	sqlStatement := "SELECT * FROM users WHERE email = $1"

	err := db.QueryRow(sqlStatement, u.Email).Scan(&u.ID, &u.Username, &u.Email, &u.Password)
	if err != nil {
		return nil, err
	}

	return u, nil
}

func (u *User) GetUserByID(db *sql.DB, uid uint32) (*User, error) {

	sqlStatement := "SELECT * FROM users WHERE id = $1"

	err := db.QueryRow(sqlStatement, uid).Scan(&u.ID, &u.Username, &u.Email, &u.Password)
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	return u, nil
}

// User data validation
func (u *User) ValidateUser(action string) error {
	switch strings.ToLower(action) {
	case "login":
		if u.Email == "" {
			return errors.New("email is required")
		}

		if u.Password == "" {
			return errors.New("password is required")
		}
		return nil

	case "register":
		if u.Username == "" {
			return errors.New("username is required")
		}
		if u.Email == "" {
			return errors.New("email is required")
		}

		if u.Password == "" {
			return errors.New("password is required")
		}
		return nil

	default:
		return nil
	}

}
