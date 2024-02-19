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
public class FinishedStage {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @JsonProperty("stageID")
    Long stageID;

    @JsonProperty("token")
    UUID token;

    @JsonProperty("question")
    String question;

    @JsonProperty("stageType")
    String stageType;

    @JsonProperty("answerText")
    String answerText;

    @JsonProperty("answerBoolean")
    String answerBoolean;

    @JsonProperty("answerMC")
    String answerMC;

    @JsonProperty("stageOrder")
    Long stageOrder;


    public FinishedStage() {
    }

    @JsonCreator
    public FinishedStage(@JsonProperty("stageID") Long stageID, @JsonProperty("token") UUID token, @JsonProperty("question") String question,
                 @JsonProperty("stageType") String stageType, @JsonProperty("answerText") String answerText,
                 @JsonProperty("answerBoolean") String answerBoolean, @JsonProperty("answerMC") String answerMC,
                 @JsonProperty("stageOrder") Long stageOrder) {
        this.stageID = stageID;
        this.token = token;
        this.question = question;
        this.stageType = stageType;
        this.answerText = answerText;
        this.answerBoolean = answerBoolean;
        this.answerMC = answerMC;
        this.stageOrder = stageOrder;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FinishedStage that = (FinishedStage) o;
        return Objects.equals(stageID, that.stageID) && Objects.equals(token, that.token) && Objects.equals(question, that.question) && Objects.equals(stageType, that.stageType) && Objects.equals(answerText, that.answerText) && Objects.equals(answerBoolean, that.answerBoolean) && Objects.equals(answerMC, that.answerMC) && Objects.equals(stageOrder, that.stageOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hash(stageID, token, question, stageType, answerText, answerBoolean, answerMC, stageOrder);
    }

    @Override
    public String toString() {
        return "FinishedStage{" +
                "stageID=" + stageID +
                ", token=" + token +
                ", question='" + question + '\'' +
                ", stageType='" + stageType + '\'' +
                ", answerText='" + answerText + '\'' +
                ", answerBoolean='" + answerBoolean + '\'' +
                ", answerMC='" + answerMC + '\'' +
                ", stageOrder=" + stageOrder +
                '}';
    }

    public void setStageID(Long stageID) {
        this.stageID = stageID;
    }

    public void setToken(UUID token) {
        this.token = token;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setStageType(String stageType) {
        this.stageType = stageType;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public void setAnswerBoolean(String answerBoolean) {
        this.answerBoolean = answerBoolean;
    }

    public void setAnswerMC(String answerMC) {
        this.answerMC = answerMC;
    }

    public void setStageOrder(Long stageOrder) {
        this.stageOrder = stageOrder;
    }
}

