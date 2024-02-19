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
public class FinishedProcessControllerTests {
    @LocalServerPort
    int port;

    @Autowired
    FinishedProcessController process;

    @Mock
    FinishedProcessService service;

    @BeforeEach
    void setup() {
        process.setService(service);
    }

    @Test
    void itShouldCallSaveFinishedProcessWithTokenAndTitle() {
        final TestRestTemplate rest = new TestRestTemplate();
        final UUID token = UUID.randomUUID();
        final String title = "some title";
        String url = "http://localhost:" + port + "/saveFinishedProcess?" +
                "token=" + token + "&title=" + title;
        ArgumentCaptor<UUID> captor1 = ArgumentCaptor.forClass(UUID.class);
        ArgumentCaptor<String> captor2 = ArgumentCaptor.forClass(String.class);
        Mockito.doNothing().when(service).saveFinishedProcess(captor1.capture(), captor2.capture());
        ResponseEntity<Void> response = rest.getForEntity(url, Void.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(token, captor1.getValue());
        assertEquals(title, captor2.getValue());
    }

    @Test
    void itShouldCallVFindAllFinishedProcessesAndReturnIterable() {
        final TestRestTemplate rest = new TestRestTemplate();
        List<FinishedProcess> expected = new ArrayList<>();
        expected.add(new FinishedProcess());
        String url = "http://localhost:" + port + "/findAllFinishedProcesses";
        when(service.findAllFinishedProcesses()).thenReturn(expected);
        ResponseEntity<List<FinishedProcess>> response = rest.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<>(){});
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expected, response.getBody());
    }

}
