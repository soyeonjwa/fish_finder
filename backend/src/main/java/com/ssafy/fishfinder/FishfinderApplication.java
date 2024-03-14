package com.ssafy.fishfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class FishfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(FishfinderApplication.class, args);
	}

}
