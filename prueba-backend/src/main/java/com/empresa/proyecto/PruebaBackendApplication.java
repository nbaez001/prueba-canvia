package com.empresa.proyecto;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PruebaBackendApplication {

	private static final Logger log = LoggerFactory.getLogger(PruebaBackendApplication.class);

	public static void main(String[] args) {
		log.info("---------Start class Application---------");
		SpringApplication.run(PruebaBackendApplication.class, args);
	}

}
