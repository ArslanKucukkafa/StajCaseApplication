package com.example.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FilterDto {
    private String patient_firstname;
    private String patient_lastname;
    private String patient_identity_no;
    private String laborantAd;
    private String laborantSoyad;

}
