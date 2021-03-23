import * as React from "react";
import * as Style from "./FixerConfirmDialog.css";
import { Modal } from "react-bootstrap";
import {
    FixerButton,
    FixerButtonStyling,
    FixerButtonSizing,
} from "app/components/common/FixerButton/FixerButton";

import CrossIcon from "../../../../assets/cross-blue.svg";
import Continue from "../../../../assets/continue-arrow.svg";

namespace FixerConfirmDialog {
    export interface IProps {
        openDialog: boolean;
        title?: string;
        icon?: string;
        body?: string;
        leftButtonText?: string;
        rightButtonText?: string;
        onCancelButtonClick: () => void;
        onConfirmButtonClick: () => void;
    }
}

export const FixerConfirmDialog: React.SFC<FixerConfirmDialog.IProps> = props => {
    return (
        <Modal
            onHide={props.onCancelButtonClick}
            show={props.openDialog}
            className={Style.confirmModal}
        >
            <Modal.Header className={Style.confirmModalHeader}>
                <div className={Style.modalMiddleIcon}>
                    {props.icon ? <img src={props.icon} /> : null}
                </div>
                <div className={Style.modalHeaderRightContainer}>
                    <div className={Style.closeButton} onClick={props.onCancelButtonClick}>
                        <img src={CrossIcon} alt={"Close Icon"} />
                    </div>
                </div>
            </Modal.Header>
            <Modal.Body className={Style.confirmModalBody}>
                <div className={Style.modalHeaderLeftContainer}>
                    <h4>{props.title ? props.title : "Are you sure you want to do this?"}</h4>
                </div>
                <div className={Style.finalMessage}>
                    <p>{props.body || "Success"}</p>
                </div>
            </Modal.Body>
            <Modal.Footer className={Style.confirmModalFooter}>
                <span>
                    <FixerButton
                        style={FixerButtonStyling.White}
                        size={FixerButtonSizing.Medium}
                        text={props.leftButtonText ? props.leftButtonText : "Cancel"}
                        width={130}
                        onClick={props.onCancelButtonClick}
                    />
                </span>
                <span>
                    <FixerButton
                        style={FixerButtonStyling.Blue}
                        icon={Continue}
                        size={FixerButtonSizing.Medium}
                        text={props.rightButtonText ? props.rightButtonText : "Confirm"}
                        width={130}
                        onClick={props.onConfirmButtonClick}
                    />
                </span>
            </Modal.Footer>
        </Modal>
    );
};
