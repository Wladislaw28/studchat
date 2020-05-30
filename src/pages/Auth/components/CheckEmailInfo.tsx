import React, { useEffect, useState } from "react";
import { Result, Button } from "antd";

import { userApi } from "../../../utils/api";
import { WhiteBlock } from "../../../components";

interface IInfoTextVerifyEmail {
    status: "success" | "error" | "404" | "500" | "403" | "info" | "warning";
    message: string;
}

const renderTextInfo = (hash: string, verified: boolean): IInfoTextVerifyEmail => {
    if (hash) {
        if (verified) {
            return {
                status: "success",
                message: "Аккаунт успешно подтвержден!"
            };
        } else {
            return {
                status: "error",
                message: "Ошибка при подтверждении аккаунта!"
            };
        }
    } else {
        return {
            status: "success",
            message: "Ссылка с подтверждением аккаунта отправлена на E-Mail."
        };
    }
};

const CheckEmailInfo = ({ location, history }: any) => {
    const [verified, setVerified] = useState(false);
    const hash: string = location.search.split("hash=")[1];
    const info: IInfoTextVerifyEmail = renderTextInfo(hash, verified);

    useEffect(() => {
        if (hash) {
            userApi.verifyHash(hash).then(({ data }: any) => {
                if (data.status === "success") {
                    setVerified(true);
                }
            });
        }
    });

    return (
        <div>
            <WhiteBlock>
                <Result
                    status={info.status}
                    title={info.status === "success" ? "Готово!" : "Ошибка"}
                    subTitle={info.message}
                    extra={
                        info.status === "success" &&
                        verified && (
                            <Button type="primary" onClick={() => history.push("/login")}>
                                Войти
                            </Button>
                        )
                    }
                />
            </WhiteBlock>
        </div>
    );
};

export default CheckEmailInfo;