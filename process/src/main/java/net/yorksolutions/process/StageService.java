package net.yorksolutions.process;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class StageService {
    private StageRepository repository;
    private final RestTemplate rest;

    @Autowired
    public StageService(@NonNull StageRepository repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public StageService(StageRepository repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }

    public Iterable<Stage> addAllStages(Stage[] stagesAry) {
        return repository.saveAll(List.of(stagesAry));
    }

    public Stage editStage(Long stageID, Long processID, Integer stageOrder, String stageType, String question, String mcOption1, String mcOption2, String mcOption3) {
        Stage stageToSave = new Stage(stageID, processID, stageOrder, stageType, question, mcOption1, mcOption2, mcOption3);
        return repository.save(stageToSave);
    }

    public Iterable<Stage> findAllStagesByProcessID(Long processID)  {
        return repository.findAllByProcessID(processID);
    }

    @Transactional
    public void deleteAllByProcessID(Long processID)  {
        repository.deleteAllByProcessID(processID);
    }

    @Transactional
    public void deleteStage(Long stageID) {
        repository.deleteByStageID(stageID);
    }

    public void setRepository(StageRepository repository) {
        this.repository = repository;
    }
}
