const ADD = 'ADD'
const REDUCE = 'REDUCE'
// 根据老的state和action 生成新的state
export function counter(state = 0, action) {
    switch (action.type) {
        case ADD:
            return state + 1
        case REDUCE:
            return state - 1
        default:
            return 10
    }
}
// ACTION creator
export function add() {
    return {
        type: ADD
    }
}
export function reduce() {
    return {
        type: REDUCE
    }
}
export function addAsync() {
    return diapatch => {
        setTimeout(() => {
            diapatch(add())
        }, 2000)
    }
}