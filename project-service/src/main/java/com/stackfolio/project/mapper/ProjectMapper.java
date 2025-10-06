package com.stackfolio.project.mapper;

import org.mapstruct.Mapper;

import com.stackfolio.project.dto.ProjectRequest;
import com.stackfolio.project.dto.ProjectResponse;
import com.stackfolio.project.model.Project;

@Mapper(componentModel = "spring")
public interface ProjectMapper {
	
	Project toEntity(ProjectRequest request);
    ProjectResponse toResponse(Project project);

}
