package com.comet.survey.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Set;

@Data
@Entity
@Table(name = "survey_status")
public class SurveyStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    @NotBlank
    private SurveyStatusName name;

    @JsonBackReference(value = "surveyStatus")
    @OneToMany(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "surveyStatus")
    private Set<Survey> surveys;

    public SurveyStatus() {}

    public SurveyStatus(SurveyStatusName name) {
        this.name = name;
    }

}
