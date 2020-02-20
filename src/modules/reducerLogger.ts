type ReducerLogger = {
    state: any
    newState: any
    func: any
    action: any
}
export function reducerLogger({ state, newState, func, action }: ReducerLogger) {
    console.group("Action " + func.name)
    console.info("%cprev state", "color: grey; font-weight: bold", state);
    // console.info(blue + "action _bold_" + reset, action);
    console.info("%caction", "color: blue; font-weight: bold", action);
    // console.info(green + "next state _bold_" + reset, newState)
    console.info("%cnext state", "color: green; font-weight: bold", newState)
    console.groupEnd()
}