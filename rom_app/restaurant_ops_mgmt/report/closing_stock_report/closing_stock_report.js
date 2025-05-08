// Copyright (c) 2025, Pubs and contributors
// For license information, please see license.txt

frappe.query_reports["Closing Stock Report"] = {
	onload: function (report) {
		report.page.add_inner_button("Generate Closing Stock Summary", function () {
			frappe.call({
				method: "rom_app.scheduled_tasks.generate_raw_material_summary",
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
			"options": "Branch"
		},
		// {
		// 	"fieldname": "raw_material",
		// 	"label": "Raw Material",
		// 	"fieldtype": "Link",
		// 	"options": "Raw Material Only"
		// },
		// {
		// 	"fieldname": "raw_material_like",
		// 	"label": "Raw Material (Like)",
		// 	"fieldtype": "Data",
		// 	"description": "Wildcard filter, e.g. %zucc%"
		// },
		{
			"fieldname": "rm_group",
			"label": "RM Group",
			"fieldtype": "Data"
		}
		]
};
