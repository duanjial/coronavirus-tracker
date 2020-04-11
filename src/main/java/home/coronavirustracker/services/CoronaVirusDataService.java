package home.coronavirustracker.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import home.coronavirustracker.models.HistoricalStats;
import home.coronavirustracker.models.LocationStats;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.StringReader;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import javax.annotation.PostConstruct;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
public class CoronaVirusDataService {

    private static String VIRUS_DATA_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";

    private List<LocationStats> allStats = new ArrayList<>();

    private List<HistoricalStats> allHistoricalStats = new ArrayList<>();

    private String jsonAllStats;

    private String jsonAllHistoricalStats;

    public String getJsonAllStats() {
        return jsonAllStats;
    }

    public List<LocationStats> getAllStats() {
        return allStats;
    }

    public String getJsonAllHistoricalStats() {
        return jsonAllHistoricalStats;
    }

    public void setJsonAllHistoricalStats(String jsonAllHistoricalStats) {
        this.jsonAllHistoricalStats = jsonAllHistoricalStats;
    }

    @PostConstruct
    @Scheduled(cron = "* * 1 * * *")
    public void fetchVirusData() throws IOException, InterruptedException{

        Gson gsonBuilder = new GsonBuilder().create();

        List<LocationStats> newStats = new ArrayList<>();

        List<HistoricalStats> newHistoricalStats = new ArrayList<>();

        Iterable<CSVRecord> records = fetch();

        // get latest updated stats for the globe
        int rowIndex = 0;
        String lastUpdatedDate = "";
        for (CSVRecord record : records) {
            if(rowIndex != 0) {
                LocationStats locationStats = new LocationStats();
                locationStats.setState(record.get(0));
                locationStats.setLastUpdatedDate(lastUpdatedDate);
                locationStats.setCountry(record.get(1));
                int latestCases = Integer.parseInt(record.get(record.size() - 1));
                int prevDayCases = Integer.parseInt(record.get(record.size() - 2));
                locationStats.setLatestTotalCases(latestCases);
                locationStats.setDiffFromPrevDay(latestCases - prevDayCases);
                newStats.add(locationStats);
            }else {
                lastUpdatedDate = record.get(record.size() - 1);
            }
            rowIndex ++;
        }

        // Get historical stats for the globe
        rowIndex = 0;
        Iterable<CSVRecord> historicalRecords = fetch();
        List<String> dateHeaders = new ArrayList<>();
        for(CSVRecord record: historicalRecords) {
            if(rowIndex == 0) {
                for(int i = 4; i < record.size(); i++) {
                    dateHeaders.add(record.get(i));
                }
            }else {
                HistoricalStats historicalData = new HistoricalStats();
                historicalData.setDateHeaders(dateHeaders);
                historicalData.setState(record.get(0));
                historicalData.setCountry(record.get(1));
                List<Integer> data = new ArrayList<>();
                for(int i = 4; i < record.size(); i ++) {
                    data.add(Integer.parseInt(record.get(i)));
                }
                historicalData.setHistoricalData(data);
                newHistoricalStats.add(historicalData);
            }
            rowIndex ++;
        }
        this.jsonAllStats = gsonBuilder.toJson(newStats);
        this.allStats = newStats;

        this.jsonAllHistoricalStats = gsonBuilder.toJson(newHistoricalStats);
        this.allHistoricalStats = newHistoricalStats;

    }

    private Iterable<CSVRecord> fetch() throws IOException, InterruptedException{
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(VIRUS_DATA_URL)).build();

        HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());

        StringReader csvBodyReader = new StringReader(httpResponse.body());

        Iterable<CSVRecord> records = CSVFormat.RFC4180.parse(csvBodyReader);
        return records;
    }
}
