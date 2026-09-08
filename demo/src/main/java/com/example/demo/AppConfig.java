package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    Payment payment(){
     Payment p = new Payment();
     p.setProviderName("Paypal");
     return p;
    }

    @Bean
    String name(){
        return "anusha";
  }
}
