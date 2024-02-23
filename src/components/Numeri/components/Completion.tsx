"use client";

import CardWrapper from "./CardWrapper";
import ChartSignal from "./ChartSignal";

import completionAvgTimeSpec from "../assets/data/completion-avg-time.vl.json";
import completionByMethodSpec from "../assets/data/completion-by-method.vl.json";
import { toVegaLiteSpec } from "../shared/toVegaLiteSpec";

type Props = {
  selYear: number | null;
};

const Completion = ({ selYear }: Props): JSX.Element => {
  return (
    <article>
      <div className="row my-3">
        <div className="col-md-6">
          <CardWrapper>
            <h5 className="fw-semibold">
              Perfezionamento per modalità di invio
            </h5>
            <p className="small">Dati in percentuale</p>
            <ChartSignal
              spec={toVegaLiteSpec(completionByMethodSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <CardWrapper>
            <h5 className="fw-semibold">
              Tempo medio di perfezionamento per modalità di invio
            </h5>
            <p className="small">Dati in giorni</p>
            <ChartSignal
              spec={toVegaLiteSpec(completionAvgTimeSpec)}
              yearSignal={selYear}
            />
          </CardWrapper>
        </div>
      </div>
    </article>
  );
};

export default Completion;
