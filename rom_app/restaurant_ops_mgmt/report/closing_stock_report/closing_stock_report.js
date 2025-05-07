// Copyright (c) 2025, Pubs and contributors
// For license information, please see license.txt

frappe.query_reports["Closing Stock Report"] = {
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
