export const numberWithCommas = (x) => {
    if (!x) {
        return ''
    }
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const addErrorIntoField = (errors) => errors ? { error: true } : { error: false };
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;