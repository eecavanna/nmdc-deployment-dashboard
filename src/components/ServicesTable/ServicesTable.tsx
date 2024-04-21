import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../lib/api.ts";
import { Box, Github, InfoCircle } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ValueIndicator from "../ValueIndicator.tsx";
import classes from "./ServicesTable.module.css";

const ServicesTable: React.FC = () => {
  const nmdcSchemaLatestPyPiPackageVersion = useQuery({
    queryKey: ["getNmdcSchemaLatestPyPiPackageVersion"],
    queryFn: api.getNmdcSchemaLatestPyPiPackageVersion,
  });
  const nmdcSchemaLatestGitHubReleaseTagName = useQuery({
    queryKey: ["getNmdcSchemaLatestGitHubReleaseTagName"],
    queryFn: api.getNmdcSchemaLatestGitHubReleaseTagName,
  });
  const productionRuntimeAppAndSchemaVersion = useQuery({
    queryKey: ["getProductionRuntimeAppAndSchemaVersion"],
    queryFn: api.getProductionRuntimeAppAndSchemaVersion,
  });
  const developmentRuntimeAppAndSchemaVersion = useQuery({
    queryKey: ["getDevelopmentRuntimeAppAndSchemaVersion"],
    queryFn: api.getDevelopmentRuntimeAppAndSchemaVersion,
  });
  const napaRuntimeAppAndSchemaVersion = useQuery({
    queryKey: ["getNapaRuntimeAppAndSchemaVersion"],
    queryFn: api.getNapaRuntimeAppAndSchemaVersion,
  });
  const productionDataPortalVersion = useQuery({
    queryKey: ["getProductionDataPortalVersion"],
    queryFn: api.getProductionDataPortalVersion,
  });
  const developmentDataPortalVersion = useQuery({
    queryKey: ["getDevelopmentDataPortalVersion"],
    queryFn: api.getDevelopmentDataPortalVersion,
  });
  const sandboxDataPortalVersion = useQuery({
    queryKey: ["getSandboxDataPortalVersion"],
    queryFn: api.getSandboxDataPortalVersion,
  });

  return (
    <Table bordered responsive>
      <thead className={"align-middle"}>
        <tr>
          <th scope={"col"}>Environment</th>
          <th scope={"col"}>Service</th>
          <th scope={"col"}>Application version</th>
          <th scope={"col"}>
            <span className={"me-2"}>Schema version</span>
            <OverlayTrigger
              rootClose={true}
              rootCloseEvent={"click"}
              trigger={"click"}
              placement={"top"}
              overlay={
                <Popover>
                  <Popover.Body className={"p-1"}>
                    <ListGroup variant={"flush"}>
                      <ListGroup.Item>
                        <span className={"text-body"}>
                          <Box className={"me-1"} />
                          <a
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={"text-decoration-none"}
                            href={"https://pypi.org/project/nmdc-schema"}
                            title={"Open PyPI in new tab"}
                          >
                            Latest PyPI Package
                          </a>
                        </span>
                        <ValueIndicator
                          value={
                            nmdcSchemaLatestPyPiPackageVersion.data?.version
                          }
                          {...nmdcSchemaLatestPyPiPackageVersion}
                        />
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span>
                          <Github className={"me-1"} />
                          <a
                            target={"_blank"}
                            rel={"noreferrer"}
                            className={"text-decoration-none"}
                            title={"Open GitHub in new tab"}
                            href={
                              "https://github.com/microbiomedata/nmdc-schema/releases/latest"
                            }
                          >
                            Latest GitHub Release
                          </a>
                        </span>
                        <ValueIndicator
                          value={
                            nmdcSchemaLatestGitHubReleaseTagName.data?.tagName
                          }
                          {...nmdcSchemaLatestGitHubReleaseTagName}
                        />
                      </ListGroup.Item>
                    </ListGroup>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button
                variant={"link"}
                size={"sm"}
                className={"p-0 align-text-bottom"}
                title={"Show details"}
              >
                <InfoCircle className={"text-body"} />
              </Button>
            </OverlayTrigger>
          </th>
        </tr>
      </thead>
      <tbody className={"align-middle"}>
        <tr>
          <td>Production</td>
          <td>Runtime</td>
          <td>
            <ValueIndicator
              value={
                productionRuntimeAppAndSchemaVersion.data?.["nmdc-runtime"]
              }
              {...productionRuntimeAppAndSchemaVersion}
            />
          </td>
          <td>
            <ValueIndicator
              value={productionRuntimeAppAndSchemaVersion.data?.["nmdc-schema"]}
              {...productionRuntimeAppAndSchemaVersion}
            />
          </td>
        </tr>
        <tr>
          <td>Production</td>
          <td>Data Portal</td>
          <td>
            <ValueIndicator
              value={productionDataPortalVersion.data?.version}
              {...productionDataPortalVersion}
            />
          </td>
          <td className={classes.nonData}></td>
        </tr>
        <tr>
          <td>Development</td>
          <td>Runtime</td>
          <td>
            <ValueIndicator
              value={
                developmentRuntimeAppAndSchemaVersion.data?.["nmdc-runtime"]
              }
              {...developmentRuntimeAppAndSchemaVersion}
            />
          </td>
          <td>
            <ValueIndicator
              value={
                developmentRuntimeAppAndSchemaVersion.data?.["nmdc-schema"]
              }
              {...developmentRuntimeAppAndSchemaVersion}
            />
          </td>
        </tr>
        <tr>
          <td>Development</td>
          <td>Data Portal</td>
          <td>
            <ValueIndicator
              value={developmentDataPortalVersion.data?.version}
              {...developmentDataPortalVersion}
            />
          </td>
          <td className={classes.nonData}></td>
        </tr>
        <tr>
          <td>Napa</td>
          <td>Runtime</td>
          <td>
            <ValueIndicator
              value={napaRuntimeAppAndSchemaVersion.data?.["nmdc-runtime"]}
              {...napaRuntimeAppAndSchemaVersion}
            />
          </td>
          <td>
            <ValueIndicator
              value={napaRuntimeAppAndSchemaVersion.data?.["nmdc-schema"]}
              {...napaRuntimeAppAndSchemaVersion}
            />
          </td>
        </tr>
        <tr>
          <td>Sandbox</td>
          <td>Data Portal</td>
          <td>
            <ValueIndicator
              value={sandboxDataPortalVersion.data?.version}
              {...sandboxDataPortalVersion}
            />
          </td>
          <td className={classes.nonData}></td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ServicesTable;
