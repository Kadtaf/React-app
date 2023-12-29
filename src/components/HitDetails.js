import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faDownload, faEye, faHeartCirclePlus} from "@fortawesome/free-solid-svg-icons";


const HitDetails = () => {
    const [hit, setHit] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const getHits = async () => {
            try {
                let url = `https://pixabay.com/api/?key=41457716-b5857a2d5a330eaf201a879d1&id=${id}`;
                const response = await axios.get(url);
                const hitData = response.data.hits[0];
                setHit(hitData || null);
            } catch (error) {
                console.error(error);
            }
        };

        getHits().then(r => r);
    }, [id]);

    if (!hit) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container col-md-8" key={hit.id}>
            <div className="card m-2">
                <div className="card-header">{hit.tags} | {hit.imageWidth} x {hit.imageHeight}</div>
                <div className="card-body">
                    <img className="card-img" src={hit.webformatURL} alt="photo" />
                </div>
                <div className="card-footer mt-3">
                    <div className="d-flex">
                        <div>
                            <h5>Photograph bay</h5>
                            <img width={120} className="img-thumbnail"  src={hit.userImageURL} alt="photo user" />
                            <h4>{hit.user}</h4>
                        </div>
                        <div>
                            <ul className="nav nav-pills ms-4">
                                <li className="badge bg-info text-dark m-2"><FontAwesomeIcon icon={faEye} className="me-2"/>Views : <strong>{hit.views}</strong></li>
                                <li className="badge bg-warning text-dark m-2"><FontAwesomeIcon icon={faComment} className="me-2" />Comments : <strong>{hit.comments}</strong></li>
                                <li className="badge bg-dark m-2"><FontAwesomeIcon icon={faDownload} className="me-2" />Downloads : <strong>{hit.downloads}</strong></li>
                                <li className="badge bg-danger m-2"><FontAwesomeIcon icon={faHeartCirclePlus} className="me-2"/>Likes : <strong>{hit.likes}</strong></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <Link to={'/gallery'} className="btn btn-success">Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HitDetails;
