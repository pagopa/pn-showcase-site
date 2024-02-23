"use client";
import { useRef } from "react";
import actsSpec from "../assets/data/acts.vl.json";
import servicesSpec from "../assets/data/services.vl.json";
import CardWrapper from "./CardWrapper";
import KpiAuthority from "./KpiAuthority";
import { useTooltip } from "../shared/useTooltip";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

const iconInfo = "/bootstrap-italia/dist/svg/sprites.svg#it-info-circle";

const KpiAuthoritiesServices = (): JSX.Element => {
  const refTooltip = useRef<HTMLAnchorElement>(null);
  useTooltip(refTooltip);

  return (
    <article>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <CardWrapper cardClass="bg-primary text-white">
            <h6>
              Enti attivi
              <a
                href="#"
                ref={refTooltip}
                data-bs-toggle="tooltip"
                title="Enti che hanno inviato almeno una notifica"
              >
                <svg className="icon icon-xs icon-white mb-1 mx-1">
                  <use href={iconInfo}></use>
                </svg>
              </a>
            </h6>
            <KpiAuthority
              className="d-block h3 fw-semibold"
              spec={toVegaLiteSpec(servicesSpec)}
            />
          </CardWrapper>
        </div>

        <div className="col-lg-4 mb-3">
          <CardWrapper cardClass="bg-primary text-white">
            <h6>Tipologie di atto</h6>
            <KpiAuthority
              className="d-block h3 fw-semibold"
              spec={toVegaLiteSpec(actsSpec)}
            />
          </CardWrapper>
        </div>
      </div>
    </article>
  );
};

export default KpiAuthoritiesServices;
