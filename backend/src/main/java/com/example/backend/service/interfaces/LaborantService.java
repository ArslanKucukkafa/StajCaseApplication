package com.example.backend.service.interfaces;

import com.example.backend.model.Laborant;
import com.example.backend.model.Report;
import com.example.backend.model.dto.*;
import com.example.backend.model.response.Response;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface LaborantService {

    Response registerLaborant(LaborantRegisterDto registerDto);
     Response loginLaborant(LaborantLoginDto loginDto);

    Response saveReport(ReportSaveDto reportSaveDto,MultipartFile file) throws Exception;

    List<Report> getAllReportsWithAboutPatient(String patient_identity_no);

    Report getReport(Long reportId);

    Response updateReport(ReportGetDto reportGetDto,MultipartFile file) throws Exception;
    Optional<Laborant> getPrincipal();

    List<ReportGetDto> getAllReports(FilterDto filterDto);

    Response deleteReport(Long report_id);
}
