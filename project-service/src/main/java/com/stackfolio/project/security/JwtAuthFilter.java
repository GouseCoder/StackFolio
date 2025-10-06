package com.stackfolio.project.security;

import java.io.IOException;
import java.security.Key;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
		
	private final String jwtSecret = "my-very-secure-and-long-secret-key-123456";
	
	private final Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key).build()
                        .parseClaimsJws(token).getBody();

                String username = claims.getSubject();
                String role = claims.get("role", String.class);

				var authorities = role == null ? List.<SimpleGrantedAuthority>of()
						: List.of(new SimpleGrantedAuthority("ROLE_" + role));

                var auth = new UsernamePasswordAuthenticationToken(username, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } catch (Exception e) {
                log.error("JWT token validation failed: {}", e.getMessage());
            }
        }
        
        filterChain.doFilter(request, response);
    }

}
