import React from 'react';
import { text } from '../../ultils/constant';
import { Province, ItemSidebar, RelatedPost } from '../../components';
import { List, Pagination } from './index';
import { useSelector } from 'react-redux';
import { filterAcreage, filterPrice, filterType } from '../../ultils/filter';
import { Form } from 'antd';

const Homepage = () => {
    const [formPrice] = Form.useForm();
    const [formAcreage] = Form.useForm();
    const [formType] = Form.useForm();
    return (
        <div className="w-full flex flex-col gap-3">
            <div>
                <h1 className="text-[28px] font-bold">{text.HOME_TITLE}</h1>
                <p className="text-base text-gray-700">{text.HOME_DESCRIPTION}</p>
            </div>
            <Province />
            <div className="w-full flex gap-4">
                <div className="w-[70%]">
                    <List />
                    <Pagination />
                </div>
                <div className="w-[30%] flex flex-col gap-4 justify-start items-center">
                    <ItemSidebar title="Danh sách cho thuê" filter={filterType} form={formType} nameForm={'type'} />
                    <ItemSidebar title="Xem theo giá" filter={filterPrice} form={formPrice} nameForm={'price'} />
                    <ItemSidebar
                        title="Xem theo diện tích"
                        filter={filterAcreage}
                        form={formAcreage}
                        nameForm={'acreage'}
                    />
                    {/* <RelatedPost /> */}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
