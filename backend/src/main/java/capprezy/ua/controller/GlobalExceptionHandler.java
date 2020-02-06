package capprezy.ua.controller;

import capprezy.ua.controller.exception.AlreadyExistsException;
import capprezy.ua.controller.exception.ApiError;
import capprezy.ua.controller.exception.PermissionException;
import javassist.NotFoundException;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            DataAccessException.class,
            AlreadyExistsException.class
    })
    private ResponseEntity<ApiError> dataAccessException(Exception ex, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        if (ex.getCause() != null)
            return new ResponseEntity<>(new ApiError(ex.getCause().getMessage()), headers, HttpStatus.CONFLICT);
        else
            return new ResponseEntity<>(new ApiError(ex.getMessage()), headers, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({
            NotFoundException.class,
            UsernameNotFoundException.class
    })
    private ResponseEntity<ApiError> handleNotFoundException(Exception ex, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(new ApiError(ex.getMessage()), headers, HttpStatus.NOT_FOUND);
    }



    @ExceptionHandler({
            PermissionException.class
    })
    private ResponseEntity<ApiError> handleForbiddenException(Exception ex, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        return new ResponseEntity<>(new ApiError(ex.getMessage()), headers, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    private ResponseEntity<ApiError> handleNotValidArgumentException(MethodArgumentNotValidException ex, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        ApiError error = new ApiError(ex.getBindingResult().getFieldErrors().get(0).getDefaultMessage());
        return new ResponseEntity<>(error, headers, HttpStatus.NOT_ACCEPTABLE);
    }
}