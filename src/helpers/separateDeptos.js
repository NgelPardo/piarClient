
export const separateDeptos = ( objetc = {} )  => {
    return [...new Set(objetc.map(depto => depto.departamento))];
};

export const separateMunis = ( objetc = {} ) => {
    return objetc.map(({ departamento, municipio }) => ({
        departamento,
        municipio
    }));
};