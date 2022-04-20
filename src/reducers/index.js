let intialState = [];
export default function reducer(state = intialState, action) {
    switch (action.type) {
        case 'READ': state = [...state, ...action.payload.users]
            break;
        case 'UPDATE': state = [...state, ...action.payload.users]
            break;
        case 'DELETE': state = [...action.payload]
            break;
    }
    return state;
}