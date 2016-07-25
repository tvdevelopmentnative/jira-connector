"use strict";

module.exports = RapidViewClient;

/**
 * Used to access Jira REST endpoints in '/rest/greenhopper/1/rapidview'
 * @param {JiraClient} jiraClient
 * @constructor RapidViewClient
 */
function RapidViewClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of all dashboards, optionally filtering them.
     *
     * @method getAllRapidViews
     * @memberOf RapidViewClient#
     * @param opts The request options to send to the Jira API
     * @param callback Called when the dashboards have been retrieved.
     */
    this.getAllRapidViews = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/rapidview'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a single dashboard.
     *
     * @method getRapidView
     * @memberOf RapidViewClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.rapidViewID The rapid View id.
     * @param callback Called when the dashboard has been retrieved
     */
    this.getRapidView = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/rapidview/' + opts.rapidViewID),
            method: 'GET',
            json: true,
            followAllRedirects: true,
        };

        this.jiraClient.makeRequest(options, callback);
    }

}