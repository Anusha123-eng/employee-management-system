package com.example.ems_backend.service;
import com.example.ems_backend.dto.EmployeeDto;
import com.example.ems_backend.entity.Employee;
import com.example.ems_backend.exception.ResourceNotFoundException;
import com.example.ems_backend.mapper.EmployeeMapper;
import com.example.ems_backend.repository.EmployeeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class EmployeeServiceImp implements EmployeeService {
    private EmployeeRepository employeeRepository;
    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Convert DTO to Entity
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        // Save Entity in Database
        Employee savedEmployee = employeeRepository.save(employee);
        // Convert Entity to DTO and return it
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        // Find employee by ID
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee does not exist with given id : " + employeeId));
        // Convert Entity to DTO and return it
        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee  employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: "+ employeeId)
        );
        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObject = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObject);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee  employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: "+ employeeId)
        );

        employeeRepository.deleteById(employeeId);

    }

}

