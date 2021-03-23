import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Row, Col } from "react-bootstrap";

import { DepartmentListContainer } from "app/components/Widgets/EntityListContainer/DepartmentListContainer";

// TODO: CC-3071 Uncomment the code when Graphs are enabled*/
// import * as classNames from "classnames";
// import * as Style from "app/components/Widgets/GlobalWidgetStyling.css";
// import { EaAccountSpendingTrendWidget } from "app/components/Widgets/EaAccountSpendingTrend/EaAccountSpendingTrendWidget";
// import BudgetPerformance from "./../../components/EAComponent/BudgetPerformance/BudgetPerformance";

import {
    IAccountModel,
    IBudgetPerformanceModel,
    IDepartmentModel,
    IEaAccountSpendingTrendModel,
    ILocalStorage,
} from "app/models";

import {
    DepartmentActions,
    EaAccountSpendingTrendActions,
    EaBudgetPerformanceActions,
} from "app/actions";

export namespace Departments {
    export interface IProps extends RouteComponentProps<void> {
        account: IAccountModel;
        budgetPerformanceData: IBudgetPerformanceModel;
        department: IDepartmentModel;
        eaAccountSpendingTrend: IEaAccountSpendingTrendModel;
        localStorage: ILocalStorage;
        departmentActions: DepartmentActions;
        eaAccountSpendingTrendActions: EaAccountSpendingTrendActions;
        eaBudgetPerformanceActions: EaBudgetPerformanceActions;
    }
}

export class Departments extends React.Component<Departments.IProps> {
    constructor(props: Departments.IProps) {
        super(props);
    }

    render(): JSX.Element {
        const { account, department, departmentActions } = this.props;

        return (
            <div>
                {/*CC-3071 TODO: Uncomment the code when Graphs enabled*/}

                {/* <Row>
                    <Col xs={12} sm={6} className={classNames("widgetCell", Style.widgetCell)}>
                        <EaAccountSpendingTrendWidget
                            account={account.selectedAccount}
                            eaAccountSpendingTrendData={eaAccountSpendingTrend}
                            eaAccountSpendingTrendActions={eaAccountSpendingTrendActions}
                        />
                    </Col>
                    <Col xs={12} sm={6} className={classNames("widgetCell", Style.widgetCell)}>
                        <BudgetPerformance
                            account={account.selectedAccount}
                            budgetPerformanceData={budgetPerformanceData}
                            budgetPerformanceActions={eaBudgetPerformanceActions}
                        />
                    </Col>
                </Row> */}
                <Row>
                    <Col xs={12} sm={12} className="widgetCell">
                        <DepartmentListContainer
                            accountId={account.selectedAccount.id}
                            departmentActions={departmentActions}
                            departments={department}
                            isLoading={department.isLoadingDepartmentCosts}
                            curDepartmentListPageNumber={department.curDepartmentListPageNumber}
                            departmentCount={department.departmentListCosts.department_count}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}
