package com.example.demo.auth;

public class AuthenticationResponse {
    private String token;

    // No-argument constructor
    public AuthenticationResponse() {}

    // All-argument constructor
    public AuthenticationResponse(String token) {
        this.token = token;
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

        public Builder() {}

        public Builder token(String token) {
            this.token = token;
            return this;
        }

        public AuthenticationResponse build() {
            return new AuthenticationResponse(this.token);
        }
    }

    // Static method to get a new Builder instance
    public static Builder builder() {
        return new Builder();
    }
}

