"use strict";

module.exports = TeamCalendarClient;

/**
 * Used to access Jira REST endpoints in '/rest/greenhopper/1/rapidview'
 * @param {JiraClient} jiraClient
 * @constructor TeamCalendarClient
 */
function TeamCalendarClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of all sprints, optionally filtering them.
     *
     * @method getAllSprints
     * @memberOf TeamCalendarClient#
     * @param opts The request options to send to the Jira API
     * @param callback Called when the dashboards have been retrieved.
     */
    this.getAllSprints = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/integration/teamcalendars/sprint/list'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                jql: opts.jql
            }
        };
        this.jiraClient.makeRequest(options, callback);
    };

}