package middleware

import (
	"backend/api/utils"
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/dgrijalva/jwt-go"
)

func ServeHTTP(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		if origin := r.Header.Get("Origin"); origin != "" {
			w.Header().Set("Access-Control-Allow-Origin", origin)
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers",
				"Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		}
		next.ServeHTTP(w, r)
	})

}

func TokenAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var resp = map[string]interface{}{"status": "failed", "message": "Missing authorization token"}

		var header = r.Header.Get("Authorization")
		header = strings.TrimSpace(header)

		if header == "" {
			utils.JSONresp(w, http.StatusForbidden, resp)
			return
		}

		token, err := jwt.Parse(header, func(t *jwt.Token) (interface{}, error) {
			return []byte(os.Getenv("JWT_SECRET")), nil
		})

		if err != nil {
			resp["status"] = "Failed"
			resp["message"] = "Invalid token"
			utils.JSONresp(w, http.StatusForbidden, resp)
			return
		}

		claims, _ := token.Claims.(jwt.MapClaims)

		ctx := context.WithValue(r.Context(), "ID", claims["ID"])
		next.ServeHTTP(w, r.WithContext(ctx))
	})

}
