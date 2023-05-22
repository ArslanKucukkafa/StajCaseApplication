package com.example.backend.repository;

import com.example.backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository extends JpaRepository<Report,Long> {

    @Query("SELECT r from  Report r where r.reportId=?1")
    Optional<Report> findById(Long report_id);
    @Query("SELECT COUNT(r) FROM Report r WHERE r.laborant.id =?1")
    Integer reportCount(Long id);
    @Query("SELECT l from Report l Where l.patient_identity_no = :patient_identity_no and l.laborant.id= :laborant_id")
    List<Report> getAllPatientReports(@Param("patient_identity_no") String patient_identity_no, @Param("laborant_id")Long laborant_id);

    @Query("SELECT r FROM Report r WHERE r.laborant.id=?1 order by r.create_date asc")
    List<Report> findByAllReportWithLaborantId(Long laborant_id);
    void deleteByReportId(Long report_id);
    @Query("SELECT r from Report r WHERE r.patient_firstname LIKE %:name% AND r.patient_lastname LIKE %:surname% AND (:patient_identity_no='' or r.patient_identity_no= :patient_identity_no) AND r.laborant.ad LIKE %:laborantName% and r.laborant.soyad LIKE %:laborantSurname% ")
    List<Report> getReportWithFilters(@Param("name") String name, @Param("surname") String surname, @Param("patient_identity_no") String patient_identity_no, @Param("laborantName") String laborantName, @Param("laborantSurname") String laborantSurname );

}
