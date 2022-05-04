/* global Module */

/* Magic Mirror
 * Module: MMM-Chart
 *
 * By Evghenii Marinescu https://github.com/MarinescuEvghenii/
 * MIT Licensed.
 */

Module.register("MMM-Chart-Prometheus", {
    defaults: {
        width       : 200,
        height      : 200,
        chartConfig : {
                plugins: [ChartDatasourcePrometheusPlugin],
                options: {
                        plugins: {
                                'datasource-prometheus': {
                                prometheus: {
                                        endpoint: "https://prometheus.demo.do.prometheus.io",
                                        baseURL: "/api/v1",   // default value
                                },
                                query: 'sum by (job) (go_gc_duration_seconds)',
                                timeRange: {
                                        type: 'relative',
                                
                                        // from 12 hours ago to now
                                        start: -12 * 60 * 60 * 1000,
                                        end: 0,
                                },
                                },
                        },
                },
        }
    },

    getScripts: function() {
		return ["modules/" + this.name + "/node_modules/chart.js/dist/Chart.bundle.min.js"];
	},

	start: function() {
        this.config = Object.assign({}, this.defaults, this.config);
		Log.info("Starting module: " + this.name);
	},

	getDom: function() {
        // Create wrapper element
        const wrapperEl = document.createElement("div");
        wrapperEl.setAttribute("style", "position: relative; display: inline-block;");

        // Create chart canvas
        const chartEl  = document.createElement("canvas");        

        // Init chart.js
        this.chart = new Chart(chartEl.getContext("2d"), this.config.chartConfig);
		
	// Set the size
	chartEl.width  = this.config.width;
        chartEl.height = this.config.height;
	chartEl.setAttribute("style", "display: block;");

        // Append chart
        wrapperEl.appendChild(chartEl);

		return wrapperEl;
	}
});
