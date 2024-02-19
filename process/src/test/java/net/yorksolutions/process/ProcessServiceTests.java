package net.yorksolutions.process;

import com.fasterxml.jackson.core.JsonProcessingException;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProcessServiceTests {
    @InjectMocks
    ProcessService service;

    @Mock
    ProcessRepository repository;

    @Mock
    HttpServletRequest request;

    @Mock
    RestTemplate rest;

    @Test
    void itShoulCallSaveWithProcessdAddReturnProcess() {
        final String title = "some title";
        final String stageOrder = "1,2,3";
        Process expected = new Process(title, stageOrder);
        ArgumentCaptor<Process> captor = ArgumentCaptor.forClass(Process.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        Process actual = service.addProcess(title, stageOrder);
        assertEquals(expected, captor.getValue());
        assertEquals(expected, actual);
    }

    @Test
    void itShouldCallSaveWithProcess() {
        final Long stageID = 123L;
        final String title = "some title";
        final String stageOrder = "1,2,3";
        Process expected = new Process(title, stageOrder);
        ArgumentCaptor<Process> captor = ArgumentCaptor.forClass(Process.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        service.addProcess(title, stageOrder);
        assertEquals(expected, captor.getValue());
    }

    @Test
    void itShouldCallFindAllAndReturnIterable() {
        List<Process> expected = new ArrayList<>();
        expected.add(new Process());
        when(repository.findAll()).thenReturn(expected);
        Iterable<Process> actual = service.findAllProcesses();
        assertEquals(expected, actual);
    }

    @Test
    void itShouldCallDeleteByProcessID() {
        final Long processID = 1L;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        when(repository.deleteByProcessID(captor.capture())).thenReturn(Optional.of(new Process()));
        service.deleteProcess(processID);
        assertEquals(processID, captor.getValue());
    }

}
