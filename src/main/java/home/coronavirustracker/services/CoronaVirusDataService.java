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

    private static String RECOVERED_VIRUS_DATA_URL= "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv";

    private static String DEATHS_VIRUS_DATA_URL = "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv";

    private List<LocationStats> allStats = new ArrayList<>();

    private List<HistoricalStats> allHistoricalStats = new ArrayList<>();

    private List<LocationStats> allRecoveredStats = new ArrayList<>();

    private List<HistoricalStats> allRecoveredHistoricalStats = new ArrayList<>();

    private List<LocationStats> allDeathsStats = new ArrayList<>();

    private List<HistoricalStats> allDeathsHistoricalStats = new ArrayList<>();

    private String jsonAllStats;

    private String jsonAllHistoricalStats;

    private String jsonAllRecoveredStats;

    private String jsonAllRecoveredHistoricalStats;

    private String jsonAllDeathsStats;

    private String jsonAllDeathsHistoricalStats;

    public void setAllStats(List<LocationStats> allStats) {
        this.allStats = allStats;
    }

    public void setAllHistoricalStats(List<HistoricalStats> allHistoricalStats) {
        this.allHistoricalStats = allHistoricalStats;
    }

    public void setAllRecoveredStats(List<LocationStats> allRecoveredStats) {
        this.allRecoveredStats = allRecoveredStats;
    }

    public void setAllRecoveredHistoricalStats(List<HistoricalStats> allRecoveredHistoricalStats) {
        this.allRecoveredHistoricalStats = allRecoveredHistoricalStats;
    }

    public void setAllDeathsStats(List<LocationStats> allDeathsStats) {
        this.allDeathsStats = allDeathsStats;
    }

    public void setAllDeathsHistoricalStats(List<HistoricalStats> allDeathsHistoricalStats) {
        this.allDeathsHistoricalStats = allDeathsHistoricalStats;
    }

    public void setJsonAllStats(String jsonAllStats) {
        this.jsonAllStats = jsonAllStats;
    }

    public void setJsonAllRecoveredStats(String jsonAllRecoveredStats) {
        this.jsonAllRecoveredStats = jsonAllRecoveredStats;
    }

    public void setJsonAllRecoveredHistoricalStats(String jsonAllRecoveredHistoricalStats) {
        this.jsonAllRecoveredHistoricalStats = jsonAllRecoveredHistoricalStats;
    }

    public void setJsonAllDeathsStats(String jsonAllDeathsStats) {
        this.jsonAllDeathsStats = jsonAllDeathsStats;
    }

    public void setJsonAllHistoricalStats(String jsonAllHistoricalStats) {
        this.jsonAllHistoricalStats = jsonAllHistoricalStats;
    }

    public void setJsonAllDeathsHistoricalStats(String jsonAllDeathsHistoricalStats) {
        this.jsonAllDeathsHistoricalStats = jsonAllDeathsHistoricalStats;
    }

    public String getJsonAllRecoveredStats() {
        return jsonAllRecoveredStats;
    }

    public String getJsonAllRecoveredHistoricalStats() {
        return jsonAllRecoveredHistoricalStats;
    }

    public String getJsonAllDeathsStats() {
        return jsonAllDeathsStats;
    }

    public String getJsonAllDeathsHistoricalStats() {
        return jsonAllDeathsHistoricalStats;
    }

    public String getJsonAllStats() {
        return jsonAllStats;
    }

    public String getJsonAllHistoricalStats() {
        return jsonAllHistoricalStats;
    }

    @PostConstruct
    @Scheduled(cron = "* * 1 * * *")
    public void fetchVirusData() throws IOException, InterruptedException{

        Gson gsonBuilder = new GsonBuilder().create();

        // Get latest update number
        Iterable<CSVRecord> allRecords = fetch(VIRUS_DATA_URL);
        List<LocationStats> newStats = storeLatestUpdatedData(allRecords);
        this.setJsonAllStats(gsonBuilder.toJson(newStats));
        setAllStats(newStats);

        // Get all historical number
        Iterable<CSVRecord> allHistoricalRecords = fetch(VIRUS_DATA_URL);
        List<HistoricalStats> newHistoricalStats = storeHistoricalData(allHistoricalRecords);
        this.setJsonAllHistoricalStats(gsonBuilder.toJson(newHistoricalStats));
        this.setAllHistoricalStats(newHistoricalStats);

        // Get latest update recovered number
        Iterable<CSVRecord> allRecoveredRecords = fetch(RECOVERED_VIRUS_DATA_URL);
        List<LocationStats> newRecoveredStats = storeLatestUpdatedData(allRecoveredRecords);
        this.setJsonAllRecoveredStats(gsonBuilder.toJson(newRecoveredStats));
        this.setAllRecoveredStats(newRecoveredStats);

        // Get all recovered historical number
        Iterable<CSVRecord> allRecoveredHistoricalRecords = fetch(RECOVERED_VIRUS_DATA_URL);
        List<HistoricalStats> newRecoveredHistoricalStats = storeHistoricalData(allRecoveredHistoricalRecords);
        this.setJsonAllRecoveredHistoricalStats(gsonBuilder.toJson(newRecoveredHistoricalStats));
        this.setAllRecoveredHistoricalStats(newRecoveredHistoricalStats);

        // Get latest update deaths number
        Iterable<CSVRecord> allDeathsRecords = fetch(DEATHS_VIRUS_DATA_URL);
        List<LocationStats> newDeathsStats = storeLatestUpdatedData(allDeathsRecords);
        this.setJsonAllDeathsStats(gsonBuilder.toJson(newDeathsStats));
        this.setAllDeathsStats(newDeathsStats);

        // Get all deaths historical number
        Iterable<CSVRecord> allDeathsHistoricalRecords = fetch(DEATHS_VIRUS_DATA_URL);
        List<HistoricalStats> newDeathsHistoricalStats = storeHistoricalData(allDeathsHistoricalRecords);
        this.setJsonAllDeathsHistoricalStats(gsonBuilder.toJson(newDeathsHistoricalStats));
        this.setAllDeathsHistoricalStats(newDeathsHistoricalStats);


    }

    // Private function to fetch from url
    private Iterable<CSVRecord> fetch(String url) throws IOException, InterruptedException{
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).build();

        HttpResponse<String> httpResponse = client.send(request, HttpResponse.BodyHandlers.ofString());

        StringReader csvBodyReader = new StringReader(httpResponse.body());

        Iterable<CSVRecord> records = CSVFormat.RFC4180.parse(csvBodyReader);
        return records;
    }

    // Private function to store latest update data
    private List<HistoricalStats>  storeHistoricalData(Iterable<CSVRecord> records) {
        // Get historical stats for the globe
        int rowIndex = 0;
        List<HistoricalStats> newHistoricalStats = new ArrayList<>();
        List<String> dateHeaders = new ArrayList<>();
        for(CSVRecord record: records) {
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
        return newHistoricalStats;
    }

    // Private function to store all historical data
    private List storeLatestUpdatedData(Iterable<CSVRecord> records) {
        // get latest updated stats for the globe
        int rowIndex = 0;
        List<LocationStats> newStats = new ArrayList<>();
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
        return newStats;
    }
}
