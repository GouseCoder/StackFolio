package com.stackfolio.project.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
	
	private Long id;
    private String title;
    private String description;
    private List<String> technologies;
    private String githubUrl;
    private String liveDemoUrl;
    private String imageUrl;

}
