package com.edutech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.edutech.model.Feedback;
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback,Long>  {
  
   //Write your logic here
}

