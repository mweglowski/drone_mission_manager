package com.example.demo.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    // process each http request to check JWT and authenticate user if token is valid
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // get header from request
        final String authHeader = request.getHeader("Authorization");
        // initialize token and userEmail
        final String jwt;
        final String userEmail;

        // if header is not null || header does not start with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            // pass request to next filter in the chain without further processing
            filterChain.doFilter(request, response);
            return;
        }
        // else extract token from header
        jwt = authHeader.substring(7);
        // and then extract userEmail from token
        userEmail = jwtService.extractUsername(jwt);

        // if userEmail is set && user is not authenticated yet in security context
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // loading userDetails by username using userDetailsService
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            // check token validity
            if (jwtService.isTokenValid(jwt, userDetails)) {
                // if token is valid -> create UsernamePasswordAuthenticationToken with user details and authorities
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

                // token details are set with info from the request
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // update security context with new authentication token
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // pass request down to the filter chain
        filterChain.doFilter(request, response);
    }
}
