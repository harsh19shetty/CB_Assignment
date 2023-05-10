package com.harsh.cb.cbproject.Service;

import com.harsh.cb.cbproject.Model.Customer;
import java.util.List;
import java.time.LocalDate;


public interface CustomerService {

    Customer saveCustomer(String name, String email, String phone, String city, LocalDate dob);
    
    Customer createCustomer(Customer customer);

    List<Customer> getAllCustomers();

    Customer getCustomerById(Long id);

    Customer updateCustomer(Long id, Customer customer);
    
    void deleteCustomer(Long id);
}

