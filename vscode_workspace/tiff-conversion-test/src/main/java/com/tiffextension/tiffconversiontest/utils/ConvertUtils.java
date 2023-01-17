package com.tiffextension.tiffconversiontest.utils;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Optional;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Image;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Rectangle;
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

    private OutputStream readTiff(RandomAccessFileOrArray raf, OutputStream os, Rectangle paperSize, float zoom) throws DocumentException {
        int pageSize = TiffImage.getNumberOfPages(raf);
        Document document = new Document(paperSize, 0, 0, 0, 0);
        PdfWriter.getInstance(document, os);
        document.open();
        for(int pageNum = 1; pageNum <= pageSize; pageNum++) {
            Image image = TiffImage.getTiffImage(raf, pageNum);
            image.scalePercent(zoom);
            document.add(image);
        }
        document.close();
        return os;
    }

    private Rectangle getPageSize(String paperSize) {
        try {
            return Optional.ofNullable(paperSize).isPresent() ? PageSize.getRectangle(paperSize) : PageSize.A4;
        }
        catch(RuntimeException e) {
            return PageSize.A4;
        }
    }

    public void convert_tiff_to_pdf(MultipartFile multipartFile, String paperSize, float zoom) throws IOException, DocumentException {
        RandomAccessFileOrArray raf = this.readMultiFile(multipartFile);
        Rectangle rectangle = this.getPageSize(paperSize);
        FileOutputStream fos = (FileOutputStream) this.readTiff(raf, new FileOutputStream("c:\\convert\\output.pdf"), rectangle, zoom);
        fos.close();
        raf.close();
    }

    public byte[] convert_tiff_to_pdf_byte(MultipartFile multipartFile, String paperSize, float zoom) throws IOException, DocumentException {
        RandomAccessFileOrArray raf = this.readMultiFile(multipartFile);
        Rectangle rectangle = this.getPageSize(paperSize);
        try(ByteArrayOutputStream baos = (ByteArrayOutputStream) this.readTiff(raf, new ByteArrayOutputStream(), rectangle, zoom)) {
            byte[] output = baos.toByteArray();
            raf.close();
            return output;
        } catch(IOException e) {
            raf.close();
            return null;
        }
    }
}
