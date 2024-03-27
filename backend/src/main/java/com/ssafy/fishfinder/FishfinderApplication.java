package com.ssafy.fishfinder;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.ssafy.fishfinder.repository.mysql")
@EnableMongoRepositories(basePackages = "com.ssafy.fishfinder.repository.mongo")
@EnableScheduling
public class FishfinderApplication {

	public static void main(String[] args) {
		SpringApplication.run(FishfinderApplication.class, args);
	}

}
