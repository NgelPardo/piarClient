import { useState } from "react"
import { Firma } from "./Firma";

export const PiarFirmas = () => {

    const [signatures, setSignatures] = useState(['1','2','3']);
    
    const onAddSignature = () => {
        setSignatures([...signatures, {} ]);
    }

    const onRemoveSignature = (indexToRemove) => {
        setSignatures((prevSignatures) => prevSignatures.filter((_, index) => index !== indexToRemove));
    };

  return (
    <div className="col-10 px-5 py-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
        <div className="container">
            <div className="row">
            { signatures.map((signature, index) => (
                <Firma 
                    key={ index }
                    index={ index }
                    showConditionalDiv={ signatures.length > 3 && index > 2 }
                    onRemoveSignature={ onRemoveSignature }
                />
            ))}
            </div>
            <div className="row text-center my-2">
                <div className="col">
                    <div className="d-inline px-2">
                        <button 
                            type="button" 
                            className="btn bg-success py-2" 
                            style={{ color: '#f5f5f5', borderRadius: '20px' }}
                            onClick={ onAddSignature }
                        >
                            <i className="fa-solid fa-plus"></i></button>
                    </div>            
                </div>
            </div>
        </div>
    </div>
  )
}
