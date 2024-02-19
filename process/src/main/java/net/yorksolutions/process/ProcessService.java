package net.yorksolutions.process;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.util.UUID;

// @Service marks this class as one that contains business logic.
// This annotation tells Spring to create this class (It will be needed as a dependency to the
// ProcessController).  @Service is a special type of @component
@Service
public class ProcessService {
    private ProcessRepository repository;
    private final RestTemplate rest;

    @Autowired
    public ProcessService(@NonNull ProcessRepository repository) {
        this.repository = repository;
        rest = new RestTemplate();
    }

    public ProcessService(ProcessRepository repository, RestTemplate rest) {
        this.repository = repository;
        this.rest = rest;
    }

    public Process addProcess(String title, String stageOrder) {
        Process processToSave = new Process(title, stageOrder);
        return repository.save(processToSave);
    }

    public void editProcess(Long processID, String title, String stageOrder) {
        Process processToEdit = new Process(processID, title, stageOrder);
        repository.save(processToEdit);

    }

    public Iterable<Process> findAllProcesses()  {
        return repository.findAll();
    }

// @Transactional annotation is used when you want a certain method/class(=all methods inside) to be executed
// in a transaction.  Assume user A wants to transfer 100$ to user B.  A's account is decreased by $100,
// but before B's account is credited with $100, an error occurs.  With @Transactional, the first transaction is
// rolled back so that the two tables are not out of sync.  Without @Transactional, A would be down $100, but
// B would not have those funds.  @Transactional means all or nothing. If there is an exception thrown somewhere
// in the method, changes are not persisted in the database. Something called rollback happens.
    @Transactional
    public void deleteProcess(Long processID) {
        repository.deleteByProcessID(processID);
    }

    public void setRepository(ProcessRepository repository) {
        this.repository = repository;
    }
}
