const port = 3000


export const getTopico = async () => {
    const response = await fetch(
        `http://localhost:${port}/topicos`
    );
    return await response.json();
};

export const getTopicoPost = async (topicoId) => {
    const response = await fetch(
        `http://localhost:${port}/topicos/${topicoId}/posts`
    );
    return await response.json();
};

export const postTopicoPost = async (topicoId,data) => {
    try {
        const config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        
        const response = await fetch(
            `http://localhost:${port}/topicos/${topicoId}/posts`, config)
        if (response.ok) {
            return response
        } else {

        }
    } catch (error) {

    }
    return await response.json();
};