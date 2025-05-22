import React, { Component } from "react";
import "./Documents.css";
import api from '../../server.js';

class Documents extends Component {
    state = {
        documents: [],
        categories: [],
    };

    componentDidMount() {
        fetch(api.document)
            .then(res => res.json())
            .then(data => this.setState({ documents: data }))
            .catch(err => console.error("Ошибка загрузки документов:", err));

        fetch(api.document)
            .then(res => res.json())
            .then(data => this.setState({ categories: data }))
            .catch(err => console.error("Ошибка загрузки категорий:", err));
    }

    render() {
        const { documents, categories } = this.state;

        return (
            <div className="documents-main-info">
                <p>Вы здесь: <a href="/">Главная</a> / <a href="/main-info"> Основные сведения </a> / Документы</p>
                <div className="documents-info">
                    <h1>Документы</h1>
                    <div className="purple-line"></div>

                    {categories.map(category => {
                        const filteredDocs = documents.filter(doc => doc.CategoryDocumentID === category.CategoryDocumentID);
                        if (filteredDocs.length === 0) return null;

                        return (
                            <div className="documents-category" key={category.CategoryDocumentID}>
                                <h2>{category.CategoryDocumentName}</h2>
                                <ul>
                                    {filteredDocs.map(doc => (
                                        <li key={doc.DocumentID}>
                                            <a href={doc.DocumentPath} target="_blank" rel="noopener noreferrer">
                                                {doc.DocumentName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default Documents;
