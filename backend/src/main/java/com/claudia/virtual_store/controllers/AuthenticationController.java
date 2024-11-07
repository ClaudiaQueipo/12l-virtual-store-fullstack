package com.claudia.virtual_store.controllers;

import com.claudia.virtual_store.dto.AuthenticationRequest;
import com.claudia.virtual_store.dto.AuthenticationResponse;
import com.claudia.virtual_store.dto.ErrorResponse;
import com.claudia.virtual_store.dto.RegisterRequest;
import com.claudia.virtual_store.services.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

  private final AuthenticationService service;

  @PostMapping("/register")
  public ResponseEntity<AuthenticationResponse> register(
      @RequestBody RegisterRequest request
  ) {
    return ResponseEntity.ok(service.register(request));
  }

  @ExceptionHandler(IllegalArgumentException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex) {
    ErrorResponse errorResponse = new ErrorResponse(ex.getMessage());
    return ResponseEntity.badRequest().body(errorResponse);
  }

  @PostMapping("/verify-token")
  public ResponseEntity<?> verifyToken(
          @RequestHeader("Authorization") String token
  ) {
    if (service.verifyToken(token)) {
      return ResponseEntity.ok("Token is valid.");
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token.");
    }
  }


  @PostMapping("/authenticate")
  public ResponseEntity<AuthenticationResponse> authenticate(
      @RequestBody AuthenticationRequest request
  ) {
    return ResponseEntity.ok(service.authenticate(request));
  }

  @PostMapping("/refresh-token")
  public void refreshToken(
      HttpServletRequest request,
      HttpServletResponse response
  ) throws IOException {
    service.refreshToken(request, response);
  }


}
