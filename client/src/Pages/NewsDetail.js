import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./NewsDetail.css";
import api from '../server.js';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(api.newsGetID)
            .then(res => res.json())
            .then(data => setNewsItem(data))
            .catch(err => console.error("Ошибка при получении новости:", err));
    }, [id]);

    const openModal = (path) => {
        setSelectedImage(path);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    if (!newsItem) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="news-detail-info">
            <h1>Новости</h1>
            <div className="purple-line"></div>

            <div className="news-detail">
                <h2>{newsItem.NewsName}</h2>
                <p dangerouslySetInnerHTML={{ __html: newsItem.NewsDescription }} ></p>
            </div>

            <p onClick={() => navigate(-1)} className="back-link">Вернуться</p>

            {selectedImage && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Увеличенное фото" />
                        <button onClick={closeModal} className="close-modal">✖</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;
