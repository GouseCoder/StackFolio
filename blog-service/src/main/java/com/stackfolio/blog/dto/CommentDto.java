package com.stackfolio.blog.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDto {
	
	private Long id;
    private String author;
    private String message;
    private LocalDateTime createdAt;

}
