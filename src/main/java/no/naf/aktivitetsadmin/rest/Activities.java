package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.UniformInterfaceException;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.filter.ClientFilter;
import com.sun.jersey.api.client.filter.GZIPContentEncodingFilter;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.StringReader;

@Path("/activities")
public class Activities {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getActivities() {
        System.out.println("activities GET");

        Client c = new Client();
        WebResource r = c.resource("http://naf.herokuapp.com/activities");
        c.destroy();
        return r.get(String.class);

    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateActivity(String content, @PathParam("id") String id) {
        System.out.println("activities PUT");

        System.out.println("id = " + id);

        String nc = StringUtils.substringBeforeLast(StringUtils.substringAfter(content, "\":"), "}");

        if (nc.contains(",\"location\""))
            nc = StringUtils.substringBefore(nc, ",\"location\"") + "}";


        nc = "{\"activity\":" + nc + "}";

        System.out.println("nc = " + nc);

        Client c = new Client();
        WebResource r = c.resource("http://naf.herokuapp.com/activities/" + id);
        String res = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(nc, MediaType.APPLICATION_JSON_TYPE).
                put(String.class);
//                put(String.class, nc);

        System.out.println("res = " + res);


    }
}
