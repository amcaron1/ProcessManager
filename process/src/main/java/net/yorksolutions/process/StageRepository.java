package net.yorksolutions.process;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends CrudRepository<Stage, Long> {
    Iterable<Stage> findAllByProcessID(Long processID);
    Long deleteAllByProcessID(Long processID);
    Long deleteByStageID(Long stageID);
}
