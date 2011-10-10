package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.WebResource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import static no.naf.aktivitetsadmin.ClientContainer.client;

@Path("/locations")
public class Locations {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories() {
        System.out.println("location GET");

        WebResource r = client.resource("http://naf.herokuapp.com/locations.json");
        return r.get(String.class);

    }


}
