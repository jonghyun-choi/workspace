package com.tiffextension.tiffconversiontest.controller;

import java.io.File;
import java.io.IOException;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.DocumentException;
import com.tiffextension.tiffconversiontest.utils.ConvertUtils;

@RestController
@RequestMapping("/")
public class ConvertController {
    final private ConvertUtils utils;

    public ConvertController(ConvertUtils utils) {
        this.utils = utils;
    }

    @GetMapping("hello_world")
    public String hello_world() {
        return "hello world";
    }

    @PostMapping("tiff_to_pdf")
    public void tiff_to_pdf(@RequestParam(required=true, value="candidate") MultipartFile file) throws IOException, DocumentException {
        utils.convert_tiff_to_pdf(file);
    }

    @PostMapping("tiff_to_pdf_byte")
    public @ResponseBody byte[] tiff_to_pdf_byte(@RequestParam(required=true, value="candidate") MultipartFile file) throws IOException, DocumentException {
        return utils.convert_tiff_to_pdf_byte(file);
    }

    @PostMapping("tiff_to_pdf_file")
    public ResponseEntity<Resource> tiff_to_pdf_file(@RequestParam(required=true, value="candidate") MultipartFile file) throws IOException, DocumentException {
        ByteArrayResource bar = new ByteArrayResource(utils.convert_tiff_to_pdf_byte(file));
        return ResponseEntity.ok()
        .contentType(MediaType.APPLICATION_PDF)
        .contentLength(bar.contentLength())
        .header(HttpHeaders.CONTENT_DISPOSITION, ContentDisposition.attachment().filename(file.getOriginalFilename()).build().toString())
        .body(bar);
    }
}
