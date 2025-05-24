// Copyright (c) 2025, Pubs and contributors
// For license information, please see license.txt

frappe.query_reports["Closing Stock Report"] = {
	onload: function (report) {
		report.page.add_inner_button("Generate Closing Stock Summary", function () {
			const branch = report.get_filter_value('branch');
			const date = report.get_filter_value('date');

			// Validation
			if (!branch || !date) {
				frappe.msgprint({
					title: "Missing Filters",
					message: "Please select both <b>Branch</b> and <b>Date</b> before generating the summary.",
					indicator: "red"
				});
				return;
			}

			frappe.call({
				method: "rom_app.scheduled_tasks.generate_raw_material_summary",
				args: {
					branch: branch,
					date: date
				},
				freeze: true,
				freeze_message: "Processing Closing Stock...",
				callback: function (r) {
					if (!r.exc) {
						frappe.msgprint("Closing Stock generation completed.");
					}
				}
			});
		});
	},

	"filters": [
		{
			"fieldname": "branch",
			"label": "Branch",
			"fieldtype": "Link",
			"options": "Branch",
			"reqd": 1
		},
		{
			"fieldname": "rm_group",
			"label": "RM Group",
			"fieldtype": "Link",
			"options": "Raw Material Group"
		},
		{
			"fieldname": "date",
			"label": "Date",
			"fieldtype": "Date",
			"default": frappe.datetime.now_date(),
			"mandatory": 1
		},
		]
};
