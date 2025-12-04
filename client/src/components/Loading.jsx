import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin tip="Loading..." size="large" className="custom-spinner" />
    </div>
  );
};

export default Loading;
