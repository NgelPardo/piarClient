import { usePiarStore } from "../../hooks";
import { CardForm } from "./";

export const CardList = () => {

  const { searchState, piars } = usePiarStore();

  const filteredPiars = piars.filter((piar) =>
    Object.values(piar).some(
      (field) =>
        field &&
        field.toString().toLowerCase().includes(searchState.toLowerCase())
    )
  );

  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {filteredPiars.length === 0 ? (
        <div className="col-12 text-center">
          <p>No se encontraron elementos.</p>
        </div>
      ): (
        filteredPiars.map((piar) => (
          <CardForm key={piar.id} {...piar} />
        ))
      )}
    </div>
  );
};
