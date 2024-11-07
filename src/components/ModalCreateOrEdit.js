import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Spin, Select, Modal, InputNumber, Button, Upload, Card } from 'antd';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { setModalVisible, setRandom } from '../store/reducers/modalReducer';
import { API_URL, requestPOST, requestPUT } from '../services/baseAPI';

import ImageUpload from './ImageUpload';
import { convertImage } from '../ultils/Common/handleImage';

const FormItem = Form.Item;

const { TextArea } = Input;

const ModalItem = (props) => {
    const dispatch = useDispatch();

    const dataModal = useSelector((state) => state.modal.dataModal);
    const modalVisible = useSelector((state) => state.modal.modalVisible);
    const id = dataModal?.id ?? null;

    const [form] = Form.useForm();
    const [file, setFile] = useState([]);
    const [loadding, setLoadding] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [provinceCode, setProvinceCode] = useState(null);
    const [districtCode, setDistrictCode] = useState(null);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoadding(true);
    //         const res = await requestGET(`api/v1/profileworkexperiences/${id}`);

    //         if (res && res.data) {
    //             form.setFieldsValue({
    //                 ...res.data,
    //                 educationLevel: res.data.educationLevelId
    //                     ? { value: res.data.educationLevelId, label: res.data.educationLevelName }
    //                     : null,
    //                 startYear: res.data.startYear ? moment(res.data.startYear) : null,
    //                 endYear: res.data.endYear ? moment(res.data.endYear) : null,
    //                 profilePersonal: res.data.profilePersonalId
    //                     ? { value: res.data.profilePersonalId, label: res.data.profilePersonalName }
    //                     : null,
    //             });
    //         }
    //         setLoadding(false);
    //     };
    //     if (id) {
    //         fetchData();
    //     }
    //     return () => {};
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestPOST(`api/v1/areas/search`, {
                pageNumber: 1,
                pageSize: 1000,
                orderBy: ['code'],
                level: 1,
            });
            if (res && res.data) setProvinces(res.data);
        };
        fetchData();
        return () => {};
    }, []);

    useEffect(() => {
        if (provinceCode) {
            const fetchData = async () => {
                const res = await requestPOST(`api/v1/areas/search`, {
                    pageNumber: 1,
                    pageSize: 1000,
                    orderBy: ['code'],
                    level: 2,
                    parentCode: provinceCode,
                });
                if (res && res.data) setDistricts(res.data);
            };
            fetchData();
        }
        return () => {};
    }, [provinceCode]);

    const handleCancel = () => {
        form.resetFields();
        dispatch(setModalVisible(false));
    };

    const onFinish = async () => {
        const values = await form.validateFields();
        setBtnLoading(true);
        try {
            const formData = form.getFieldsValue(true);
            if (id) {
                formData.id = id;
            }
            formData.imageHouses = convertImage(file);
            console.log(formData);
            const res = id
                ? await requestPUT(`api/v1/motels/${id}`, formData)
                : await requestPOST(`api/v1/motels`, formData);
            if (res.status === 200) {
                toast.success('Cập nhật thành công!');
                dispatch(setRandom());
                handleCancel();
            } else {
                //toast.error('Thất bại, vui lòng thử lại!');
                const errors = Object.values(res?.data?.errors ?? {});
                let final_arr = [];
                errors.forEach((item) => {
                    final_arr = _.concat(final_arr, item);
                });
                toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
            }
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
        setBtnLoading(false);
    };

    return (
        <Modal
            open={modalVisible}
            centered
            title={!id ? 'Thêm mới' : 'Chỉnh sửa'}
            onOk={onFinish}
            okText={
                <span>
                    <i className="fa fa-save me-2"></i> {id ? 'Lưu' : 'Tạo mới'}
                </span>
            }
            cancelText="Đóng"
            onCancel={handleCancel}
            width={'80%'}
            style={{ zIndex: '1000000' }}
        >
            <Spin spinning={loadding}>
                {!loadding && (
                    <Form form={form} initialValues={{ status: 'Chưa thuê' }} layout="vertical" autoComplete="off">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12">
                                <FormItem
                                    label="Tiêu đề"
                                    name="title"
                                    rules={[{ required: true, message: 'Không được để trống!' }]}
                                >
                                    <TextArea placeholder="" />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Tỉnh/Thành phố" name="provinces">
                                    <Select
                                        showSearch
                                        placeholder=""
                                        allowClear
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        style={{ width: '100%' }}
                                        options={provinces.map((item) => ({
                                            ...item,
                                            value: item.id,
                                            label: item.name,
                                        }))}
                                        onChange={(value, current) => {
                                            if (value) {
                                                console.log(current);
                                                form.setFieldValue('provinceId', current.id);
                                                form.setFieldValue('districts', null);
                                                form.setFieldValue('communes', null);
                                                setProvinceCode(current.code);
                                            } else {
                                                form.setFieldValue('districts', null);
                                                form.setFieldValue('communes', null);
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Quận/Huyện" name="districts">
                                    <Select
                                        showSearch
                                        placeholder=""
                                        allowClear
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        style={{ width: '100%' }}
                                        options={districts.map((item) => ({
                                            ...item,
                                            value: item.id,
                                            label: item.name,
                                        }))}
                                        onChange={(value, current) => {
                                            if (value) {
                                                console.log(current);
                                                form.setFieldValue('districtId', current.id);
                                                form.setFieldValue('communes', null);
                                                setDistrictCode(current.code);
                                            } else {
                                                form.setFieldValue('communes', null);
                                            }
                                        }}
                                    />
                                </FormItem>
                            </div>

                            <div className="col-xl-12 col-lg-12">
                                <FormItem label="Địa chỉ" name="address">
                                    <Input />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Giá" name="price">
                                    <InputNumber
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{ width: '100%' }}
                                        addonAfter="VNĐ"
                                    />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Diện tích" name="acreage">
                                    <InputNumber
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{ width: '100%' }}
                                        addonAfter={
                                            <span>
                                                m<sup>2</sup>
                                            </span>
                                        }
                                    />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Số lượng phòng ngủ" name="numberBedroom">
                                    <InputNumber
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{ width: '100%' }}
                                    />
                                </FormItem>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <FormItem label="Số lượng phòng tắm" name="bathRoom">
                                    <InputNumber
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                        style={{ width: '100%' }}
                                    />
                                </FormItem>
                            </div>

                            <div className="col-xl-12 col-lg-12">
                                <FormItem label="Mô tả" name="description">
                                    <TextArea />
                                </FormItem>
                            </div>
                            <div className="col-xl-12 col-lg-12">
                                <FormItem label="Hình ảnh" name="imageHouses">
                                    <ImageUpload
                                        multiple={true}
                                        URL={`${API_URL}/api/fileupload`}
                                        // headers={{
                                        //     Authorization: `Bearer ${token}`,
                                        // }}
                                        fileList={file}
                                        onChange={(e) => {
                                            setFile(e.fileList);
                                            console.log(e?.file?.response ?? null);
                                        }}
                                    />
                                </FormItem>
                            </div>
                        </div>
                        <Form.List name="featureHouses">
                            {(fields, { add, remove }) => (
                                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                    {fields.map((field) => (
                                        <Card
                                            size="small"
                                            title={`Tiện ích ${field.name + 1}`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            }
                                        >
                                            <Form.Item label="" name={[field.name, 'name']}>
                                                <Input />
                                            </Form.Item>
                                        </Card>
                                    ))}

                                    <Button type="dashed" onClick={() => add()} block>
                                        + Add Item
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </Form>
                )}
            </Spin>
        </Modal>
    );
};

export default ModalItem;
