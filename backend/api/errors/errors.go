package errors

import "net/http"

type ErrorResponse struct {
	Msg            string `json:"msg"`
	HTTPStatusCode int    `json:""`
	StatusText     string `json:"status"`
	Err            error  `json:""`
}

func ErrInvalidRequest(w http.ResponseWriter, err error) *ErrorResponse {
	w.WriteHeader(http.StatusBadRequest)
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 400,
		StatusText:     "Bad/Invalid Request",
	}
}

func ErrUnauthorizedRequest(w http.ResponseWriter, err error) *ErrorResponse {
	w.WriteHeader(http.StatusUnauthorized)
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 401,
		StatusText:     "Unauthorized Request",
	}
}

func ErrUnprocessableEntity(w http.ResponseWriter, err error) *ErrorResponse {
	w.WriteHeader(http.StatusUnprocessableEntity)
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 422,
		StatusText:     "Unprocessable Entity",
	}
}

func ErrInternalServer(w http.ResponseWriter, err error) *ErrorResponse {
	w.WriteHeader(http.StatusInternalServerError)
	return &ErrorResponse{
		Err:            err,
		HTTPStatusCode: 500,
		StatusText:     "Internal Server Error.",
	}
}

var (
	ErrNotFound         = &ErrorResponse{HTTPStatusCode: 404, Msg: "Resource Not Found."}
	ErrMethodNotAllowed = &ErrorResponse{HTTPStatusCode: 405, Msg: "Method Not Allowed."}
)
