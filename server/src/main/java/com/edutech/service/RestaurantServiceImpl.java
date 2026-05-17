package com.edutech.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.edutech.dto.AssignManagerRequest;
import com.edutech.model.Restaurant;
import com.edutech.model.User;
import com.edutech.repository.RestaurantRepository;
import com.edutech.repository.UserRepository;

import exception.ResourceNotFoundException;

@Service
public class RestaurantServiceImpl implements RestaurantService{
	@Autowired
	private RestaurantRepository restaurantRepository;

	@Autowired
	private UserRepository userRepository;

	@Override
	public Restaurant createRestaurant(Restaurant restaurant) {
		return restaurantRepository.save(restaurant);
	}

	@Override
	public List<Restaurant> getAllRestaurants() {
		return restaurantRepository.findAll();
	}
	@Override
	public Optional<Restaurant> getRestaurantById(Long id) {
		return restaurantRepository.findById(id);
	}

	@Override
	public Restaurant updateRestaurant(long id, Restaurant restaurant) {
		Restaurant r = restaurantRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Restaurant not found"));
		r.setAddress(restaurant.getAddress());
		r.setEmail(restaurant.getEmail());
		r.setLocation(restaurant.getLocation());
		r.setManager(restaurant.getManager());
		r.setName(restaurant.getName());
		r.setPhNumber(restaurant.getPhNumber());

		return restaurantRepository.save(r);

	}

	@Override
	public void deleteRestaurant(long id) {
		restaurantRepository.deleteById(id);
	}

	public Restaurant assignManager(AssignManagerRequest request) {

		Restaurant restaurant = restaurantRepository.findById(request.getRestaurantId())
				.orElseThrow(() -> new RuntimeException("Restaurant not found with id: " + request.getRestaurantId()));

		User manager = userRepository.findById(request.getUser())
				.orElseThrow(() -> new RuntimeException(
						"User not found with id: " + request.getUser()));

		restaurant.setManager(manager);

		return restaurantRepository.save(restaurant);
	}
}
