import axios from "axios";
import { JSONPath } from "jsonpath-plus";

/**
 * Returns the value at the specified JSON path, within the specified JSON value.
 * Returns `undefined` if the value is not found.
 */
const getValueAtJsonPath = <T>(path: string, json = {}): T | undefined => {
  return JSONPath({
    path: path,
    json: json,
    wrap: false,
  });
};

/**
 * Returns a Promise that resolves to the JSON payload of the HTTP response.
 * Returns a Promise that resolves to `undefined` if the HTTP request fails.
 */
const fetchJson = async (url: string) => {
  try {
    const response = await axios.get(url, { timeout: 3000 });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const getProductionRuntimeAppAndSchemaVersion = async () => {
  const json = await fetchJson("https://api.microbiomedata.org/version");
  return {
    "nmdc-runtime": getValueAtJsonPath<string>("$.nmdc-runtime", json),
    "nmdc-schema": getValueAtJsonPath<string>("$.nmdc-schema", json),
  };
};

const getDevelopmentRuntimeAppAndSchemaVersion = async () => {
  const json = await fetchJson("https://api-dev.microbiomedata.org/version");
  return {
    "nmdc-runtime": getValueAtJsonPath<string>("$.nmdc-runtime", json),
    "nmdc-schema": getValueAtJsonPath<string>("$.nmdc-schema", json),
  };
};

const getNapaRuntimeAppAndSchemaVersion = async () => {
  const json = await fetchJson("https://api-napa.microbiomedata.org/version");
  return {
    "nmdc-runtime": getValueAtJsonPath<string>("$.nmdc-runtime", json),
    "nmdc-schema": getValueAtJsonPath<string>("$.nmdc-schema", json),
  };
};

const getProductionDataPortalVersion = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/proxy/data.microbiomedata.org/api/version",
  );
  return {
    version: getValueAtJsonPath<string>("$.nmdc-server", json),
  };
};

const getDevelopmentDataPortalVersion = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/proxy/data-dev.microbiomedata.org/api/version",
  );
  return {
    version: getValueAtJsonPath<string>("$.nmdc-server", json),
  };
};

const getSandboxDataPortalVersion = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/proxy/data-sandbox.microbiomedata.org/api/version",
  );
  return {
    version: getValueAtJsonPath<string>("$.nmdc-server", json),
  };
};

const getNmdcSchemaLatestGitHubReleaseTagName = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/proxy/github.com/microbiomedata/nmdc-schema/releases/latest",
  );
  return {
    tagName: getValueAtJsonPath<string>("$.tag_name", json),
  };
};
const getNmdcSchemaLatestPyPiPackageVersion = async () => {
  const json = await fetchJson("https://pypi.org/pypi/nmdc-schema/json");
  return {
    version: getValueAtJsonPath<string>("$.info.version", json),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pluckCronJobTimestamps = (json: any) => {
  return {
    lastScheduleTime: getValueAtJsonPath<string>(
      "$.cronJobStatus.lastScheduleTime",
      json,
    ),
    lastSuccessfulTime: getValueAtJsonPath<string>(
      "$.cronJobStatus.lastSuccessfulTime",
      json,
    ),
  };
};

const getProductionDataPortalIngestCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc:portal-ingest",
  );
  return pluckCronJobTimestamps(json);
};

const getDevelopmentDataPortalIngestCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc-dev:portal-ingest",
  );
  return pluckCronJobTimestamps(json);
};

const getProductionMongoBackupCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc:backup-mongo",
  );
  return pluckCronJobTimestamps(json);
};

const getNapaMongoBackupCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc-napa:backup-mongo",
  );
  return pluckCronJobTimestamps(json);
};

const getProductionPostgresBackupCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc:backup-postgres",
  );
  return pluckCronJobTimestamps(json);
};

const getSandboxClearSubmissionsCronJobTimestamps = async () => {
  const json = await fetchJson(
    "https://nmdc-privileged-proxy.eecavanna.workers.dev/spin-proxy/workloads/cronjob:nmdc-sandbox:clear-submissions-cron-job",
  );
  return pluckCronJobTimestamps(json);
};

const api = {
  // Service endpoints:
  getProductionRuntimeAppAndSchemaVersion,
  getDevelopmentRuntimeAppAndSchemaVersion,
  getNapaRuntimeAppAndSchemaVersion,
  getProductionDataPortalVersion,
  getDevelopmentDataPortalVersion,
  getSandboxDataPortalVersion,
  getNmdcSchemaLatestGitHubReleaseTagName,
  getNmdcSchemaLatestPyPiPackageVersion,

  // CronJob endpoints:
  getProductionDataPortalIngestCronJobTimestamps,
  getDevelopmentDataPortalIngestCronJobTimestamps,
  getProductionMongoBackupCronJobTimestamps,
  getNapaMongoBackupCronJobTimestamps,
  getProductionPostgresBackupCronJobTimestamps,
  getSandboxClearSubmissionsCronJobTimestamps,
};

export default api;
