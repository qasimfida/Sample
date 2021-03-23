import { connect } from "react-redux";
import { Dispatch, bindActionCreators } from "redux";
import { Departments } from "app/components/Departments/Departments";

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

import { IRootState } from "app/Reducers/State";
import { omit } from "app/utils";

interface StateFromProps {
    account: IAccountModel;
    budgetPerformanceData: IBudgetPerformanceModel;
    department: IDepartmentModel;
    eaAccountSpendingTrend: IEaAccountSpendingTrendModel;
    localStorage: ILocalStorage;
}

interface DispatchFromProps {
    departmentActions: DepartmentActions;
    eaAccountSpendingTrendActions: EaAccountSpendingTrendActions;
    eaBudgetPerformanceActions: EaBudgetPerformanceActions;
}

const mapStateToProps = (state: IRootState): StateFromProps => ({
    account: state.account,
    budgetPerformanceData: state.budgetPerformanceData,
    department: state.department,
    eaAccountSpendingTrend: state.eaAccountSpendingTrend,
    localStorage: state.localStorage,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
    departmentActions: bindActionCreators(omit(DepartmentActions, "Type"), dispatch),
    eaAccountSpendingTrendActions: bindActionCreators(omit(EaAccountSpendingTrendActions, "Type"), dispatch),
    eaBudgetPerformanceActions: bindActionCreators(omit(EaBudgetPerformanceActions, "Type"), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Departments);