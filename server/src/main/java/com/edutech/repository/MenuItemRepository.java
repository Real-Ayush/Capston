package com.edutech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem,Long> {
	
	 //Write your logic here
}

