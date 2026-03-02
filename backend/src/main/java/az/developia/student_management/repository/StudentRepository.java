package az.developia.student_management.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import az.developia.student_management.entity.Student;

public interface StudentRepository extends JpaRepository<Student, Long> {

}
