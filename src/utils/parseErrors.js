export default function (errors) {
    const result = {};

    for (const errorsKey in errors) {
        result[errorsKey] = errors[errorsKey].message;
    }

    return result;
}
