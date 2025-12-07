package com.stackfolio.project.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthenticationFilter;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
	    http.csrf(csrf -> csrf.disable())
	        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
	        .authorizeHttpRequests(auth -> auth
	            // Admin endpoints
	            .requestMatchers(HttpMethod.POST, "/api/projects/**").hasRole("ADMIN")
	            .requestMatchers(HttpMethod.PUT, "/api/projects/**").hasRole("ADMIN")
	            .requestMatchers(HttpMethod.DELETE, "/api/projects/**").hasRole("ADMIN")
	            // GET single project requires authentication
	            .requestMatchers(HttpMethod.GET, "/api/projects/*").authenticated()
	            // GET all projects is public
	            .requestMatchers(HttpMethod.GET, "/api/projects").permitAll()
	            // Any other requests require authentication
	            .anyRequest().authenticated()
	        )
	        .addFilterBefore(jwtAuthenticationFilter, 
	            UsernamePasswordAuthenticationFilter.class);
	    
	    return http.build();
	}
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
    	CorsConfiguration configuration = new CorsConfiguration();

    	configuration.setAllowedOriginPatterns(List.of("*"));
    	configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    	configuration.setAllowedHeaders(List.of("*"));
    	configuration.setAllowCredentials(true);

    	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    	source.registerCorsConfiguration("/**", configuration);

    	return source;
	}



}
