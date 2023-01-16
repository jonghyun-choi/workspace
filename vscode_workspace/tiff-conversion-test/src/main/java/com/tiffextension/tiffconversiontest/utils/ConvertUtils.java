package com.tiffextension.tiffconversiontest.utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.util.stream.IntStream;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.io.RandomAccessSource;
import com.itextpdf.text.io.RandomAccessSourceFactory;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.text.pdf.RandomAccessFileOrArray;
import com.itextpdf.text.pdf.codec.TiffImage;

@Component
public class ConvertUtils {
    public ConvertUtils() {}

    private RandomAccessFileOrArray readMultiFile(MultipartFile multipartFile) throws IOException {
        RandomAccessSourceFactory rasf = new RandomAccessSourceFactory();
        RandomAccessSource ras = rasf.createSource(multipartFile.getBytes());
        RandomAccessFileOrArray raf = new RandomAccessFileOrArray(ras);
        return raf;
    }

    private OutputStream readTiff(RandomAccessFileOrArray raf, OutputStream os) throws DocumentException {
        int pageSize = TiffImage.getNumberOfPages(raf);
        Document document = new Document();
        PdfWriter.getInstance(document, os);
        document.open();
        for(int pageNum = 1; pageNum <= pageSize; pageNum++) {
            Image image = TiffImage.getTiffImage(raf, pageNum);
            document.add(image);
        }
        document.close();
        return os;
    }

    public void convert_tiff_to_pdf(MultipartFile multipartFile) throws IOException, DocumentException {
        RandomAccessFileOrArray raf = this.readMultiFile(multipartFile);
        FileOutputStream fos = (FileOutputStream) this.readTiff(raf, new FileOutputStream("c:\\convert\\output.pdf"));
        raf.close();
        fos.close();
    }

    public byte[] convert_tiff_to_pdf_byte(MultipartFile multipartFile) throws IOException, DocumentException {
        RandomAccessFileOrArray raf = this.readMultiFile(multipartFile);
        ByteArrayOutputStream baos = (ByteArrayOutputStream) this.readTiff(raf, new ByteArrayOutputStream());
        byte[] output = baos.toByteArray();
        baos.close();
        raf.close();
        return output;
    }
}
