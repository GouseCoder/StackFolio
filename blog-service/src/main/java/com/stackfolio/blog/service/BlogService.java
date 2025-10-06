package com.stackfolio.blog.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.stackfolio.blog.dto.BlogPostDto;
import com.stackfolio.blog.exception.ResourceNotFoundException;
import com.stackfolio.blog.model.BlogPost;
import com.stackfolio.blog.repository.BlogPostRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class BlogService {
	
	private final BlogPostRepository blogPostRepository;

	public BlogPostDto createBlogPost(BlogPostDto blogPostDto) {
		
		log.info("Creating a new blog post with title: {}", blogPostDto.getTitle());
		
		BlogPost blogPost = BlogPost.builder()
				.title(blogPostDto.getTitle())
				.content(blogPostDto.getContent())
				.createdAt(LocalDateTime.now())
				.updatedAt(LocalDateTime.now()).build();
		BlogPost saved = blogPostRepository.save(blogPost);
		blogPostDto.setId(saved.getId());
		blogPostDto.setCreatedAt(saved.getCreatedAt());
		blogPostDto.setUpdatedAt(saved.getUpdatedAt());
		return blogPostDto;
	}

	public BlogPostDto updateBlogPost(Long id, BlogPostDto blogPostDto) {
		
		log.info("Updating blog post with id: {}", id);
		
		BlogPost blogPost = blogPostRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));
		blogPost.setTitle(blogPostDto.getTitle());
		blogPost.setContent(blogPostDto.getContent());
		blogPost.setUpdatedAt(LocalDateTime.now());
		BlogPost updated = blogPostRepository.save(blogPost);
		blogPostDto.setUpdatedAt(updated.getUpdatedAt());
		return blogPostDto;
	}

	public void deleteBlogPost(Long id) {
		
		log.info("Deleting blog post with id: {}", id);
		
		BlogPost blogPost = blogPostRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));
		blogPostRepository.delete(blogPost);
	}

	public List<BlogPostDto> getAllBlogPosts() {
		return blogPostRepository.findAll().stream()
				.map(bp -> BlogPostDto.builder()
						.id(bp.getId())
						.title(bp.getTitle())
						.content(bp.getContent())
						.createdAt(bp.getCreatedAt())
						.updatedAt(bp.getUpdatedAt())
						.build())
				.collect(Collectors.toList());
	}

	public BlogPostDto getBlogPostById(Long id) {
		BlogPost bp = blogPostRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("BlogPost not found with id: " + id));
		return BlogPostDto.builder()
				.id(bp.getId())
				.title(bp.getTitle())
				.content(bp.getContent())
				.createdAt(bp.getCreatedAt())
				.updatedAt(bp.getUpdatedAt())
				.build();
	}

}
