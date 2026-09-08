package com.example.demo;

import org.springframework.stereotype.Component;

@Component
public class Payment {

private String providerName;

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String printHello(){
        return "hello..";
    }
}
