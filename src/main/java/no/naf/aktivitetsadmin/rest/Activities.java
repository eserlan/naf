package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.WebResource;
import org.codehaus.jackson.map.ObjectMapper;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.LinkedHashMap;
import java.util.Map;

import static no.naf.aktivitetsadmin.ClientContainer.client;

@Path("/activities")
public class Activities {

    public static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getActivities(@Context UriInfo ui) {
        System.out.println("activities GET");
        MultivaluedMap<String, String> qp = ui.getQueryParameters();
        WebResource r = client.resource("http://naf.herokuapp.com/activities");
        r = r.queryParams(qp);

        System.out.println(r);
        return r.get(String.class);

    }

    @GET
    @Path("/search")
    @Produces(MediaType.APPLICATION_JSON)
    public String getSearchActivities(@Context UriInfo ui) {
        System.out.println("search activities GET");
        MultivaluedMap<String, String> qp = ui.getQueryParameters();
        qp.remove("limit");
        qp.remove("page");
        qp.remove("_dc");

        WebResource r = client.resource("http://naf.herokuapp.com/activities/search");
        r = r.queryParams(qp);

        System.out.println(r);
        return r.get(String.class);

    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void updateActivity(String content, @PathParam("id") String id) throws IOException {
        System.out.println("activities PUT");


        @SuppressWarnings({"unchecked"})
        Map<String, Object> userData = OBJECT_MAPPER.readValue(content, Map.class);

        LinkedHashMap map = (LinkedHashMap) userData.get("activity");
        map.remove("_id");

        Writer contentWriter = new StringWriter();
        OBJECT_MAPPER.writeValue(contentWriter, userData);

        content = contentWriter.toString();

        System.out.println(content);

        WebResource r = client.resource("http://naf.herokuapp.com/activities/" + id);

        System.out.println(r);

        String res = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(content, MediaType.APPLICATION_JSON_TYPE).
                put(String.class);
        System.out.println("res = " + res);


    }

    @DELETE
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteActivity(@PathParam("id") String id) {
        System.out.println("activities DELETE");
        WebResource r = client.resource("http://naf.herokuapp.com/activities/" + id);
        System.out.println(r);
        r.delete();

    }

    @POST
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public String createActivity(String content, @Context UriInfo ui, @PathParam("id") String id) throws IOException {
        System.out.println("activity POST");
        System.out.println(content);

        WebResource r = client.resource("http://naf.herokuapp.com/activities");

        System.out.println(r);

        WebResource.Builder entity = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(content, MediaType.APPLICATION_JSON);
        String res = entity.post(String.class);
        Map<String, Object> userData = OBJECT_MAPPER.readValue(res, Map.class);
        String activityId = (String) userData.get("_id");
        return "{\"_id\":\"" + activityId + "\"}";
    }

    @POST
//    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    public void createAllNewActivity(String content, @Context UriInfo ui) {
        System.out.println("activity POST 2");

//        System.out.println("ui = " + ui);
//        MultivaluedMap<String, String> qp = null;
//        if (ui != null) {
//            qp = ui.getQueryParameters();
//            System.out.println("qp = " + qp);
//        }
//        String nc = StringUtils.substringBeforeLast(StringUtils.substringAfter(content, "\","), "}");
//
//        if (nc.contains(",\"location\""))
//            nc = StringUtils.substringBefore(nc, ",\"location\"") + "}";
//
//
//        nc = "{\"activity\":{" + nc + "}";

        System.out.println(content);


        WebResource r = client.resource("http://naf.herokuapp.com/activities");
        String res = r.
                type(MediaType.APPLICATION_JSON_TYPE).
                accept(MediaType.APPLICATION_JSON_TYPE).
                entity(content, MediaType.APPLICATION_JSON_TYPE).
                post(String.class);
//        System.out.println("res = " + res);


    }
}
