package no.naf.aktivitetsadmin.rest;

import org.apache.commons.io.FileUtils;
import org.junit.Ignore;
import org.junit.Test;

import java.io.File;
import java.io.IOException;

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
       String c =  FileUtils.readFileToString(new File("src/main/webapp/data/t.json"));
        a.createActivity(c, null, "abc");
    }

    @Test
    @Ignore
    public void testDeleteActivity(){


        a.deleteActivity("4e955d459b8e800001000003");

    }





}
