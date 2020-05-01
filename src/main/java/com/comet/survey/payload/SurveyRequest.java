package com.comet.survey.payload;

import com.comet.survey.model.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.*;
import java.util.Date;

//@Data
public class SurveyRequest {

    @NotNull(message = "Please choose a surveyor")
    private long surveyor;

    @NotNull
    @Size(min = 1, max = 80)
    private String customerName;

    @NotNull
    @Size(min = 1, max = 100)
    private String siteAddress;

    @JsonFormat(pattern="dd MMMM yyyy")
    @Temporal(TemporalType.DATE)
    private Date dueDate;

    public long getSurveyor() {
        return surveyor;
    }

    public void setSurveyor(long surveyor) {
        this.surveyor = surveyor;
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
}