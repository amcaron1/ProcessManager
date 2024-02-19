package net.yorksolutions.resource;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;
import java.util.UUID;

@Entity
public class FinishedProcess {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty("processID")
    Long processID;

    @JsonProperty("token")
    UUID token;

    @JsonProperty("title")
    String title;

    public FinishedProcess() {
    }

//    @JsonCreator
    public FinishedProcess(UUID token, String title) {
        this.token = token;
        this.title = title;
    }

//    @JsonCreator
    public FinishedProcess(Long processID, UUID token, String title) {
        this.processID = processID;
        this.token = token;
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinishedProcess that = (FinishedProcess) o;
        return Objects.equals(processID, that.processID) && Objects.equals(token, that.token) && Objects.equals(title, that.title);
    }

    @Override
    public int hashCode() {
        return Objects.hash(processID, token, title);
    }

    @Override
    public String toString() {
        return "FinishedProcess{" +
                "processID=" + processID +
                ", token=" + token +
                ", title='" + title + '\'' +
                '}';
    }

    public void setProcessID(Long processID) {
        this.processID = processID;
    }

    public void setToken(UUID token) {
        this.token = token;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}