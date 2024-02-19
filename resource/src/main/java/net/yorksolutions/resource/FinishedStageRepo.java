package net.yorksolutions.resource;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface FinishedStageRepo extends CrudRepository<FinishedStage, Long> {
    Iterable<FinishedStage> findAllByToken(UUID token);
}
