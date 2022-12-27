package com.playground.demo.component;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class Company {
    private final String companyName;
    private final String companyLocation;

    public Company(String companyName, String companyLocation) {
        this.companyName = companyName;
        this.companyLocation = companyLocation;
    }
}
