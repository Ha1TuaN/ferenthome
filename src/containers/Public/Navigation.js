import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString';
import { useDispatch, useSelector } from 'react-redux';

const notActive = 'hover:bg-secondary2 px-4 h-full flex items-center bg-secondary1';
const active = 'hover:bg-secondary2 px-4 h-full flex items-center  bg-secondary2';

const Navigation = ({ isAdmin }) => {
    const dispatch = useDispatch();

    return (
        <div
            className={`w-full flex ${
                isAdmin ? 'justify-start' : 'justify-center'
            } items-center h-[40px] bg-secondary1 text-white`}
        >
            <div className="w-3/5 flex h-full items-center text-sm font-medium">
                <NavLink to={`/`} className={({ isActive }) => (isActive ? active : notActive)}>
                    Trang chủ
                </NavLink>
            </div>
        </div>
    );
};

export default Navigation;
