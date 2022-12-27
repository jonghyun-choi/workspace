package com.playground.demo.component;

import jakarta.annotation.PostConstruct;

public class Company {
    private final String companyName;
    private final String companyLocation;

    public Company(String companyName, String companyLocation) {
        this.companyName = companyName;
        this.companyLocation = companyLocation;
    }

    @PostConstruct
    private void postConstruct() {
        System.out.println("companyName >>> :" + companyName);
    }
}
