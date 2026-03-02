package az.developia.student_management.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import az.developia.student_management.dto.StudentRequestDto;
import az.developia.student_management.dto.StudentResponseDto;
import az.developia.student_management.entity.Student;
import az.developia.student_management.exception.StudentNotFoundException;
import az.developia.student_management.repository.StudentRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StudentService {
	@Autowired
	private StudentRepository repository;

	public List<StudentResponseDto> getAllStudents() {
		List<Student> students = repository.findAll();
		List<StudentResponseDto> dtos = new ArrayList<>();

		for (Student s : students) {
			StudentResponseDto dto = new StudentResponseDto();
			dto.setId(s.getId());
			dto.setName(s.getName());
			dto.setAge(s.getAge());
			dto.setSurname(s.getSurname());
			dto.setEmail(s.getEmail());
			dto.setCreated_at(s.getCreated_at());

			dtos.add(dto);

		}
		return dtos;

	}

	public StudentResponseDto createStudent(StudentRequestDto request) {
		Student student = new Student();
		student.setName(request.getName());
		student.setSurname(request.getSurname());
		student.setAge(request.getAge());
		student.setEmail(request.getEmail());
		Student savedStudent = repository.save(student);
		StudentResponseDto response = new StudentResponseDto();
		response.setId(savedStudent.getId());
		response.setName(savedStudent.getName());
		response.setSurname(savedStudent.getSurname());
		response.setAge(savedStudent.getAge());
		response.setEmail(savedStudent.getEmail());

		return response;

	}

	public void deleteStudentById(Long id) {
		if (!repository.existsById(id)) {
			throw new StudentNotFoundException("Bu ID-li student tapilmadi:ID = " + id);
		}
		repository.deleteById(id);
	}

	@Cacheable(value = "users", key = "#id")
	public StudentResponseDto getStudentById(Long id) {
		log.info("DB-dən tələbə gətirilir: ID {}", id);
		Student student = repository.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("Bu ID-li telebe tapilmadi:ID = " + id));
		StudentResponseDto dto = new StudentResponseDto();
		dto.setId(student.getId());
		dto.setName(student.getName());
		dto.setSurname(student.getSurname());
		dto.setAge(student.getAge());
		dto.setEmail(student.getEmail());

		return dto;
	}

	public StudentResponseDto updateStudent(Long id, StudentRequestDto request) {
		Student student = repository.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("Bu ID-li telebe tapilmadi: ID = " + id));
		student.setName(request.getName());
		student.setSurname(request.getSurname());
		student.setEmail(request.getEmail());
		student.setAge(request.getAge());
		Student updateStudent = repository.save(student);
		StudentResponseDto dto = new StudentResponseDto();
		dto.setId(updateStudent.getId());
		dto.setName(updateStudent.getName());
		dto.setSurname(updateStudent.getSurname());
		dto.setEmail(updateStudent.getEmail());
		dto.setAge(updateStudent.getAge());

		return dto;
	}

}