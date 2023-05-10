package com.harsh.cb.cbproject.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.harsh.cb.cbproject.Model.Customer;
import com.harsh.cb.cbproject.Repository.CustomerRepo;

@Service
public class CustomerServiceMain implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    // Function to calculate age from date of birth
    public int calculateAge(LocalDate dob) {
        LocalDate today = LocalDate.now();
        int age = today.getYear() - dob.getYear();
        if (today.getDayOfYear() < dob.getDayOfYear()) {
            age--;
        }
        return age;
    }

    // Save customer with calculated age
    public Customer saveCustomer(String name, String email, String phone, String city, LocalDate dob) {
        Customer customer = new Customer(name, email, phone, city, dob);
        return customerRepo.save(customer);
    }

    // Get all customers
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    // Get customer by id
    public Customer getCustomerById(Long id) {
        Optional<Customer> customer = customerRepo.findById(id);
        return customer.orElseThrow(() -> new RuntimeException("Customer not found with id : " + id));
    }

    // Update customer by id
    public Customer updateCustomer(Long id, Customer customer) {
        Optional<Customer> existingCustomer = customerRepo.findById(id);
        if (existingCustomer.isPresent()) {
            Customer updatedCustomer = existingCustomer.get();
            updatedCustomer.setName(customer.getName());
            updatedCustomer.setEmail(customer.getEmail());
            updatedCustomer.setPhone(customer.getPhone());
            updatedCustomer.setCity(customer.getCity());
            updatedCustomer.setDob(customer.getDob());
            return customerRepo.save(updatedCustomer);
        } else {
            throw new RuntimeException("Customer not found with id : " + id);
        }
    }

    // Delete customer by id
    public void deleteCustomer(Long id) {
        Optional<Customer> customer = customerRepo.findById(id);
        if (customer.isPresent()) {
            customerRepo.delete(customer.get());
        } else {
            throw new RuntimeException("Customer not found with id : " + id);
        }
    }

	@Override
	public Customer createCustomer(Customer customer) {
		return null;
	}
}
