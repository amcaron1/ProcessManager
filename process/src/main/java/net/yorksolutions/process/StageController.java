package net.yorksolutions.process;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/")
public class StageController {
    private StageService service;

    @Autowired
    public StageController(@NonNull StageService service) {this.service = service;}

    @PostMapping("/addAllStages")
    @CrossOrigin
    public Iterable<Stage> receiveAddAllStagesReq(@RequestBody Stage[] stagesAry) {
        return service.addAllStages(stagesAry);
    }

    @GetMapping("/editStage")
    @CrossOrigin
    public Stage receiveEditStageReq(@RequestParam Long stageID,
                                   @RequestParam Long processID,
                                   @RequestParam Integer stageOrder,
                                   @RequestParam String stageType,
                                   @RequestParam String question,
                                   @RequestParam String mcOption1,
                                   @RequestParam String mcOption2,
                                   @RequestParam String mcOption3) {
        return service.editStage(stageID, processID, stageOrder, stageType, question, mcOption1, mcOption2, mcOption3);
    }

    @GetMapping("/findAllStagesByProcessID")
    @CrossOrigin
    public Iterable<Stage> receiveFindAllStagesByProcessIDReq(@RequestParam long processID) {
        return service.findAllStagesByProcessID(processID);
    }

    @GetMapping("/deleteAllByProcessID")
    @CrossOrigin
    public void receiveDeleteAllByProcessIDReq(@RequestParam long processID) {
        service.deleteAllByProcessID(processID);
    }

    @GetMapping("/deleteStage")
    @CrossOrigin
    public void receiveDeleteStageReq(@RequestParam Long stageID) {
        service.deleteStage(stageID);
    }

    public void setService(StageService service) {
        this.service = service;
    }

}
