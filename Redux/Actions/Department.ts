import { createAction } from "redux-actions";
import { push } from "react-router-redux";
import { IRootState } from "app/Reducers/State";
import { Dispatch } from "redux";
import { ApiHelper } from "app/helpers/api-helper";
import { LocalStorageActions } from "app/actions/LocalStorage";
import {
    AccountTypes,
    IDepartmentListFilter,
    IDepartmentModel,
    IDepartmentDetails,
    IDepartmentSummaryList,
    SortByOptionsDepartmentListRequest,
    ISupportedRoutes,
    IDepartmentFilter,
} from "app/models";
import { StoreConstants } from "app/constants/StoreConstants";

export namespace DepartmentActions {
    export enum Type {
        REQUEST_EA_DEPARTMENT_LIST = "REQUEST_EA_DEPARTMENT_LIST",
        RECEIVE_EA_DEPARTMENT_LIST = "RECEIVE_EA_DEPARTMENT_LIST",
        FAILURE_EA_DEPARTMENT_LIST = "FAILURE_EA_DEPARTMENT_LIST",

        REQUEST_DEPARTMENT_COSTS = "REQUEST_DEPARTMENT_COSTS",
        RECEIVE_DEPARTMENT_COSTS = "RECEIVE_DEPARTMENT_COSTS",
        FAILURE_DEPARTMENT_COSTS = "FAILURE_DEPARTMENT_COSTS",

        REQUEST_DEPARTMENT_COSTS_SMALL = "REQUEST_DEPARTMENT_COSTS_SMALL",
        RECEIVE_DEPARTMENT_COSTS_SMALL = "RECEIVE_DEPARTMENT_COSTS_SMALL",
        FAILURE_DEPARTMENT_COSTS_SMALL = "FAILURE_DEPARTMENT_COSTS_SMALL",

        RECEIVE_APPEND_DEPARTMENT_LIST = "RECEIVE_APPEND_DEPARTMENT_LIST",
        CLEAR_DEPARTMENT_LIST = "CLEAR_DEPARTMENT_LIST",
        CHANGE_DEPARTMENT_COSTS_SMALL_FILTER = "CHANGE_DEPARTMENT_COSTS_SMALL_FILTER",
        CHANGE_DEPARTMENT_COSTS_FILTER = "CHANGE_DEPARTMENT_COSTS_FILTER",
        UPDATE_DEPARTMENT_LIST_FILTER = "UPDATE_DEPARTMENT_LIST_FILTER",
    }

    export const requestEaDepartmentList = createAction(Type.REQUEST_EA_DEPARTMENT_LIST);
    export const receiveEaDepartmentList = createAction<IDepartmentModel>(
        Type.RECEIVE_EA_DEPARTMENT_LIST
    );
    export const failureEaDepartmentList = createAction(Type.FAILURE_EA_DEPARTMENT_LIST);

    export const requestDepartmentCosts = createAction(Type.REQUEST_DEPARTMENT_COSTS);
    export const receiveDepartmentCosts = createAction<IDepartmentModel>(
        Type.RECEIVE_DEPARTMENT_COSTS
    );
    export const failureDepartmentCosts = createAction(Type.FAILURE_DEPARTMENT_COSTS);

    export const requestDepartmentCostsSmall = createAction(Type.REQUEST_DEPARTMENT_COSTS_SMALL);
    export const receiveDepartmentCostsSmall = createAction<IDepartmentModel>(
        Type.RECEIVE_DEPARTMENT_COSTS_SMALL
    );
    export const failureDepartmentCostsSmall = createAction(Type.FAILURE_DEPARTMENT_COSTS_SMALL);

    export const receiveAppendDepartmentList = createAction<IDepartmentModel>(
        Type.RECEIVE_APPEND_DEPARTMENT_LIST
    );

    export const clearDepartmentList = createAction(Type.CLEAR_DEPARTMENT_LIST);

    export const changeDepartmentCostsSmallFilter = createAction<IDepartmentListFilter>(
        Type.CHANGE_DEPARTMENT_COSTS_SMALL_FILTER
    );

    export const changeDepartmentCostsFilter = createAction<IDepartmentListFilter>(
        Type.CHANGE_DEPARTMENT_COSTS_FILTER
    );

    export const updateDepartmentListFilter = createAction<IDepartmentFilter>(
        Type.UPDATE_DEPARTMENT_LIST_FILTER
    );

    export const fetchDepartmentCost = (
        parentAccountId: string,
        pageNumber: number,
        pageSize: number,
        isCostsPerDepartment?: boolean,
        isAppending?: boolean
    ) => {
        return async (dispatch: Dispatch, getState: () => IRootState) => {
            const { department, localStorage } = getState();
            const filter = isCostsPerDepartment
                ? department.departmentListCostsSmallFilter
                : department.departmentListCostsFilter;
            const { startDate, endDate, sortOrder, sortBy, keyword } = filter;
            const startDateFormatted = startDate.format("YYYY-MM-DD");
            const endDateFormatted = endDate.format("YYYY-MM-DD");

            try {
                isCostsPerDepartment
                    ? dispatch(requestDepartmentCostsSmall())
                    : dispatch(requestDepartmentCosts());

                let parent_account_id: string =
                    parentAccountId &&
                    !parentAccountId.isNullOrWhitespace() &&
                    parentAccountId !== StoreConstants.EmptyIdentifier
                        ? parentAccountId
                        : localStorage.parent_account_id;

                let requestObject = {
                    parent_account_id: parent_account_id,
                    start_date: startDateFormatted,
                    end_date: endDateFormatted,
                    page_number: pageNumber,
                    page_size: pageSize,
                    sort_by: SortByOptionsDepartmentListRequest[sortBy],
                    sort_order: sortOrder,
                    ...(keyword && { keyword: keyword }),
                };

                const response = await new ApiHelper().FetchFromPortal(
                    "/WidgetDataProvider/AzureEaWidgetData",
                    "/GetEaAccountCostsPerDepartmentWidget",
                    "GET",
                    true,
                    requestObject
                );

                if (response.isError) {
                    isCostsPerDepartment
                        ? dispatch(failureDepartmentCostsSmall())
                        : dispatch(failureDepartmentCosts());
                } else {
                    const departmentListObject = response.data as IDepartmentSummaryList;
                    if (isCostsPerDepartment) {
                        dispatch(
                            receiveDepartmentCostsSmall({
                                ...department,
                                departmentListCostsSmall: departmentListObject,
                            })
                        );
                    } else {
                        if (isAppending) {
                            dispatch(
                                receiveAppendDepartmentList({
                                    ...department,
                                    departmentListCosts: {
                                        ...department.departmentListCosts,
                                        azure_ea_department_cost: department.departmentListCosts.azure_ea_department_cost.concat(
                                            departmentListObject.azure_ea_department_cost
                                        ),
                                    },
                                })
                            );
                        } else {
                            dispatch(
                                receiveDepartmentCosts({
                                    ...department,
                                    departmentListCosts: departmentListObject,
                                })
                            );
                        }
                    }
                }
            } catch (error) {
                isCostsPerDepartment
                    ? dispatch(failureDepartmentCostsSmall())
                    : dispatch(failureDepartmentCosts());
            }
        };
    };

    export const fetchEaDepartmentList = (parentAccountId: string | null) => {
        return async (dispatch: Dispatch, getState: () => IRootState) => {
            const { department, localStorage } = getState();
            const {
                departmentFilter: { keyword },
            } = department;
            try {
                dispatch(requestEaDepartmentList());

                let parent_account_id: string =
                    parentAccountId && !parentAccountId.isNullOrWhitespace()
                        ? parentAccountId
                        : localStorage.parent_account_id;

                const requestObject = {
                    parent_account_id: parent_account_id,
                    keyword,
                };

                const response = await new ApiHelper().FetchFromPortal(
                    "/CloudAccounts/AzureEaAccount",
                    "/GetAzureEaDepartmentsByParentAccountId",
                    "GET",
                    true,
                    requestObject
                );

                if (response.isError) {
                    dispatch(failureEaDepartmentList());
                } else {
                    const eaAccountId = response.data.target_ea_account_id;
                    const departmentList = response.data.departments as IDepartmentDetails[];

                    LocalStorageActions.setItem("ea_account_id", eaAccountId)(dispatch, getState);

                    dispatch(
                        receiveEaDepartmentList({
                            ...department,
                            departments: departmentList,
                        })
                    );
                }
            } catch (error) {
                dispatch(failureEaDepartmentList());
            }
        };
    };

    export const fetchDepartmentList = () => {
        return async (dispatch: Dispatch, getState: () => IRootState) => {
            const { account } = getState();

            switch (account.selectedAccount.account_type) {
                case AccountTypes.CSP_DIRECT:
                case AccountTypes.CSP_INDIRECT:
                    break;
                case AccountTypes.EA:
                default:
                    fetchEaDepartmentList(account.selectedAccount.id)(dispatch, getState);
                    break;
            }
        };
    };

    export const changeCostsSmallFilter = (filter: IDepartmentListFilter) => {
        return async (dispatch: Dispatch) => {
            dispatch(changeDepartmentCostsSmallFilter(filter));
        };
    };

    export const changeCostsFilter = (filter: IDepartmentListFilter) => {
        return async (dispatch: Dispatch) => {
            dispatch(changeDepartmentCostsFilter(filter));
        };
    };

    export const clearDepartmentListFilter = () => {
        return async (dispatch: Dispatch) => {
            dispatch(
                updateDepartmentListFilter({
                    keyword: "",
                })
            );
        };
    };

    export const goToSingleDepartment = (departmentId: string) => {
        return async (dispatch: Dispatch, getState: () => IRootState) => {
            LocalStorageActions.setItem("department_id", departmentId)(dispatch, getState);
            dispatch(push(ISupportedRoutes.SINGLE_DEPARTMENT));
        };
    };
}

export type DepartmentActions = Omit<typeof DepartmentActions, "Type">;
