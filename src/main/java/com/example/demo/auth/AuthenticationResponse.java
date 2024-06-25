package com.example.demo.auth;

import com.example.demo.user.Role;

public class AuthenticationResponse {
    private String token;
    private Long userId;
    private Role role;

    // No-argument constructor
    public AuthenticationResponse() {}

    // All-argument constructor
    public AuthenticationResponse(String token, Long userId, Role role) {
        this.token = token;
        this.userId = userId;
        this.role = role;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Setter for token
    public void setToken(String token) {
        this.token = token;
    }

    // toString method
    @Override
    public String toString() {
        return "AuthenticationResponse{" +
                "token='" + token + '\'' +
                '}';
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    // equals method
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthenticationResponse that = (AuthenticationResponse) o;

        return token != null ? token.equals(that.token) : that.token == null;
    }

    // hashCode method
    @Override
    public int hashCode() {
        return token != null ? token.hashCode() : 0;
    }

    // Builder class for AuthenticationResponse
    public static class Builder {
        private String token;
        private Long userId;
        private Role role;

        public Builder() {}

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public Builder userId(Long userId) {
            this.userId = userId;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;
            return this;
        }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(this.token, this.userId, this.role);
        }
    }

    // Static method to get a new Builder instance
    public static Builder builder() {
        return new Builder();
    }
}

