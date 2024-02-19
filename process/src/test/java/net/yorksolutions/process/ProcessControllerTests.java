package net.yorksolutions.process;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProcessControllerTests {
    @LocalServerPort
    int port;

    // Creates and initializes this controller
    @Autowired
    ProcessController process;

    @Mock
    ProcessService service;

    // Injects mocked service from above into the real controller above
    @BeforeEach
    void setup() {
        process.setService(service);
    }

    @Test
    void itShouldCallAddProcessWithTitleAndStageOrderAndReturnProcess() {
        final TestRestTemplate rest = new TestRestTemplate();
        final String title = "some title";
        final String stageOrder = "1,2,3";
        final Process expected = new Process();
        final String url = "http://localhost:" + port + "/addProcess?" +
                "title=" + title + "&stageOrder=" + stageOrder;
        when(service.addProcess(any(), any())).thenReturn(expected);
        ResponseEntity<Process> response = rest.getForEntity(url, Process.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
        verify(service).addProcess(title, stageOrder);
    }

    @Test
    void itShouldCallEditProcessWithProcessIDTitleAndStageOrder() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long processID = 123L;
        final String title = "some title";
        final String stageOrder = "1,2,3";
        final Process expected = new Process();
        final String url = "http://localhost:" + port + "/editProcess?" +
                "processID=" + processID + "&title=" + title + "&stageOrder=" + stageOrder;
        Mockito.doNothing().when(service).editProcess(any(), any(), any());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).editProcess(processID, title, stageOrder);
    }

    @Test
    void itShouldCallFindAllProcessesAndReturnIterable() {
        final TestRestTemplate rest = new TestRestTemplate();
        List<Process> expected = new ArrayList<>();
        expected.add(new Process());
        String url = "http://localhost:" + port + "/findAllProcesses";
        when(service.findAllProcesses()).thenReturn(expected);
        // Puts class name in actual List that is in response
        ResponseEntity<List<Process>> response = rest.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>(){});
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
    }

    @Test
    void itShouldCallDeleteProcessWithProcessID() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long processID = 1L;
        String url = "http://localhost:" + port + "/deleteProcess?processID=" + processID;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        Mockito.doNothing().when(service).deleteProcess(captor.capture());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(processID, captor.getValue());
    }

}
