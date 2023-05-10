package com.harsh.cb.cbproject.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.harsh.cb.cbproject.Model.Customer;

@Repository
public interface CustomerRepo extends JpaRepository<Customer, Long> {

}
