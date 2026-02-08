package az.developia.student_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class StudentRequestDto {
	@NotBlank(message = "Ad bos ola bilmez")
	private String name;

	@NotBlank(message = "Soyad bos ola bilmez")
	private String surname;

	@Email(message = "Email duzgun formatda deyil")
	private String email;

	@Min(value = 18, message = "Yas 18-den kicik ola bilmez")
	private Integer age;

}
