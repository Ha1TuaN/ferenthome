import React from "react";
import PropTypes from "prop-types";
import { Upload } from "antd";

const { Dragger } = Upload;

const ImageUpload = (props) => {
  const { URL, fileList, onChange, headers, multiple, disabled } = props;

  const handlePreview = async (file) => {
    if (file.url) {
      window.open(file.url, "_blank");
    }
  };

  return (
    <>
      <Dragger
        multiple={multiple}
        name="files"
        action={`${URL}`}
        listType="picture"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={onChange}
        headers={headers}
      >
        {(!!multiple || (fileList && fileList.length < 1)) && !disabled && (
          <div>
            <p className="ant-upload-text">Thả ảnh hoặc nhấp chuột để tải lên</p>
          </div>
        )}
      </Dragger>
    </>
  );
};

// Adding prop validation
ImageUpload.propTypes = {
  URL: PropTypes.string.isRequired,
  fileList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  headers: PropTypes.object,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
};

ImageUpload.defaultProps = {
  headers: {},
  multiple: false,
  disabled: false,
};

export default ImageUpload;
