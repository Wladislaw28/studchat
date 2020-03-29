export const validateField = (key: string, touched: any, errors: any) => {
    if(touched[key]) {
        if(errors[key]){
            return "error";
        } else {
            return "success";
        }
    } else {
        return "";
    }
};