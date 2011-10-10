package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.WebResource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;

import static no.naf.aktivitetsadmin.ClientContainer.client;

@Path("/categories")
public class Categories {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories(@Context UriInfo ui) {
        System.out.println("categories GET");
        MultivaluedMap<String, String> qp = ui.getQueryParameters();
        WebResource r = client.resource("http://naf.herokuapp.com/categories");
        r = r.queryParams(qp);
        return r.get(String.class);

    }


}
