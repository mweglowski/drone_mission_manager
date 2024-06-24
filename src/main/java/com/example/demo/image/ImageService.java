package com.example.demo.image;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ImageService {
    @Value("${google.api.key}")
    private String apiKey;

    private static final String GOOGLE_STREET_VIEW_API_URL = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location={lat},{lon}&key={apiKey}";

    public byte[] getImages(double lat, double lon) {
        RestTemplate restTemplate = new RestTemplate();

        ResponseEntity<byte[]> response = restTemplate.getForEntity(GOOGLE_STREET_VIEW_API_URL, byte[].class, lat, lon, apiKey);

        return response.getBody();
    }
}
