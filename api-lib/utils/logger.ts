



const LoggerFn = () => {
    const error: (fn: any, msg: any) => void = (fn = undefined, msg) => {
        console.log('%c error inside function ', 'background: lime; color: black', { fn, msg });
    }

    const debug: (fn: any, msg: any) => void = (fn = undefined, msg) => {
        console.log('%c Debug inside function ', 'background: lime; color: black', { fn, msg });
    }


    return {
        error,
        debug
    }
}



const Logger = LoggerFn()

export default Logger