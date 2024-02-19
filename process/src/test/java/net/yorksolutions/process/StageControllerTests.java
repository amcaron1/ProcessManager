package net.yorksolutions.process;

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
import org.springframework.http.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class StageControllerTests {
    @LocalServerPort
    int port;

    @Autowired
    StageController process;

    @Mock
    StageService service;

    @BeforeEach
    void setup() {
        process.setService(service);
    }

    @Test
    void itShouldCallAddAllStagesWithStagesAryAndReturnIterable() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long processID = 123L;
        final Integer stageOrder = 4;
        final String stageType = "text";
        final String question = "Sup?";
        final String mcOption1 = "Hungry";
        final String mcOption2 = "Cold";
        final String mcOption3 = "Tired";

        Stage[] expected = new Stage[2];
        expected[0] = new Stage(null, processID, stageOrder, stageType,
                question, mcOption1, mcOption2, mcOption3);
        expected[1] = new Stage(null, processID, stageOrder, stageType,
                question, mcOption1, mcOption2, mcOption3);
        Iterable<Stage> expectedIt = Arrays.asList(expected);

        String url = "http://localhost:" + port + "/addAllStages";
        when(service.addAllStages(expected)).thenReturn(expectedIt);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Stage[]> request = new HttpEntity<>(expected, headers);
        ResponseEntity<Iterable<Stage>> response = rest.exchange(url, HttpMethod.POST, request, new ParameterizedTypeReference<>(){});
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedIt, response.getBody());
    }

    @Test
    void itShouldCallEditStageWithStageAttributesAndReturnStage() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long stageID = 123L;
        final Long processID = 456L;
        final Integer stageOrder = 4;
        final String stageType = "test";
        final String question = "Sup?";
        final String mcOption1 = "Hungry";
        final String mcOption2 = "Cold";
        final String mcOption3 = "Tired";
        final Stage expected = new Stage();
        String url = "http://localhost:" + port + "/editStage?stageID=" + stageID +
                "&processID=" + processID + "&stageOrder=" + stageOrder +
                "&stageType=" + stageType + "&question=" + question +
                "&mcOption1=" + mcOption1 + "&mcOption2=" + mcOption2 +
                "&mcOption3=" + mcOption3;
        when(service.editStage(any(), any(), any(), any(), any(), any(), any(), any())).thenReturn(expected);
        ResponseEntity<Stage> response = rest.getForEntity(url, Stage.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
        verify(service).editStage(stageID, processID, stageOrder, stageType, question, mcOption1, mcOption2, mcOption3);
    }

    @Test
    void itShouldCallFindAllStagesByProcessIDAndReturnIterable() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long processID = 123L;
        String url = "http://localhost:" + port + "/findAllStagesByProcessID?" +
                "processID=" + processID;
        List<Stage> expected = new ArrayList<>();
        expected.add(new Stage());
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        when(service.findAllStagesByProcessID(captor.capture())).thenReturn(expected);
        ResponseEntity<List<Stage>> response = rest.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>(){});
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
        assertEquals(processID, captor.getValue());
    }

    @Test
    void itShouldCallDeleteAllByProcessIDWithProcessID() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long processID = 1L;
        String url = "http://localhost:" + port + "/deleteAllByProcessID?processID=" + processID;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        Mockito.doNothing().when(service).deleteAllByProcessID(captor.capture());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(processID, captor.getValue());
    }

    @Test
    void itShouldCallDeleteStageWithStageID() {
        final TestRestTemplate rest = new TestRestTemplate();
        final Long stageID = 1L;
        String url = "http://localhost:" + port + "/deleteStage?stageID=" + stageID;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        Mockito.doNothing().when(service).deleteStage(captor.capture());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(stageID, captor.getValue());
    }

}
