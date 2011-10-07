package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.UniformInterfaceException;
import com.sun.jersey.api.client.WebResource;
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
        WebResource r = c.resource("http://naf.herokuapp.com/activities.json");
        c.destroy();
        return r.get(String.class);

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateActivity(String content) {
        System.out.println("activities PUT");

        String id = StringUtils.substringBefore(StringUtils.substringAfter(content, "_id\":\""), "\"");

        System.out.println("id = " + id);

        String nc = StringUtils.substringBeforeLast(StringUtils.substringAfter(content, "\":"), "}");

        System.out.println("nc = " + nc);

        Client c = new Client();
        WebResource r = c.resource("http://naf.herokuapp.com/activities/" + id);
        r.put(String.class, content);


    }
}
