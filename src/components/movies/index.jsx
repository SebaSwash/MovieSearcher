import React from 'react';

// Componentes
import SingleAlert from '../alerts/singeAlert';

// Utils
import { camelize } from '../../utils/caseConverter';

const SingleFilm = ({film}) => {

    film = camelize(film);

    return (
            <div className="col-md-3">
                <div className="card mt-4 filmCard">
                    <div className="card-header">
                        <strong>{film.originalTitle} ({film.originalLanguage})</strong>
                    </div>
                    <div className="card-body">
                        <p>{film.overview}</p>
                        <hr />
                        <p>Popularidad: <strong>{film.popularity}</strong></p>
                        <p>Rating promedio: <strong>{film.voteAverage}</strong></p>
                        <p>Cantidad de votos: <strong>{film.voteCount}</strong></p>
                        <p>Fecha de estreno: <strong>{film.releaseDate}</strong></p>

                        {film.adult ?
                            <strong>
                                <p class="text-danger">
                                    [!] Contenido para adultos
                                </p>
                            </strong>
                        : null}

                    </div>
                </div>
            </div>
        
    )
}

export default function MovieList({resultData}) {

    let {page, results} = resultData;
    let totalPages = resultData['total_pages'];
    let totalResults = resultData['total_results'];

    return (

        <div>

            {results.length !== 0 ? (
                <div className="mt-4">
                    <h3>Resultados obtenidos</h3>
                    <p>Cantidad total de resultados: <strong>{totalResults}</strong></p>
                    <p>Cantidad de resultados mostrados: <strong>{results.length}</strong></p>

                    <div className="row">
                        {results.map((film, index) => {
                            return <SingleFilm key={'film-card-' + index} film={film} />
                        })}
                    </div>

                    
                    
                </div>
            )
            : null}
        </div>
    );
}

