package net.yorksolutions.process;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class StageServiceTests {
    @InjectMocks
    StageService service;

    @Mock
// All fields of repository are null nand all methods return null or do nothing if void
    StageRepository repository;

    @Mock
    HttpServletRequest request;

    @Mock
    RestTemplate rest;

    @Test
    void itShouldCallSaveAllWithStagesArrayAndReturnIterable() {
        final Long processID = 123L;
        final Integer stageOrder = 4;
        final String stageType = "test";
        final String question = "Sup?";
        final String mcOption1 = "Hungry";
        final String mcOption2 = "Cold";
        final String mcOption3 = "Tired";
        final Stage stage1 = new Stage(null, processID, stageOrder, stageType,
                question, mcOption1, mcOption2, mcOption3);
        Stage[] stagesAry = new Stage[1];
        stagesAry[0] = stage1;
        List<Stage> expected = List.of(stagesAry);
        ArgumentCaptor<List> captor = ArgumentCaptor.forClass(List.class);
        when(repository.saveAll(captor.capture())).thenReturn(expected);
        Iterable<Stage> actual = service.addAllStages(stagesAry);
        // Tests that correct parameter is passed into saveAll
        assertEquals(expected, captor.getValue());
        // Tests that addAllStages returns the correct object which is returned by saveAll
        assertEquals(expected, actual);
    }

    @Test
    void itShouldCallSaveWithOneStageAndReturnStage() {
        final Long stageID = 123L;
        final Long processID = 456L;
        final Integer stageOrder = 4;
        final String stageType = "test";
        final String question = "Sup?";
        final String mcOption1 = "Hungry";
        final String mcOption2 = "Cold";
        final String mcOption3 = "Tired";
        final Stage expected = new Stage(stageID, processID, stageOrder, stageType,
                question, mcOption1, mcOption2, mcOption3);
        ArgumentCaptor<Stage> captor = ArgumentCaptor.forClass(Stage.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        Stage actual = service.editStage(stageID, processID, stageOrder,stageType, question, mcOption1, mcOption2, mcOption3);
        assertEquals(expected, captor.getValue());
        assertEquals(expected, actual);
    }

    @Test
    void itShouldCallFindAllByProcessIDWithProcessIDAndReturnIterable() {
        final Long processID = 123L;
        List<Stage> expected = new ArrayList<>();
        expected.add(new Stage());
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        when(repository.findAllByProcessID(captor.capture())).thenReturn(expected);
        Iterable<Stage> actual = service.findAllStagesByProcessID(processID);
        assertEquals(processID, captor.getValue());
        assertEquals(expected, actual);
    }

    @Test
    void itShouldCallDeleteAllByProcessIDWithProcessID() {
        final Long processID = 1L;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        when(repository.deleteAllByProcessID(captor.capture())).thenReturn(processID);
        service.deleteAllByProcessID(processID);
        assertEquals(processID, captor.getValue());
    }

    @Test
    void itShouldCallDeleteByStageIDWithStageID() {
        final Long stageID = 1L;
        ArgumentCaptor<Long> captor = ArgumentCaptor.forClass(Long.class);
        when(repository.deleteByStageID(captor.capture())).thenReturn(stageID);
        service.deleteStage(stageID);
        assertEquals(stageID, captor.getValue());
    }

}
