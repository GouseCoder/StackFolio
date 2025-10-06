package com.stackfolio.project.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.stackfolio.project.dto.ProjectRequest;
import com.stackfolio.project.dto.ProjectResponse;
import com.stackfolio.project.exception.ResourceNotFoundException;
import com.stackfolio.project.mapper.ProjectMapper;
import com.stackfolio.project.model.Project;
import com.stackfolio.project.repository.ProjectRepository;
import com.stackfolio.project.service.ProjectService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectService {
	
	 	private final ProjectRepository projectRepository;
	    private final ProjectMapper projectMapper;

	    @Override
	    public ProjectResponse createProject(ProjectRequest request) {
	    	log.info("Creating new project with title: {}", request.getTitle());
	        Project project = projectMapper.toEntity(request);
	        return projectMapper.toResponse(projectRepository.save(project));
	    }

	    @Override
	    public ProjectResponse updateProject(Long id, ProjectRequest request) {
	        Project project = projectRepository.findById(id)
	                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));

	        project.setTitle(request.getTitle());
	        project.setDescription(request.getDescription());
	        project.setTechnologies(request.getTechnologies());
	        project.setGithubUrl(request.getGithubUrl());
	        project.setLiveDemoUrl(request.getLiveDemoUrl());
	        project.setImageUrl(request.getImageUrl());

	        return projectMapper.toResponse(projectRepository.save(project));
	    }

	    @Override
	    public void deleteProject(Long id) {
	    	log.info("Deleting project with id: {}", id);
	        if (!projectRepository.existsById(id)) {
	            throw new ResourceNotFoundException("Project not found with id: " + id);
	        }
	        projectRepository.deleteById(id);
	    }

	    @Override
	    public ProjectResponse getProjectById(Long id) {
	        return projectRepository.findById(id)
	                .map(projectMapper::toResponse)
	                .orElseThrow(() -> new ResourceNotFoundException("Project not found with id: " + id));
	    }

	    @Override
	    public List<ProjectResponse> getAllProjects() {
	        return projectRepository.findAll().stream()
	                .map(projectMapper::toResponse)
	                .toList();
	    }

}
