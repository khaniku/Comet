package com.comet.survey.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Data
@Entity
@Table(name = "site_asset")
public class SiteAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String description;

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int survey_sequence;

    @NotBlank
    private String assetType;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "survey_id", referencedColumnName = "id")
    private Survey survey;

    public SiteAsset() {

    }

    public SiteAsset(String description, String assetType){
        this.description = description;
        this.assetType = assetType;
    }

}
