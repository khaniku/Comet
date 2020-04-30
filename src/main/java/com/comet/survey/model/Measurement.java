package com.comet.survey.model;

import com.fasterxml.jackson.annotation.*;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Data
public class Measurement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String description;

    private long value;

    //@JsonManagedReference(value = "measurements")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "asset_id", referencedColumnName = "id")
    private SiteAsset asset;

    public Measurement() {

    }

    public Measurement(String description) {
        this.description = description;
    }

//    @JsonIgnore
//    public SiteAsset getAsset() {
//        return asset;
//    }
//
//    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
//    public void setAsset(SiteAsset asset) {
//        this.asset = asset;
//    }
}
