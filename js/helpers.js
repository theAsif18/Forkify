import { async } from "regenerator-runtime";

export const getJSON = async function (url) {
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    }
    catch (err) {
        alert(err);
    }
}

export const sendJSON = async function (url, uploadData) {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    }
    catch (err) {
        alert(err);
    }
}