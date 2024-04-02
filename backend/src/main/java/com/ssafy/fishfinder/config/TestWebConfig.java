package com.ssafy.fishfinder.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@Profile("test")
public class TestWebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(org.springframework.web.servlet.config.annotation.CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedOrigins("http://70.12.246.55:3000")
                .allowedOrigins("http://70.12.246.185:3000")
                .allowedOrigins("https://test.fishfinder.site")
                .allowedOrigins("http://test.fishfinder.site")
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
