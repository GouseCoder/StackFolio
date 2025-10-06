package com.stackfolio.blog.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
