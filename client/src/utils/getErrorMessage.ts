const getErrorMessage = (error: any): string => {
    if (error.response?.data?.message) {
        return error.response.data.message;
    }

    if (error.message) {
        return error.message;
    }

    if (error.response?.statusText) {
        return error.response.statusText;
    }

    return 'An unexpected error occured please try again';
    
}

export default getErrorMessage;