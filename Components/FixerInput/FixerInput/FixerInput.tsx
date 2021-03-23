import * as React from "react";
import * as classNames from "classnames";
import * as Style from "./FixerInput.css";

import InputValid from "../../../../assets/input_valid.svg";
import InputInvalid from "../../../../assets/input_invalid.svg";

namespace FixerInput {
    export interface IProps {
        value: string;
        placeholder?: string;
        disabled?: boolean;
        type: "text" | "textarea";
        valid?: boolean;
        isInvalid?: boolean | null;
        message?: string;
        icon?: string;
        readOnly?: boolean;
        onChange: (event: any) => void;
    }
}

export const FixerInput: React.SFC<FixerInput.IProps> = props => (
    <div className={Style.fixerInput} style={{ height: "inherit" }}>
        {props.type === "textarea" ? (
            <textarea
                className={classNames(
                    {
                        [Style.fixerInput__invalid]: props.valid && props.isInvalid,
                    },
                    Style.fixerInput__textarea
                )}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        ) : (
            <input
                className={classNames({
                    [Style.fixerInput__invalid]: props.valid && props.isInvalid,
                })}
                type={props.type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
                readOnly={props.readOnly}
            />
        )}

        {props.icon && (
            <img
                src={props.icon}
                className={classNames(Style.fixerInput__validIcon, {
                    [Style.show]: !props.valid,
                })}
                alt="icon"
            />
        )}

        <img
            src={InputValid}
            className={classNames(Style.fixerInput__validIcon, {
                [Style.show]: props.valid && !props.isInvalid && props.isInvalid !== null,
            })}
        />

        <img
            src={InputInvalid}
            className={classNames(Style.fixerInput__validIcon, {
                [Style.show]: props.valid && props.isInvalid,
            })}
        />

        {props.isInvalid !== null ? (
            <div
                className={classNames(
                    Style.fixerInput__invalidMessage,
                    {
                        [Style.show]: props.valid && props.isInvalid,
                        [Style.fixerInput__invalidMessageInput]: props.type === "text",
                        [Style.fixerInput__invalidMessageTextarea]: props.type === "textarea",
                    },
                )}
            >
                {props.message}
            </div>
        ) : null}
    </div>
);
