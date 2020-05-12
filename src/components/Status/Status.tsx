import React from "react";
import classNames from "classnames";

import "./Status.scss";

const Status = ({ online }: any) => (
    <span className={classNames("status", { "status--online": online })}>
        {online ? "онлайн" : "офлайн"}
    </span>
);

export default Status;