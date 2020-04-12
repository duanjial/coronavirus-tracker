package home.coronavirustracker.controllers;

import home.coronavirustracker.services.CoronaVirusDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AllStatsController {

    @Autowired
    CoronaVirusDataService coronaVirusDataService;

    @GetMapping("/allStats")
    public String allStats() {
//        List<LocationStats> allStats = coronaVirusDataService.getAllStats();
        String jsonAllStats = coronaVirusDataService.getJsonAllStats();
//        int totalCases = allStats.stream().mapToInt(stat -> stat.getLatestTotalCases()).sum();
//        model.addAttribute("locationStats", allStats);
//        model.addAttribute("totalReportedCases", totalCases);
        return jsonAllStats;
    }

    @GetMapping("/allHistoricalStats")
    public String allHistoricalStats() {
        String jsonAllHistoricalStats = coronaVirusDataService.getJsonAllHistoricalStats();
        return jsonAllHistoricalStats;
    }

    @GetMapping("/allRecoveredStats")
    public String allRecoveredStats() {
        String jsonAllRecoveredStats = coronaVirusDataService.getJsonAllRecoveredStats();
        return jsonAllRecoveredStats;
    }

    @GetMapping("/allRecoveredHistoricalStats")
    public String allRecoveredHistoricalStats() {
        String jsonAllReocveredHistoricalStats = coronaVirusDataService.getJsonAllRecoveredHistoricalStats();
        return jsonAllReocveredHistoricalStats;
    }

    @GetMapping("/allDeathsStats")
    public String allDeathsStats() {
        String jsonAllDeathsStats = coronaVirusDataService.getJsonAllDeathsStats();
        return jsonAllDeathsStats;
    }

    @GetMapping("/allDeathsHistoricalStats")
    public String allDeathsHistoricalStats() {
        String jsonAllDeathsHistoricalStats = coronaVirusDataService.getJsonAllDeathsHistoricalStats();
        return jsonAllDeathsHistoricalStats;
    }
}
