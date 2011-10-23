package no.naf.aktivitetsadmin.rest;

import junit.framework.Assert;
import org.apache.commons.io.FileUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class ActivitiesTest {

    private Activities a = new Activities();

    @Test
    @Ignore
    public void testGetActivities() throws Exception {
        String aa = a.getActivities(null);
        System.out.println(aa);


    }

    @Test
    @Ignore
    public void testUpdateActivity() throws Exception {

        String content = "{\"activities\":{\"_id\":\"4e8c5996f295f80006000009\",\"attendee\":\"Bookinglink til aktivitet 8\",\"category_id\":\"4e8c42014eea890006000004\",\"contact\":\"Kontaktinfo for aktivitet 8\",\"description\":\"Beskrivelse aktivitet 8 - **** testing, testing *****\",\"dtstart\":\"2011-10-08T13:20:22+00:00\",\"dtend\":\"2011-10-10T13:20:22+00:00\",\"location_id\":\"4e89af11381db80006000050\",\"own_vehicle\":false,\"price\":500,\"responsibility\":\"Bring helmet to aktivitet 8\",\"summary\":\"Oppsummering aktivitet 8\",\"supervicoer_included\":\"\",\"tags\":\"kurs, norge\",\"url\":\"http://www.naf.no/#aktivitet8\",\"vehicle\":\"\",\"video\":\"http://youtu.be/T4yjrkdOxfw\",\"category\":\"Seminar og foredrag\",\"location\":\"NAF Senter Elverum\"}}";

        a.updateActivity(content, "4e8c5996f295f80006000009");

    }

    @Test
    @Ignore
    public void testUpdateActivityKunOppdaterteFelter() throws Exception {

//        String content = "{\"activities\":{\"dtstart\":\"2011-10-08T15:20:22+02:00\",\"dtend\":\"2011-10-10T15:20:22+02:00\",\"description\":\"Beskrivelse aktivitet 8 - **** testing, testing *****    3676tyure6ur6tu\",\"_id\":\"4e8c5996f295f80006000009\"}}";
        String content = "{\"activities\":{\"category_id\":\"4e8c42014eea890006000004\",\"category\":\"Seminar og foredrag\",\"dtstart\":\"2011-10-08T15:20:22+02:00\",\"dtend\":\"2011-10-10T15:20:22+02:00\",\"summary\":\"Aktivitet 0\",\"_id\":\"4e8c5996f295f80006000001\"}}";


        a.updateActivity(content, "4e8c5996f295f80006000001");

    }

    @Test
    @Ignore
    public void testCreateActivity() throws IOException {
        String c = FileUtils.readFileToString(new File("src/main/webapp/data/t.json"));
        a.createActivity(c, null, "abc");
    }

    @Test
    @Ignore
    public void testDeleteActivity() {


        a.deleteActivity("4e955d459b8e800001000003");

    }


    @Test
    public void testRemoveId() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> userData = mapper.readValue(new File("src/main/webapp/data/activities2.json"), Map.class);
//        System.out.println("userData = " + userData);
        List<LinkedHashMap> list = (List) userData.get("activities");
        String id = "";
        for (LinkedHashMap map : list) {
            id = (String) map.get("_id");
            map.remove("_id");
        }
        Writer content = new StringWriter();
        mapper.writeValue(content, userData);
        String cleanedContent = content.toString();
//        System.out.println("cleanedContent = " + cleanedContent);
        Assert.assertFalse(cleanedContent.contains(id));
    }

    @Test
    public void testJson2() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> userData = mapper.readValue(new File("src/main/webapp/data/activities3.json"), Map.class);
//        System.out.println("userData = " + userData);
        LinkedHashMap map = (LinkedHashMap) userData.get("activity");
        String id = (String) map.get("_id");
        map.remove("_id");
        Writer content = new StringWriter();
        mapper.writeValue(content, userData);
        Assert.assertFalse(content.toString().contains(id));
//        System.out.println("content = " + content);
    }

    @Test
    public void testResJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> userData = mapper.readValue(new File("src/test/resources/res.json"), Map.class);
//        System.out.println("userData = " + userData);
        String id = (String) userData.get("_id");
        Assert.assertEquals("4ea2f48e81e1000001000003", id);
    }


}
