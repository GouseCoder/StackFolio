package com.stackfolio.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stackfolio.project.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
