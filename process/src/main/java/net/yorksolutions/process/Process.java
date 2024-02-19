package net.yorksolutions.process;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

@Entity
public class Process {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty("processID")
    Long processID;

    @JsonProperty("title")
    String title;

    @JsonProperty("stageOrder")
    String stageOrder;

    // Spring needs an empty constructor
    // It then sets title and stage order outside the constructor
    public Process() {
    }

//    @JsonCreator
    public Process(String title, String stageOrder) {
        this.title = title;
        this.stageOrder = stageOrder;
    }

//    @JsonCreator
    public Process(Long processID,String title, String stageOrder) {
        this.processID = processID;
        this.title = title;
        this.stageOrder = stageOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Process process = (Process) o;
        return Objects.equals(processID, process.processID) && Objects.equals(title, process.title) && Objects.equals(stageOrder, process.stageOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hash(processID, title, stageOrder);
    }

    @Override
    public String toString() {
        return "Process{" +
                "processID=" + processID +
                ", title='" + title + '\'' +
                ", stageOrder='" + stageOrder + '\'' +
                '}';
    }

    public void setProcessID(Long processID) {
        this.processID = processID;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStageOrder(String stageOrder) {
        this.stageOrder = stageOrder;
    }
}
