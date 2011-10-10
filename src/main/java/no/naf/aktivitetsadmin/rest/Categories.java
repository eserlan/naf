package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/categories")
public class Categories {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories() {
        System.out.println("categories GET");

        Client c = new Client();
        WebResource r = c.resource("http://naf.herokuapp.com/categories");
        c.destroy();
        return r.get(String.class);

    }


}
