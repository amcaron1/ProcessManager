package net.yorksolutions.resource;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class FinishedStageServiceTests {
    @InjectMocks
    FinishedStageService service;

    @Mock
    FinishedStageRepo repository;

    @Mock
    HttpServletRequest request;

    @Mock
    RestTemplate rest;

    @Test
    void itShouldCallSaveWithFinishedStageAndReturnUUID() {
        final UUID token = UUID.randomUUID();
        final String question = "some question";
        final String stageType = "Text";
        final String textAnswer = "some text answer";
        final String booleanAnswer = "";
        final String mcAnswer = "";
        final Long stageOrder = 0L;
        final FinishedStage expected = new FinishedStage(null, token, question, stageType,
                textAnswer, booleanAnswer, mcAnswer, stageOrder);
        Mockito.mockStatic(UUID.class).when(() -> UUID.randomUUID()).thenReturn(token);
        ArgumentCaptor<FinishedStage> captor = ArgumentCaptor.forClass(FinishedStage.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        UUID actual = service.saveFirstFinishedStage(question, stageType, textAnswer, booleanAnswer, mcAnswer, stageOrder);
        assertEquals(expected, captor.getValue());
        assertEquals(actual, captor.getValue().token);
    }

    @Test
    void itShouldCallSaveWithFinishedStage() {
        final UUID token = UUID.randomUUID();
        final String question = "some question";
        final String stageType = "Text";
        final String textAnswer = "some text answer";
        final String booleanAnswer = "";
        final String mcAnswer = "";
        final Long stageOrder = 0L;
        final FinishedStage expected = new FinishedStage(null, token, question, stageType,
                textAnswer, booleanAnswer, mcAnswer, stageOrder);
        ArgumentCaptor<FinishedStage> captor = ArgumentCaptor.forClass(FinishedStage.class);
        when(repository.save(captor.capture())).thenReturn(expected);
        service.saveFinishedStage(token, question, stageType, textAnswer, booleanAnswer, mcAnswer, stageOrder);
        assertEquals(expected, captor.getValue());
    }

    @Test
    void itShouldCallFindAllByTokenWithTokenAndReturnIterable() {
        final UUID token = UUID.randomUUID();
        List<FinishedStage> expected = new ArrayList<>();
        expected.add(new FinishedStage());
        ArgumentCaptor<UUID> captor = ArgumentCaptor.forClass(UUID.class);
        when(repository.findAllByToken(captor.capture())).thenReturn(expected);
        Iterable<FinishedStage> actual = service.findAllFinishedStagesByToken(token);
        assertEquals(token, captor.getValue());
        assertEquals(expected, actual);
    }

}
