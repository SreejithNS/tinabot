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

export function useChatBot(props: { onMessage: (message: string) => void }) {
    const [{ error, loading, data }, submit, cancel] = useAxios<{
        "choices": {
            "text": string,
            "index": number,
            "logprobs": null | string,
            "finish_reason": string
        }[]
    }>("https://api.openai.com/v1/completions", { manual: true });

    const [prompt, setPrompt] = React.useState("The following is a conversation with Dr. Tina, an AI Dermatologist Chatbot. Dr. Tina knows everything in dermatology and hence, the Chatbot should NOT ask the human to consult another doctor. The chatbot and the doctor are from a Healthcare Technology Company named MUSTARD. The chatbot should act like a professional dermatologist and ask the human many questions regarding his/her skin problem and prescribe medicines and safety measures instead of asking the human to visit a doctor. It should introduce itself at the beginning of the conversation and enquire the human about his/her skin disease.\nReplace \"doctor\" with \"a doctor from MUSTARD\" in the conversation.Replace \"dermatologist\" with \"a dermatologist from MUSTARD\" in the conversation.\nThe chatbot also has an assistant, which is a computer vision based model which predicts the type of skin disease with the help of a picture already uploaded by the human, without the notice of the chatbot. The chatbot may use the result of this model to generate prescription for the human.\nThe assistant predicted that the human is suffering from a skin disease of type Rosacea.\n\nAI:");

    React.useEffect(() => {
        if (data?.choices[0]?.text) {
            console.log("Reply:" + data.choices[0].text);
            return () => {
                cancel();
            }
        }
    }, [data, cancel]);


    const submitHandler = React.useCallback((message?: string) => {
        const request = {
            "prompt": message ? prompt + "\n\nHuman:" + message + "\n\nAI:" : prompt,
            "model": "text-davinci-002",
            "temperature": 0.9,
            "max_tokens": 150,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0.6,
            "stop": ["AI", "Human"]
        }

        return submit({
            method: "POST",
            data: request,
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer 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"
            },
        }).then((response) => {
            setPrompt(request.prompt + response.data.choices[0]?.text);
            if (props.onMessage) props.onMessage(response.data.choices[0]?.text);
        });
    }, [prompt, props, submit]);

    return {
        send: submitHandler,
        chat: data?.choices[0].text,
        loading,
        error
    }
}