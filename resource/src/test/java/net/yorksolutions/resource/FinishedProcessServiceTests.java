package net.yorksolutions.resource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.spy;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class FinishedProcessServiceTests {
    @InjectMocks
    FinishedProcessService service;

    @Mock
    FinishedProcessRepo repository;

    @Mock
    HttpServletRequest request;

    @Mock
    RestTemplate rest;

    @Test
    void itShouldCallSaveWithFinishedProcess() {
        final UUID token = UUID.randomUUID();
        final String title = "some title";
        FinishedProcess expected = new FinishedProcess(token, title);
        ArgumentCaptor<FinishedProcess> captor = ArgumentCaptor.forClass(FinishedProcess.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        service.saveFinishedProcess(token, title);
        assertEquals(expected, captor.getValue());
    }

    @Test
    void itShouldCallFindAllAndReturnIterable() {
        List<FinishedProcess> expected = new ArrayList<>();
        expected.add(new FinishedProcess());
        when(repository.findAll()).thenReturn(expected);
        assertEquals(expected, service.findAllFinishedProcesses());
    }

}
