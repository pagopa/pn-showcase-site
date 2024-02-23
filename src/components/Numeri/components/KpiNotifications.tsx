"use client";
import { useRef } from "react";
import CardWrapper from "./CardWrapper";
import KpiSignal from "./KpiSignal";
import { useTooltip } from "../shared/useTooltip";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";
import notificationsAnalogSpec from "../assets/data/notifications-analog.vl.json";
import notificationsDigitalSpec from "../assets/data/notifications-digital.vl.json";
import notificationsTotalSpec from "../assets/data/notifications-total.vl.json";


type Props = {
  selYear: number | null;
};

const iconInfo = "/bootstrap-italia/dist/svg/sprites.svg#it-info-circle";

const KpiNotifications = ({ selYear }: Props): JSX.Element => {
  const refTooltip = useRef<HTMLAnchorElement>(null);
  useTooltip(refTooltip);

  const isAllYears = selYear === null;
  const yearLabel = isAllYears ? "dal 2023" : `nel ${selYear}`;

  return (
    <article>
      <div className="row">
        <div className="col-lg-4 mb-3">
          <CardWrapper cardClass="bg-primary text-white">
            <h6>
              Totale notifiche {yearLabel}{" "}
              <a
                href="#"
                ref={refTooltip}
                className={!isAllYears ? "d-none" : ""}
                data-bs-toggle="tooltip"
                title="Somma delle notifiche che hanno intrapreso workflow analogico o digitale per raggiungere un destinatario"
              >
                <svg className="icon icon-xs icon-white mb-1">
                  <use href={iconInfo}></use>
                </svg>
              </a>
            </h6>
            <KpiSignal
              className="d-block h3 fw-semibold"
              spec={toVegaLiteSpec(notificationsTotalSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </div>

        <div className="col-lg-4 mb-3">
          <CardWrapper cardClass="bg-primary text-white">
            <h6>Totale notifiche analogiche</h6>
            <KpiSignal
              className="d-block h3 fw-semibold"
              spec={toVegaLiteSpec(notificationsAnalogSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </div>

        <div className="col-lg-4 mb-3">
          <CardWrapper cardClass="bg-primary text-white">
            <h6>Totale notifiche digitali</h6>
            <KpiSignal
              className="d-block h3 fw-semibold"
              spec={toVegaLiteSpec(notificationsDigitalSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </div>
      </div>
    </article>
  );
};

export default KpiNotifications;
