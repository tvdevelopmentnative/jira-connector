"use strict";

module.exports = BoardClient;

/**
 * Used to access Jira REST endpoints in '/rest/greenhopper/1/rapidview'
 * @param {JiraClient} jiraClient
 * @constructor BoardClient
 */
function BoardClient(jiraClient) {
    this.jiraClient = jiraClient;

    /**
     * Get a list of all board, optionally filtering them.
     *
     * @method getAllBoards
     * @memberOf BoardClient#
     * @param opts The request options to send to the Jira API
     * @param callback Called when the dashboards have been retrieved.
     */
    this.getAllBoards = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/board'),
            method: 'GET',
            json: true,
            followAllRedirects: true
        };
        this.jiraClient.makeRequest(options, callback);
    };

    /**
     * Get a single board.
     *
     * @method getBoard
     * @memberOf BoardClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.rapidViewID The rapid View id.
     * @param callback Called when the dashboard has been retrieved
     */
    this.getBoard = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/board/' + opts.boardID),
            method: 'GET',
            json: true,
            followAllRedirects: true,
        };

        this.jiraClient.makeRequest(options, callback);
    }

    /**
     * Get a single dashboard.
     *
     * @method getBoard
     * @memberOf BoardClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.rapidViewID The rapid View id.
     * @param callback Called when the dashboard has been retrieved
     */
    this.getBoardSprints = function (opts, callback) {
        var options = {
            uri: this.jiraClient.buildURL('/board/' + opts.boardID + '/sprint'),
            method: 'GET',
            json: true,
            followAllRedirects: true,
            qs: {
                state: opts.state,
                startAt: opts.startAt,
                maxResults: opts.maxResults
            }
        };

        this.jiraClient.makeRequest(options, callback);
    }
}