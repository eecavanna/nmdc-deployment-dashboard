import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api.ts";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ValueIndicator from "../ValueIndicator.tsx";
import Timestamp from "./Timestamp.tsx";
import Duration from "./Duration.tsx";

interface Props {
  /* Date/time that will be used as a reference when displaying relative time (e.g. "x hours ago"). */
  baseDate: Date;
}

const CronJobsTable: React.FC<Props> = ({ baseDate }) => {
  const productionDataPortalIngestCronJobTimestamps = useQuery({
    queryKey: ["getProductionDataPortalIngestCronJobTimestamps"],
    queryFn: api.getProductionDataPortalIngestCronJobTimestamps,
  });
  const productionMongoBackupCronJobTimestamps = useQuery({
    queryKey: ["getProductionMongoBackupCronJobTimestamps"],
    queryFn: api.getProductionMongoBackupCronJobTimestamps,
  });
  const productionPostgresBackupCronJobTimestamps = useQuery({
    queryKey: ["getProductionPostgresBackupCronJobTimestamps"],
    queryFn: api.getProductionPostgresBackupCronJobTimestamps,
  });
  const developmentDataPortalIngestCronJobTimestamps = useQuery({
    queryKey: ["getDevelopmentDataPortalIngestCronJobTimestamps"],
    queryFn: api.getDevelopmentDataPortalIngestCronJobTimestamps,
  });
  const napaMongoBackupCronJobTimestamps = useQuery({
    queryKey: ["getNapaMongoBackupCronJobTimestamps"],
    queryFn: api.getNapaMongoBackupCronJobTimestamps,
  });
  const sandboxClearSubmissionsCronJobTimestamps = useQuery({
    queryKey: ["getSandboxClearSubmissionsCronJobTimestamps"],
    queryFn: api.getSandboxClearSubmissionsCronJobTimestamps,
  });

  return (
    <Table bordered responsive>
      <thead className={"align-middle"}>
        <tr>
          <th scope={"col"}>Environment</th>
          <th scope={"col"}>CronJob</th>
          <th scope={"col"}>Last scheduled for</th>
          <th scope={"col"}>Last succeeded at</th>
          <th scope={"col"}>
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Body>
                    Time difference between when the CronJob was last scheduled
                    to run and when the CronJob last ran successfully.
                  </Popover.Body>
                </Popover>
              }
            >
              <span>Time difference</span>
            </OverlayTrigger>
          </th>
        </tr>
      </thead>
      <tbody className={"align-middle"}>
        <tr>
          <td>Production</td>
          <td>portal-ingest</td>
          <td>
            <ValueIndicator
              value={
                productionDataPortalIngestCronJobTimestamps.data
                  ?.lastScheduleTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionDataPortalIngestCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                productionDataPortalIngestCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionDataPortalIngestCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                productionDataPortalIngestCronJobTimestamps.data
                  ?.lastScheduleTime
              }
              endTimestampISOStr={
                productionDataPortalIngestCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              unit={"minutes"}
              {...productionDataPortalIngestCronJobTimestamps}
            />
          </td>
        </tr>
        <tr>
          <td>Production</td>
          <td>backup-mongo</td>
          <td>
            <ValueIndicator
              value={
                productionMongoBackupCronJobTimestamps.data?.lastScheduleTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionMongoBackupCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                productionMongoBackupCronJobTimestamps.data?.lastSuccessfulTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionMongoBackupCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                productionMongoBackupCronJobTimestamps.data?.lastScheduleTime
              }
              endTimestampISOStr={
                productionMongoBackupCronJobTimestamps.data?.lastSuccessfulTime
              }
              unit={"seconds"}
              {...productionMongoBackupCronJobTimestamps}
            />
          </td>
        </tr>
        <tr>
          <td>Production</td>
          <td>backup-postgres</td>
          <td>
            <ValueIndicator
              value={
                productionPostgresBackupCronJobTimestamps.data?.lastScheduleTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionPostgresBackupCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                productionPostgresBackupCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...productionPostgresBackupCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                productionPostgresBackupCronJobTimestamps.data?.lastScheduleTime
              }
              endTimestampISOStr={
                productionPostgresBackupCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              unit={"seconds"}
              {...productionPostgresBackupCronJobTimestamps}
            />
          </td>
        </tr>
        <tr>
          <td>Development</td>
          <td>portal-ingest</td>
          <td>
            <ValueIndicator
              value={
                developmentDataPortalIngestCronJobTimestamps.data
                  ?.lastScheduleTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...developmentDataPortalIngestCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                developmentDataPortalIngestCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...developmentDataPortalIngestCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                developmentDataPortalIngestCronJobTimestamps.data
                  ?.lastScheduleTime
              }
              endTimestampISOStr={
                developmentDataPortalIngestCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              unit={"minutes"}
              {...developmentDataPortalIngestCronJobTimestamps}
            />
          </td>
        </tr>
        <tr>
          <td>Napa</td>
          <td>backup-mongo</td>
          <td>
            <ValueIndicator
              value={napaMongoBackupCronJobTimestamps.data?.lastScheduleTime}
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...napaMongoBackupCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={napaMongoBackupCronJobTimestamps.data?.lastSuccessfulTime}
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...napaMongoBackupCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                napaMongoBackupCronJobTimestamps.data?.lastScheduleTime
              }
              endTimestampISOStr={
                napaMongoBackupCronJobTimestamps.data?.lastSuccessfulTime
              }
              unit={"seconds"}
              {...napaMongoBackupCronJobTimestamps}
            />
          </td>
        </tr>
        <tr>
          <td>Sandbox</td>
          <td>clear-submissions-cron-job</td>
          <td>
            <ValueIndicator
              value={
                sandboxClearSubmissionsCronJobTimestamps.data?.lastScheduleTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...sandboxClearSubmissionsCronJobTimestamps}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                sandboxClearSubmissionsCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              formatStr={(timestampStr) => (
                <Timestamp baseDate={baseDate} timestampStr={timestampStr} />
              )}
              {...sandboxClearSubmissionsCronJobTimestamps}
            />
          </td>
          <td>
            <Duration
              startTimestampISOStr={
                sandboxClearSubmissionsCronJobTimestamps.data?.lastScheduleTime
              }
              endTimestampISOStr={
                sandboxClearSubmissionsCronJobTimestamps.data
                  ?.lastSuccessfulTime
              }
              unit={"seconds"}
              {...sandboxClearSubmissionsCronJobTimestamps}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CronJobsTable;
