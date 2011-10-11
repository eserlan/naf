package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.WebResource;
import org.apache.commons.lang3.StringUtils;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import static no.naf.aktivitetsadmin.ClientContainer.client;

@Path("/activities")
public class Activities {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getActivities(@Context UriInfo ui) {
        System.out.println("activities GET");
        MultivaluedMap<String, String> qp = ui.getQueryParameters();
        WebResource r = client.resource("http://naf.herokuapp.com/activities/search");
        r = r.queryParams(qp);

        System.out.println("r = " + r);
        return r.get(String.class);

    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateActivity(String content, @PathParam("id") String id) {
        System.out.println("activities PUT");

        String nc = StringUtils.substringBeforeLast(StringUtils.substringAfter(content, "\":"), "}");

        if (nc.contains(",\"location\""))
            nc = StringUtils.substringBefore(nc, ",\"location\"") + "}";

        nc = "{\"activity\":" + nc + "}";

        WebResource r = client.resource("http://naf.herokuapp.com/activities/" + id);
        String res = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(nc, MediaType.APPLICATION_JSON_TYPE).
                put(String.class);
//        System.out.println("res = " + res);


    }

    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createActivity(String content, @Context UriInfo ui, @PathParam("id") String id) {
        System.out.println("activity POST");

        System.out.println("ui = " + ui);
        MultivaluedMap<String, String> qp = null;
        if (ui != null)
            qp = ui.getQueryParameters();
        String nc = StringUtils.substringBeforeLast(StringUtils.substringAfter(content, "\","), "}");

        if (nc.contains(",\"location\""))
            nc = StringUtils.substringBefore(nc, ",\"location\"") + "}";




        nc = "{\"activity\":{" + nc + "}";

        System.out.println("nc = " + nc);





        WebResource r = client.resource("http://naf.herokuapp.com/activities");
        System.out.println("r = " + r);
        String res = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(nc, MediaType.APPLICATION_JSON_TYPE).
                post(String.class);
//        System.out.println("res = " + res);


    }
}
