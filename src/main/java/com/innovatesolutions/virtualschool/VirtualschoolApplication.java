package com.innovatesolutions.virtualschool;

import com.innovatesolutions.virtualschool.entity.Address;
import com.innovatesolutions.virtualschool.entity.Student;
import com.innovatesolutions.virtualschool.enums.Gender;
import com.innovatesolutions.virtualschool.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@SpringBootApplication
public class VirtualschoolApplication {

	public static void main(String[] args) {
		SpringApplication.run(VirtualschoolApplication.class, args);
	}
	@Bean
	CommandLineRunner runner(StudentRepository repository){
		return args -> {
			Address address=new Address(
					"Sri Lanka",
					"001",
					"Nittambuwa"
			);
			Student student=new Student(
					"204164N",
					"Chinthana",
					"Prabhashitha",
					"Chinthana Prabhashitha Rajapaksha",
					"0711700404",
					"1999/08/25",
					"rachinthanarajapaksha@gmail.com",
					Gender.MALE,
					address
			);
			repository.insert(student);

		};
	}
}
