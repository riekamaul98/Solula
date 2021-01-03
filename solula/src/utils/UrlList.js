import server from '../config/Server';

export default UrlList = function (param) {
  let url = '';

  if (param == 'save_cookies') {
    url = server + 'web?';
  } else if (param == 'login') {
    url = server + 'api/auth/token?';
  } else if (param == 'db_list') {
    url = server + 'api/auth/db.list';
  } else if (param == 'user_demo') {
    url = server + 'api/res.userd';
  } else if (param == 'save_device_id') {
    url = server + 'api/res.users/';
  } else if (param == 'delete_device_id') {
    url = server + 'api/auth/token/';
  } else if (param == 'login_demo') {
    url = server + 'api/auth/demo';
  } else if (param == 'approval_list') {
    url = server + 'api/approval.all/list?';
  } else if (param == 'approval') {
    url = server + 'api/approval.all/put';
  } else if (param == 'attendance_checkin') {
    url = server + 'api/hr.attendance';
  } else if (param == 'attendance_status') {
    url = server + 'api/hr.attendance/status?';
  } else if (param == 'attendance_checkout') {
    url = server + 'api/hr.attendance';
  } else if (param == 'attendance_list') {
    url = server + 'api/hr.attendance?';
  } else if (param == 'employee_list') {
    url = server + 'api/hr.employee?';
  } else if (param == 'change_password') {
    url = server + 'api/res.users/';
  } else if (param == 'overtime_list') {
    url = server + 'api/hr.drovertime?';
  } else if (param == 'overtime_add') {
    url = server + 'api/hr.drovertime';
  } else if (param == 'overtime_del') {
    url = server + 'api/hr.drovertime/';
  } else if (param == 'overtime_update') {
    url = server + 'api/hr.drovertime/';
  } else if (param == 'rattendance_list') {
    url = server + 'api/hr.rattendance?';
  } else if (param == 'rattendance_add') {
    url = server + 'api/hr.rattendance';
  } else if (param == 'rattendance_update') {
    url = server + 'api/hr.rattendance/';
  } else if (param == 'rattendance_del') {
    url = server + 'api/hr.rattendance/';
  } else if (param == 'expenses_list') {
    url = server + 'api/hr.expense.sheet/list?';
  } else if (param == 'expenses_detail') {
    url = server + 'api/hr.expense/cust?';
  } else if (param == 'expenses_summaryDetail') {
    url = server + 'api/hr.expense.sheet/cust?';
  } else if (param == 'expenses_productList') {
    url = server + 'api/product.prduct/expense?';
  } else if (param == 'get_attach_detail') {
    url = server + 'api/hr.expense/attach?';
  } else if (param == 'create_claim') {
    url = server + 'api/hr.expense/';
  } else if (param == 'delete_claim') {
    url = server + 'api/hr.expense/';
  } else if (param == 'create_attach_claim') {
    url = server + 'api/hr.expense/attach_post';
  } else if (param == 'update_attach_claim') {
    url = server + 'api/hr.expense/attach_put';
  } else if (param == 'create_summary_claim') {
    url = server + 'api/hr.expense.sheet';
  } else if (param == 'update_summary') {
    url = server + 'api/hr.expense.sheet/';
  } else if (param == 'expenses_history') {
    url = server + 'api/hr.expense.sheet/list?';
  } else if (param == 'payslip_list') {
    url = server + 'api/hr.payslip/cust?';
  } else if (param == 'profile_details') {
    url = server + 'api/hr.employee/profile?';
  } else if (param == 'profile_update') {
    url = server + 'api/hr.employee/';
  } else if (param == 'aloreq_list') {
    url = server + 'api/hr.aloreq?';
  } else if (param == 'aloreq_add') {
    url = server + 'api/hr.aloreq';
  } else if (param == 'aloreq_del') {
    url = server + 'api/hr.aloreq/';
  } else if (param == 'aloreq_update') {
    url = server + 'api/hr.aloreq/';
  } else if (param == 'leaves_submit') {
    url = server + 'api/hr.holidays';
  } else if (param == 'leaves_type') {
    url = server + 'api/hr.holidays.status/list?';
  } else if (param == 'leaves_history') {
    url = server + 'api/hr.holidays?';
  } else if (param == 'leaves_list') {
    url = server + 'api/hr.holidays?';
  } else if (param == 'create_attach_leaves') {
    url = server + 'api/hr.holidays/attach_post';
  } else if (param == 'delete_leaves') {
    url = server + 'api/hr.holidays/';
  } else if (param == 'leave_cancel') {
    url = server + 'api/hr.holidays.cancel';
  } else if (param == 'payslip_pdf') {
    url = server + 'api/report_export?';
  } else if (param == 'notification') {
    url = server + 'api/ml.notification?';
  } else if (param == 'mobile_slider') {
    url = server + 'api/hr.slider?';
  } else if (param == 'mobile_news') {
    url = server + 'api/hr.news?';
  } else if (param == 'mobile_papaya') {
    url = server + 'api/hr.employee/';
  } else if (param == 'mobile_ticket') {
    url = 'http://103.219.248.51:8069/api/website.support.ticket';
  }

  return url;
};
