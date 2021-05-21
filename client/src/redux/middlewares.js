import { getRequest } from "../service";
import { GET_USER_IF_ACTIVE, updateLoggedInUserFormData, indicationMessageHandler } from "./actions";

export const updateLoggedInUserFormDataMiddleware = ({dispatch}) => next => async action => {
    const userId = (localStorage.getItem('userId'));
    if(!userId || action.type !== GET_USER_IF_ACTIVE) return next(action);
    try {
        const response = await getRequest('/user/' + userId , true );
        response.status === 200 && dispatch(updateLoggedInUserFormData(response.user));
    } catch(err) {
        dispatch(indicationMessageHandler('error','!An error occurred the form was not submitted'));
    }
    return next(action);
}
