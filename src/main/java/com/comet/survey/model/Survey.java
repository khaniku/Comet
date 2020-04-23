package com.comet.survey.model;
import com.fasterxml.jackson.annotation.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.Set;

@Data
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

    public Survey() {

    }

    public Survey (String customerName, String siteAddress, Date dueDate) {
        this.customerName = customerName;
        this.siteAddress = siteAddress;
        this.dueDate = dueDate;
    }

}
