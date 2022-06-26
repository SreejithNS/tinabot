import React from "react";
import { useModel } from "../api";

export default function PredictionForm() {
    const { predict, data, loading, error } = useModel();
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
    );

    return (
        <>
            <form className="form animate__animated animate__fadeIn" ref={formRef} onSubmit={handleSubmit}>
                <div className="my-3">
                    {/* <label className="form-label" htmlFor="image">
                        Image
                    </label> */}
                    <input required className="form-control animate__animated animate__pulse" data-testid="file" type="file" name="file" id="image" />
                </div>
                <button disabled={loading} className={`btn btn-primary ${loading ? "disabled" : ""}`} type="submit">
                    Predict
                    {loading && <span className="spinner-border spinner-border-sm ms-2 fade show" role="status" aria-hidden="true"></span>}
                </button>
            </form>
            {
                error && <div className="my-3 alert alert-danger">{error.message}</div>
            }
            <div className={"my-3 fade alert alert-primary alert-dismissible " + (data ? "show" : "hide")} role="alert">
                {data?.map((data, k) => (
                    <div key={k}>
                        {data[0]}:{data[1]}
                    </div>
                ))}
            </div>
        </>
    );
}
