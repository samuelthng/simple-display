import React, { useCallback, useContext } from "react";
import Button from "antd/es/button";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Row from "antd/es/row";
import Upload from "antd/es/upload";
import { UploadOutlined } from "@ant-design/icons";
import { FileManagerContext } from "../../context/fileManager";

const UploadCard = ({ label }) => {
  const { file, setFile } = useContext(FileManagerContext);

  const handleUpload = useCallback(
    ({ file, onSuccess }) => {
      setFile(file);
      // Lie about having the file uploaded, we don't need actual uploading.
      return Promise.resolve(onSuccess("ok"));
    },
    [setFile]
  );

  const handleRemove = useCallback(() => setFile(null), [setFile]);

  return (
    <Row justify="center">
      <Col span={24}>
        <Card>
          <Upload
            accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            customRequest={handleUpload}
            fileList={file ? [file] : undefined}
            onRemove={handleRemove}
          >
            <Button icon={<UploadOutlined />}>{label}</Button>
          </Upload>
        </Card>
      </Col>
    </Row>
  );
};

export default UploadCard;
