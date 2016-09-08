package com.krishna.dao;

import java.util.List;

import com.krishna.model.User;

public interface UserDao {

	public User findById(Integer id);

	List<User> findAll();

	void save(User user);

	void update(User user);

	void delete(Integer id);

}