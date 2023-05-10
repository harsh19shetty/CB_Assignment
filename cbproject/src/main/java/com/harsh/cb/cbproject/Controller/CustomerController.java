package com.harsh.cb.cbproject.Controller;

import com.harsh.cb.cbproject.Model.Customer;
import com.harsh.cb.cbproject.Repository.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CustomerController {

    @Autowired
    private CustomerRepo customerRepo;

    @GetMapping("/")
    public String getPage() {
        return "Welcome";
    }

    @GetMapping("/customers")
    public List<Customer> getAllCustomers() {
        return customerRepo.findAll();
    }

    // @PostMapping("/add")
    // public Customer addCustomer(@RequestBody Customer customer) {
    //     return customerService.addCustomer(customer);
    // }
}
