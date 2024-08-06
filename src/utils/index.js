export const getTopico = async () => {
    const response = await fetch(
        `http://localhost:3000/topicos`
    );
    return response.json();
};

export const getTopicoPost = async (topicoId) => {
    const response = await fetch(
        `http://localhost:3000/topicos/${topicoId}/posts`
    );
    return response.json();
};
