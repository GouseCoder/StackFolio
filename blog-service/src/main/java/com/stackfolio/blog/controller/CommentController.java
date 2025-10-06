package com.stackfolio.blog.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackfolio.blog.dto.CommentDto;
import com.stackfolio.blog.service.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/blogs/{blogId}/comments")
@RequiredArgsConstructor
public class CommentController {
	
	private final CommentService commentService;

    @PostMapping
    public ResponseEntity<CommentDto> addComment(@PathVariable Long blogId, @RequestBody CommentDto commentDto) {
        return new ResponseEntity<>(commentService.addComment(blogId, commentDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Long blogId) {
        return ResponseEntity.ok(commentService.getCommentsForPost(blogId));
    }

}
