package net.yorksolutions.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.UUID;

@Service
public class FinishedProcessService {
    private FinishedProcessRepo repository;
    private final RestTemplate rest;

    @Autowired
    public FinishedProcessService(@NonNull FinishedProcessRepo repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public FinishedProcessService(FinishedProcessRepo repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }

    public void saveFinishedProcess(UUID token, String title) {

        FinishedProcess processToSave = new FinishedProcess(null, token, title);

        repository.save(processToSave);

    }

    public Iterable<FinishedProcess> findAllFinishedProcesses()  {
        return repository.findAll();
    }

    public void setRepository(FinishedProcessRepo repository) {
        this.repository = repository;
    }
}


