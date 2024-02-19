package net.yorksolutions.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/")
public class FinishedProcessController {
    private FinishedProcessService service;

    @Autowired
    public FinishedProcessController(@NonNull FinishedProcessService service) {this.service = service;}


    @GetMapping("/saveFinishedProcess")
    @CrossOrigin
    public void receiveSaveFinishedProcess(@RequestParam UUID token, @RequestParam String title) {

        service.saveFinishedProcess(token, title);
    }

    @GetMapping("/findAllFinishedProcesses")
    @CrossOrigin
    public Iterable<FinishedProcess> receiveFindAllFinishedProcesses() {

        return service.findAllFinishedProcesses();
    }

    public void setService(FinishedProcessService service) {
        this.service = service;
    }
}

