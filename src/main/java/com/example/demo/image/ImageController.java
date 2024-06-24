package com.example.demo.image;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<byte[]> getImages(@RequestParam double lat, @RequestParam double lon) {
        byte[] image = imageService.getImages(lat, lon);
        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
    }
}
