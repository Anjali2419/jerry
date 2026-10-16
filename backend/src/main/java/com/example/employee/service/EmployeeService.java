package com.example.employee.service;

import com.example.employee.entity.Employee;
import com.example.employee.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public Employee getById(Long id) {
        return repository.findById(id)
            .orElseThrow(() ->
                new IllegalArgumentException("Employee not found"));
    }

    public Employee create(Employee employee) {
        if (repository.existsByEmail(employee.getEmail())) {
            throw new IllegalArgumentException(
                "Email already exists");
        }

        return repository.save(employee);
    }

    public Employee update(Long id, Employee input) {
        Employee employee = getById(id);

        if (!employee.getEmail().equals(input.getEmail())
                && repository.existsByEmail(input.getEmail())) {
            throw new IllegalArgumentException(
                "Email already exists");
        }

        employee.setEmployeeName(input.getEmployeeName());
        employee.setEmail(input.getEmail());
        employee.setDepartment(input.getDepartment());
        employee.setSalary(input.getSalary());

        return repository.save(employee);
    }

    public void delete(Long id) {
        repository.delete(getById(id));
    }
}
