package com.stackfolio.project.service;

import java.util.List;

import com.stackfolio.project.dto.ProjectRequest;
import com.stackfolio.project.dto.ProjectResponse;

public interface ProjectService {
	
	ProjectResponse createProject(ProjectRequest request);
    ProjectResponse updateProject(Long id, ProjectRequest request);
    void deleteProject(Long id);
    ProjectResponse getProjectById(Long id);
    List<ProjectResponse> getAllProjects();

}
