import React from "react";
import { useModel } from "../api"

export default function PredictionForm() {
    const { predict, data, loading } = useModel();
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = React.useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (formRef.current) {
                const formData = new FormData(formRef.current);
                predict(formData);
            }
        },
        [predict, formRef]
    )

    return (
        <>
            <form ref={formRef} onSubmit={handleSubmit}>
                <label htmlFor="image">Image</label>
                <input data-testid="file" type="file" name="file" id="image" />
                <button type="submit">Predict</button>
            </form>
            {
                loading && <p>Loading...</p>
            }
            {
                data && (
                    <div>
                        {data.map((data, k) =>
                            <div key={k}>
                                {data[0]}:{data[1]}
                            </div>
                        )}
                    </div>
                )
            }
        </>
    )
}