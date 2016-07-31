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

    /**
     * Adds an issue to a sprint
     *
     * @method addToSprint
     * @memberOf SprintClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.sprintId The sprint id.
     * @param opts.issueKey The key of the issue.
     * @param callback Called when the dashboard has been retrieved
     */
    this.addToSprint = function (opts, callback) {
        if (!opts.issue) {
            throw new Error('No Issue Passed');
        }

        var options = this.buildRequestOptions(opts, '', 'PUT', opts.issue);
        
        this.jiraClient.makeRequest(options, callback, 'Added to Sprint');
    }

    /**
     * Removes an issue from a sprint
     *
     * @method removeFromSprint
     * @memberOf SprintClient#
     * @param opts The request options sent to the Jira API.
     * @param opts.sprintId The sprint id.
     * @param opts.issueKey The key of the issue.
     * @param callback Called when the dashboard has been retrieved
     */
    this.removeFromSprint = function (opts, callback) {
        if (!opts.issueKey) {
            throw new Error('No Issue Passed');
        }
        var qs = {
            issues: opts.issueKey
        }
        var options = this.buildRequestOptions(opts, '', 'DELETE', opts.issue);
        
        this.jiraClient.makeRequest(options, callback, 'Removed from Sprint');
    }


    /**
     * Build out the request options necessary to make a particular API call.
     *
     * @private
     * @method buildRequestOptions
     * @param {Object} opts The arguments passed to the method.
     * @param {string} path The path of the endpoint following /issue/{idOrKey}
     * @param {string} method The request method.
     * @param {Object} [body] The request body, if any.
     * @param {Object} [qs] The querystring, if any.  opts.expand and opts.fields arrays will be automagically added.
     * @returns {{uri: string, method: string, body: Object, qs: Object, followAllRedirects: boolean, json: boolean}}
     */
    this.buildRequestOptions = function (opts, path, method, body, qs) {
        //rest/greenhopper/1.0/sprint/rank/210/remove?issues=IOSOCT-2172
        var basePath = '/sprint/rank/';
        if (!qs) qs = {};
        if (!body) body = {};

        return {
            uri: this.jiraClient.buildURL(basePath + path),
            method: method,
            body: body,
            qs: qs,
            followAllRedirects: true,
            json: true
        };
    }
}