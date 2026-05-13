package com.edutech.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "restaurant_manager_assignment")
public class RestaurantManagerAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assignedBy;

    private LocalDateTime assignedAt;

    // Many assignments → One Restaurant
    @ManyToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    private Restaurant restaurant;

    // Many assignments → One User (manager)
    @ManyToOne
    @JoinColumn(name = "manager_id", nullable = false)
    private User manager;

    // Constructors
    public RestaurantManagerAssignment() {}

    public RestaurantManagerAssignment(Restaurant restaurant, User manager, Long assignedBy, LocalDateTime assignedAt) {
        this.restaurant = restaurant;
        this.manager = manager;
        this.assignedBy = assignedBy;
        this.assignedAt = assignedAt;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public Restaurant getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurant restaurant) {
        this.restaurant = restaurant;
    }

    public User getManager() {
        return manager;
    }

    public void setManager(User manager) {
        this.manager = manager;
    }

    public Long getAssignedBy() {
        return assignedBy;
    }

    public void setAssignedBy(Long assignedBy) {
        this.assignedBy = assignedBy;
    }

    public LocalDateTime getAssignedAt() {
        return assignedAt;
    }

    public void setAssignedAt(LocalDateTime assignedAt) {
        this.assignedAt = assignedAt;
    }
}
