import { AxiosRequestConfig } from 'axios';
import { environment } from '../env.json';

let APP_ENVIRONMENT = 'staging';

if (
    environment == 'production' ||
    environment == 'staging' ||
    environment == 'lando' ||
    environment == 'docker'
) {
    APP_ENVIRONMENT = environment;
}

// localhost folder
// let _LOCAL_URL = 'http://192.168.56.38'; // Ron
let _LOCAL_URL = 'http://0.0.0.0:8080'; // Neil
// let _LOCAL_URL = 'http://192.168.1.234:80'; // Charles
// let _LOCAL_URL = 'http://127.0.0.1:32789'; // Kit


let _CRM_URL = '';
let _CS_URL = '';
let _PRO_URL = '';

switch (APP_ENVIRONMENT) {
    case 'development':
        _CRM_URL = _LOCAL_URL + '/bliink-leads/beta/';
        _CS_URL = _LOCAL_URL + '/cornerstone-lhoopa/dev/';
        _PRO_URL = _LOCAL_URL + '/lhoopa-pro/';
        break;
    case 'lando':
        _CRM_URL = 'http://127.0.0.1:42070/';
        _CS_URL = 'http://127.0.0.1:42068/dev/';
        _PRO_URL = 'http://127.0.0.1:42071/';
        break;
    case 'docker':
        _CRM_URL = 'http://127.0.0.1:50003/';
        _CS_URL = 'http://127.0.0.1:50002/dev/';
        _PRO_URL = 'http://127.0.0.1:50006/';
        break;
    case 'staging':
        _CRM_URL = 'https://pre-prod.lhoopa.com/';
        _CS_URL = 'https://preproduction-lhoopa.cornerstone.ph/dev/';
        _PRO_URL = 'https://pre-prod.lhoopapro.com/';
        break;
    case 'production':
        _CRM_URL = 'https://crm.lhoopa.com/';
        _CS_URL = 'https://lhoopa.cornerstone.ph/dev/';
        _PRO_URL = 'https://lhoopapro.com/';
        break;
}

export const CRM_URL = _CRM_URL;
export const CS_URL = _CS_URL;
export const PRO_URL = _PRO_URL;

export const app_environment = APP_ENVIRONMENT;

export const api = {
    image_url: 'https://crm.lhoopa.com/files/thumb/',
    image_url_large: 'https://crm.lhoopa.com/files/large/',
    image_url_submitted_properties: _PRO_URL + 'files/thumb_updated/',
    image_url_submitted_properties_large: _PRO_URL + 'files/large_updated/',
    image_url_submitted_properties_crm: _CRM_URL + 'files/thumb/',
    login: _PRO_URL + 'auth/rest/login',
    login_fb: _PRO_URL + 'auth/rest/login_fb',
    test: _PRO_URL + 'auth/rest/test',
    get_inventories: _PRO_URL + 'inventories/rest/get_many',
    get_new_inventory: _PRO_URL + 'inventories/rest/get_new_inventory',
    get_inventory: _PRO_URL + 'inventories/rest/get',
    get_sales: _PRO_URL + 'sales/rest/get_many',
    get_sale: _PRO_URL + 'sales/rest/get',
    get_broker: _CS_URL + 'brokers/rest/get',
    update_profile: _CS_URL + 'brokers/rest/update',
    change_password: _CS_URL + 'brokers/rest/update_password',
    sync_test: _CS_URL + 'brokers/rest/test',
    get_barangay: _PRO_URL + 'ajax/dropdown/phil_barangays/brgyCode/name/citymunCode/',
    reserve: _PRO_URL + 'inventories/rest/reserve',
    send_phone_verification: _PRO_URL + 'inventories/rest/send_phone_verification',
    get_form_one: _PRO_URL + 'inventories/rest/get_formone',
    proposal: _PRO_URL + 'inventories/rest/proposal/',
    proposal_code: _PRO_URL + 'inventories/rest/get_proposal_code/',
    share_inventory: _PRO_URL + 'inventories/rest/share_inventory/',
    dashboard: _PRO_URL + 'inventories/rest/dashboard/',
    cancel_reserve: _PRO_URL + 'inventories/rest/reset_prereserved_new',
    get_realty_location: _CRM_URL + 'realty_locations/rest/select_realty_location/',
    get_user: _PRO_URL + 'users/rest/get_user',
    save_user: _PRO_URL + 'users/rest/save',
    get_user_auth: _PRO_URL + 'auth/rest/get_user',
    save_user_account: _PRO_URL + 'users/rest/save_user',
    get_commissions: _PRO_URL + 'agents/rest/get_commissions',
    get_documents: _PRO_URL + 'sales/rest/get_transaction_documents',
    get_document: _PRO_URL + 'sales/rest/get_transaction_document',
    update_document: _PRO_URL + 'sales/rest/update_cs_documents',
    get_remarks: _PRO_URL + 'activities/rest/get_remarks',
    save_remarks: _PRO_URL + 'activities/rest/save_remarks',
    get_communications: _PRO_URL + 'communications/rest/get_communications',
    save_communications: _PRO_URL + 'communications/rest/save',
    get_template_content: _PRO_URL + 'communications/rest/process_template',
    get_submitted_properties: _PRO_URL + 'inventories/rest/get_submitted_properties',
    get_submitted_properties_crm: _CRM_URL + 'online_leads/rest/get_online_leads',
    get_submitted_properties_count: _PRO_URL + 'inventories/rest/get_submitted_properties_count',
    get_submitted_properties_count_crm: _CRM_URL + 'inventories/rest/get_submitted_properties_count',
    hold_inventory: _PRO_URL + 'inventories/rest/hold_inventory',
    submit_property: _PRO_URL + 'listings/rest/save',
    submit_property_crm: _CRM_URL + 'online_leads/rest/save_online_lhoopa',
    get_property: _PRO_URL + 'listings/rest/get',
    get_property_crm: _CRM_URL + 'online_leads/rest/get_online_lead',
    get_submitted_property_options: _PRO_URL + 'inventories/rest/get_options',
    get_submitted_property_notif_logs: _PRO_URL + 'listings/rest/get_submitted_notification_logs',
    get_submitted_property_notif_logs_new: _PRO_URL + 'listings/rest/get_new_submitted_notification_logs',
    get_transaction_commission_count: _PRO_URL + 'sales_transactions/rest/upcoming_commission',
    get_transaction_cancelled: _PRO_URL + 'sales_transactions/rest/get_cancelled_transactions',
    get_transaction_reservation_commission: _PRO_URL + 'sales_transactions/rest/reservation_commission',
    get_transaction_downpayment_commission: _PRO_URL + 'sales_transactions/rest/dp_commission',
    get_transaction_lto_commission: _PRO_URL + 'sales_transactions/rest/lto_commission',
    get_transaction_post_collection_commission: _PRO_URL + 'sales_transactions/rest/dp2_commission',
    get_agent_network: _PRO_URL + 'agents/rest/get_agent_network',
    get_agent_details: _PRO_URL + 'agents/rest/get_agent',
    update_agent: _PRO_URL + 'agents/rest/update_agent',
    update_agent_account_status: _PRO_URL + 'agents/rest/update_agent_account_status',
    save_cb: _PRO_URL + 'clients/rest/save_edit',
    get_cb: _PRO_URL + 'clients/rest/get/',
    get_projects: _PRO_URL + 'inventories/rest/get_projects',
    delete_user_account: _PRO_URL + 'users/rest/delete_lhoopapro_account',
    update_push_token: _PRO_URL + 'users/rest/save_push_token',
    get_cb_clients: _PRO_URL + 'clients/rest/get_cb_clients',
    privacy_policy: _CRM_URL + 'website/simple_privacy_policy',
    get_available_provinces: _CRM_URL + 'online_leads/rest/get_available_provinces',
    get_banners: _PRO_URL + 'agents/rest/banners/get_many_by',
    get_user_payments: _PRO_URL + 'agents/rest/get_user_payments',
    update_user_payments: _PRO_URL + 'agents/rest/update_user_payments',
    get_announcements: _PRO_URL + 'agents/rest/get_announcements',
};

export const request: AxiosRequestConfig = {
    params: {
        app_type: 'broker_app',
        version: '2.2.1'
    },
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
};
