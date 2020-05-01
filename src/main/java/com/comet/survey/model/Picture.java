package com.comet.survey.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

//@Data
@Entity
@Table(name = "picture")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fileLocation;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    private SiteAsset pictureAsset;

    public Picture () {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileLocation() {
        return fileLocation;
    }

    public void setFileLocation(String fileLocation) {
        this.fileLocation = fileLocation;
    }

    public SiteAsset getPictureAsset() {
        return pictureAsset;
    }

    public void setPictureAsset(SiteAsset pictureAsset) {
        this.pictureAsset = pictureAsset;
    }
}
