package com.stackfolio.blog.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stackfolio.blog.dto.BlogPostDto;
import com.stackfolio.blog.service.BlogService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs")
@RequiredArgsConstructor
public class BlogController {
	
	private final BlogService blogService;

    @PostMapping
    public ResponseEntity<BlogPostDto> createBlog(@RequestBody BlogPostDto blogPostDto) {
        return new ResponseEntity<>(blogService.createBlogPost(blogPostDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogPostDto> updateBlog(@PathVariable Long id, @RequestBody BlogPostDto blogPostDto) {
        return ResponseEntity.ok(blogService.updateBlogPost(id, blogPostDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlogPost(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<BlogPostDto>> getAllBlogs() {
        return ResponseEntity.ok(blogService.getAllBlogPosts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogPostDto> getBlog(@PathVariable Long id) {
        return ResponseEntity.ok(blogService.getBlogPostById(id));
    }
    
    @PostMapping("/upload-image")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("upload") MultipartFile file) {
        try {
            String originalName = file.getOriginalFilename(); // e.g., "CodeKami Logo.png"
            String extension = "";

            int i = originalName.lastIndexOf('.');
            if (i >= 0) extension = originalName.substring(i); // ".png"

            String safeName = originalName.substring(0, i).replaceAll("\\s+", "_");

            String filename = UUID.randomUUID() + "_" + safeName + extension;

            Path uploadPath = Paths.get("uploads/images");
            if (!Files.exists(uploadPath)) Files.createDirectories(uploadPath);

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "http://localhost:8082/images/" + filename;

            Map<String, String> response = new HashMap<>();
            response.put("url", fileUrl);
            return ResponseEntity.ok(response);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    

}
