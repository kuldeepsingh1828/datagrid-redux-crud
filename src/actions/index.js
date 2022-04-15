export function create(payload) {
    return { type: "CREATE", payload }
}

export function read(payload) {
    return { type: "READ", payload }
}

export function update(payload) {
    return { type: "UPDATE", payload }
}

export function remove(payload) {
    return { type: "DELETE", payload }
}