package com.comet.survey.model;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.NaturalId;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@Entity
@Table(name = "survey")
public class Survey extends DateAudit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "requester_id", referencedColumnName = "id")
    private User requester;

    @JsonManagedReference
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "surveyor_id", referencedColumnName = "id")
    private User surveyor;

    @Temporal(TemporalType.DATE)
    private Date dueDate;

    @NotBlank
    private String customerName;

    @NotBlank
    private String siteAddress;

    public Survey() {

    }

    public Survey (String customerName, String siteAddress) {
        this.customerName = customerName;
        this.siteAddress = siteAddress;
    }

}
