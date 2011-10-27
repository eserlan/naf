package no.naf.aktivitetsadmin.rest;

import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.io.File;

@Path("/file")
public class PhotoUpload {
    @POST
    @Path("/file_upload")
    @Consumes("multipart/form-data")
    @Produces("text/plain")
    public String uploadFile(@FormDataParam("file") File file, @FormDataParam("file") FormDataContentDisposition fcdsFile) {
        String fileLocation = "/files/" + fcdsFile.getFileName();
        File destFile = new File(fileLocation);

        System.out.println("destFile = " + destFile);

        // your code here to copy file to destFile

        return "1";
    }
}

