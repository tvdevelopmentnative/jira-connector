"use strict";

module.exports = SprintClient;

/**
 * Used to access Jira REST endpoints in '/rest/greenhopper/1/sprintquery'
 * @param {JiraClient} jiraClient
 * @constructor SprintClient
 */
function SprintClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of all sprints in a rapid view.
     *
     * @method getAllSprints
     * @memberOf SprintClient#
     * @param opts The request options to send to the Jira API
     * @param [opts.includeHistoricSprints] An optional filter that is applied to the list of radpiviews. Valid values include
     *     "true" for returning older sprints, and "false" for not returning older sprints.
     * @param [opts.includeFutureSprints] An optional filter that is applied to the list of radpiviews. Valid values include
     *     "true" for returning future sprints, and "false" for not returning future sprints.
     * @param callback Called when the dashboards have been retrieved.
     */
    this.getAllSprints = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/sprintquery/'+ opts.rapidViewID),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                includeHistoricSprints: opts.includeHistoricSprints,
                includeFutureSprints: opts.includeFutureSprints
            }
        };
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a single sprint report including all issues
     *
     * @method getSprint
     * @memberOf SprintClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.rapidViewId The rapid View id.
     * @param opts.sprintId The sprint id.
     * @param callback Called when the dashboard has been retrieved
     */
    this.getSprint = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/rapid/charts/sprintreport'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                rapidViewId: opts.rapidViewId,
                sprintId: opts.sprintId
            }
        };

        this.jiraClient.makeRequest(options, callback);
    }

}