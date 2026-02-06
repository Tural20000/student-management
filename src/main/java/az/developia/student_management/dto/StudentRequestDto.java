package az.developia.student_management.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
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

	@NotBlank(message = "Yas bos ola bilmez")
	@Pattern(regexp = "1[8-9]|[2-9][0-9]", message = "Yas minimum 18 olmalidir")
	private String age;

}
