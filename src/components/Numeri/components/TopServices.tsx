"use client";

import CardWrapper from "./CardWrapper";

import { useRef } from "react";
import ChartServices from "./ChartServices";
import { useTooltip } from "../shared/useTooltip";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

import topAreasSpec from "../assets/data/top-areas.vl.json";
import topAuthoritiesSpec from "../assets/data/top-authorities.vl.json";

const iconInfo = "/bootstrap-italia/dist/svg/sprites.svg#it-info-circle";

const TopServices = (): JSX.Element => {
  const refTooltip = useRef<HTMLAnchorElement>(null);

  useTooltip(refTooltip);

  return (
    <article>
      <div className="row my-3">
        <div className="col-md-6">
          <CardWrapper>
            <h5 className="fw-semibold">Principali enti attivi</h5>
            <p className="small">
              Ordinati per numero di notifiche depositate da sempre
              <a
                ref={refTooltip}
                data-bs-toggle="tooltip"
                title="Enti che hanno inviato almeno una notifica"
              >
                <svg className="icon icon-xs mb-1">
                  <use href={iconInfo}></use>
                </svg>
              </a>
            </p>
            <ChartServices spec={toVegaLiteSpec(topAuthoritiesSpec)} />
          </CardWrapper>
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <CardWrapper>
            <h5 className="fw-semibold">Principali ambiti</h5>
            <p className="small">
              Ordinati per numero di notifiche depositate da sempre{" "}
            </p>
            <ChartServices spec={toVegaLiteSpec(topAreasSpec)} />
          </CardWrapper>
        </div>
      </div>
    </article>
  );
};

export default TopServices;
