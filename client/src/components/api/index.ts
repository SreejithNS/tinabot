import useAxios from "axios-hooks";
import React from "react";

export function useModel() {
    const [{ error, loading, data }, submit] = useAxios<{
        top_categories: [string, number][]
    }>("/image", { manual: true });

    const submitHandler = React.useCallback((data: File | FormData) => {
        let formData;
        if (data instanceof File) {
            formData = new FormData();
            formData.append("file", data);
        } else {
            formData = data;
        }

        return submit({
            method: "POST",
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });
    }, [submit]);

    return {
        error,
        loading,
        predict: submitHandler,
        data: data?.top_categories
    }
}