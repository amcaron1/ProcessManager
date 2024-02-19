package net.yorksolutions.process;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProcessRepository extends CrudRepository<Process, Long> {
    // Optional allows for null safe code
    Optional<Process> deleteByProcessID(Long processId);
}
