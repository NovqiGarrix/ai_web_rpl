
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
