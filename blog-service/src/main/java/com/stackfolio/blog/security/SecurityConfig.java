package com.stackfolio.blog.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.stackfolio.blog.constant.Role;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
	
	private final JwtAuthFilter jwtAuthenticationFilter;

    @Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(auth -> auth
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

}
