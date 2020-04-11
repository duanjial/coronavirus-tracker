package home.coronavirustracker.models;

import java.util.ArrayList;
import java.util.List;

public class HistoricalStats {
    private String state;
    private String country;
    private List<Integer> historicalData = new ArrayList<>();
    private List<String> dateHeaders = new ArrayList<>();

    public List<String> getDateHeaders() {
        return dateHeaders;
    }

    public void setDateHeaders(List<String> dateHeaders) {
        this.dateHeaders = dateHeaders;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public List<Integer> getHistoricalData() {
        return historicalData;
    }

    public void setHistoricalData(List<Integer> historicalData) {
        this.historicalData = historicalData;
    }
}
