package az.developia.student_management.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import az.developia.student_management.dto.AuthRequest;
import az.developia.student_management.dto.AuthResponse;
import az.developia.student_management.dto.TokenRequest;
import az.developia.student_management.service.UserDetailsServiceImpl;
import az.developia.student_management.utils.JwtUtil;
import az.developia.student_management.utils.RefreshTokenUtil;

@RestController
@RequestMapping(path = "/apis")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	private RefreshTokenUtil refreshTokenUtil;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));
		} catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}

		final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getUsername());
		final String jwt = jwtUtil.generateToken(userDetails);
		final String refreshToken = refreshTokenUtil.generateRefreshToken(userDetails);

		return ResponseEntity.ok(new AuthResponse(jwt, refreshToken));
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<?> refreshToken(@RequestBody TokenRequest tokenRequest) {
		String refreshToken = tokenRequest.getRefreshToken();

		String username = refreshTokenUtil.extractUsername(refreshToken);
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);

		if (refreshTokenUtil.validateToken(refreshToken, userDetails)) {
			final String newAccessToken = jwtUtil.generateToken(userDetails);
			return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken)); // Keep the same refresh token
		} else {
			return ResponseEntity.status(403).body("Invalid refresh token");
		}
	}

	@GetMapping("/add")
	@PreAuthorize(value = "hasAuthority('ROLE_ADD')")
	public String addData() {
		return "add success";
	}

	@GetMapping("/get")
	@PreAuthorize(value = "hasAuthority('ROLE_GET')")
	public String getData() {
		return "get success";
	}

	@GetMapping("/update")
	@PreAuthorize(value = "hasAuthority('ROLE_UPDATE')")
	public String updateData() {
		return "update success";
	}

	@GetMapping("/delete")
	@PreAuthorize(value = "hasAuthority('ROLE_DELETE')")
	public String deleteData() {
		return "delete success";
	}

}