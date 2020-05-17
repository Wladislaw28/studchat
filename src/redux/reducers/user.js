const initialState = {
    data: null,
    isAuth: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case "USER:SET_DATA":
            return {
                ...state,
                data: payload,
                isAuth: true
            }
        default:
            return state;
    }
}