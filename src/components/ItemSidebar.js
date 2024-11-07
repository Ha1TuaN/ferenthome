import React, { memo } from 'react';
import icons from '../ultils/icons';
import { useDispatch } from 'react-redux';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Form, Col, Row, Checkbox } from 'antd';

const { GrNext } = icons;

const ItemSidebar = ({ title, filter, form, nameForm }) => {
    // const dispatch = useDispatch();
    // const location = useLocation();
    // const navigate = useNavigate();
    // // console.log(location);

    // const formatContent = () => {
    //     const oddEl = content?.filter((item, index) => index % 2 !== 0);
    //     const evenEl = content?.filter((item, index) => index % 2 === 0);
    //     const formatContent = oddEl?.map((item, index) => {
    //         return {
    //             right: item,
    //             left: evenEl?.find((item2, index2) => index2 === index),
    //         };
    //     });

    //     return formatContent;
    // };
    // const handleFilterPosts = (code) => {
    //     navigate({
    //         pathname: location?.pathname,
    //         search: createSearchParams({
    //             [type]: code,
    //         }).toString(),
    //     });
    // };

    return (
        <div className="p-4 rounded-md bg-white w-full">
            <h3 className="text-lg font-semibold mb-4">{title}</h3>

            <Form form={form} layout="vertical">
                <Form.Item name={nameForm} className="mb-0">
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            {filter.map((item) => (
                                <Col span={24} key={item.value}>
                                    <Checkbox value={item.value} className="py-2">
                                        {item.label}
                                    </Checkbox>
                                </Col>
                            ))}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>
            </Form>
        </div>
    );
};

export default memo(ItemSidebar);
