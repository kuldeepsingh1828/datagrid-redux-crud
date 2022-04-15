let intialState = [];
export default function reducer(state = intialState, action) {
    switch (action.type) {
        case 'READ': state = [...state, ...action.payload.users]
    }
    return state;
}