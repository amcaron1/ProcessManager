package net.yorksolutions.resource;

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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class FinishedStageControllerTests {
    @LocalServerPort
    int port;

    @Autowired
    FinishedStageController process;

    @Mock
    FinishedStageService service;

    @BeforeEach
    void setup() {
        process.setService(service);
    }

    @Test
    void itShouldCallSaveFirstFinishedStageWithLotsAndReturnsUUID() {
        final TestRestTemplate rest = new TestRestTemplate();
        final UUID token = UUID.randomUUID();
        final String question = "some question";
        final String stageType = "Text";
        final String textAnswer = "some text answer";
        final String booleanAnswer = "";
        final String mcAnswer = "";
        final Long stageOrder = 0L;
        String url = "http://localhost:" + port + "/saveFirstFinishedStage?"+
                "question=" + question + "&stageType=" + stageType + "&textAnswer=" + textAnswer +
                "&booleanAnswer=" + booleanAnswer + "&mcAnswer=" + mcAnswer + "&stageOrder=" + stageOrder;
        when(service.saveFirstFinishedStage(any(), any(), any(), any(), any(), any())).thenReturn(token);
        ResponseEntity<UUID> response = rest.getForEntity(url, UUID.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(token, response.getBody());
        verify(service).saveFirstFinishedStage(question, stageType, textAnswer, booleanAnswer, mcAnswer, stageOrder);
    }

    @Test
    void itShouldCallSaveFinishedStageWithLots() {
        final TestRestTemplate rest = new TestRestTemplate();
        final UUID token = UUID.randomUUID();
        final String question = "some question";
        final String stageType = "Text";
        final String textAnswer = "some text answer";
        final String booleanAnswer = "";
        final String mcAnswer = "";
        final Long stageOrder = 0L;
        String url = "http://localhost:" + port + "/saveFinishedStage?token=" + token +
                "&question=" + question + "&stageType=" + stageType + "&textAnswer=" + textAnswer +
                "&booleanAnswer=" + booleanAnswer + "&mcAnswer=" + mcAnswer + "&stageOrder=" + stageOrder;
        Mockito.doNothing().when(service).saveFinishedStage(any(), any(), any(), any(), any(), any(), any());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        verify(service).saveFinishedStage(token, question, stageType, textAnswer, booleanAnswer, mcAnswer, stageOrder);
    }

    @Test
    void itShouldCallFindAllFinishedStagesByTokenWithTokenAndReturnIterable() {
        final TestRestTemplate rest = new TestRestTemplate();
        final UUID token = UUID.randomUUID();
        String url = "http://localhost:" + port + "/findAllFinishedStagesByToken?" +
                "token=" + token;
        List<FinishedStage> expected = new ArrayList<>();
        expected.add(new FinishedStage());
        ArgumentCaptor<UUID> captor = ArgumentCaptor.forClass(UUID.class);
        when(service.findAllFinishedStagesByToken(captor.capture())).thenReturn(expected);
        ResponseEntity<List<FinishedStage>> response = rest.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>(){});
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
        assertEquals(token, captor.getValue());
    }

}
