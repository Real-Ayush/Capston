package com.edutech.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.edutech.model.Order;

public interface OrderRepository extends JpaRepository<Order,Long> {
     //Write your logic here

}
