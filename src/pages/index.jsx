import {React, useState} from 'react';

// Componentes
import SingleAlert from '../components/alerts/singeAlert';
import MovieList from '../components/movies';

// APIs
import {getMovies} from '../api/movies';

const styles = {
    movieImage: {
        width: '25%'
    },
    growingSpinner: {
        marginRight: '10px'
    }
}

function MainPage () {
    const [errorData, setErrorData] = useState(null);
    const [searchData, setSearchData] = useState({});
    const [fieldsDisabled, setFieldsDisabled] = useState(false);
    const [loadingResultData, setLoadingResultData] = useState(false);
    const [resultData, setResultData] = useState(null);

    const handleChange = (e) => {
        setSearchData({
            ...searchData,
            [e.target.name]: e.target.value
        });
    }

    const clearFilmList = () => {
        setResultData(null);
        setSearchData({
            ...searchData,
            query: ''
        });
    };

    const searchFilm = async () => {

        if (Object.keys(searchData).length === 0 || searchData.query === '') {
            setErrorData({
                type: 'danger',
                text: 'Para buscar debes ingresar necesariamente el nombre de una película o serie.'
            });
            return;
        }
        setErrorData(null);
        setResultData(null);

        setLoadingResultData(true);
        setFieldsDisabled(true);

        // Searching for data ...
        const response = await getMovies(searchData);

        setLoadingResultData(false);
        setFieldsDisabled(false);
        
        if (!response.ok) {
            // Error en la comunicación con la API
            setErrorData({
                type: 'danger',
                text: '¡Vaya! Al parecer algo está fallando. Inténtalo nuevamente más tarde.'
            });
            return;
        }

        const responseData = await response.json();
        setResultData(responseData);

    }

    return (
        <div className="container text-center">
            <img className="img-responsive mt-5" src="https://www.pngkit.com/png/full/81-817867_open-clapperboard.png" style={styles.movieImage} /> 
        
            <h2 className="text-center mt-5">Buscador de películas y series</h2>
            <hr />

            <p className="mt-2">Ingresa a continuación el nombre de la película o serie que quieres buscar</p>
            <div className="row d-flex justify-content-center">
                <div className="form-group col-md-4 mt-2" style={{textAlign: 'center'}}>
                    <input 
                        id="input-movie-name"
                        type="text" 
                        name="query" 
                        value={searchData.query}
                        className="form-control col-md-4" 
                        placeholder="Película o serie" 
                        onChange={handleChange}
                        disabled={fieldsDisabled}
                    />
                </div>   
            </div>

            <button 
                className="btn btn-secondary mt-4" 
                onClick={searchFilm}
                hidden={fieldsDisabled}
            >
                Buscar
            </button>

            {resultData !== null ? (
                <button 
                style={{marginLeft: '10px'}}
                className="btn btn-danger mt-4" 
                onClick={clearFilmList}
                >
                    Borrar resultados
                </button>
            ) : null}

            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    {errorData !== null ? 
                    <SingleAlert className="mt-4" type={errorData.type} text={errorData.text} />
                    : null}  
                </div>   
            </div>

            {loadingResultData ? (

                <div className="mt-4">
                    <div className="spinner-grow text-secondary" style={styles.growingSpinner} role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-secondary" style={styles.growingSpinner} role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-secondary" style={styles.growingSpinner} role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>

            ) : null}
            
            {resultData !== null ? <MovieList resultData={resultData} /> : null}

            
            

        </div>
        
    )
}


export default MainPage;