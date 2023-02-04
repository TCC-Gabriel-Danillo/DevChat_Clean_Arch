
import Constants from "expo-constants";

// GIT
export const GIT_CLIENT_SECRET = Constants?.manifest?.extra?.git_cliet_secret;
export const GIT_CLIENT_ID = Constants?.manifest?.extra?.git_client_id;
export const GIT_AUTHORIZATION_ENDPOINT = Constants?.manifest?.extra?.git_authorization_endpoint;
export const GIT_TOKEN_ENDPOINT = Constants?.manifest?.extra?.git_token_endpoint;
export const GIT_REVOCATION_ENDPOINT = Constants?.manifest?.extra?.git_revocation_endpoint;

// FIREBASE
export const FIREBASE_API_KEY = Constants?.manifest?.extra?.firebase_api_key;
export const FIREBASE_AUTH_DOMAIN = Constants?.manifest?.extra?.firebase_auth_domain;
export const FIREBASE_PROJECT_ID = Constants?.manifest?.extra?.firebase_project_id;
export const FIREBASE_STORAGE_BUCKET = Constants?.manifest?.extra?.firebase_storage_bucket;
export const FIREBASE_MESSAGING_SENDER_ID = Constants?.manifest?.extra?.firebase_messaging_sender_id;
export const FIREBASE_APP_ID = Constants?.manifest?.extra?.firebase_app_id;
export const FIREBASE_MEASUREMENT_ID = Constants?.manifest?.extra?.firebase_measurement_id;

// APP 
export const APP_SCHEME = Constants?.manifest?.extra?.app_scheme;

// MONGO
export const MONGO_DATABASE_URI = Constants?.manifest?.extra?.mongo_database_uri