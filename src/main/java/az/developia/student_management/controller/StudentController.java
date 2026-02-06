package az.developia.student_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import az.developia.student_management.dto.StudentRequestDto;
import az.developia.student_management.dto.StudentResponseDto;
import az.developia.student_management.exception.MyValidationException;
import az.developia.student_management.service.StudentService;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/api/students")
public class StudentController {
	@Autowired
	private StudentService service;

	@GetMapping
	public List<StudentResponseDto> getAllStudents() {
		return service.getAllStudents();
	}

	@PostMapping
	@ResponseStatus(code = HttpStatus.CREATED)
	public StudentResponseDto createStudent(@Valid @RequestBody StudentRequestDto request, BindingResult br) {
		if (br.hasErrors()) {
			throw new MyValidationException(br);
		}
		return service.createStudent(request);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void deleteStudent(@PathVariable Long id) {
		service.deleteStudentById(id);

	}

	@GetMapping("/{id}")
	public StudentResponseDto getStudentById(@PathVariable Long id) {
		return service.getStudentById(id);
	}

	@PutMapping("/{id}")
	public StudentResponseDto updateStudent(@PathVariable Long id, @Valid @RequestBody StudentRequestDto request,
			BindingResult br) {
		if (br.hasErrors()) {
			throw new MyValidationException(br);
		}

		return service.updateStudent(id, request);

	}

}
