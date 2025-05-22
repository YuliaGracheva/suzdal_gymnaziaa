import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import { withNavigation } from "../withNavigation.js";
import "./css/admin-menu.css";

class AdminMenu extends Component {
    handleLogout = () => {
        const confirmed = window.confirm("Вы уверены, что хотите выйти?");
        if (confirmed) {
            localStorage.removeItem("isAdmin");
            alert("Вы вышли из админ-панели.");
            this.props.navigate("/");
        }
    };

    render() {
        const userRole = JSON.parse(localStorage.getItem("adminUser"))?.Role;

        return (
            <div className="admin-menu">
                <Nav className="flex-column">
                    <Nav.Link onClick={() => this.props.navigate("/admin/main")}>
                        Главная
                    </Nav.Link>

                    {(userRole === "admin" || userRole === "editor" || userRole === "viewer") && (
                        <Nav.Link onClick={() => this.props.navigate("/admin/tables")}>
                            Управление таблицами
                        </Nav.Link>
                    )}

                    {userRole === "admin" && (
                        <Nav.Link onClick={() => this.props.navigate("/admin/user")}>
                            Управление пользователями
                        </Nav.Link>
                    )}

                    {userRole === "admin" && (
                        <Nav.Link onClick={() => this.props.navigate("/admin/settings")}>
                            Настройки
                        </Nav.Link>
                    )}

                    {(userRole === "admin" || userRole === "editor" || userRole === "viewer") && (
                        <Nav.Link onClick={() => this.props.navigate("/admin/upload")}>
                            Управление файлами
                        </Nav.Link>
                    )}

                    <Nav.Link onClick={this.handleLogout}>
                        Выйти
                    </Nav.Link>
                </Nav>
            </div>
        );
    }
}

export default withNavigation(AdminMenu);
