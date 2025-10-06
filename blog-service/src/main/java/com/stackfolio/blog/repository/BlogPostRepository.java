package com.stackfolio.blog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackfolio.blog.model.BlogPost;

@Repository
public interface BlogPostRepository extends JpaRepository<BlogPost, Long> {

}
