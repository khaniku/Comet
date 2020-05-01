package com.comet.survey.model;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

//@Data
@Entity
@Table(name = "survey")
public class Survey extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@JsonManagedReference(value = "requester")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "requester_id", referencedColumnName = "id")
    private User requester;

    //@JsonManagedReference(value = "surveyor")
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "surveyor_id", referencedColumnName = "id")
    private User surveyor;

    @JsonBackReference(value = "assets")
    @OneToMany(fetch = FetchType.LAZY,
            cascade =  CascadeType.ALL,
            mappedBy = "survey")
    private Set<SiteAsset> siteAsset;

    @JsonFormat(pattern="dd MMMM yyyy")
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @NotBlank
    private String customerName;

    @NotBlank
    private String siteAddress;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "survey_status_id", referencedColumnName = "id")
    private SurveyStatus surveyStatus;

    public Survey() {

    }

    public Survey (String customerName, String siteAddress, Date dueDate) {
        this.customerName = customerName;
        this.siteAddress = siteAddress;
        this.dueDate = dueDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public User getSurveyor() {
        return surveyor;
    }

    public void setSurveyor(User surveyor) {
        this.surveyor = surveyor;
    }

    public Set<SiteAsset> getSiteAsset() {
        return siteAsset;
    }

    public void setSiteAsset(Set<SiteAsset> siteAsset) {
        this.siteAsset = siteAsset;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSiteAddress() {
        return siteAddress;
    }

    public void setSiteAddress(String siteAddress) {
        this.siteAddress = siteAddress;
    }

    public SurveyStatus getSurveyStatus() {
        return surveyStatus;
    }

    public void setSurveyStatus(SurveyStatus surveyStatus) {
        this.surveyStatus = surveyStatus;
    }
}
