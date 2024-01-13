
// Alamat URL API
const API_BASE_URL =
    `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000'}/api/v1`;

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export async function signup(data: RegisterData) {

    const resp = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const { code, errors } = await resp.json();

    if (code !== 201) {
        throw new Error(errors[0].error);
    }

}

export interface LoginData {
    email: string;
    password: string;
}

export async function signin(data: LoginData): Promise<string> {

    const resp = await fetch(`${API_BASE_URL}/auth`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const { code, errors, token } = await resp.json();

    if (code !== 200) {
        throw new Error(errors[0].error);
    }

    return token;

}

export async function summarize(text: string, apiKey: string): Promise<string> {

    const resp = await fetch(`${API_BASE_URL}/model`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "X-API-KEY": apiKey
        }
    });

    const { code, errors, data: { output } } = await resp.json();

    if (code !== 200) {
        throw new Error(errors[0].error);
    }

    return output;

}

export interface User {
    id: string;
    name: string;
    email: string;
}

export async function getMe(): Promise<User> {

    const resp = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const { code, errors, data } = await resp.json();

    if (code !== 200) {
        throw new Error(errors[0].error);
    }

    return data;

}

export async function getApiKey(): Promise<string> {

    const resp = await fetch(`${API_BASE_URL}/api_key`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    const { code, errors, data } = await resp.json();

    if (code !== 200) {
        throw new Error(errors[0].error);
    }

    return data;

}