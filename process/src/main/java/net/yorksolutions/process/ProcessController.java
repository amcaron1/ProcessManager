package net.yorksolutions.process;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

// @RestController is a combination of @Controller and @ResponseBody
// @Controller marks the class as a web controller which means that it is capable of handling requests
//    like '/addProcess' in receiveAddProcess
// @ResponseBody allows for url params to be mapped by @RequestParams, headers to be mapped by
//    @RequestHeaders, body to be mapped by @RequestBody.  It also allows a methods return value to be
//    mapped to the HTTP response body in JSON format.
@RestController
// @RequestMapping's use here allows for a "prefix" like "home" in the following url
//    http://localhost:8080/home/findAllProcesses
@RequestMapping("/")
public class ProcessController {
    private ProcessService service;

    // @Autowired tells Spring to set up the marked component and supply its dependencies.
    // Used here, it creates a ProcessController instance and supplies the ProcessService.  Nonnull prevents a
    //    null pointer exception.  Since ProcessService is marked as a @Service preceding its class
    //    definition, there is one.
    @Autowired
    public ProcessController(@NonNull ProcessService service) {this.service = service;}

    // Maps HTTP GET requests with a path of "/addProcess" onto this handler method
    @GetMapping("/addProcess")
    // Allows cross-origin resource sharing when the host that serves the front-end is not the
    //    same as the host that servers the database.  Spring adds a header to the response that
    //    determines what other origins are allowed to process this response.  Since this annotation
    //    does not have any args, the header will allow any origin to process the response.  The browser
    //    enforces CORS.
    @CrossOrigin
    public Process receiveAddProcess(@RequestParam String title, @RequestParam String stageOrder) {
        return service.addProcess(title, stageOrder);
    }

    @GetMapping("/editProcess")
    @CrossOrigin
    public void receiveEditProcess(@RequestParam Long processID, @RequestParam String title, @RequestParam String stageOrder) {
        service.editProcess(processID, title, stageOrder);
    }

    @GetMapping("/findAllProcesses")
    @CrossOrigin
    public Iterable<Process> receiveFindAllProcesses() {
        return service.findAllProcesses();
    }

    @GetMapping("/deleteProcess")
    @CrossOrigin
    public void receiveDeleteProcessReq(@RequestParam Long processID) {
        service.deleteProcess(processID);
    }

    // Just for testing
    public void setService(ProcessService service) {
        this.service = service;
    }
}
