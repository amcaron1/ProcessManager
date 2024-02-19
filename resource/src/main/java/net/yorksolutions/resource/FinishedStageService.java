package net.yorksolutions.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
public class FinishedStageService {
    private FinishedStageRepo repository;
    private final RestTemplate rest;

    @Autowired
    public FinishedStageService(@NonNull FinishedStageRepo repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public FinishedStageService(FinishedStageRepo repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }

    public UUID saveFirstFinishedStage(String question, String stageType,
                                       String textAnswer, String booleanAnswer,
                                       String mcAnswer, Long stageOrder) {
        final UUID token = UUID.randomUUID();
        FinishedStage stageToSave = new FinishedStage(null, token, question, stageType,
                textAnswer, booleanAnswer, mcAnswer, stageOrder);

        repository.save(stageToSave);
        return token;
    }

    public void saveFinishedStage(UUID token, String question, String stageType,
                                       String textAnswer, String booleanAnswer,
                                       String mcAnswer, Long stageOrder) {

        FinishedStage stageToSave = new FinishedStage(null, token, question, stageType,
                textAnswer, booleanAnswer, mcAnswer, stageOrder);

        repository.save(stageToSave);

    }

    public Iterable<FinishedStage> findAllFinishedStagesByToken(UUID token)  {
        return repository.findAllByToken(token);
    }


    public void setRepository(FinishedStageRepo repository) {
        this.repository = repository;
    }
}

