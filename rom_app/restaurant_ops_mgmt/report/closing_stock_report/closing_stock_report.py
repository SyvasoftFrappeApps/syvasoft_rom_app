# Copyright (c) 2025, Pubs and contributors
# For license information, please see license.txt

import frappe
from frappe.utils import flt

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_columns():
    return [
        {"label": "Branch", "fieldname": "branch", "fieldtype": "Data", "width": 150},
        {"label": "Raw Material", "fieldname": "raw_material", "fieldtype": "Data", "width": 300},
        {"label": "RM Group", "fieldname": "rm_group", "fieldtype": "Data", "width": 180},
        {"label": "Qty", "fieldname": "total_qty", "fieldtype": "Float", "width": 120},
        {"label": "Price", "fieldname": "total_price", "fieldtype": "Currency", "width": 120},
        {"label": "Amount", "fieldname": "total_amount", "fieldtype": "Currency", "width": 130},
    ]

def get_data(filters):
    conditions = ""
    sql_filters = {}

    if filters.get("branch"):
        conditions += " AND trms.branch = %(branch)s"
        sql_filters["branch"] = filters["branch"]

    # if filters.get("raw_material"):
    #     conditions += " AND raw_material = %(raw_material)s"
    #     sql_filters["raw_material"] = filters["raw_material"]

    # if filters.get("raw_material_like"):
    #     conditions += " AND raw_material LIKE %(raw_material_like)s"
    #     sql_filters["raw_material_like"] = filters["raw_material_like"]

    if filters.get("rm_group"):
        conditions += " AND trms.name = %(rm_group)s"
        sql_filters["rm_group"] = filters["rm_group"]

    return frappe.db.sql(f"""
        SELECT
            trms.branch,
            trms.raw_material,
            trms.rm_group,
            trms.total_qty,
            trms.total_price,
            trms.total_amount,
            trms.report_date
        FROM
            `tabRaw Material Summary` trms
        WHERE
            trms.docstatus < 2 {conditions}
            AND trms.raw_material IS NOT NULL
        ORDER BY
            report_date DESC
    """, sql_filters, as_dict=True)