package com.comet.survey.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

//@Data
@Entity
@Table(name = "site_asset")
public class SiteAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String description;

    @NotBlank
    private String assetType;

    //@JsonManagedReference(value = "assets")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "survey_id", referencedColumnName = "id")
    private Survey survey;

    @JsonBackReference(value = "measurements")
    @OneToMany(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "asset")
    private Set<Measurement> measurements;

    @JsonBackReference(value = "pictures")
    @OneToMany(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "pictureAsset")
    private Set<Picture> pictures;

    public SiteAsset() {

    }

    public SiteAsset(String description, String assetType){
        this.description = description;
        this.assetType = assetType;
    }

    @JsonIgnore
    public Survey getSurvey() {
        return survey;
    }

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    public void setSurvey(Survey survey) {
        this.survey = survey;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAssetType() {
        return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public Set<Measurement> getMeasurements() {
        return measurements;
    }

    public void setMeasurements(Set<Measurement> measurements) {
        this.measurements = measurements;
    }

    public Set<Picture> getPictures() {
        return pictures;
    }

    public void setPictures(Set<Picture> pictures) {
        this.pictures = pictures;
    }
}
