package no.naf.aktivitetsadmin.rest;


import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.WebResource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Path("/locations")
public class Locations {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public String getCategories() {
        System.out.println("location GET");

        Client c = new Client();
        WebResource r = c.resource("http://naf.herokuapp.com/locations.json");
        c.destroy();
        return r.get(String.class);

    }


}
