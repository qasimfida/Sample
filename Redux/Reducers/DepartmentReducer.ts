import {
    IDepartmentFilter,
    IDepartmentListFilter,
    IDepartmentModel,
    SortByOptionsDepartmentList,
    SortOrderOptions,
    IDepartmentSummaryList,
} from "app/models";
import { IRootState } from "app/Reducers/RootReducer";
import { DepartmentActions } from "app/actions/Department";
import { handleActions, Reducer } from "redux-actions";
import { StoreConstants } from "app/constants/StoreConstants";

export const departmentInitialState: IRootState.DepartmentState = {
    departments: StoreConstants.EmptyArray,
    departmentListCosts: {
        directory_count: 0,
        department_count: 0,
        azure_ea_department_cost: StoreConstants.EmptyArray,
    },
    departmentListCostsSmall: {
        directory_count: 0,
        department_count: 0,
        azure_ea_department_cost: StoreConstants.EmptyArray,
    },
    isLoadingDepartmentList: false,
    isLoadingDepartmentCosts: false,
    isLoadingDepartmentCostsSmall: false,
    curDepartmentListPageNumber: 1,
    departmentListCostsFilter: {
        startDate: StoreConstants.DefaultMomentLastThirtyDays,
        endDate: StoreConstants.DefaultMomentYesterday,
        sortBy: SortByOptionsDepartmentList.DEPARTMENT_NAME,
        sortOrder: SortOrderOptions.Asc,
    },
    departmentListCostsSmallFilter: {
        startDate: StoreConstants.DefaultMomentLastThirtyDays,
        endDate: StoreConstants.DefaultMomentYesterday,
        sortBy: SortByOptionsDepartmentList.DEPARTMENT_NAME,
        sortOrder: SortOrderOptions.Asc,
    },
    departmentFilter: {
        keyword: StoreConstants.EmptyString,
    },
};

export const departmentReducer: Reducer<IDepartmentModel, IDepartmentModel> = handleActions<
    IRootState.DepartmentState,
    IDepartmentModel | IDepartmentFilter | IDepartmentListFilter | IDepartmentSummaryList
>(
    {
        [DepartmentActions.Type.REQUEST_EA_DEPARTMENT_LIST]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            isLoadingDepartmentList: true,
        }),
        [DepartmentActions.Type.RECEIVE_APPEND_DEPARTMENT_LIST]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            isLoadingDepartmentCosts: false,
            isLoadingDepartmentCostsSmall: false,
            departmentListCosts: (action.payload as IDepartmentModel).departmentListCosts,
            curDepartmentListPageNumber: state.curDepartmentListPageNumber + 1,
        }),
        [DepartmentActions.Type.RECEIVE_EA_DEPARTMENT_LIST]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departments: (action.payload as IDepartmentModel).departments,
            isLoadingDepartmentList: false,
        }),
        [DepartmentActions.Type.FAILURE_EA_DEPARTMENT_LIST]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            isLoadingDepartmentList: false,
        }),
        [DepartmentActions.Type.REQUEST_DEPARTMENT_COSTS]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            isLoadingDepartmentCosts: true,
        }),
        [DepartmentActions.Type.RECEIVE_DEPARTMENT_COSTS]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCosts: (action.payload as IDepartmentModel).departmentListCosts,
            isLoadingDepartmentCosts: false,
            curDepartmentListPageNumber: state.curDepartmentListPageNumber + 1,
        }),
        [DepartmentActions.Type.FAILURE_DEPARTMENT_COSTS]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCosts: {
                directory_count: 0,
                department_count: 0,
                azure_ea_department_cost: [],
            },
            isLoadingDepartmentCosts: false,
            isLoadingDepartmentCostsSmall: false,
        }),
        [DepartmentActions.Type.REQUEST_DEPARTMENT_COSTS_SMALL]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            isLoadingDepartmentCostsSmall: true,
        }),
        [DepartmentActions.Type.RECEIVE_DEPARTMENT_COSTS_SMALL]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCostsSmall: (action.payload as IDepartmentModel).departmentListCostsSmall,
            isLoadingDepartmentCostsSmall: false,
        }),
        [DepartmentActions.Type.FAILURE_DEPARTMENT_COSTS]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCostsSmall: {
                directory_count: 0,
                department_count: 0,
                azure_ea_department_cost: [],
            },
            isLoadingDepartmentCostsSmall: false,
            isLoadingDepartmentCosts: false,
        }),
        [DepartmentActions.Type.CLEAR_DEPARTMENT_LIST]: (
            state = departmentInitialState
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCosts: {
                directory_count: 0,
                department_count: 0,
                azure_ea_department_cost: [],
            },
            curDepartmentListPageNumber: 1,
        }),
        [DepartmentActions.Type.CHANGE_DEPARTMENT_COSTS_SMALL_FILTER]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCostsSmallFilter: action.payload as IDepartmentListFilter,
        }),
        [DepartmentActions.Type.CHANGE_DEPARTMENT_COSTS_FILTER]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departmentListCostsFilter: action.payload as IDepartmentListFilter,
        }),
        [DepartmentActions.Type.UPDATE_DEPARTMENT_LIST_FILTER]: (
            state = departmentInitialState,
            action
        ): IRootState.DepartmentState => ({
            ...state,
            departmentFilter: action.payload as IDepartmentFilter,
        }),
    },
    departmentInitialState
);
