package net.yorksolutions.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;


@RestController
@RequestMapping("/")
public class FinishedStageController {
    private FinishedStageService service;

    @Autowired
    public FinishedStageController(@NonNull FinishedStageService service) {this.service = service;}

    @GetMapping("/saveFirstFinishedStage")
    @CrossOrigin
    public UUID receiveSaveFirstFinishedStage(@RequestParam String question, @RequestParam String stageType,
                                                 @RequestParam String textAnswer, @RequestParam String booleanAnswer,
                                                 @RequestParam String mcAnswer,@RequestParam Long stageOrder) {

        return service.saveFirstFinishedStage(question, stageType,
                textAnswer, booleanAnswer,
                mcAnswer, stageOrder);
    }

    @GetMapping("/saveFinishedStage")
    @CrossOrigin
    public void receiveSaveFinishedStage(@RequestParam UUID token, @RequestParam String question, @RequestParam String stageType,
                                                 @RequestParam String textAnswer, @RequestParam String booleanAnswer,
                                                 @RequestParam String mcAnswer,@RequestParam Long stageOrder) {

        service.saveFinishedStage(token, question, stageType,
                textAnswer, booleanAnswer,
                mcAnswer, stageOrder);
    }

    @GetMapping("/findAllFinishedStagesByToken")
    @CrossOrigin
    public Iterable<FinishedStage> receiveFindAllFinishedStagesByTokenReq(@RequestParam UUID token) {
        return service.findAllFinishedStagesByToken(token);
    }

    public void setService(FinishedStageService service) {
        this.service = service;
    }



}
