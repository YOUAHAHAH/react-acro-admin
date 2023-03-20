import { Link, Space } from "@arco-design/web-react";

const Error404 = () => {
  return (
    <>
      <Space size={40}>
        <Link href="#"> Link </Link>
        <Link href="#" disabled>
          Link
        </Link>
      </Space>
    </>
  );
};

export default Error404;
