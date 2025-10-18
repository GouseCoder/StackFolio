package com.stackfolio.auth.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.stackfolio.auth.dto.AuthResponse;
import com.stackfolio.auth.dto.LoginRequest;
import com.stackfolio.auth.dto.RegisterRequest;
import com.stackfolio.auth.model.Role;
import com.stackfolio.auth.model.User;
import com.stackfolio.auth.repository.UserRepository;
import com.stackfolio.auth.security.JwtUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
	
	@Value("${app.admin.email}")
	private String admninEmail;
	
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(isAdmin(request) ? Role.ADMIN : Role.AUDIENCE)
                .build();

        userRepository.save(user);
        log.info("New user registered: {}", user.getUsername());
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token);
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        return new AuthResponse(token);
    }
    
	private boolean isAdmin(RegisterRequest request) {
    	return request.getEmail().equals(admninEmail);
    }

}
