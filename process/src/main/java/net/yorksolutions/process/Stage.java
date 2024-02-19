package net.yorksolutions.process;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Objects;

@Entity
public class Stage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty("stageID")
    Long stageID;

    @JsonProperty("processID")
    Long processID;

    @JsonProperty("stageOrder")
    Integer stageOrder;

    @JsonProperty("stageType")
    String stageType;

    @JsonProperty("question")
    String question;

    @JsonProperty("mcOption1")
    String mcOption1;

    @JsonProperty("mcOption2")
    String mcOption2;

    @JsonProperty("mcOption3")
    String mcOption3;


    public Stage() {
    }

    @JsonCreator
    public Stage(@JsonProperty("stageID") Long stageID, @JsonProperty("processID") Long processID, @JsonProperty("stageOrder") Integer stageOrder,
                 @JsonProperty("stageType") String stageType, @JsonProperty("question") String question,
                 @JsonProperty("mcOption1") String mcOption1, @JsonProperty("mcOption2") String mcOption2,
                 @JsonProperty("mcOption3") String mcOption3) {
        this.stageID = stageID;
        this.processID = processID;
        this.stageOrder = stageOrder;
        this.stageType = stageType;
        this.question = question;
        this. mcOption1 = mcOption1;
        this. mcOption2 = mcOption2;
        this. mcOption3 = mcOption3;
    }

//    @JsonCreator
//    public Stage(Long stageID,Long processID, Integer stageOrder, String stageType,
//                 String question, String mcOption1, String mcOption2, String mcOption3) {
//        this.stageID = stageID;
//        this.processID = processID;
//        this.stageOrder = stageOrder;
//        this.stageType = stageType;
//        this.question = question;
//        this. mcOption1 = mcOption1;
//        this. mcOption2 = mcOption2;
//        this. mcOption3 = mcOption3;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Stage stage = (Stage) o;
        return Objects.equals(stageID, stage.stageID) && Objects.equals(processID, stage.processID) && Objects.equals(stageOrder, stage.stageOrder) && Objects.equals(stageType, stage.stageType) && Objects.equals(question, stage.question) && Objects.equals(mcOption1, stage.mcOption1) && Objects.equals(mcOption2, stage.mcOption2) && Objects.equals(mcOption3, stage.mcOption3);
    }

    @Override
    public int hashCode() {
        return Objects.hash(stageID, processID, stageOrder, stageType, question, mcOption1, mcOption2, mcOption3);
    }

    @Override
    public String toString() {
        return "Stage{" +
                "stageID=" + stageID +
                ", processID=" + processID +
                ", stageOrder=" + stageOrder +
                ", stageType='" + stageType + '\'' +
                ", question='" + question + '\'' +
                ", mcOption1='" + mcOption1 + '\'' +
                ", mcOption2='" + mcOption2 + '\'' +
                ", mcOption3='" + mcOption3 + '\'' +
                '}';
    }

    public void setStageID(Long stageID) {
        this.stageID = stageID;
    }

    public void setProcessID(Long processID) {
        this.processID = processID;
    }

    public void setstageOrder(Integer stageOrder) {this.stageOrder = stageOrder;}

    public void setStageType(String stageType) {
        this.stageType = stageType;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setMcOption1(String mcOption1) {
        this.mcOption1 = mcOption1;
    }

    public void setMcOption2(String mcOption2) {
        this.mcOption2 = mcOption2;
    }

    public void setMcOption3(String mcOption3) {
        this.mcOption3 = mcOption3;
    }
}
