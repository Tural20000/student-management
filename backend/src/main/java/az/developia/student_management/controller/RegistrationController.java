package az.developia.student_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import az.developia.student_management.dto.AuthRequest;
import az.developia.student_management.entity.RoleEntity;
import az.developia.student_management.entity.UserEntity;
import az.developia.student_management.repository.RoleRepository;
import az.developia.student_management.repository.UserRepository;

@RestController
public class RegistrationController {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@PostMapping("/reg-user")
	public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
		if (userRepository.findByUsername(authRequest.getUsername()).isPresent()) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bu istifadəçi adı artıq mövcuddur");
		}

		UserEntity user = new UserEntity();
		user.setUsername(authRequest.getUsername());
		user.setPassword(passwordEncoder.encode(authRequest.getPassword()));

		java.util.Set<RoleEntity> roles = new java.util.HashSet<>(roleRepository.findAll());
		user.setRoles(roles);

		userRepository.save(user);
		return ResponseEntity.status(HttpStatus.CREATED).body("Qeydiyyat uğurla tamamlandı");
	}
}
