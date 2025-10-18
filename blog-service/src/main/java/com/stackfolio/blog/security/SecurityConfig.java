package com.stackfolio.blog.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.stackfolio.blog.constant.Role;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthenticationFilter;

    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.authorizeHttpRequests(auth -> auth
						// Admin endpoints
						.requestMatchers(HttpMethod.POST, "/api/blogs/").hasRole(String.valueOf(Role.ADMIN))
						.requestMatchers(HttpMethod.PUT, "/api/blogs/*").hasRole(String.valueOf(Role.ADMIN))
						.requestMatchers(HttpMethod.DELETE, "/api/blogs/*").hasRole(String.valueOf(Role.ADMIN))
						// Audience endpoint
						.requestMatchers(HttpMethod.POST, "/api/blogs/*/comments")
						.hasAnyRole(String.valueOf(Role.ADMIN), String.valueOf(Role.AUDIENCE))
						// Anyone authenticated can read
						.requestMatchers(HttpMethod.GET, "/api/blogs/**").authenticated().anyRequest().authenticated())
				.addFilterBefore(jwtAuthenticationFilter,
						org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}
    
    @Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    CorsConfiguration configuration = new CorsConfiguration();
	    
	    // Allowed origins (frontend URL(s))
	    configuration.setAllowedOrigins(List.of("localhost:3000", "http://localhost:3000"));
	    // Allowed HTTP methods
	    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    // Allowed headers
	    configuration.setAllowedHeaders(List.of("*"));
	    // Allow credentials (cookies / auth headers)
	    configuration.setAllowCredentials(true);

	    // Apply to all endpoints
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", configuration);
	    
	    return source;
	}

}
