
export const updateArrayItemProperty  = ( formState, name, value, index, prop ) => {
    const updatedArrayItemProperty  = formState[ prop ].map(( item, i ) => {
        if ( i === index ) {
            const propertyName = name.split('.')[1];
            return { ...item, [ propertyName ]: value };
        } else {
            return item;
        }
    })

    return updatedArrayItemProperty ;
};

export const returnIndex = ( name ) => {
    return Number( name.match(/\[(\d+)\]/)[1] );
};