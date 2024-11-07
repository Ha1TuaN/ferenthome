import axios from 'axios';

export const API_URL = 'http://localhost:5005';
export const requestGETAll = async (URL, query) => {
    try {
        const res = await axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
            params: {
                ...query,
            },
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const requestGET = async (URL) => {
    try {
        const res = await axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const requestPOST = async (URL, data) => {
    try {
        const res = await axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
            data,
        });

        return res.data;
    } catch (error) {
        return error ?? null;
    }
};

export const requestPUT = async (URL, data) => {
    try {
        const res = await axios({
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
            data,
        });

        return res;
    } catch (error) {
        return error ?? null;
    }
};

export const requestDELETE = async (URL) => {
    try {
        const res = await axios({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
        });

        return res.data;
    } catch (error) {
        return null;
    }
};
