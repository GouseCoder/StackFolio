package com.stackfolio.blog.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.stackfolio.blog.dto.CommentDto;
import com.stackfolio.blog.exception.ResourceNotFoundException;
import com.stackfolio.blog.model.BlogPost;
import com.stackfolio.blog.model.Comment;
import com.stackfolio.blog.repository.BlogPostRepository;
import com.stackfolio.blog.repository.CommentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CommentService {
	
	private final CommentRepository commentRepository;
    private final BlogPostRepository blogPostRepository;
    
    public CommentDto addComment(Long blogPostId, CommentDto commentDto) {
    	log.info("Adding comment to blog post with id: {}", blogPostId);
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + blogPostId));

        Comment comment = Comment.builder()
                .author(commentDto.getAuthor())
                .message(commentDto.getMessage())
                .createdAt(LocalDateTime.now())
                .blogPost(blogPost)
                .build();

        Comment saved = commentRepository.save(comment);
        commentDto.setId(saved.getId());
        commentDto.setCreatedAt(saved.getCreatedAt());
        return commentDto;
    }

    public List<CommentDto> getCommentsForPost(Long blogPostId) {
        BlogPost blogPost = blogPostRepository.findById(blogPostId)
                .orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + blogPostId));

        return blogPost.getComments().stream()
                .map(c -> CommentDto.builder()
                        .id(c.getId())
                        .author(c.getAuthor())
                        .message(c.getMessage())
                        .createdAt(c.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }

}
