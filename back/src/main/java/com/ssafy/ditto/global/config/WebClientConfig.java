package com.ssafy.ditto.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Value("${ai.base.url}")
    public String AI_BASE_URL;

    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                        .baseUrl(AI_BASE_URL)
                        .build();
    }
}