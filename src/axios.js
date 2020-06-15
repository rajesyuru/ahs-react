import axios from 'axios';

const baseUrl = 'https://ahs-merdeka.herokuapp.com/api/v1';

export const get = async (path, success = () => {}, error = () => {}) => {
    try {
        let config = {};

        let token = localStorage.getItem('token');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        let resp = await axios.get(`${baseUrl}${path}`, config);

        if (resp.status === 200) {
            success(resp.data);
        } else {
            error(resp.data);
        }
    } catch (err) {
        if (
            err.response &&
            err.response.data &&
            err.response.data.message === 'jwt expired'
        ) {
            // refresh token
            await refreshToken();

            // re-run
            await get(path, success, error);
        } else {
            error(err.response && err.response.data);
        }
    }
};

export const post = async (
    path,
    payload,
    success = () => {},
    error = () => {}
) => {
    try {
        let resp = await axios.post(`${baseUrl}${path}`, payload);

        if (resp.status === 200) {
            success(resp.data);
        } else {
            error(resp.data);
        }
    } catch (err) {
        error(err.response && err.response.data);
    }
};

export const postWithAuth = async (
    path,
    payload,
    success = () => {},
    error = () => {}
) => {
    try {
        let config = {};

        let token = localStorage.getItem('token');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        let resp = await axios.post(`${baseUrl}${path}`, payload, config);

        if (resp.status === 200) {
            success(resp.data);
        } else {
            error(resp.data);
        }
    } catch (err) {
        if (
            err.response &&
            err.response.data &&
            err.response.data.message === 'jwt expired'
        ) {
            // refresh token
            await refreshToken();

            // re-run
            await postWithAuth(path, payload, success, error);
        } else {
            error(err.response && err.response.data);
        }
    }
};

const refreshToken = async () => {
    let config = {};

    let token = localStorage.getItem('refreshToken');

    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    try {
        let resp = await axios.post(
            `${baseUrl}/auth/refresh-token`,
            {},
            config
        );

        let newToken = resp.data.token;
        localStorage.setItem('token', newToken);
    } catch (err) {
        console.log(err);
    }
};

export const put = async (
    path,
    payload,
    success = () => {},
    error = () => {}
) => {
    try {
        let config = {};

        let token = localStorage.getItem('token');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }

        let resp = await axios.put(`${baseUrl}${path}`, payload, config);

        if (resp.status === 200) {
            success(resp.data);
        } else {
            error(resp.data);
        }
    } catch (err) {
        if (
            err.response &&
            err.response.data &&
            err.response.data.message === 'jwt expired'
        ) {
            // refresh token
            await refreshToken();

            // re-run
            await put(path, payload, success, error);
        } else {
            error(err.response && err.response.data);
        }
    }
};
